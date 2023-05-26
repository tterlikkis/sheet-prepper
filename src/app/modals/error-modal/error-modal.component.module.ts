import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ErrorModalComponent } from "./error-modal.component";

@NgModule({
    declarations: [ErrorModalComponent],
    imports: [CommonModule],
    exports: [ErrorModalComponent]
})
export class ErrorModalModule {}