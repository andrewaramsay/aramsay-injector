"use strict";
exports.injectableMetadataKey = 'aramsay-injector:injectable';
function Injectable(config) {
    return function (Class) {
        Reflect.defineMetadata(exports.injectableMetadataKey, config || {}, Class);
    };
}
exports.Injectable = Injectable;
//# sourceMappingURL=injectable.decorator.js.map