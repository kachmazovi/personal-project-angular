import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OffersComponent } from './offers/offers.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [OffersComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: OffersComponent,
        children: [
          {
            path: 'opendeposit',
            loadChildren: () =>
              import('./offers/opendeposit/opendeposit.module').then(
                (m) => m.OpendepositModule
              ),
          },
          {
            path: 'takeloan',
            loadChildren: () =>
              import('./offers/takeloan/takeloan.module').then(
                (m) => m.TakeloanModule
              ),
          },
        ],
      },
    ]),
  ],
})
export class OffersModule {}
