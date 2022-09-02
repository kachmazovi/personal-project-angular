import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalnumberComponent } from './personalnumber/personalnumber.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PersonalnumberComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: PersonalnumberComponent,
      },
    ]),
  ],
})
export class ViapersonalnumberModule {}
