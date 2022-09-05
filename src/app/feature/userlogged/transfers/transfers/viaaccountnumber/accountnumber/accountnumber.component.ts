import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, catchError, of, tap } from 'rxjs';
import { ApiRequestsService } from 'src/app/core/api.requests/apirequests.service';
import { registeredUser } from 'src/app/shared/interfaces/register.interface';
import { accountId } from 'src/app/shared/interfaces/account.interface';
import { LoginService } from 'src/app/shared/services/login/login.service';
import {
  transactionsId,
  transfers,
} from 'src/app/shared/interfaces/transactions.interface';

@Component({
  selector: 'app-accountnumber',
  templateUrl: './accountnumber.component.html',
  styleUrls: ['./accountnumber.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountnumberComponent implements OnInit {
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
    this.getTransferrorAccount();

    this.getUsersAccounts();

    this.getTransferrorTransactions();

    this.inputAccount.valueChanges.subscribe((input) => {
      if (input?.length == 0) {
        this.wrongAccountNumber = false;
      } else this.wrongAccountNumber = true;
      this.checked = false;
      this.next = false;
      this.usersAccounts.forEach((user) => {
        if (user.account == input) {
          this.wrongAccountNumber = false;
          this.receiverId = user.id;
          this.receiverAccount = user;
          this.checked = true;
          this.getReceiverData();
          this.getReceiverTransactions();
        }
      });
    });

    this.inputAmount.valueChanges.subscribe((amount) => {
      this.enoughAmount = false;
      if (Number(amount) > Number(this.transferrorAccount.amount)) {
        this.enoughAmount = true;
      }
    });
  }

  public checked = false;
  public next = false;
  public wrongAccountNumber = false;
  public enoughAmount = false;
  public inputAmount = new FormControl('', [
    Validators.required,
    Validators.min(1),
  ]);
  public inputAccount = new FormControl('', [
    Validators.required,
    Validators.minLength(22),
  ]);
  private getDate = new Date();
  private today = `${this.getDate.getDate()}/${this.getDate.getMonth()}/${this.getDate.getFullYear()}`;
  private receiverId = '';

  // Transferror account

  private transferrorAccount: accountId = {
    account: '',
    amount: '',
    id: '',
  };
  private getTransferrorAccount() {
    this.http
      .getAccount(this.loggedUserId)
      .pipe(
        tap((response: accountId) => {
          this.transferrorAccount = response;
        }),
        catchError((err) => {
          console.log(err.message);
          return of('error');
        })
      )
      .subscribe();
  }

  // Transferror transactions

  private transferrorTransactions: transfers[] = [];
  private getTransferrorTransactions() {
    this.http
      .getTransaction(this.loggedUserId)
      .pipe(
        tap((response: transactionsId) => {
          this.transferrorTransactions = response.transactions;
        }),
        catchError((err) => {
          console.log(err.message);
          return of('error');
        })
      )
      .subscribe();
  }

  // Users Accounts

  private usersAccounts: accountId[] = [];
  private getUsersAccounts() {
    this.http
      .getUsersAccount()
      .pipe(
        tap((response: accountId[]) => {
          this.usersAccounts = response;
        }),
        catchError((err) => {
          console.log(err.message);
          return of('error');
        })
      )
      .subscribe();
  }

  // Receiver Account

  private receiverAccount: accountId = {
    account: '',
    amount: '',
    id: '',
  };

  public receiverData: BehaviorSubject<registeredUser> = new BehaviorSubject({
    name: '',
    surname: '',
    personalNumber: '',
    phoneNumber: '',
    username: '',
    password: '',
    id: '',
  });

  private getReceiverData() {
    this.http
      .getUserID(this.receiverId)
      .pipe(
        tap((response: registeredUser) => {
          this.receiverData.next(response);
        }),
        catchError((err) => {
          console.log(err.message);
          return of('error');
        })
      )
      .subscribe();
  }

  // Receiver transactions

  private receiverTransactions: transfers[] = [];
  private getReceiverTransactions() {
    this.http
      .getTransaction(this.receiverId)
      .pipe(
        tap((response: transactionsId) => {
          this.receiverTransactions = response.transactions;
        }),
        catchError((err) => {
          console.log(err.message);
          return of('error');
        })
      )
      .subscribe();
  }

  // Methods

  public nextClick() {
    this.next = true;
  }

  public transfer() {
    this.transferrorAccount.amount = String(
      Number(this.transferrorAccount.amount) - Number(this.inputAmount.value)
    );
    this.receiverAccount.amount = String(
      Number(this.receiverAccount.amount) + Number(this.inputAmount.value)
    );
    this.transferrorTransactions.push({
      date: this.today,
      receiver: this.receiverAccount.account,
      transferror: this.transferrorAccount.account,
      amount: Number(this.inputAmount.value),
    });
    this.receiverTransactions.push({
      date: this.today,
      receiver: this.receiverAccount.account,
      transferror: this.transferrorAccount.account,
      amount: Number(this.inputAmount.value),
    });
    this.http
      .updateTransactions(this.transferrorTransactions, this.loggedUserId)
      .subscribe();
    this.http
      .updateTransactions(this.receiverTransactions, this.receiverId)
      .subscribe();
    this.http.updateAccount(this.receiverAccount).subscribe();
    this.http.updateAccount(this.transferrorAccount).subscribe();
    this.inputAccount.reset();
    this.inputAmount.reset();
    this.wrongAccountNumber = false;
    this.checked = false;
    this.next = false;
  }
}
