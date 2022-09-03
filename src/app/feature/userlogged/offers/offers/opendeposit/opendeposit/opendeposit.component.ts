import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, catchError, of, tap } from 'rxjs';
import { ApiRequestsService } from 'src/app/core/api.requests/apirequests.service';
import { dep, depositId } from 'src/app/shared/interfaces/deposit.interface';
import { accountId } from 'src/app/shared/interfaces/register.interface';
import { LoginService } from 'src/app/shared/services/login/login.service';

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
    this.http
      .getAccount(this.loggedUserId)
      .pipe(
        tap((response: accountId) => {
          this.userAccount = response;
        })
      )
      .subscribe();
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
  public inputAmount = new FormControl('', Validators.required);

  public term() {
    if (this.terms) {
      this.terms = false;
    } else this.terms = true;
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
    this.http
      .updateDeposit(this.userDeposit, this.loggedUserId)
      .pipe(
        catchError((err) => {
          console.log(err.message);
          return of('error');
        })
      )
      .subscribe();
    this.http
      .updateAccount(this.userAccount)
      .pipe(
        catchError((err) => {
          console.log(err.message);
          return of('error');
        })
      )
      .subscribe();
    this.inputAmount.reset();
    this.confirm.next(true);
    setTimeout(() => {
      this.confirm.next(false);
    }, 3000);
  }
}
