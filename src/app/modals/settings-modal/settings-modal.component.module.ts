import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SettingsModalComponent } from "./settings-modal.component";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [SettingsModalComponent],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [SettingsModalComponent]
})
export class SettingsModalModule {}