import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainpageComponent } from './mainpage/mainpage.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { AnimationComponent } from './mainpage/animation/animation.component';
import { AccountComponent } from './mainpage/account/account.component';
import { ExchangeComponent } from './mainpage/exchange/exchange.component';
import { LoanComponent } from './mainpage/loan/loan.component';
import { DepositComponent } from './mainpage/deposit/deposit.component';
import { TransactionsComponent } from './mainpage/transactions/transactions.component';

@NgModule({
  declarations: [MainpageComponent, AnimationComponent, AccountComponent, ExchangeComponent, LoanComponent, DepositComponent, TransactionsComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: MainpageComponent,
      },
    ]),
  ],
})
export class MainpageModule {}
