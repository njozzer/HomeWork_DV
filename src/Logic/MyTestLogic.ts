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
import { $MyTestService } from "../Services/interfaces/IMyTestService";
import { StaffDirectoryItems } from "@docsvision/webclient/BackOffice/StaffDirectoryItems";


export async function checkDate(layout:Layout,args: CancelableEventArgs<any>){
    let dateFrom: DateTimePicker = layout.controls.get<DateTimePicker>("dateFrom");
    let dateTo: DateTimePicker = layout.controls.get<DateTimePicker>("dateTo");

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
    let rowCity: DirectoryDesignerRow = layout.controls.get<DirectoryDesignerRow>("cityRef");
    
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


export class MyTestLogic{
    

    async getData(sender: StaffDirectoryItems) {
        var layout = sender.layout;

        const response = await layout.getService($MyTestService).GetMemberSentData({
            documentId: layout.cardInfo.id,
            id: sender.params.value["id"]
        });
        let chief: StaffDirectoryItems = layout.controls.get<StaffDirectoryItems>("chief");
        let phoneNumber: TextBox = layout.controls.get<TextBox>("phoneNumber");
        
        var content = JSON.parse(response.content);
        chief.params.value = response.content["memberChief"];
        phoneNumber.params.value = content["phoneNumber"];
        console.log(JSON.parse(response.content));
    }

    async getMoney(sender: DirectoryDesignerRow) {
        var layout = sender.layout;
        const response = await layout.getService($MyTestService).ChangeMoneyData({
            documentId: layout.cardInfo.id,
            id: sender.params.value["id"]
        });
        let money: TextBox = layout.controls.get<TextBox>("dayMoney");
        var content = JSON.parse(response.content);
        money.params.value = content["money"];
        console.log(JSON.parse(response.content));
    }
    async changeDayCount(sender: DateTimePicker) {
        var layout = sender.layout;
        let dateFrom: DateTimePicker = layout.controls.get<DateTimePicker>("dateFrom");
        let dateTo: DateTimePicker = layout.controls.get<DateTimePicker>("dateTo");
        let dayCount: TextBox = layout.controls.get<TextBox>("dayNum");
        let money: TextBox = layout.controls.get<TextBox>("dayMoney");
        const response = await layout.getService($MyTestService).ChangeDayCount({
            documentId: layout.cardInfo.id,
            dateFrom: dateFrom.params.value.toISOString(),
            dateTo: dateTo.params.value.toISOString()
        });
        var content = JSON.parse(response.content);
        dayCount.params.value = content["dayCount"];
        money.params.value = content["money"];
        console.log(JSON.parse(response.content));
       
    }
    async performAction(layout: Layout){
        const response = await layout.getService($MyTestService).GetName({
            documentId:layout.cardInfo.id
        });
        
    }
}