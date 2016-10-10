"use strict";
var core_js_1 = require('core-js');
var decorators_1 = require('./decorators');
var instance_managers_1 = require('./instance-managers');
var interfaces_1 = require('./interfaces');
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
        var instanceManager;
        if (config.instanceMode === interfaces_1.InstanceMode.SingleInstance) {
            instanceManager = new instance_managers_1.SingletonInstanceManager(Class, parameters, overrides, function (token) { return _this.getPrivate(token); });
        }
        else if (config.instanceMode === interfaces_1.InstanceMode.InstancePerResolution) {
            instanceManager = new instance_managers_1.PerResolutionInstanceManager(Class, parameters, overrides, function (token) { return _this.getPrivate(token); });
        }
        else {
            instanceManager = new instance_managers_1.PerDependencyInstanceManager(Class, parameters, overrides, function (token) { return _this.getPrivate(token); });
        }
        this.registerFactory(Class, instanceManager);
    };
    Injector.prototype.getParameterMetadata = function (Class) {
        var parameters = Reflect.getMetadata('design:paramtypes', Class);
        return parameters || [];
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
    Injector.prototype.registerFactory = function (token, factory, overwrite) {
        if (this.factories.has(token) && !overwrite) {
            return;
        }
        var instanceManager;
        if (factory instanceof instance_managers_1.InstanceManager) {
            instanceManager = factory;
        }
        else {
            instanceManager = new instance_managers_1.AnonymousInstanceManager(factory);
        }
        this.factories.set(token, instanceManager);
    };
    Injector.prototype.get = function (token) {
        if (!this.factories.has(token) && typeof token !== 'string' && typeof token !== 'symbol') {
            this.registerType(token, { instanceMode: interfaces_1.InstanceMode.InstancePerDependency });
        }
        this.resetFactories();
        return this.getPrivate(token);
    };
    Injector.prototype.resetFactories = function () {
        this.factories.forEach(function (instanceManager) {
            if (instanceManager instanceof instance_managers_1.PerResolutionInstanceManager) {
                instanceManager.reset();
            }
        });
    };
    Injector.prototype.getPrivate = function (token) {
        var factory = this.factories.get(token);
        return factory.getInstance();
    };
    return Injector;
}());
exports.Injector = Injector;
//# sourceMappingURL=injector.js.map