"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var template_module_1 = require("./template/template.module");
var home_component_1 = require("./components/home/home.component");
var estabelecimentos_module_1 = require("./modules/estabelecimentos/estabelecimentos.module");
var animations_1 = require("@angular/platform-browser/animations");
var ngx_mask_1 = require("ngx-mask");
var Estabelecimentos_service_1 = require("./services/Estabelecimentos.service");
var modal_1 = require("ngx-bootstrap/modal");
var http_1 = require("@angular/common/http");
var pt_1 = require("@angular/common/locales/pt");
var common_1 = require("@angular/common");
var Procedimentos_service_1 = require("./services/Procedimentos.service");
var components_module_1 = require("./components/components.module");
var errorResponse_directive_1 = require("src/core/errorResponse.directive");
var common_2 = require("@angular/common");
common_1.registerLocaleData(pt_1["default"], 'pt-BR');
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                home_component_1.HomeComponent,
                errorResponse_directive_1.ErrorResponseDirective,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                estabelecimentos_module_1.EstabelecimentosModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                template_module_1.TemplateModule,
                http_1.HttpClientModule,
                animations_1.BrowserAnimationsModule,
                components_module_1.ComponentsModule,
                http_1.HttpClientJsonpModule,
                ngx_mask_1.NgxMaskModule.forRoot(),
                modal_1.ModalModule.forRoot(),
            ],
            exports: [errorResponse_directive_1.ErrorResponseDirective],
            providers: [Estabelecimentos_service_1.EstabelecimentosService, Procedimentos_service_1.ProcedimentosService,
                { provide: common_2.LocationStrategy, useClass: common_2.HashLocationStrategy },
                common_1.DatePipe, errorResponse_directive_1.ErrorResponseDirective, { provide: core_1.LOCALE_ID, useValue: 'pt-BR' }
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
