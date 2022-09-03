import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, catchError, of, tap } from 'rxjs';
import { ApiRequestsService } from 'src/app/core/api.requests/apirequests.service';
import { registeredUser } from 'src/app/shared/interfaces/register.interface';
import { accountId } from 'src/app/shared/interfaces/account.interface';
import { LoginService } from 'src/app/shared/services/login/login.service';

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

    this.inputAccount.valueChanges.subscribe((input) => {
      if (input?.length == 0) {
        this.wrongAccountNumber = false;
      } else this.wrongAccountNumber = true;
      this.checked = false;
      this.next = false;
      this.usersAccounts.forEach((user) => {
        if (user.account == input) {
          this.wrongAccountNumber = false;
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
  public inputAmount = new FormControl('', Validators.required);
  public inputAccount = new FormControl('', Validators.required);

  // Transferor account
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

  // Methods

  public check() {
    this.usersAccounts.some((user) => {
      if (user.account == this.inputAccount.value) {
        this.receiverAccount = user;
        this.checked = true;
        this.http
          .getUserID(user.id)
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
    });
  }

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
    this.http.updateAccount(this.receiverAccount).subscribe();
    this.http.updateAccount(this.transferrorAccount).subscribe();
    this.inputAccount.reset();
    this.inputAmount.reset();
    this.wrongAccountNumber = false;
    this.checked = false;
    this.next = false;
  }
}
