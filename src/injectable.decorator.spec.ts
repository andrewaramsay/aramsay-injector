/// <reference path="../typings/index.d.ts" />
import { Injectable } from './injectable.decorator';
import { Injector } from './injector';

describe('injectable', () => {
    beforeEach(() => {
        spyOn(Injector.instance, 'registerType');
    });
    
    it('should call registerType with the class on injector instance', () => {
        Injectable()(TestClass);
        
        expect(Injector.instance.registerType).toHaveBeenCalledWith(TestClass, jasmine.anything());
    });

    it('should pass config to registerType', () => {
        let config = { this: 'is a config' };
        Injectable(config)(TestClass);
        
        expect(Injector.instance.registerType).toHaveBeenCalledWith(TestClass, config);
    });

    it('should pass an empty object when no config is specified', () => {
        Injectable()(TestClass);
        
        expect(Injector.instance.registerType).toHaveBeenCalledWith(TestClass, {});
    });
});

class TestClass {}
