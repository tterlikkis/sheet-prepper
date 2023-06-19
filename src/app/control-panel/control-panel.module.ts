import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlPanelComponent } from './control-panel.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ControlPanelComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [ControlPanelComponent]
})
export class ControlPanelModule { }
