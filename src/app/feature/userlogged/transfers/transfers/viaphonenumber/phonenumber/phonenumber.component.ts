import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, catchError, of, tap } from 'rxjs';
import { ApiRequestsService } from 'src/app/core/api.requests/apirequests.service';
import { accountId } from 'src/app/shared/interfaces/account.interface';
import { registeredUser } from 'src/app/shared/interfaces/register.interface';
import { LoginService } from 'src/app/shared/services/login/login.service';

@Component({
  selector: 'app-phonenumber',
  templateUrl: './phonenumber.component.html',
  styleUrls: ['./phonenumber.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhonenumberComponent implements OnInit {
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

    this.inputMobile.valueChanges.subscribe((input) => {
      if (input?.length == 0) {
        this.wrongMobileNumber = false;
      } else this.wrongMobileNumber = true;
      this.checked = false;
      this.next = false;
      this.usersData.forEach((user) => {
        if (user.phoneNumber == input) {
          this.wrongMobileNumber = false;
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
  public wrongMobileNumber = false;
  public enoughAmount = false;
  public inputAmount = new FormControl('', Validators.required);
  public inputMobile = new FormControl('', Validators.required);

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

  // Methods

  public check() {
    this.usersData.some((user) => {
      if (user.phoneNumber == this.inputMobile.value) {
        this.receiverData.next(user);
        this.checked = true;
        this.http
          .getAccount(user.id)
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
    this.inputMobile.reset();
    this.inputAmount.reset();
    this.wrongMobileNumber = false;
    this.checked = false;
    this.next = false;
  }
}
