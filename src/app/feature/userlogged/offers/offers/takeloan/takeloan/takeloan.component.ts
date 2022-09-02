import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, tap } from 'rxjs';
import { ApiRequestsService } from 'src/app/core/api.requests/apirequests.service';
import { loa, loanId } from 'src/app/shared/interfaces/loan.interface';
import { accountId } from 'src/app/shared/interfaces/register.interface';
import { LoginService } from 'src/app/shared/services/login/login.service';

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
    this.getUserLoan();
    this.http
      .getAccount(this.loggedUserId)
      .pipe(
        tap((response: accountId) => {
          this.userAccount = response;
        })
      )
      .subscribe();
  }

  public confirm = new BehaviorSubject(false);
  private getDate = new Date();
  private today = `${this.getDate.getDate()}/${this.getDate.getMonth()}/${this.getDate.getFullYear()}`;
  public inputAmount = new FormControl('', Validators.required);
  private userLoan: loa[] = [];
  private userAccount: accountId = {
    account: '',
    amount: '',
    id: '',
  };

  private getUserLoan() {
    this.http
      .getLoan(this.loggedUserId)
      .pipe(
        tap((response: loanId) => {
          this.userLoan = response.loans;
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
    this.http.updateLoan(this.userLoan, this.loggedUserId).subscribe();
    this.http.updateAccount(this.userAccount).subscribe();
    this.inputAmount.reset();
    this.confirm.next(true);
    setTimeout(() => {
      this.confirm.next(false);
    }, 3000);
  }
}
