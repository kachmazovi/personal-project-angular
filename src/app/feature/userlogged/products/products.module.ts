import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProductsComponent,
        children: [
          {
            path: 'account',
            loadChildren: () =>
              import('./products/account/account.module').then(
                (m) => m.AccountModule
              ),
          },
          {
            path: 'deposit',
            loadChildren: () =>
              import('./products/deposit/deposit.module').then(
                (m) => m.DepositModule
              ),
          },
          {
            path: 'loan',
            loadChildren: () =>
              import('./products/loan/loan.module').then((m) => m.LoanModule),
          },
        ],
      },
    ]),
  ],
})
export class ProductsModule {}
