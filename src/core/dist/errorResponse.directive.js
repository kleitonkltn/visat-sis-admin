"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ErrorResponseDirective = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var ErrorResponseDirective = /** @class */ (function () {
    function ErrorResponseDirective() {
    }
    ErrorResponseDirective.prototype.handleError = function (error) {
        var errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            console.log(error);
            errorMessage = error.error.message;
        }
        else {
            console.log(error);
            errorMessage = "C\u00F3digo do erro: " + error.status + ", " + ("menssagem: " + error.error.message);
        }
        return rxjs_1.throwError(errorMessage);
    };
    ErrorResponseDirective = __decorate([
        core_1.Directive({
            selector: '[appErrorResponse]'
        })
    ], ErrorResponseDirective);
    return ErrorResponseDirective;
}());
exports.ErrorResponseDirective = ErrorResponseDirective;
