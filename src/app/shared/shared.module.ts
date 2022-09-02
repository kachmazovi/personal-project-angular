import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    NgxPaginationModule,
    ReactiveFormsModule,
  ],
  exports: [ReactiveFormsModule, HttpClientModule, NgxPaginationModule],
})
export class SharedModule {}
