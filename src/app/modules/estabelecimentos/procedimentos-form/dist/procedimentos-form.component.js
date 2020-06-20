"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProcedimentosFormComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var Procedimentos_1 = require("src/models/Procedimentos");
var common_1 = require("@angular/common");
var moment = require("moment-timezone");
var rxjs_1 = require("rxjs");
var util_1 = require("util");
var ProcedimentosFormComponent = /** @class */ (function () {
    function ProcedimentosFormComponent(procedimentosService, modalService) {
        this.procedimentosService = procedimentosService;
        this.modalService = modalService;
        this.closeForm = new rxjs_1.Subject();
        this.alterForm = new rxjs_1.Subject();
        this.procedimento = new Procedimentos_1.Procedimentos();
        this.loadingForm = false;
        this.datePipe = new common_1.DatePipe('pt-BR');
    }
    ProcedimentosFormComponent.prototype.ngOnInit = function () {
        this.createForm(new Procedimentos_1.Procedimentos());
        this.getProcedimento();
    };
    ProcedimentosFormComponent.prototype.createForm = function (procedimento) {
        this.procedimentosForm = new forms_1.FormGroup({
            id: new forms_1.FormControl(procedimento.id),
            description: new forms_1.FormControl(procedimento.description),
            comments: new forms_1.FormControl(procedimento.comments),
            accomplishedAt: new forms_1.FormControl(procedimento.accomplishedAt),
            estabelecimento: new forms_1.FormControl(procedimento.estabelecimento)
        });
    };
    ProcedimentosFormComponent.prototype.formToObject = function () {
        this.procedimento = this.f.value;
        this.procedimento.accomplishedAt = moment(this.procedimento.accomplishedAt, 'YYYY-MM-DD').format('DD/MM/YYYY');
    };
    ProcedimentosFormComponent.prototype.submitForm = function () {
        var _this = this;
        console.log(this.idProcedimento);
        if (util_1.isNull(this.idProcedimento)) {
            this.formToObject();
            console.log(this.procedimento);
            this.procedimento.estabelecimento = Number(this.idEstabelecimento);
            this.procedimentosService.create(this.procedimento).subscribe(function (data) {
                _this.modalService.openConfirmDialog('Cadastro realizado com sucesso', 'Cadastro', false, 'alert-success')
                    .then(function () {
                    _this.updateForm();
                    _this.createForm(new Procedimentos_1.Procedimentos());
                });
                (function (err) {
                    console.log(err);
                });
            });
        }
        else {
            this.formToObject();
            console.log(this.procedimento);
            this.procedimento.estabelecimento = Number(this.idEstabelecimento);
            this.procedimentosService.update(this.procedimento).subscribe(function (data) {
                _this.modalService.openConfirmDialog('Cadastro atualizado com sucesso', 'Cadastro', false, 'alert-success')
                    .then(function () {
                    _this.updateForm();
                    _this.createForm(new Procedimentos_1.Procedimentos());
                });
                (function (err) {
                    console.log(err);
                });
            });
        }
    };
    ProcedimentosFormComponent.prototype.cancelForm = function () {
        this.closeForm.next(true);
    };
    ProcedimentosFormComponent.prototype.updateForm = function () {
        this.alterForm.next(true);
    };
    Object.defineProperty(ProcedimentosFormComponent.prototype, "f", {
        get: function () { return this.procedimentosForm; },
        enumerable: false,
        configurable: true
    });
    ProcedimentosFormComponent.prototype.getProcedimento = function () {
        var _this = this;
        if (this.idProcedimento) {
            this.loadingForm = true;
            return new Promise(function (resolve, _reject) {
                _this.procedimentosService.getByID(_this.idProcedimento).subscribe(function (data) {
                    _this.idEstabelecimento = data.estabelecimento.id;
                    _this.procedimento = data;
                    data.accomplishedAt = moment(data.accomplishedAt, 'DD/MM/YYYY').format('YYYY-MM-DD');
                    _this.createForm(data);
                    _this.loadingForm = false;
                    resolve(data);
                });
            });
        }
    };
    __decorate([
        core_1.Input()
    ], ProcedimentosFormComponent.prototype, "idProcedimento");
    __decorate([
        core_1.Input()
    ], ProcedimentosFormComponent.prototype, "idEstabelecimento");
    __decorate([
        core_1.Output()
    ], ProcedimentosFormComponent.prototype, "closeForm");
    __decorate([
        core_1.Output()
    ], ProcedimentosFormComponent.prototype, "alterForm");
    ProcedimentosFormComponent = __decorate([
        core_1.Component({
            selector: 'app-procedimentos-form',
            templateUrl: './procedimentos-form.component.html',
            styleUrls: ['./procedimentos-form.component.css']
        })
    ], ProcedimentosFormComponent);
    return ProcedimentosFormComponent;
}());
exports.ProcedimentosFormComponent = ProcedimentosFormComponent;
