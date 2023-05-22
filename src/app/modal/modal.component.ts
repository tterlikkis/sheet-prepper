import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
    selector: "modal",
    templateUrl: "./modal.component.html",
})
export class ModalComponent {
    @Output() closeEvent = new EventEmitter();
    @Output() startEvent = new EventEmitter<number>();

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
}