import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, tap } from 'rxjs';
import { ApiRequestsService } from 'src/app/core/api.requests/apirequests.service';
import { accountId } from 'src/app/shared/interfaces/register.interface';
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
      this.loggedUserId = '1';
    });
    this.loginServ.language.subscribe((language) => {
      this.lang.next(language);
    });
  }

  ngOnInit(): void {
    this.inputMobile.valueChanges.subscribe((input) => {
      this.inputMobileNumber = String(input);
      this.checked = false;
      this.wrongAccountNumber = false;
    });
    this.getTransferrorAccount();
  }

  public checked = false;
  public wrongAccountNumber = false;
  public inputMobileNumber = '';
  public inputMobile = new FormControl('', Validators.required);

  // Transferor account
  private transferrorAccount: accountId = {
    account: '',
    amount: '',
    id: '',
  };
  private getTransferrorAccount() {
    this.http.getAccount(this.loggedUserId).pipe(
      tap((response: accountId) => {
        this.transferrorAccount = response;
      })
    );
  }

  // Methods

  public check() {
    this.checked = true;
  }
}
