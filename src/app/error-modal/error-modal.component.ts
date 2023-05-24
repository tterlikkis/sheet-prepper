import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: "error-modal",
    templateUrl: "./error-modal.component.html",
})
export class ErrorModalComponent {
    @Output() closeEvent = new EventEmitter();
    @Output() startEvent = new EventEmitter<number>();

    @Input() message = "Unkown Error";

    closeModal = () => {
        this.closeEvent.emit();
    }
}