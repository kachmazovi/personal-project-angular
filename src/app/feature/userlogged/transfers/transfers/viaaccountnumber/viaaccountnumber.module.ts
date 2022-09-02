import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountnumberComponent } from './accountnumber/accountnumber.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AccountnumberComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: AccountnumberComponent,
      },
    ]),
  ],
})
export class ViaaccountnumberModule {}
