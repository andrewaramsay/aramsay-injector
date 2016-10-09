/// <reference path="../typings/index.d.ts" />
import 'reflect-metadata';
import { Injector } from './injector';
import { injectOverridesMetadataKey } from './decorators';

describe('injector', () => {
    let injector: Injector;

    beforeEach(() => {
        injector = new Injector();
    });

    it('should return an instance of a registered type', () => {
        injector.registerType(TestClass, {});

        let instance = injector.get(TestClass);
        expect(instance).toBeTruthy();
        expect(instance instanceof TestClass).toBeTruthy();
    });

    it('should create instance of non-registered classes', () => {
        let instance = injector.get(TestClass);
        expect(instance).toBeTruthy();
        expect(instance instanceof TestClass).toBeTruthy();
    });

    it('injects dependencies into classes', () => {
        injector.registerType(TestClass, {});
        injector.registerType(TestClassWithDependency, {});
        let instance: TestClassWithDependency = injector.get(TestClassWithDependency);

        expect(instance).toBeTruthy('instance is not defined');
        expect(instance instanceof TestClassWithDependency).toBeTruthy('instance is not instance of TestClassWithDependency');
        expect(instance.testClass).toBeTruthy('instance.dep is not defined');
        expect(instance.testClass instanceof TestClass).toBeTruthy('dep is not instance of TestClass');
    });

    it('returns a new instance of each dependency by default', () => {
        injector.registerType(TestClass, {});
        injector.registerType(TestClassWithDependency, {});
        injector.registerType(TestClassWithDependencyGraph, {});

        let instance1: TestClassWithDependencyGraph = injector.get(TestClassWithDependencyGraph);
        let instance2: TestClassWithDependencyGraph = injector.get(TestClassWithDependencyGraph);

        expect(instance1).not.toBe(instance2);
        expect(instance1.testClassWithDependency).not.toBe(instance2.testClassWithDependency);
        expect(instance1.testClassWithDependency.testClass).not.toBe(instance2.testClassWithDependency.testClass);
    });

    it('returns a single instance of each dependency that is specified to be a singleton', () => {
        injector.registerType(TestClass, {});
        injector.registerType(TestClassWithDependency, { singleton: true });
        injector.registerType(TestClassWithDependencyGraph, {});

        let instance1: TestClassWithDependencyGraph = injector.get(TestClassWithDependencyGraph);
        let instance2: TestClassWithDependencyGraph = injector.get(TestClassWithDependencyGraph);

        expect(instance1).not.toBe(instance2);

        expect(instance1.testClassWithDependency).toBe(instance2.testClassWithDependency);
        expect(instance1.testClassWithDependency.testClass).toBe(instance2.testClassWithDependency.testClass);
    });

    it('allows overriding a paramter to inject with a custom token', () => {
        let dependency = new TestClass();
        injector.registerFactory('token', () => dependency);

        Reflect.defineMetadata(injectOverridesMetadataKey, ['token'], TestClassWithDependency);

        let instance: TestClassWithDependency = injector.get(TestClassWithDependency);

        expect(instance.testClass).toBe(dependency);
    });

    describe('registerFactory', () => {
        it('executes the specified factory when getting the supplied token', () => {
            let dependency = new TestClass();
            injector.registerFactory('token', () => dependency);

            let instance = injector.get('token');
        });
    });
});

// Test classes must have a decorator of some sort for TypeScript to emit metadata.  This decorator does nothing but make metadata available.
function decorator(cls: any) {}

@decorator
class TestClass {}

@decorator
class TestClassWithDependency {
    constructor(public testClass: TestClass) {}
}

@decorator
class TestClassWithDependencyGraph {
    constructor(public testClassWithDependency: TestClassWithDependency) {}
}