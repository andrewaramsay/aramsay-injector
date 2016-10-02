"use strict";
var injector_1 = require('./injector');
function Injectable(config) {
    var injectorInstance = injector_1.Injector.instance;
    return function (Class) {
        injectorInstance.registerType(Class, config || {});
    };
}
exports.Injectable = Injectable;
//# sourceMappingURL=injectable.decorator.js.map