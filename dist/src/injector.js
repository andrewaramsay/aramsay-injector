"use strict";
var core_js_1 = require('core-js');
var injectable_decorator_1 = require('./injectable.decorator');
var Injector = (function () {
    function Injector() {
        this.factories = new core_js_1.Map();
    }
    Injector.prototype.registerType = function (Class, config) {
        var _this = this;
        if (this.factories.has(Class)) {
            console.warn("Class " + Class.name + " is already registered.  Ignoring");
            return;
        }
        var parameters = this.getParameterMetadata(Class);
        this.registerInjectableDependencies.apply(this, parameters);
        var instance;
        var classFactory = function () {
            if (config.singleton && instance) {
                return instance;
            }
            var paramInstances = parameters.map(function (ParamClass) { return _this.get(ParamClass); });
            instance = new (Class.bind.apply(Class, [void 0].concat(paramInstances)))();
            return instance;
        };
        this.registerFactory(Class, classFactory);
    };
    Injector.prototype.registerFactory = function (Class, factory) {
        if (this.factories.has(Class)) {
            console.warn("Class " + Class.name + " is already registered.  Ignoring");
            return;
        }
        this.factories.set(Class, factory);
    };
    Injector.prototype.registerInjectableDependencies = function () {
        var _this = this;
        var parameters = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            parameters[_i - 0] = arguments[_i];
        }
        parameters.forEach(function (ParamClass) {
            var injectableConfig = Reflect.getMetadata(injectable_decorator_1.injectableMetadataKey, ParamClass);
            if (injectableConfig) {
                _this.registerType(ParamClass, injectableConfig);
            }
        });
    };
    Injector.prototype.get = function (Class) {
        if (!this.factories.has(Class)) {
            this.registerType(Class, {});
        }
        var factory = this.factories.get(Class);
        return factory();
    };
    Injector.prototype.getParameterMetadata = function (Class) {
        var parameters = Reflect.getMetadata('design:paramtypes', Class);
        return parameters || [];
    };
    return Injector;
}());
exports.Injector = Injector;
//# sourceMappingURL=injector.js.map