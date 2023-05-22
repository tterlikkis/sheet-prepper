import { Component, EventEmitter, Input, Output } from "@angular/core";
import { DateStrings } from "src/shared/datestrings";
import { DateDataClass } from "../../shared/datedataclass";
import { DataService } from "../services/data.service";

@Component({
    selector: "date-column",
    templateUrl: "./date-column.component.html",
    providers: [DataService]
})
export class DateColumnComponent {
    @Input() key!: number;

    constructor(public dataservice: DataService) {}

    handleDateChange = (event: any) => {
        console.log("date changed");

        this.dataservice.changeDate(this.key, "date", event.target.value);
    }

    handleDogsChange = (event: any) => {
        this.dataservice.changeDate(this.key, "dogs", event.target.value);
    }

    handleHorsesChange = (event: any) => {
        this.dataservice.changeDate(this.key, "horses", event.target.value);
    }

    handleBirdsChange = (event: any) => {
        this.dataservice.changeDate(this.key, "birds", event.target.value);
    }

    handleDoublesChange = (event: any) => {
        this.dataservice.changeDate(this.key, "doubles", event.target.value);
    }

    handleMissingChange = (event: any) => {
        this.dataservice.changeDate(this.key, "missing", event.target.value);
    }

    handleRemove = () => {
        this.dataservice.removeDate(this.key);
    }
}
