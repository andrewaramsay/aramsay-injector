"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
require('reflect-metadata');
exports.injectOverridesMetadataKey = 'aramsay-injector:overrides';
function Inject(token) {
    return function (Class, propertyKey, parameterIndex) {
        var overrides = Reflect.getMetadata(exports.injectOverridesMetadataKey, Class) || [];
        if (!parameterIndex && parameterIndex !== 0) {
            throw new Error('@Inject should only be used on parameters');
        }
        overrides[parameterIndex] = token;
        Reflect.defineMetadata(exports.injectOverridesMetadataKey, overrides, Class);
    };
}
exports.Inject = Inject;
var Sample = (function () {
    function Sample(str) {
        this.str = str;
    }
    Sample = __decorate([
        __param(0, Inject('asdf')), 
        __metadata('design:paramtypes', [String])
    ], Sample);
    return Sample;
}());
//# sourceMappingURL=inject.decorator.js.map