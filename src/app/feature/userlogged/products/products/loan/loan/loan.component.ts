import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
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
    account: '',
    amount: '',
    id: '',
  };
  public inputAmount = new FormControl('', Validators.required);
  public notEnoughAmount = false;
  public wrongAmount = false;

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
    this.inputAmount.valueChanges.subscribe((v) => {
      this.notEnoughAmount = false;
      this.wrongAmount = false;
    });
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
    this.wrongAmount = false;
    this.notEnoughAmount = false;
  }
  public confirm(index: number) {
    const inputAmount = Number(this.inputAmount.value);
    if (inputAmount > this.loanArr[index].amount) {
      this.wrongAmount = true;
    } else if (
      inputAmount <= this.loanArr[index].amount &&
      inputAmount > Number(this.userAccount.amount)
    ) {
      this.notEnoughAmount = true;
    } else if (
      inputAmount <= this.loanArr[index].amount &&
      inputAmount < Number(this.userAccount.amount)
    ) {
      if (inputAmount < this.loanArr[index].amount) {
        this.loanArr[index].amount -= inputAmount;
        this.userAccount.amount = String(
          Number(this.userAccount.amount) - inputAmount - inputAmount / 5
        );
        this.userLoans.next(this.loanArr);
        this.http.updateLoan(this.loanArr, this.loggedUserId).subscribe();
        this.http.updateAccount(this.userAccount).subscribe();
      } else if (inputAmount == this.loanArr[index].amount) {
        this.loanArr.splice(index, 1);
        this.userAccount.amount = String(
          Number(this.userAccount.amount) - inputAmount - inputAmount / 5
        );
        this.userLoans.next(this.loanArr);
        this.http.updateLoan(this.loanArr, this.loggedUserId).subscribe();
        this.http.updateAccount(this.userAccount).subscribe();
      }
      this.closeLoan = false;
      this.inputAmount.reset();
    }
  }
}
