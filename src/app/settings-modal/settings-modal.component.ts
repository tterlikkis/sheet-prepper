import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
    selector: "modal",
    templateUrl: "./settings-modal.component.html",
})
export class SettingsModalComponent {
    @Output() closeEvent = new EventEmitter();
    @Output() startEvent = new EventEmitter<number>();
    @Output() saveEvent = new EventEmitter<

    columns = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    rows = [0, 1, 2, 3, 4, 5, 6, 7];

    nums: Array<number> = new Array();
    space = " ";

    ngOnInit() {
        for (var i = 1; i <= 96; i++) {
            this.nums.push(i);
        }
    }

    sendStart = (start: number) => {
        this.startEvent.emit(start);
        this.closeEvent.emit();
    }

    closeModal = () => {
        this.closeEvent.emit();
    }

    saveModal = () => {
        this.saveEvent.emit();
    }
}