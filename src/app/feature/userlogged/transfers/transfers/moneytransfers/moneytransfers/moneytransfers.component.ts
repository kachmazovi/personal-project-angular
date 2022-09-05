import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, of, tap } from 'rxjs';
import { ApiRequestsService } from 'src/app/core/api.requests/apirequests.service';
import {
  getMoneytransfers,
  addMoneytransfers,
} from 'src/app/shared/interfaces/moneytransfers.interface';
import { LoginService } from 'src/app/shared/services/login/login.service';

@Component({
  selector: 'app-moneytransfers',
  templateUrl: './moneytransfers.component.html',
  styleUrls: ['./moneytransfers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoneytransfersComponent implements OnInit {
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

  ngOnInit(): void {}

  // Left Section

  public sentTransfer = true;

  public sendHeader() {
    this.sentTransfer = true;
  }
  public receiveHeader() {
    this.sentTransfer = false;
  }

  // Right Section

  public western = false;
  public clickWestern() {
    this.ria = false;
    this.moneygram = false;
    this.western = true;
  }
  public ria = false;
  public clickRia() {
    this.western = false;
    this.moneygram = false;
    this.ria = true;
  }
  public moneygram = false;
  public clickGram() {
    this.western = false;
    this.ria = false;
    this.moneygram = true;
  }

  ///////////////////////////////////

  public click() {
    this.http.addRia(this.transfers).subscribe();
  }

  private transfers: addMoneytransfers[] = [
    {
      code: 'dsfsdfsd',
      amount: 122,
    },
    {
      code: 'dsfsdfsd',
      amount: 122,
    },
    {
      code: 'dsfsdfsd',
      amount: 122,
    },
    {
      code: 'dsfsdfsd',
      amount: 122,
    },
    {
      code: 'dsfsdfsd',
      amount: 122,
    },
  ];
}

// private moneyTransfers: addMoneytransfers[] = [];
//   private transfers: addMoneytransfers[] = [
//     {
//       code: 'dsfsdfsd',
//       amount: 122,
//     },
//     {
//       code: 'dsfsdfsd',
//       amount: 122,
//     },
//     {
//       code: 'dsfsdfsd',
//       amount: 122,
//     },
//     {
//       code: 'dsfsdfsd',
//       amount: 122,
//     },
//     {
//       code: 'dsfsdfsd',
//       amount: 122,
//     },
//   ];
//   private getTransfers() {
//     this.http
//       .getMoneyTransfer()
//       .pipe(
//         tap((response: getMoneytransfers) => {
//           this.moneyTransfers = response.transfers;
//         }),
//         catchError((err) => {
//           console.log(err.message);
//           return of('error');
//         })
//       )
//       .subscribe();
//   }

//   public click() {
//     this.http.addMoneyTransfer(this.transfers).subscribe();
//   }
