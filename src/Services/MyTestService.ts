import { $RequestManager } from "@docsvision/webclient/System/$RequestManager";
import { IMyTestService } from "./interfaces/IMyTestService";
import { ControllerBase, HttpMethods } from "@docsvision/webclient/System/ControllerBase";
import {IMyTestRequestModel} from "../Models/IMyTestRequestModel";
import {IMyTestModel} from "../Models/IMyTestModel";
import { serviceName } from "@docsvision/web/core/services";
import { IMyTestMemberRequestModel } from "../Models/IMyTestMemberRequestModel";
import { IMyTestDateRequsetModel } from "../Models/IMyTestDateRequestModel";

export class MyTestService extends ControllerBase implements IMyTestService{
    protected controllerName:string = "MyTest";

    constructor(protected services: $RequestManager) {
        super(services);
    }
    GetName(model: IMyTestRequestModel): Promise<IMyTestModel>{
        return super.doRequest({
            controller: this.controllerName,
            action: 'GetName',
            isApi: true,
            method:HttpMethods.Post,
            data:{model},
            options:{isShowOverlay:true}
        });
    }

    GetMemberSentData(model: IMyTestMemberRequestModel): Promise<IMyTestModel> {
        return super.doRequest({
            controller: this.controllerName,
            action: 'GetMemberSentData',
            isApi: true,
            method: HttpMethods.Post,
            data: { model },
            options: { isShowOverlay: true }
        });
    }

    ChangeMoneyData(model: IMyTestMemberRequestModel): Promise<IMyTestModel> {
        return super.doRequest({
            controller: this.controllerName,
            action: 'ChangeMoneyData',
            isApi: true,
            method: HttpMethods.Post,
            data: { model },
            options: { isShowOverlay: true }
        });
    }
    ChangeDayCount(model: IMyTestDateRequsetModel): Promise<IMyTestModel> {
        return super.doRequest({
            controller: this.controllerName,
            action: 'ChangeDayCount',
            isApi: true,
            method: HttpMethods.Post,
            data: { model },
            options: { isShowOverlay: true }
        });
    }
}

