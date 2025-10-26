define(['tslib', '@docsvision/webclient/Generated/DocsVision.WebClient.Models', '@docsvision/webclient/System/$MessageBox', '@docsvision/webclient/Generated/DocsVision.WebClient.Controllers', '@docsvision/webclient/System/GuidUtils', '@docsvision/webclient/Helpers/MessageBox/MessageBox', '@docsvision/webclient/System/ExtensionManager'], (function (tslib, DocsVision_WebClient_Models, $MessageBox, DocsVision_WebClient_Controllers, GuidUtils, MessageBox, ExtensionManager) { 'use strict';

  var CommonLogic = /** @class */ (function () {
      function CommonLogic() {
      }
      CommonLogic.prototype.tryParseInt = function (value) {
          if (value === null || value === undefined || typeof value !== 'string') {
              return undefined;
          }
          var parsed = parseInt(value, 10);
          return isNaN(parsed) ? undefined : parsed;
      };
      CommonLogic.prototype.getEmployeeStatusString = function (status) {
          switch (status) {
              case DocsVision_WebClient_Models.GenModels.StaffEmployeeStatus.Active:
                  return "Активен";
              case DocsVision_WebClient_Models.GenModels.StaffEmployeeStatus.Sick:
                  return "Больничный";
              case DocsVision_WebClient_Models.GenModels.StaffEmployeeStatus.Vacation:
                  return "Отпуск";
              case DocsVision_WebClient_Models.GenModels.StaffEmployeeStatus.BusinessTrip:
                  return "Командировка";
              case DocsVision_WebClient_Models.GenModels.StaffEmployeeStatus.Absent:
                  return "Отсутствует";
              case DocsVision_WebClient_Models.GenModels.StaffEmployeeStatus.Discharged:
                  return "Уволен";
              case DocsVision_WebClient_Models.GenModels.StaffEmployeeStatus.Transfered:
                  return "Переведён";
              case DocsVision_WebClient_Models.GenModels.StaffEmployeeStatus.DischargedNoRestoration:
                  return "Уволен без восстановления";
              default:
                  return "Неизвестный статус";
          }
      };
      return CommonLogic;
  }());

  function checkDate(layout, args) {
      return tslib.__awaiter(this, void 0, void 0, function () {
          var dateFrom, dateTo;
          return tslib.__generator(this, function (_b) {
              switch (_b.label) {
                  case 0:
                      dateFrom = layout.controls.get("dateFrom");
                      dateTo = layout.controls.get("dateTo");
                      console.log(args.data);
                      if (!(dateFrom.params.value.getTime >= dateTo.params.value.getTime)) return [3 /*break*/, 4];
                      _b.label = 1;
                  case 1:
                      _b.trys.push([1, 3, , 4]);
                      return [4 /*yield*/, MessageBox.MessageBox.ShowConfirmation("Начальная дата не может быть меньше конечной")];
                  case 2:
                      _b.sent();
                      return [3 /*break*/, 4];
                  case 3:
                      _b.sent();
                      return [3 /*break*/, 4];
                  case 4: return [2 /*return*/];
              }
          });
      });
  }
  function showPreview(layout, args) {
      return tslib.__awaiter(this, void 0, void 0, function () {
          var cardName, dateCreation, dateFrom, dateTo, reason, rowCity, info;
          return tslib.__generator(this, function (_a) {
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
                      return [4 /*yield*/, MessageBox.MessageBox.ShowInfo(info)];
                  case 1:
                      _a.sent();
                      return [2 /*return*/];
              }
          });
      });
  }
  function onSave(layout, args) {
      return tslib.__awaiter(this, void 0, void 0, function () {
          var dayNumb;
          return tslib.__generator(this, function (_b) {
              switch (_b.label) {
                  case 0:
                      dayNumb = layout.controls.get("dayNum");
                      args.wait();
                      if (!(dayNumb.params.value <= 0)) return [3 /*break*/, 4];
                      _b.label = 1;
                  case 1:
                      _b.trys.push([1, 3, , 4]);
                      return [4 /*yield*/, MessageBox.MessageBox.ShowConfirmation("Количетсво дней не может быть пустым")];
                  case 2:
                      _b.sent();
                      args.cancel();
                      return [2 /*return*/];
                  case 3:
                      _b.sent();
                      return [3 /*break*/, 4];
                  case 4:
                      args.accept();
                      return [2 /*return*/];
              }
          });
      });
  }
  /** @class */ ((function (_super) {
      tslib.__extends(MyTestLogic, _super);
      function MyTestLogic() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      MyTestLogic.prototype.savingConfirmed = function (layout) {
          return tslib.__awaiter(this, void 0, void 0, function () {
              return tslib.__generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          _a.trys.push([0, 2, , 3]);
                          return [4 /*yield*/, layout.getService($MessageBox.$MessageBox).showConfirmation('Сохранить карточку?')];
                      case 1:
                          _a.sent();
                          return [2 /*return*/, true];
                      case 2:
                          _a.sent();
                          return [2 /*return*/, false];
                      case 3: return [2 /*return*/];
                  }
              });
          });
      };
      MyTestLogic.prototype.sendSavingMsg = function (layout) {
          return tslib.__awaiter(this, void 0, void 0, function () {
              return tslib.__generator(this, function (_a) {
                  switch (_a.label) {
                      case 0: return [4 /*yield*/, layout.getService($MessageBox.$MessageBox).showInfo('Карточка сохраняется!')];
                      case 1:
                          _a.sent();
                          return [2 /*return*/];
                  }
              });
          });
      };
      MyTestLogic.prototype.sendSavedMsg = function (layout) {
          return tslib.__awaiter(this, void 0, void 0, function () {
              return tslib.__generator(this, function (_a) {
                  switch (_a.label) {
                      case 0: return [4 /*yield*/, layout.getService($MessageBox.$MessageBox).showInfo('Карточка сохранена!')];
                      case 1:
                          _a.sent();
                          return [2 /*return*/];
                  }
              });
          });
      };
      MyTestLogic.prototype.updatePriceField = function (layout) {
          return tslib.__awaiter(this, void 0, void 0, function () {
              var typeCtrl;
              return tslib.__generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          typeCtrl = layout.controls.tryGet("directoryDesignerRowTechType");
                          if (!!typeCtrl) return [3 /*break*/, 2];
                          return [4 /*yield*/, layout.getService($MessageBox.$MessageBox).showError('Элемент управления directoryDesignerRowTechType отсутствует в разметке!')];
                      case 1:
                          _a.sent();
                          return [2 /*return*/];
                      case 2: return [4 /*yield*/, this.updatePriceFieldByTypeCtrl(typeCtrl)];
                      case 3:
                          _a.sent();
                          return [2 /*return*/];
                  }
              });
          });
      };
      MyTestLogic.prototype.updatePriceFieldByTypeCtrl = function (typeCtrl) {
          return tslib.__awaiter(this, void 0, void 0, function () {
              var layout, priceControl, messageBoxSvc, parsedValue;
              return tslib.__generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          layout = typeCtrl.layout;
                          priceControl = layout.controls.tryGet("numberPrice");
                          messageBoxSvc = layout.getService($MessageBox.$MessageBox);
                          if (!!priceControl) return [3 /*break*/, 2];
                          return [4 /*yield*/, messageBoxSvc.showError('Элемент управления numberPrice отсутствует в разметке!')];
                      case 1:
                          _a.sent();
                          return [2 /*return*/];
                      case 2:
                          if (!typeCtrl.params.value || GuidUtils.isEmptyGuid(typeCtrl.params.value.id)) {
                              priceControl.params.value = null;
                              return [2 /*return*/];
                          }
                          typeCtrl.params.value;
                          parsedValue = this.tryParseInt(typeCtrl.params.value.description);
                          if (!(parsedValue === undefined)) return [3 /*break*/, 4];
                          return [4 /*yield*/, messageBoxSvc
                                  .showError("\u0412 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0438 \u0441\u0442\u0440\u043E\u043A\u0438 \u0441\u043F\u0440\u0430\u0432\u043E\u0447\u043D\u0438\u043A\u0430 " + typeCtrl.params.value.name + " \u0441\u043E\u0434\u0435\u0440\u0436\u0438\u0442\u0441\u044F \u043D\u0435 \u0447\u0438\u0441\u043B\u043E! \u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435: " + typeCtrl.params.value.description)];
                      case 3:
                          _a.sent();
                          return [2 /*return*/];
                      case 4:
                          priceControl.params.value = parsedValue;
                          return [2 /*return*/];
                  }
              });
          });
      };
      MyTestLogic.prototype.showEmployeeData = function (layout, itemData) {
          var _a, _b;
          return tslib.__awaiter(this, void 0, void 0, function () {
              var messageBoxSvc, employeeModel, empUnitModel, lines;
              return tslib.__generator(this, function (_c) {
                  switch (_c.label) {
                      case 0:
                          if (!itemData) {
                              return [2 /*return*/];
                          }
                          messageBoxSvc = layout.getService($MessageBox.$MessageBox);
                          if (!(itemData.dataType !== DocsVision_WebClient_Models.GenModels.DirectoryDataType.Employee)) return [3 /*break*/, 2];
                          return [4 /*yield*/, messageBoxSvc.showError("Неверный тип объекта")];
                      case 1:
                          _c.sent();
                          console.log(itemData);
                          _c.label = 2;
                      case 2: return [4 /*yield*/, layout.getService(DocsVision_WebClient_Controllers.$EmployeeController).getEmployee(itemData.id)];
                      case 3:
                          employeeModel = _c.sent();
                          if (!employeeModel) return [3 /*break*/, 6];
                          return [4 /*yield*/, layout.getService(DocsVision_WebClient_Controllers.$DepartmentController).getStaffDepartment(employeeModel.unitId)];
                      case 4:
                          empUnitModel = _c.sent();
                          lines = [
                              "\u0424\u0418\u041E: " + employeeModel.lastName + " " + ((_a = employeeModel.firstName) !== null && _a !== void 0 ? _a : '') + " " + ((_b = employeeModel.middleName) !== null && _b !== void 0 ? _b : ''),
                              employeeModel.position ? "\u0414\u043E\u043B\u0436\u043D\u043E\u0441\u0442\u044C: " + employeeModel.position : null,
                              "\u0421\u0442\u0430\u0442\u0443\u0441: " + this.getEmployeeStatusString(employeeModel.status),
                              empUnitModel ? "\u041F\u043E\u0434\u0440\u0430\u0437\u0434\u0435\u043B\u0435\u043D\u0438\u0435: " + empUnitModel.name : null,
                          ].filter(Boolean).join('\n');
                          return [4 /*yield*/, messageBoxSvc.showInfo(lines, "Информация о выбранном сотруднике")];
                      case 5:
                          _c.sent();
                          _c.label = 6;
                      case 6: return [2 /*return*/];
                  }
              });
          });
      };
      return MyTestLogic;
  })(CommonLogic));

  function ddActivity_date_onChange(sender, args) {
      return tslib.__awaiter(this, void 0, void 0, function () {
          return tslib.__generator(this, function (_a) {
              switch (_a.label) {
                  case 0: return [4 /*yield*/, checkDate(sender.layout, args)];
                  case 1:
                      _a.sent();
                      return [2 /*return*/];
              }
          });
      });
  }
  function ddActivity_card_onSave(layout, args) {
      return tslib.__awaiter(this, void 0, void 0, function () {
          return tslib.__generator(this, function (_a) {
              switch (_a.label) {
                  case 0: return [4 /*yield*/, onSave(layout, args)];
                  case 1:
                      _a.sent();
                      return [2 /*return*/];
              }
          });
      });
  }
  function ddActivity_showPreview_onClick(sender, args) {
      return tslib.__awaiter(this, void 0, void 0, function () {
          var layout;
          return tslib.__generator(this, function (_a) {
              switch (_a.label) {
                  case 0:
                      layout = sender.layout;
                      return [4 /*yield*/, showPreview(layout)];
                  case 1:
                      _a.sent();
                      return [2 /*return*/];
              }
          });
      });
  }

  var MyTestEventHandler = /*#__PURE__*/Object.freeze({
    __proto__: null,
    ddActivity_date_onChange: ddActivity_date_onChange,
    ddActivity_card_onSave: ddActivity_card_onSave,
    ddActivity_showPreview_onClick: ddActivity_showPreview_onClick
  });

  // Главная входная точка всего расширения
  // Данный файл должен импортировать прямо или косвенно все остальные файлы, 
  // чтобы rollup смог собрать их все в один бандл.
  // Регистрация расширения позволяет корректно установить все
  // обработчики событий, сервисы и прочие сущности web-приложения.
  ExtensionManager.extensionManager.registerExtension({
      name: "Template web extension",
      version: "1.0",
      globalEventHandlers: [MyTestEventHandler]
  });

}));
//# sourceMappingURL=extension.js.map
