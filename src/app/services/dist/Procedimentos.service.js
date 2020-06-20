"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProcedimentosService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var operators_1 = require("rxjs/operators");
var environment_1 = require("src/environments/environment");
var ProcedimentosService = /** @class */ (function () {
    function ProcedimentosService(httpClient, errorRespnse) {
        this.httpClient = httpClient;
        this.errorRespnse = errorRespnse;
        this.httpOptions = {
            headers: new http_1.HttpHeaders({ 'Content-Type': 'application/json' })
        };
    }
    ProcedimentosService.prototype.getAll = function () {
        var _this = this;
        return this.httpClient.get(environment_1.environment.urlProcecimentos)
            .pipe(operators_1.retry(2), operators_1.catchError(function (err) { return _this.errorRespnse.handleError(err); }));
    };
    ProcedimentosService.prototype.getByEstabelecimentoId = function (id) {
        var _this = this;
        return this.httpClient.get(environment_1.environment.urlProcecimentos + '/filter/estabelecimento?id=' + id)
            .pipe(operators_1.retry(2), operators_1.catchError(function (err) { return _this.errorRespnse.handleError(err); }));
    };
    ProcedimentosService.prototype.getByID = function (id) {
        var _this = this;
        return this.httpClient.get(environment_1.environment.urlProcecimentos + '/' + id)
            .pipe(operators_1.retry(2), operators_1.catchError(function (err) { return _this.errorRespnse.handleError(err); }));
    };
    ProcedimentosService.prototype.create = function (procedimento) {
        var _this = this;
        return this.httpClient.post(environment_1.environment.urlProcecimentos, procedimento)
            .pipe(operators_1.retry(2), operators_1.catchError(function (err) { return _this.errorRespnse.handleError(err); }));
    };
    ProcedimentosService.prototype.update = function (procedimento) {
        var _this = this;
        procedimento.createdAt = null;
        procedimento.updatedAt = null;
        return this.httpClient.put(environment_1.environment.urlProcecimentos + '/' + procedimento.id, procedimento)
            .pipe(operators_1.retry(2), operators_1.catchError(function (err) { return _this.errorRespnse.handleError(err); }));
    };
    ProcedimentosService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ProcedimentosService);
    return ProcedimentosService;
}());
exports.ProcedimentosService = ProcedimentosService;
