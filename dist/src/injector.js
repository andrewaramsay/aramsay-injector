"use strict";
require('core-js');
require('reflect-metadata');
exports.factoryMetadataKey = 'aramsay-injector:factory';
var Injector = (function () {
    function Injector() {
    }
    Injector.prototype.registerType = function (Class, config) {
        var _this = this;
        var parameters = this.getParameterMetadata(Class);
        var instance;
        var factory = function () {
            if (config.singleton && instance) {
                return instance;
            }
            var paramInstances = parameters.map(function (paramClass) { return _this.get(paramClass); });
            instance = new (Class.bind.apply(Class, [void 0].concat(paramInstances)))();
            return instance;
        };
        Reflect.defineMetadata(exports.factoryMetadataKey, factory, Class);
    };
    Injector.prototype.get = function (Class) {
        var factory = Reflect.getMetadata(exports.factoryMetadataKey, Class);
        if (!factory) {
            factory = this.checkSafeCreate(Class);
        }
        if (!factory) {
            throw new Error("Unknown class " + Class.name + ".  Are you missing the @Injectable() decorator?");
        }
        return factory();
    };
    Injector.prototype.checkSafeCreate = function (Class) {
        var parameters = this.getParameterMetadata(Class);
        if (parameters.length === 0) {
            return function () { return new Class(); };
        }
        return undefined;
    };
    Injector.prototype.getParameterMetadata = function (Class) {
        var parameters = Reflect.getMetadata('design:paramtypes', Class);
        return parameters || [];
    };
    Injector.instance = new Injector();
    return Injector;
}());
exports.Injector = Injector;
//# sourceMappingURL=injector.js.map