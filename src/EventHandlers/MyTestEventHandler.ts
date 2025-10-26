import { IEventArgs } from "@docsvision/webclient/System/IEventArgs";
import { Layout } from "@docsvision/webclient/System/Layout";
import { Employee } from "@docsvision/webclient/BackOffice/Employee";
import { MessageBox } from "@docsvision/webclient/Helpers/MessageBox/MessageBox"; 
import { CancelableEventArgs } from "@docsvision/webclient/System/CancelableEventArgs";
import { ICardSavingEventArgs } from "@docsvision/webclient/System/ICardSavingEventArgs";
import { DateTimePicker } from "@docsvision/webclient/Platform/DateTimePicker";
import { NumberControl } from "@docsvision/webclient/Platform/Number";
import { TextBox } from "@docsvision/webclient/Platform/TextBox";
import { TextArea } from "@docsvision/webclient/Platform/TextArea";
import { CustomButton } from "@docsvision/webclient/Platform/CustomButton";
import { checkDate, onSave, showPreview } from "../Logic/MyTestLogic";


export async function ddActivity_date_onChange(sender: DateTimePicker,args: CancelableEventArgs<any>) {
    await checkDate(sender.layout,args);
        
}

export async function ddActivity_card_onSave(layout: Layout,args: CancelableEventArgs<ICardSavingEventArgs>) {
    await onSave(layout,args);
    
}
export async function ddActivity_showPreview_onClick(sender: CustomButton,args: CancelableEventArgs<any>) {
    let layout = sender.layout;
    await showPreview(layout,args);
    
}

