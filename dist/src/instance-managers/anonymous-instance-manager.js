"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var instance_manager_1 = require('./instance-manager');
var AnonymousInstanceManager = (function (_super) {
    __extends(AnonymousInstanceManager, _super);
    function AnonymousInstanceManager(classFactory) {
        _super.call(this);
        this.classFactory = classFactory;
    }
    AnonymousInstanceManager.prototype.getInstance = function () {
        return this.classFactory();
    };
    return AnonymousInstanceManager;
}(instance_manager_1.InstanceManager));
exports.AnonymousInstanceManager = AnonymousInstanceManager;
//# sourceMappingURL=anonymous-instance-manager.js.map