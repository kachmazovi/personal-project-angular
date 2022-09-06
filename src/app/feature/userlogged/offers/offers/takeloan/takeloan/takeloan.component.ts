import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, catchError, of, tap } from 'rxjs';
import { ApiRequestsService } from 'src/app/core/api.requests/apirequests.service';
import { loa, loanId } from 'src/app/shared/interfaces/loan.interface';
import { accountId } from 'src/app/shared/interfaces/account.interface';
import { LoginService } from 'src/app/shared/services/login/login.service';
import {
  transactionsId,
  transfers,
} from 'src/app/shared/interfaces/transactions.interface';

@Component({
  selector: 'app-takeloan',
  templateUrl: './takeloan.component.html',
  styleUrls: ['./takeloan.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TakeloanComponent implements OnInit {
  public loggedUserId = '';
  public lang = new BehaviorSubject('geo');

  constructor(
    private loginServ: LoginService,
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
    this.getUserTransactions();
    this.getUserLoan();
    this.getAccount();
  }

  public terms = true;
  public confirm = new BehaviorSubject(false);
  private getDate = new Date();
  private today = `${this.getDate.getDate()}/${this.getDate.getMonth()}/${this.getDate.getFullYear()}`;
  public inputAmount = new FormControl('', [
    Validators.required,
    Validators.min(1),
  ]);
  private userLoan: loa[] = [];
  private userAccount: accountId = {
    account: '',
    amount: '',
    id: '',
  };

  public term() {
    if (this.terms) {
      this.terms = false;
    } else this.terms = true;
  }

  private userTransactions: transfers[] = [];
  private getUserTransactions() {
    this.http
      .getTransaction(this.loggedUserId)
      .pipe(
        tap((response: transactionsId) => {
          this.userTransactions = response.transactions;
        }),
        catchError((err) => {
          console.log(err.message);
          return of('error');
        })
      )
      .subscribe();
  }

  private getAccount() {
    this.http
      .getAccount(this.loggedUserId)
      .pipe(
        tap((response: accountId) => {
          this.userAccount = response;
        }),
        catchError((err) => {
          console.log(err.message);
          return of('error');
        })
      )
      .subscribe();
  }

  private getUserLoan() {
    this.http
      .getLoan(this.loggedUserId)
      .pipe(
        tap((response: loanId) => {
          this.userLoan = response.loans;
        }),
        catchError((err) => {
          console.log(err.message);
          return of('error');
        })
      )
      .subscribe();
  }
  public openLoan() {
    this.userLoan.push({
      date: this.today,
      amount: Number(this.inputAmount.value),
    });
    this.userAccount.amount = String(
      Number(this.userAccount.amount) + Number(this.inputAmount.value)
    );
    this.userTransactions.push({
      date: this.today,
      receiver: this.userAccount.account,
      transferror: 'Take Loan',
      amount: Number(this.inputAmount.value),
    });
    this.updateLoan();
    this.updateAccount();
    this.updateTransactions();
    this.inputAmount.reset();
    this.confirm.next(true);
    setTimeout(() => {
      this.confirm.next(false);
      this.terms = true;
    }, 2000);
  }

  private updateLoan() {
    this.http
      .updateLoan(this.userLoan, this.loggedUserId)
      .pipe(
        catchError((err) => {
          console.log(err.message);
          return of('error');
        })
      )
      .subscribe();
  }
  private updateAccount() {
    this.http
      .updateAccount(this.userAccount)
      .pipe(
        catchError((err) => {
          console.log(err.message);
          return of('error');
        })
      )
      .subscribe();
  }
  private updateTransactions() {
    this.http
      .updateTransactions(this.userTransactions, this.loggedUserId)
      .pipe(
        catchError((err) => {
          console.log(err.message);
          return of('error');
        })
      )
      .subscribe();
  }
}
