import { Component, Input } from "@angular/core";
import { DateData } from "../datetype";

@Component({
    selector: "date-column",
    templateUrl: "./date-column.component.html"
})
export class DateColumnComponent {
    @Input() datedata!: DateData;

    handleDateChange = (event: any) => {
        this.datedata.setDate(event.target.value);
    }

    handleDogsChange = (event: any) => {
        this.datedata.setDogs(event.target.value);
    }

    handleHorsesChange = (event: any) => {
        this.datedata.setHorses(event.target.value);
    }

    handleBirdsChange = (event: any) => {
        this.datedata.setBirds(event.target.value);
    }

    handleDoublesChange = (event: any) => {
        this.datedata.setDoubles(event.target.value);
    }

    handleMissingChange = (event: any) => {
        this.datedata.setMissing(event.target.value);
    }
}
