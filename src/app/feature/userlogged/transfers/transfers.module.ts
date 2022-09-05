import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransfersComponent } from './transfers/transfers.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [TransfersComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: TransfersComponent,
        children: [
          {
            path: 'accountnumber',
            loadChildren: () =>
              import(
                './transfers/viaaccountnumber/viaaccountnumber.module'
              ).then((m) => m.ViaaccountnumberModule),
          },
          {
            path: 'personalnumber',
            loadChildren: () =>
              import(
                './transfers/viapersonalnumber/viapersonalnumber.module'
              ).then((m) => m.ViapersonalnumberModule),
          },
          {
            path: 'phonenumber',
            loadChildren: () =>
              import('./transfers/viaphonenumber/viaphonenumber.module').then(
                (m) => m.ViaphonenumberModule
              ),
          },
          {
            path: 'moneytransfer',
            loadChildren: () =>
              import('./transfers/moneytransfers/moneytransfers.module').then(
                (m) => m.MoneytransfersModule
              ),
          },
        ],
      },
    ]),
  ],
})
export class TransfersModule {}
