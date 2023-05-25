import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SettingsModalComponent } from "./settings-modal.component";

@NgModule({
    declarations: [SettingsModalComponent],
    imports: [CommonModule],
    exports: [SettingsModalComponent]
})
export class SettingsModalModule {}