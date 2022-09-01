import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { ApiRequestsService } from 'src/app/core/api.requests/apirequests.service';
import { loa, loans } from 'src/app/shared/interfaces/loan.interface';
import { accountId } from 'src/app/shared/interfaces/register.interface';
import { LoginService } from 'src/app/shared/services/login/login.service';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoanComponent implements OnInit {
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

  public loggedUserId = '';
  public lang = new BehaviorSubject('geo');
  public userLoans: BehaviorSubject<loa[]> = new BehaviorSubject<loa[]>([]);
  public closeLoan = false;
  public loanArr: loa[] = [];
  private userAccount: accountId = {
    name: '',
    surname: '',
    account: '',
    amount: '',
    id: '',
  };

  ngOnInit(): void {
    this.getLoan();
    this.http
      .getAccount(this.loggedUserId)
      .pipe(
        tap((response) => {
          this.userAccount = response;
        })
      )
      .subscribe();
  }

  private getLoan() {
    this.http
      .getLoan(this.loggedUserId)
      .pipe(
        tap((response: loans) => {
          this.userLoans.next(response.loans);
          this.loanArr = response.loans;
        })
      )
      .subscribe();
  }
  public close() {
    this.closeLoan = true;
  }
  public cancel() {
    this.closeLoan = false;
  }
  public confirm(value: number) {
    this.closeLoan = false;
    const depAmount = this.loanArr.splice(value, 1);
    this.userAccount.amount = String(
      Number(this.userAccount.amount) - depAmount[0].amount
    );
    this.userLoans.next(this.loanArr);
    this.http.updateLoan(this.loanArr, this.loggedUserId).subscribe();
    this.http.updateAccount(this.userAccount).subscribe();
  }
}
