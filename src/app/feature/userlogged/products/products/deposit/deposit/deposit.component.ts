import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { ApiRequestsService } from 'src/app/core/api.requests/apirequests.service';
import { dep, deposits } from 'src/app/shared/interfaces/deposit.interface';
import { accountId } from 'src/app/shared/interfaces/register.interface';
import { LoginService } from 'src/app/shared/services/login/login.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepositComponent implements OnInit {
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
  public userDeposits: BehaviorSubject<dep[]> = new BehaviorSubject<dep[]>([]);
  public closeDeposit = false;
  public depositArr: dep[] = [];
  private userAccount: accountId = {
    name: '',
    surname: '',
    account: '',
    amount: '',
    id: '',
  };

  ngOnInit(): void {
    this.getDeposits();
    this.http
      .getAccount(this.loggedUserId)
      .pipe(
        tap((response) => {
          this.userAccount = response;
        })
      )
      .subscribe();
  }

  private getDeposits() {
    this.http
      .getDeposit(this.loggedUserId)
      .pipe(
        tap((response: deposits) => {
          this.userDeposits.next(response.deposits);
          this.depositArr = response.deposits;
        })
      )
      .subscribe();
  }
  public close() {
    this.closeDeposit = true;
  }
  public cancel() {
    this.closeDeposit = false;
  }
  public confirm(value: number) {
    this.closeDeposit = false;
    const depAmount = this.depositArr.splice(value, 1);
    this.userAccount.amount = String(
      Number(this.userAccount.amount) + depAmount[0].amount
    );
    this.userDeposits.next(this.depositArr);
    this.http.updateDeposit(this.depositArr, this.loggedUserId).subscribe();
    this.http.updateAccount(this.userAccount).subscribe();
  }
}
