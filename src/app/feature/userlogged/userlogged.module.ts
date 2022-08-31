import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserloggedComponent } from './userlogged.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [UserloggedComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: UserloggedComponent,
        children: [
          {
            path: 'mainpage',
            loadChildren: () =>
              import('./mainpage/mainpage.module').then(
                (m) => m.MainpageModule
              ),
          },
          {
            path: 'products',
            loadChildren: () =>
              import('./products/products.module').then(
                (m) => m.ProductsModule
              ),
          },
          {
            path: 'transfers',
            loadChildren: () =>
              import('./transfers/transfers.module').then(
                (m) => m.TransfersModule
              ),
          },
          {
            path: 'offers',
            loadChildren: () =>
              import('./offers/offers.module').then((m) => m.OffersModule),
          },
          {
            path: 'parameters',
            loadChildren: () =>
              import('./parameters/parameters.module').then(
                (m) => m.ParametersModule
              ),
          },
        ],
      },
    ]),
  ],
})
export class UserloggedModule {}
