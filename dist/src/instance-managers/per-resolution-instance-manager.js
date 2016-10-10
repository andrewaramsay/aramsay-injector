"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var singleton_instance_manager_1 = require('./singleton-instance-manager');
var PerResolutionInstanceManager = (function (_super) {
    __extends(PerResolutionInstanceManager, _super);
    function PerResolutionInstanceManager(Class, parameters, overrides, injectType) {
        _super.call(this, Class, parameters, overrides, injectType);
    }
    PerResolutionInstanceManager.prototype.reset = function () {
        this.instance = null;
    };
    return PerResolutionInstanceManager;
}(singleton_instance_manager_1.SingletonInstanceManager));
exports.PerResolutionInstanceManager = PerResolutionInstanceManager;
//# sourceMappingURL=per-resolution-instance-manager.js.map