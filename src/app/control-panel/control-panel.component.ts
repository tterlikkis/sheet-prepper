import { Component } from "@angular/core";
import { DataService } from "../services/data.service";

@Component({
    selector: "control-panel",
    templateUrl: "./control-panel.component.html",
    providers: [DataService]
})
export class ControlPanelComponent {
    constructor(public dataservice: DataService) {}
}