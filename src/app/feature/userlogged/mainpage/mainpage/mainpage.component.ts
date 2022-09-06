import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, catchError, of, tap } from 'rxjs';
import { ApiRequestsService } from 'src/app/core/api.requests/apirequests.service';
import { depositId } from 'src/app/shared/interfaces/deposit.interface';
import { loanId } from 'src/app/shared/interfaces/loan.interface';
import { accountId } from 'src/app/shared/interfaces/account.interface';
import { LoginService } from 'src/app/shared/services/login/login.service';
import { ExchangeService } from './exchange/services/exchange.service';
import {
  transactionsId,
  transfers,
} from 'src/app/shared/interfaces/transactions.interface';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainpageComponent implements OnInit {
  public loggedUserId = '';
  public lang = new BehaviorSubject('geo');

  constructor(
    private loginServ: LoginService,
    private exchangeServ: ExchangeService,
    private http: ApiRequestsService
  ) {
    this.loginServ.loggedUserId.subscribe((id) => {
      this.loggedUserId = id;
    });
    this.loginServ.language.subscribe((language) => {
      this.lang.next(language);
    });
  }

  ngOnInit(): void {
    this.getUserAccount();
    this.getLoans();
    this.getDeposits();
    this.getUserTransactions();
  }

  //Acount

  private getUserAccount() {
    this.http
      .getAccount(this.loggedUserId)
      .pipe(
        tap((response: accountId) => {
          this.userAccount.next(response);
        }),
        catchError((err) => {
          console.log(err.message);
          return of('error');
        })
      )
      .subscribe();
  }

  public userAccount: BehaviorSubject<accountId> = new BehaviorSubject({
    account: '',
    amount: '',
    id: '',
  });

  public showAmount = false;
  public showHideAmount() {
    if (this.showAmount) {
      this.showAmount = false;
    } else this.showAmount = true;
  }

  // Transactions

  public showTrans = true;
  public haveTransfers = new BehaviorSubject(false);
  public showTransactions() {
    if (this.showTrans) {
      this.showTrans = false;
    } else this.showTrans = true;
  }
  public userTransactions: BehaviorSubject<transfers[]> = new BehaviorSubject([
    {
      date: '',
      receiver: '',
      transferror: '',
      amount: 0,
    },
  ]);
  private getUserTransactions() {
    this.http
      .getTransaction(this.loggedUserId)
      .pipe(
        tap((response: transactionsId) => {
          this.userTransactions.next(response.transactions);
          if (response.transactions.length > 0) {
            this.haveTransfers.next(true);
          }
        }),
        catchError((err) => {
          console.log(err.message);
          return of('error');
        })
      )
      .subscribe();
  }

  //Loan

  public getLoans() {
    this.http
      .getLoan(this.loggedUserId)
      .pipe(
        tap((response: loanId) => {
          let sum = 0;
          response.loans.forEach((loan) => {
            sum += loan.amount;
          });
          this.sumLoan.next(sum);
        }),
        catchError((err) => {
          console.log(err.message);
          return of('error');
        })
      )
      .subscribe();
  }

  public showLoan = false;
  public sumLoan = new BehaviorSubject(0);
  public showLoanButton() {
    if (this.showLoan) {
      this.showLoan = false;
    } else this.showLoan = true;
  }

  //Deposit

  private getDeposits() {
    this.http
      .getDeposit(this.loggedUserId)
      .pipe(
        tap((response: depositId) => {
          let sum = 0;
          response.deposits.forEach((deposit) => {
            sum += deposit.amount;
          });
          this.sumDeposit.next(sum);
        }),
        catchError((err) => {
          console.log(err.message);
          return of('error');
        })
      )
      .subscribe();
  }

  public showDeposit = false;
  public sumDeposit = new BehaviorSubject(0);
  public showDepositButton() {
    if (this.showDeposit) {
      this.showDeposit = false;
    } else this.showDeposit = true;
  }

  //Exchange

  public currencies: string[] = [
    'AED',
    'AFN',
    'ALL',
    'AMD',
    'ANG',
    'AOA',
    'ARS',
    'AUD',
    'AWG',
    'AZN',
    'BAM',
    'BBD',
    'BDT',
    'BGN',
    'BHD',
    'BIF',
    'BMD',
    'BND',
    'BOB',
    'BRL',
    'BSD',
    'BTN',
    'BWP',
    'BYN',
    'BZD',
    'CAD',
    'CDF',
    'CHF',
    'CLP',
    'CNY',
    'COP',
    'CRC',
    'CUP',
    'CVE',
    'CZK',
    'DJF',
    'DKK',
    'DOP',
    'DZD',
    'EGP',
    'ERN',
    'ETB',
    'EUR',
    'FJD',
    'FKP',
    'FOK',
    'GBP',
    'GEL',
    'GGP',
    'GHS',
    'GIP',
    'GMD',
    'GNF',
    'GTQ',
    'GYD',
    'HKD',
    'HNL',
    'HRK',
    'HTG',
    'HUF',
    'IDR',
    'ILS',
    'IMP',
    'INR',
    'IQD',
    'IRR',
    'ISK',
    'JEP',
    'JMD',
    'JOD',
    'JPY',
    'KES',
    'KGS',
    'KHR',
    'KID',
    'KMF',
    'KRW',
    'KWD',
    'KYD',
    'KZT',
    'LAK',
    'LBP',
    'LKR',
    'LRD',
    'LSL',
    'LYD',
    'MAD',
    'MDL',
    'MGA',
    'MKD',
    'MMK',
    'MNT',
    'MOP',
    'MRU',
    'MUR',
    'MVR',
    'MWK',
    'MXN',
    'MYR',
    'MZN',
    'NAD',
    'NGN',
    'NIO',
    'NOK',
    'NPR',
    'NZD',
    'OMR',
    'PAB',
    'PEN',
    'PGK',
    'PHP',
    'PKR',
    'PLN',
    'PYG',
    'QAR',
    'RON',
    'RSD',
    'RUB',
    'RWF',
    'SAR',
    'SBD',
    'SCR',
    'SDG',
    'SEK',
    'SGD',
    'SHP',
    'SLE',
    'SOS',
    'SRD',
    'SSP',
    'STN',
    'SYP',
    'SZL',
    'THB',
    'TJS',
    'TMT',
    'TND',
    'TOP',
    'TRY',
    'TTD',
    'TVD',
    'TWD',
    'TZS',
    'UAH',
    'UGX',
    'USD',
    'UYU',
    'UZS',
    'VES',
    'VND',
    'VUV',
    'WST',
    'XAF',
    'XCD',
    'XDR',
    'XOF',
    'XPF',
    'YER',
    'ZAR',
    'ZMW',
    'ZWL',
  ];
  public amountOutputLeft = new BehaviorSubject('1');
  public amountOutputRight = new BehaviorSubject('1');
  public leftInputNum = new FormControl(this.amountOutputLeft.value);
  public rightInputNum = new FormControl(this.amountOutputRight.value);
  public leftNum = 1;
  public exchangeRate: number = 1;

  public onSelectedLeft(value: string) {
    this.exchangeServ.leftCurrency = value;
    this.exchangeServ
      .getter()
      .pipe(
        tap((respone) => {
          this.exchangeRate = respone['conversion_rate'];
          this.amountOutputRight.next(
            String(Math.round(this.leftNum * this.exchangeRate * 100) / 100)
          );
        }),
        catchError((err) => {
          console.log(err.message);
          return of('error');
        })
      )
      .subscribe();
  }

  public onSelectedRight(value: string) {
    this.exchangeServ.rightCurrency = value;
    this.exchangeServ
      .getter()
      .pipe(
        tap((respone) => {
          this.exchangeRate = respone['conversion_rate'];
          this.amountOutputRight.next(
            String(Math.round(this.leftNum * this.exchangeRate * 100) / 100)
          );
        }),
        catchError((err) => {
          console.log(err.message);
          return of('error');
        })
      )
      .subscribe();
  }
}
