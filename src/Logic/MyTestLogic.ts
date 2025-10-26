import { ILayout } from "@docsvision/webclient/System/$Layout";
import { CommonLogic } from "./CommonLogic";
import { $MessageBox } from "@docsvision/webclient/System/$MessageBox";
import { DirectoryDesignerRow } from "@docsvision/webclient/BackOffice/DirectoryDesignerRow";
import { NumberControl } from "@docsvision/webclient/Platform/Number";
import { GenModels } from "@docsvision/webclient/Generated/DocsVision.WebClient.Models";
import { $DepartmentController, $EmployeeController } from "@docsvision/webclient/Generated/DocsVision.WebClient.Controllers";
import { isEmptyGuid } from "@docsvision/webclient/System/GuidUtils";
import { Layout } from "@docsvision/webclient/System/Layout";
import { CancelableEventArgs } from "@docsvision/webclient/System/CancelableEventArgs";
import { DateTimePicker } from "@docsvision/webclient/Platform/DateTimePicker";
import { TextBox } from "@docsvision/webclient/Platform/TextBox";
import { TextArea } from "@docsvision/webclient/Platform/TextArea";
import { CustomButton } from "@docsvision/webclient/Platform/CustomButton";
import { MessageBox } from "@docsvision/webclient/Helpers/MessageBox/MessageBox"; 


export async function checkDate(layout:Layout,args: CancelableEventArgs<any>){
    let dateFrom: DateTimePicker = layout.controls.get<DateTimePicker>("dateFrom");
    let dateTo: DateTimePicker = layout.controls.get<DateTimePicker>("dateTo");
    console.log(args.data);
    if (dateFrom.params.value.getTime >= dateTo.params.value.getTime) {
        try{
            await MessageBox.ShowConfirmation("Начальная дата не может быть меньше конечной");
            
        }
        catch{
            
        }
    }
}
export async function showPreview(layout:Layout,args: CancelableEventArgs<any>){
    let cardName:TextBox = layout.controls.get<TextBox>("previewName");
    let dateCreation: DateTimePicker = layout.controls.get<DateTimePicker>("previewDate");
    let dateFrom: DateTimePicker = layout.controls.get<DateTimePicker>("dateFrom");
    let dateTo: DateTimePicker = layout.controls.get<DateTimePicker>("dateTo");
    let reason:TextArea = layout.controls.get<TextArea>("reason");
    let rowCity:DirectoryDesignerRow = layout.controls.get<DirectoryDesignerRow>("cityRef");
    
    let info: String = 'Имя карточки - '+ cardName.params.value + "\nДата создания - " + dateCreation.params.value +'\n';
    info += 'Дата отправки - '+ dateFrom.params.value + "\nДата прибытия - " + dateTo.params.value + '\n'; 
    info += 'Причина отправки - '+ reason.params.value + "\n"; 
    info += 'Город - '+ rowCity.params.value.name + "\n"; 
    await MessageBox.ShowInfo(info);
}

export async function onSave(layout:Layout,args: CancelableEventArgs<any>) {
    let dayNumb: NumberControl = layout.controls.get<NumberControl>("dayNum");
    args.wait();
    if (dayNumb.params.value <= 0){
        try{
            await MessageBox.ShowConfirmation("Количетсво дней не может быть пустым"); 
            args.cancel();
            return;
        }
        catch{

        }
    }
    args.accept();
}

export class MyTestLogic extends CommonLogic {
    public async savingConfirmed(layout:ILayout): Promise<boolean> {
        try {
            await layout.getService($MessageBox).showConfirmation('Сохранить карточку?');
            return true;
        } catch(e) {
            return false;
        }
    }

    public async sendSavingMsg(layout:ILayout) {
        await layout.getService($MessageBox).showInfo('Карточка сохраняется!');
    }
    
    public async sendSavedMsg(layout:ILayout) {
        await layout.getService($MessageBox).showInfo('Карточка сохранена!');
    }
    
    public async updatePriceField(layout:ILayout) {
        const typeCtrl = layout.controls.tryGet<DirectoryDesignerRow>("directoryDesignerRowTechType");
        if (!typeCtrl) {
             await layout.getService($MessageBox).showError('Элемент управления directoryDesignerRowTechType отсутствует в разметке!');
             return;
        }

        await this.updatePriceFieldByTypeCtrl(typeCtrl);
    }
    
    public async updatePriceFieldByTypeCtrl(typeCtrl:DirectoryDesignerRow) {
        const layout = typeCtrl.layout;
        const priceControl = layout.controls.tryGet<NumberControl>("numberPrice");

        const messageBoxSvc = layout.getService($MessageBox);

        if (!priceControl) {
            await messageBoxSvc.showError('Элемент управления numberPrice отсутствует в разметке!');
            return;
        }

        if (!typeCtrl.params.value || isEmptyGuid(typeCtrl.params.value.id)) {
            priceControl.params.value = null;
            return;
        }
        
        typeCtrl.params.value

        var parsedValue = this.tryParseInt(typeCtrl.params.value.description);
        if (parsedValue === undefined) {
            await messageBoxSvc
                .showError(`В описании строки справочника ${typeCtrl.params.value.name} содержится не число! Значение: ${typeCtrl.params.value.description}`);
            return;
        }

        priceControl.params.value = parsedValue;
        return;
    }

    public async showEmployeeData(layout: ILayout, itemData:GenModels.IDirectoryItemData) {
        if (!itemData) { return; }
        const messageBoxSvc = layout.getService($MessageBox);
        if (itemData.dataType !== GenModels.DirectoryDataType.Employee) {
            await messageBoxSvc.showError("Неверный тип объекта");
            console.log(itemData);
        }

        const employeeModel = await layout.getService($EmployeeController).getEmployee(itemData.id);
        if (employeeModel) {
            const empUnitModel = await layout.getService($DepartmentController).getStaffDepartment(employeeModel.unitId);
            const lines = [
                `ФИО: ${employeeModel.lastName} ${employeeModel.firstName ?? ''} ${employeeModel.middleName ?? ''}`,
                employeeModel.position ? `Должность: ${employeeModel.position}` : null,
                `Статус: ${this.getEmployeeStatusString(employeeModel.status)}`,
                empUnitModel ? `Подразделение: ${empUnitModel.name}` : null,
            ].filter(Boolean).join('\n');

            await messageBoxSvc.showInfo(lines, "Информация о выбранном сотруднике");
        }
    }
}