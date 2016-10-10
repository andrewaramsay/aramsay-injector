/// <reference path="../typings/index.d.ts" />
import 'core-js';
import 'reflect-metadata';

import { MetadataDefiner } from './metadata-definer';
import { Injector } from './injector';

describe('MetadataDefiner', () => {
    let target: MetadataDefiner;

    beforeEach(() => {
        Reflect.deleteMetadata('design:paramtypes', SampleClass);
    });

    describe('without injector', () => {
        beforeEach(() => {
            target = new MetadataDefiner();
        });

        it('adds reflection metadata to a class', () => {
            target.defineDependencies(SampleClass, [SampleClass2, SampleClass3]);
            let parameters = Reflect.getMetadata('design:paramtypes', SampleClass);
            expect(parameters).toBeTruthy();
            expect(parameters.length).toBe(2);
            expect(parameters[0]).toBe(SampleClass2);
            expect(parameters[1]).toBe(SampleClass3);
        });

        it('allows redefining metadata that is already emitted by reflect-metadata', () => {
            let parameters = Reflect.getMetadata('design:paramtypes', InjectableClass);
            expect(parameters).toBeTruthy();
            expect(parameters.length).toBe(2);
            expect(parameters[0]).toBe(SampleClass2);
            expect(parameters[1]).toBe(SampleClass3);

            target.defineDependencies(InjectableClass, [SampleClass2, SampleClass3]);
        });

        it('throws an exception if attempting to define different metadata', () => {
            let threw = false;
            try {
                target.defineDependencies(InjectableClass, [SampleClass, SampleClass3]);
            } catch(err) {
                threw = true;
                expect(err.message).toBe('Type InjectableClass already has reflection metadata emitted.  Cannot redefine with different values.');
            }

            expect(threw).toBe(true);
        });
    });
});

class SampleClass {
    constructor(item1: SampleClass2, item2: SampleClass3) {}
}

class SampleClass2 {
}

class SampleClass3 {
}

function decorator(cls: any) {}

@decorator
class InjectableClass {
    constructor(item1: SampleClass2, item2: SampleClass3) {}
}


