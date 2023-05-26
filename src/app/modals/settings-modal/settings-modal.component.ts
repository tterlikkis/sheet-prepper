import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { SettingsData } from "../../shared/settingstype";

@Component({
    selector: "settings-modal",
    templateUrl: "./settings-modal.component.html",
})
export class SettingsModalComponent {
    @Output() closeEvent = new EventEmitter();
    @Output() saveEvent = new EventEmitter<SettingsData>();

    @Input() settings!: SettingsData;


    closeModal = () => {
        this.closeEvent.emit();
    }

    saveModal = () => {
        this.saveEvent.emit(this.settings);
    }
}