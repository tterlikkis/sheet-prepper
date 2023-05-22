import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { DateColumnModule } from "./date-column/date-column.module";
import { ControlPanelModule } from "./control-panel/control-panel.module";
import { FormsModule } from "@angular/forms";
import { ModalModule } from "./modal/modal.component.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
      BrowserModule,
      ControlPanelModule,
      DateColumnModule,
      FormsModule,
      ModalModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
