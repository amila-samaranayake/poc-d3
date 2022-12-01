import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    MatGridListModule,
    MatToolbarModule,
    MatCardModule,
    MatListModule,
    MatDividerModule,
  ],
})
export class MaterialModule {}
