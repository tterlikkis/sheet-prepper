import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { DateColumnModule } from "./date-column/date-column.module";
import { ControlPanelModule } from "./control-panel/control-panel.module";
import { FormsModule } from "@angular/forms";
import { ModalModule } from "./modals/modal/modal.component.module";
import { ErrorModalModule } from "./modals/error-modal/error-modal.component.module";
import { SettingsModalModule } from "./modals/settings-modal/settings-modal.component.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
      BrowserModule,
      ControlPanelModule,
      DateColumnModule,
      FormsModule,
      ModalModule,
      ErrorModalModule,
      SettingsModalModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
