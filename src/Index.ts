

import { Service } from "@docsvision/web/core/services";
import * as MyTestEventHandler from "./EventHandlers/MyTestEventHandler";
import { extensionManager } from "@docsvision/webclient/System/ExtensionManager";
import { $RequestManager } from "@docsvision/webclient/System/$RequestManager";
import { MyTestService } from "./Services/MyTestService";
import {$MyTestService} from "./Services/interfaces/IMyTestService"
// Главная входная точка всего расширения
// Данный файл должен импортировать прямо или косвенно все остальные файлы, 
// чтобы rollup смог собрать их все в один бандл.

// Регистрация расширения позволяет корректно установить все
// обработчики событий, сервисы и прочие сущности web-приложения.
extensionManager.registerExtension({
    name: "TemplateWebExtension",
    version: "1.0",
    globalEventHandlers: [ MyTestEventHandler  ],
    layoutServices:[
        Service.fromFactory($MyTestService, (services: $RequestManager) => new MyTestService(services)),
    ],
    controls:[]
})