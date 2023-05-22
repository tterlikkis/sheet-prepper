import { Component, EventEmitter, Input, Output } from "@angular/core";
import { DateData } from "../shared/datetype";

@Component({
    selector: "date-column",
    templateUrl: "./date-column.component.html"
})
export class DateColumnComponent {
    @Input() datedata!: DateData;
    @Input() index!: number;

    @Output() updateDateEvent = new EventEmitter<{index: number, data: DateData}>();
    @Output() removeDateEvent = new EventEmitter<number>();

    removeDate = () => {
        this.removeDateEvent.emit(this.index);
    }

    updateDate = () => {
        this.updateDateEvent.emit({index: this.index, data: this.datedata});
    }

    handleDateChange = (event: any) => {
        this.datedata.setDate(event.target.value);
        this.updateDate();
    }

    handleDogsChange = (event: any) => {
        this.datedata.setDogs(event.target.value);
        this.updateDate();
    }

    handleHorsesChange = (event: any) => {
        this.datedata.setHorses(event.target.value);
        this.updateDate();
    }

    handleBirdsChange = (event: any) => {
        this.datedata.setBirds(event.target.value);
        this.updateDate();
    }

    handleDoublesChange = (event: any) => {
        this.datedata.setDoubles(event.target.value);
        this.updateDate();
    }

    handleMissingChange = (event: any) => {
        this.datedata.setMissing(event.target.value);
        this.updateDate();
    }
}
