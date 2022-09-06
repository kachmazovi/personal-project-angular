import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, catchError, of, tap } from 'rxjs';
import { ApiRequestsService } from 'src/app/core/api.requests/apirequests.service';
import { dep, depositId } from 'src/app/shared/interfaces/deposit.interface';
import { accountId } from 'src/app/shared/interfaces/account.interface';
import { LoginService } from 'src/app/shared/services/login/login.service';
import {
  transactionsId,
  transfers,
} from 'src/app/shared/interfaces/transactions.interface';

@Component({
  selector: 'app-opendeposit',
  templateUrl: './opendeposit.component.html',
  styleUrls: ['./opendeposit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpendepositComponent implements OnInit {
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
    this.getUserDeposit();
    this.getUserAccount();
    this.getUserTransactions();
    this.inputAmount.valueChanges.subscribe((amount) => {
      this.wrongAmount = false;
      if (Number(amount) > Number(this.userAccount.amount)) {
        this.wrongAmount = true;
      }
    });
  }

  public terms = true;
  public wrongAmount = false;
  public confirm = new BehaviorSubject(false);
  private getDate = new Date();
  private today = `${this.getDate.getDate()}/${this.getDate.getMonth()}/${this.getDate.getFullYear()}`;
  private userAccount: accountId = {
    account: '',
    amount: '',
    id: '',
  };
  private userDeposit: dep[] = [];
  public inputAmount = new FormControl('', [
    Validators.required,
    Validators.min(1),
  ]);

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

  private getUserAccount() {
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
  private getUserDeposit() {
    this.http
      .getDeposit(this.loggedUserId)
      .pipe(
        tap((response: depositId) => {
          this.userDeposit = response.deposits;
        }),
        catchError((err) => {
          console.log(err.message);
          return of('error');
        })
      )
      .subscribe();
  }

  public openDep() {
    this.userDeposit.push({
      date: this.today,
      amount: Number(this.inputAmount.value),
    });
    this.userAccount.amount = String(
      Number(this.userAccount.amount) - Number(this.inputAmount.value)
    );
    this.userTransactions.push({
      date: this.today,
      receiver: 'Open Deposit',
      transferror: this.userAccount.account,
      amount: Number(this.inputAmount.value),
    });
    this.updateDeposit();
    this.updateAccount();
    this.updateTransactions();
    this.inputAmount.reset();
    this.confirm.next(true);
    setTimeout(() => {
      this.confirm.next(false);
      this.terms = true;
    }, 2000);
  }

  private updateDeposit() {
    this.http
      .updateDeposit(this.userDeposit, this.loggedUserId)
      .pipe()
      .subscribe();
  }

  private updateAccount() {
    this.http.updateAccount(this.userAccount).pipe().subscribe();
  }

  private updateTransactions() {
    this.http
      .updateTransactions(this.userTransactions, this.loggedUserId)
      .subscribe();
  }
}
