/// <reference path="../typings/index.d.ts" />
import 'reflect-metadata';
import { Injectable, injectableMetadataKey } from './injectable.decorator';

describe('injectable', () => {
    
    it('should define metadata on the class', () => {
        Injectable()(TestClass);
        
        let metadata = Reflect.getMetadata(injectableMetadataKey, TestClass);
        
        expect(metadata).toBeTruthy();
        expect(metadata.singleton).toBeFalsy();
    });

    it('should pass config to registerType', () => {
        let config = { this: 'is a config' };
        Injectable(config)(TestClass);
        
        let metadata = Reflect.getMetadata(injectableMetadataKey, TestClass);
        
        expect(metadata).toBe(config);
    });
});

class TestClass {}
