"use strict";
var core_js_1 = require('core-js');
var decorators_1 = require('./decorators');
var Injector = (function () {
    function Injector() {
        this.factories = new core_js_1.Map();
    }
    Injector.prototype.registerType = function (Class, config) {
        var _this = this;
        if (this.factories.has(Class)) {
            return;
        }
        var parameters = this.getParameterMetadata(Class);
        this.registerInjectableDependencies.apply(this, parameters);
        var overrides = Reflect.getMetadata(decorators_1.injectOverridesMetadataKey, Class) || [];
        var instance;
        var classFactory = function () {
            if (config.singleton && instance) {
                return instance;
            }
            var paramInstances = parameters.map(function (ParamClass, index) { return _this.get(overrides[index] || ParamClass); });
            instance = new (Class.bind.apply(Class, [void 0].concat(paramInstances)))();
            return instance;
        };
        this.registerFactory(Class, classFactory);
    };
    Injector.prototype.registerFactory = function (token, factory, overwrite) {
        if (this.factories.has(token) && !overwrite) {
            return;
        }
        this.factories.set(token, factory);
    };
    Injector.prototype.registerInjectableDependencies = function () {
        var _this = this;
        var parameters = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            parameters[_i - 0] = arguments[_i];
        }
        parameters.forEach(function (ParamClass) {
            var injectableConfig = Reflect.getMetadata(decorators_1.injectableMetadataKey, ParamClass);
            if (injectableConfig) {
                _this.registerType(ParamClass, injectableConfig);
            }
        });
    };
    Injector.prototype.get = function (token) {
        if (!this.factories.has(token) && typeof token !== 'string' && typeof token !== 'symbol') {
            this.registerType(token, {});
        }
        var factory = this.factories.get(token);
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