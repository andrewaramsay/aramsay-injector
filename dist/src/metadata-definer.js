"use strict";
var MetadataDefiner = (function () {
    function MetadataDefiner() {
    }
    MetadataDefiner.prototype.defineDependencies = function (Class, dependencies) {
        var parameters = Reflect.getMetadata('design:paramtypes', Class);
        if (parameters) {
            parameters.forEach(function (p, index) {
                if (dependencies[index] !== p) {
                    throw new Error("Type " + Class.name + " already has reflection metadata emitted.  Cannot redefine with different values.");
                }
            });
            return;
        }
        Reflect.defineMetadata('design:paramtypes', dependencies, Class);
    };
    return MetadataDefiner;
}());
exports.MetadataDefiner = MetadataDefiner;
//# sourceMappingURL=metadata-definer.js.map