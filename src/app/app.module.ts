import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { DateColumnModule } from "./date-column/date-column.module";
import { ControlPanelModule } from "./control-panel/control-panel.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
      BrowserModule,
      DateColumnModule,
      ControlPanelModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
