"use strict";
(function (InstanceMode) {
    InstanceMode[InstanceMode["SingleInstance"] = 0] = "SingleInstance";
    InstanceMode[InstanceMode["InstancePerDependency"] = 1] = "InstancePerDependency";
    InstanceMode[InstanceMode["InstancePerResolution"] = 2] = "InstancePerResolution";
})(exports.InstanceMode || (exports.InstanceMode = {}));
var InstanceMode = exports.InstanceMode;
//# sourceMappingURL=types.js.map