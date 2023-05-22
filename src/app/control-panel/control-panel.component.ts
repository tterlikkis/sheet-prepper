import { Component, EventEmitter, Input, Output } from "@angular/core";
import { DateData } from "../shared/datetype";

@Component({
    selector: "control-panel",
    templateUrl: "./control-panel.component.html"
})
export class ControlPanelComponent {

    @Input() start!: number;

    @Output() addDateEvent = new EventEmitter();
    @Output() submitEvent = new EventEmitter();
    @Output() modalEvent = new EventEmitter();
    @Output() startEvent = new EventEmitter<number>();

    addDate = () => {
        this.addDateEvent.emit();
    }

    submit = () => {
        this.submitEvent.emit();
    }

    showModal = () => {
        this.modalEvent.emit();
    }

    updateStart = () => {
        this.startEvent.emit(this.start);
    }
}