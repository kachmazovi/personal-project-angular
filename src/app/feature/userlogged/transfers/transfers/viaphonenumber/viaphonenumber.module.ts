import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhonenumberComponent } from './phonenumber/phonenumber.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PhonenumberComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: PhonenumberComponent,
      },
    ]),
  ],
})
export class ViaphonenumberModule {}
