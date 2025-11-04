var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { MessageBox } from "@docsvision/webclient/Helpers/MessageBox/MessageBox";
import { $MyTestService } from "../Services/interfaces/IMyTestService";
export function checkDate(layout, args) {
    return __awaiter(this, void 0, void 0, function () {
        var dateFrom, dateTo, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    dateFrom = layout.controls.get("dateFrom");
                    dateTo = layout.controls.get("dateTo");
                    if (!(dateFrom.params.value.getTime >= dateTo.params.value.getTime)) return [3 /*break*/, 4];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, MessageBox.ShowConfirmation("Начальная дата не может быть меньше конечной")];
                case 2:
                    _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    _a = _b.sent();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
export function showPreview(layout, args) {
    return __awaiter(this, void 0, void 0, function () {
        var cardName, dateCreation, dateFrom, dateTo, reason, rowCity, info;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cardName = layout.controls.get("previewName");
                    dateCreation = layout.controls.get("previewDate");
                    dateFrom = layout.controls.get("dateFrom");
                    dateTo = layout.controls.get("dateTo");
                    reason = layout.controls.get("reason");
                    rowCity = layout.controls.get("cityRef");
                    info = 'Имя карточки - ' + cardName.params.value + "\nДата создания - " + dateCreation.params.value + '\n';
                    info += 'Дата отправки - ' + dateFrom.params.value + "\nДата прибытия - " + dateTo.params.value + '\n';
                    info += 'Причина отправки - ' + reason.params.value + "\n";
                    info += 'Город - ' + rowCity.params.value.name + "\n";
                    return [4 /*yield*/, MessageBox.ShowInfo(info)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
export function onSave(layout, args) {
    return __awaiter(this, void 0, void 0, function () {
        var dayNumb, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    dayNumb = layout.controls.get("dayNum");
                    args.wait();
                    if (!(dayNumb.params.value <= 0)) return [3 /*break*/, 4];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, MessageBox.ShowConfirmation("Количетсво дней не может быть пустым")];
                case 2:
                    _b.sent();
                    args.cancel();
                    return [2 /*return*/];
                case 3:
                    _a = _b.sent();
                    return [3 /*break*/, 4];
                case 4:
                    args.accept();
                    return [2 /*return*/];
            }
        });
    });
}
var MyTestLogic = /** @class */ (function () {
    function MyTestLogic() {
    }
    MyTestLogic.prototype.getData = function (sender) {
        return __awaiter(this, void 0, void 0, function () {
            var layout, response, chief, phoneNumber, content;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        layout = sender.layout;
                        return [4 /*yield*/, layout.getService($MyTestService).GetMemberSentData({
                                documentId: layout.cardInfo.id,
                                id: sender.params.value["id"]
                            })];
                    case 1:
                        response = _a.sent();
                        chief = layout.controls.get("chief");
                        phoneNumber = layout.controls.get("phoneNumber");
                        content = JSON.parse(response.content);
                        chief.params.value = response.content["memberChief"];
                        phoneNumber.params.value = content["phoneNumber"];
                        console.log(JSON.parse(response.content));
                        return [2 /*return*/];
                }
            });
        });
    };
    MyTestLogic.prototype.getMoney = function (sender) {
        return __awaiter(this, void 0, void 0, function () {
            var layout, response, money, content;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        layout = sender.layout;
                        return [4 /*yield*/, layout.getService($MyTestService).ChangeMoneyData({
                                documentId: layout.cardInfo.id,
                                id: sender.params.value["id"]
                            })];
                    case 1:
                        response = _a.sent();
                        money = layout.controls.get("dayMoney");
                        content = JSON.parse(response.content);
                        money.params.value = content["money"];
                        console.log(JSON.parse(response.content));
                        return [2 /*return*/];
                }
            });
        });
    };
    MyTestLogic.prototype.changeDayCount = function (sender) {
        return __awaiter(this, void 0, void 0, function () {
            var layout, dateFrom, dateTo, dayCount, money, response, content;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        layout = sender.layout;
                        dateFrom = layout.controls.get("dateFrom");
                        dateTo = layout.controls.get("dateTo");
                        dayCount = layout.controls.get("dayNum");
                        money = layout.controls.get("dayMoney");
                        return [4 /*yield*/, layout.getService($MyTestService).ChangeDayCount({
                                documentId: layout.cardInfo.id,
                                dateFrom: dateFrom.params.value.toISOString(),
                                dateTo: dateTo.params.value.toISOString()
                            })];
                    case 1:
                        response = _a.sent();
                        content = JSON.parse(response.content);
                        dayCount.params.value = content["dayCount"];
                        money.params.value = content["money"];
                        console.log(JSON.parse(response.content));
                        return [2 /*return*/];
                }
            });
        });
    };
    MyTestLogic.prototype.performAction = function (layout) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, layout.getService($MyTestService).GetName({
                            documentId: layout.cardInfo.id
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return MyTestLogic;
}());
export { MyTestLogic };
//# sourceMappingURL=MyTestLogic.js.map