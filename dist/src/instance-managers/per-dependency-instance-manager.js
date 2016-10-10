"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var instance_manager_1 = require('./instance-manager');
var PerDependencyInstanceManager = (function (_super) {
    __extends(PerDependencyInstanceManager, _super);
    function PerDependencyInstanceManager(Class, parameters, overrides, injectType) {
        _super.call(this);
        this.Class = Class;
        this.parameters = parameters;
        this.overrides = overrides;
        this.injectType = injectType;
    }
    PerDependencyInstanceManager.prototype.getInstance = function () {
        var _this = this;
        var paramInstances = this.parameters.map(function (ParamClass, index) {
            return _this.injectType(_this.overrides[index] || ParamClass);
        });
        return new ((_a = this.Class).bind.apply(_a, [void 0].concat(paramInstances)))();
        var _a;
    };
    return PerDependencyInstanceManager;
}(instance_manager_1.InstanceManager));
exports.PerDependencyInstanceManager = PerDependencyInstanceManager;
//# sourceMappingURL=per-dependency-instance-manager.js.map