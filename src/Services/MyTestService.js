var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { ControllerBase, HttpMethods } from "@docsvision/webclient/System/ControllerBase";
var MyTestService = /** @class */ (function (_super) {
    __extends(MyTestService, _super);
    function MyTestService(services) {
        var _this = _super.call(this, services) || this;
        _this.services = services;
        _this.controllerName = "MyTest";
        return _this;
    }
    MyTestService.prototype.GetName = function (model) {
        return _super.prototype.doRequest.call(this, {
            controller: this.controllerName,
            action: 'GetName',
            isApi: true,
            method: HttpMethods.Post,
            data: { model: model },
            options: { isShowOverlay: true }
        });
    };
    MyTestService.prototype.GetMemberSentData = function (model) {
        return _super.prototype.doRequest.call(this, {
            controller: this.controllerName,
            action: 'GetMemberSentData',
            isApi: true,
            method: HttpMethods.Post,
            data: { model: model },
            options: { isShowOverlay: true }
        });
    };
    MyTestService.prototype.ChangeMoneyData = function (model) {
        return _super.prototype.doRequest.call(this, {
            controller: this.controllerName,
            action: 'ChangeMoneyData',
            isApi: true,
            method: HttpMethods.Post,
            data: { model: model },
            options: { isShowOverlay: true }
        });
    };
    MyTestService.prototype.ChangeDayCount = function (model) {
        return _super.prototype.doRequest.call(this, {
            controller: this.controllerName,
            action: 'ChangeDayCount',
            isApi: true,
            method: HttpMethods.Post,
            data: { model: model },
            options: { isShowOverlay: true }
        });
    };
    return MyTestService;
}(ControllerBase));
export { MyTestService };
//# sourceMappingURL=MyTestService.js.map