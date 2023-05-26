import { Component, EventEmitter, Input, Output } from "@angular/core";
import { DateData } from "../shared/datetype";

@Component({
    selector: "control-panel",
    templateUrl: "./control-panel.component.html",
    providers: []
})
export class ControlPanelComponent {

    @Input() start!: number;

    @Output() addDateEvent = new EventEmitter();
    @Output() submitEvent = new EventEmitter();
    @Output() modalEvent = new EventEmitter();
    @Output() settingsModalEvent = new EventEmitter();
    @Output() startEvent = new EventEmitter<number>();
    @Output() openEvent = new EventEmitter();

    addDate = () => {
        this.addDateEvent.emit();
    }

    submit = () => {
        this.submitEvent.emit();
    }

    showModal = () => {
        this.modalEvent.emit();
    }

    showSettingsModal = () => {
        this.settingsModalEvent.emit();
    }

    updateStart = () => {
        this.startEvent.emit(this.start);
    }

    open = () => {
        this.openEvent.emit(this.start);
    }
    
}