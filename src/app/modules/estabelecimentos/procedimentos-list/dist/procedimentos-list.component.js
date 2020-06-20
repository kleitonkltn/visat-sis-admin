"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProcedimentosListComponent = void 0;
var core_1 = require("@angular/core");
var paginator_1 = require("@angular/material/paginator");
var sort_1 = require("@angular/material/sort");
var table_1 = require("@angular/material/table");
var ProcedimentosListComponent = /** @class */ (function () {
    function ProcedimentosListComponent(procedimentosService) {
        this.procedimentosService = procedimentosService;
        this.panelOpenState = false;
        this.items = [];
        this.procedimentos = [];
        this.loadingList = false;
        this.displayedColumns = ['id', 'description', 'comments', 'accomplishedAt', 'options'];
    }
    ProcedimentosListComponent.prototype.setEdit = function (v) {
        var _this = this;
        this.idProcedimentoEdit = undefined;
        setTimeout(function () {
            _this.idProcedimentoEdit = v;
            _this.panelOpenState = true;
        }, 1000);
    };
    ProcedimentosListComponent.prototype.alterForm = function () {
        var _this = this;
        this.idProcedimentoEdit = undefined;
        this.panelOpenState = false;
        this.getProcedimentos().then(function () {
            _this.initializeItems();
        });
    };
    ProcedimentosListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getProcedimentos().then(function () {
            _this.initializeItems();
        });
    };
    ProcedimentosListComponent.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    };
    ProcedimentosListComponent.prototype.initializeItems = function () {
        this.items = this.procedimentos;
        this.dataSource = new table_1.MatTableDataSource(this.items);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    };
    ProcedimentosListComponent.prototype.getProcedimentos = function () {
        var _this = this;
        return new Promise(function (resolve, _reject) {
            if (_this.idEstabelecimento) {
                _this.loadingList = true;
                _this.procedimentosService.getByEstabelecimentoId(_this.idEstabelecimento).subscribe(function (items) {
                    _this.procedimentos = items;
                    _this.loadingList = false;
                    resolve(items);
                    (function (err) {
                        _this.loadingList = false;
                        _reject(err);
                        console.log(err);
                    });
                });
            }
        });
    };
    __decorate([
        core_1.Input()
    ], ProcedimentosListComponent.prototype, "idEstabelecimento");
    __decorate([
        core_1.ViewChild(paginator_1.MatPaginator, { static: true })
    ], ProcedimentosListComponent.prototype, "paginator");
    __decorate([
        core_1.ViewChild(sort_1.MatSort, { static: true })
    ], ProcedimentosListComponent.prototype, "sort");
    ProcedimentosListComponent = __decorate([
        core_1.Component({
            selector: 'app-procedimentos-list',
            templateUrl: './procedimentos-list.component.html',
            styleUrls: ['./procedimentos-list.component.css']
        })
    ], ProcedimentosListComponent);
    return ProcedimentosListComponent;
}());
exports.ProcedimentosListComponent = ProcedimentosListComponent;
