import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, catchError, of, tap } from 'rxjs';
import { ApiRequestsService } from 'src/app/core/api.requests/apirequests.service';
import { accountId } from 'src/app/shared/interfaces/account.interface';
import { registeredUser } from 'src/app/shared/interfaces/register.interface';
import {
  transactionsId,
  transfers,
} from 'src/app/shared/interfaces/transactions.interface';
import { LoginService } from 'src/app/shared/services/login/login.service';

@Component({
  selector: 'app-personalnumber',
  templateUrl: './personalnumber.component.html',
  styleUrls: ['./personalnumber.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalnumberComponent implements OnInit {
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

    this.getUsersData();

    this.getTransferrorTransactions();

    this.inputPersonal.valueChanges.subscribe((input) => {
      this.wrongPersonalNumber = true;
      this.checked = false;
      this.next = false;
      this.usersData.forEach((user) => {
        if (user.personalNumber == input) {
          this.wrongPersonalNumber = false;
          this.receiverId = user.id;
          this.receiverData.next(user);
          this.checked = true;
          this.getReceiverAccount();
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
  public wrongPersonalNumber = false;
  public enoughAmount = false;
  public inputAmount = new FormControl('', [
    Validators.required,
    Validators.min(1),
  ]);
  public inputPersonal = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]{11}$'),
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

  // Users Data

  private usersData: registeredUser[] = [];
  private getUsersData() {
    this.http
      .getUsers()
      .pipe(
        tap((response: registeredUser[]) => {
          this.usersData = response;
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

  private getReceiverAccount() {
    this.http
      .getAccount(this.receiverId)
      .pipe(
        tap((response: accountId) => {
          this.receiverAccount = response;
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
    this.inputPersonal.reset();
    this.inputAmount.reset();
    this.wrongPersonalNumber = false;
    this.checked = false;
    this.next = false;
  }
}
