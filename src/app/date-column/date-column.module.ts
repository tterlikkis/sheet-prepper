import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateColumnComponent } from './date-column.component';

@NgModule({
  declarations: [
    DateColumnComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [DateColumnComponent]
})
export class DateColumnModule { }
