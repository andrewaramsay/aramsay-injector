"use strict";
var InstanceManager = (function () {
    function InstanceManager() {
    }
    InstanceManager.prototype.getInstance = function () {
        throw new Error('This should be implemented by real classes');
    };
    return InstanceManager;
}());
exports.InstanceManager = InstanceManager;
//# sourceMappingURL=instance-manager.js.map