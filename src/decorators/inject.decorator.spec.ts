/// <reference path="../../typings/index.d.ts" />
import 'reflect-metadata';
import { Inject, injectOverridesMetadataKey } from './inject.decorator';
import { FactoryToken } from '../interfaces';

describe('Inject', () => {
    beforeEach(() => {
        Reflect.deleteMetadata(injectOverridesMetadataKey, TestClass);
    });

    it('should define metadata on the class', () => {
        Inject('thing')(TestClass, 'constructor', 2);
        
        let metadata: FactoryToken[] = Reflect.getMetadata(injectOverridesMetadataKey, TestClass);
        
        expect(metadata).toBeTruthy();
        expect(metadata.length).toBe(3);
        expect(metadata[0]).toBeUndefined();
        expect(metadata[1]).toBeUndefined();
        expect(metadata[2]).toBe('thing');
    });

    it('should add to the existing metadata when called multiple times', () => {
        Inject('thing 2')(TestClass, 'constructor', 2);
        Inject('thing 1')(TestClass, 'constructor', 1);
        
        let metadata: FactoryToken[] = Reflect.getMetadata(injectOverridesMetadataKey, TestClass);
        
        expect(metadata.length).toBe(3);
        expect(metadata[0]).toBeUndefined();
        expect(metadata[1]).toBe('thing 1');
        expect(metadata[2]).toBe('thing 2');
    });

    it('should overwrite existing metadata only when called against the same positino', () => {
        Inject('thing 2')(TestClass, 'constructor', 1);
        Inject('thing 1')(TestClass, 'constructor', 1);
        
        let metadata: FactoryToken[] = Reflect.getMetadata(injectOverridesMetadataKey, TestClass);
        
        expect(metadata.length).toBe(2);
        expect(metadata[0]).toBeUndefined();
        expect(metadata[1]).toBe('thing 1');
    });
});

class TestClass {}
