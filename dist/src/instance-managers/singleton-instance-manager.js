"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var per_dependency_instance_manager_1 = require('./per-dependency-instance-manager');
var SingletonInstanceManager = (function (_super) {
    __extends(SingletonInstanceManager, _super);
    function SingletonInstanceManager(Class, parameters, overrides, injectType) {
        _super.call(this, Class, parameters, overrides, injectType);
    }
    SingletonInstanceManager.prototype.getInstance = function () {
        if (!this.instance) {
            this.instance = _super.prototype.getInstance.call(this);
        }
        return this.instance;
    };
    return SingletonInstanceManager;
}(per_dependency_instance_manager_1.PerDependencyInstanceManager));
exports.SingletonInstanceManager = SingletonInstanceManager;
//# sourceMappingURL=singleton-instance-manager.js.map