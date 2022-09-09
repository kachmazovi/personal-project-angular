import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, catchError, of, tap } from 'rxjs';
import { ApiRequestsService } from 'src/app/core/api.requests/apirequests.service';
import { accountId } from 'src/app/shared/interfaces/account.interface';
import {
  getMoneytransfers,
  addMoneytransfers,
} from 'src/app/shared/interfaces/moneytransfers.interface';
import {
  transactionsId,
  transfers,
} from 'src/app/shared/interfaces/transactions.interface';
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

  ngOnInit(): void {
    this.getUserAccount();
    this.getUserTransactions();
    this.getWu();
    this.getRia();
    this.getGram();
    this.inputAmount.valueChanges.subscribe((v) => {
      if (Number(v) + Number(v) / 100 > Number(this.userAccount.amount)) {
        this.notAnoughAmount = true;
      } else this.notAnoughAmount = false;
    });
    this.inputTransferCode.valueChanges.subscribe((v) => {
      this.wrongTransferCode = false;
    });
  }

  private getDate = new Date();
  private today = `${this.getDate.getDate()}/${this.getDate.getMonth()}/${this.getDate.getFullYear()}`;

  // Left Section

  public sentTransfer = true;

  public sendHeader() {
    this.sentTransfer = true;
    this.western = false;
    this.ria = false;
    this.moneygram = false;
    this.inputAmount.reset();
    this.inputTransferCode.reset();
    this.transferSent = false;
  }
  public receiveHeader() {
    this.sentTransfer = false;
    this.western = false;
    this.ria = false;
    this.moneygram = false;
    this.inputAmount.reset();
    this.inputTransferCode.reset();
    this.transferSent = false;
  }

  // Right Section

  public western = false;
  public clickWestern() {
    this.ria = false;
    this.moneygram = false;
    this.western = true;
    this.transferSent = false;
    this.inputTransferCode.reset();
    this.inputAmount.reset();
  }
  public ria = false;
  public clickRia() {
    this.western = false;
    this.moneygram = false;
    this.ria = true;
    this.transferSent = false;
    this.inputTransferCode.reset();
    this.inputAmount.reset();
  }
  public moneygram = false;
  public clickGram() {
    this.western = false;
    this.ria = false;
    this.moneygram = true;
    this.transferSent = false;
    this.inputTransferCode.reset();
    this.inputAmount.reset();
  }

  public inputAmount = new FormControl('', Validators.required);
  public inputTransferCode = new FormControl('', Validators.required);

  // User Account

  private userAccount: accountId = {
    account: '',
    amount: '',
    id: '',
  };

  private getUserAccount() {
    this.http
      .getAccount(this.loggedUserId)
      .pipe(
        tap((response: accountId) => {
          this.userAccount = response;
        }),
        catchError((err) => {
          console.log(err.message);
          return of('error');
        })
      )
      .subscribe();
  }

  // User transactions

  private userTransactions: transfers[] = [];
  private getUserTransactions() {
    this.http
      .getTransaction(this.loggedUserId)
      .pipe(
        tap((response: transactionsId) => {
          this.userTransactions = response.transactions;
        }),
        catchError((err) => {
          console.log(err.message);
          return of('error');
        })
      )
      .subscribe();
  }

  // Money Transfers

  private transferCode = '';

  private wuTransfers: addMoneytransfers[] = [];
  private getWu() {
    this.http
      .getWestern()
      .pipe(
        tap((response: getMoneytransfers) => {
          this.wuTransfers = response.transfers;
        }),
        catchError((err) => {
          console.log(err.message);
          return of('error');
        })
      )
      .subscribe();
  }

  private riaTransfers: addMoneytransfers[] = [];
  private getRia() {
    this.http
      .getRia()
      .pipe(
        tap((response: getMoneytransfers) => {
          this.riaTransfers = response.transfers;
        }),
        catchError((err) => {
          console.log(err.message);
          return of('error');
        })
      )
      .subscribe();
  }

  private gramTransfers: addMoneytransfers[] = [];
  private getGram() {
    this.http
      .getGram()
      .pipe(
        tap((response: getMoneytransfers) => {
          this.gramTransfers = response.transfers;
        }),
        catchError((err) => {
          console.log(err.message);
          return of('error');
        })
      )
      .subscribe();
  }

  // Buttons

  public transferSent = false;
  public transferReceived = false;
  public notAnoughAmount = false;
  public wrongTransferCode = false;

  public send() {
    for (let i = 0; i < 11; i++) {
      this.transferCode += Math.floor(Math.random() * 10);
    }
    if (this.western) {
      this.wuTransfers.push({
        code: this.transferCode,
        amount: Number(this.inputAmount.value),
      });
      this.addWu();
      this.userTransactions.push({
        date: this.today,
        receiver: `Western - ${this.transferCode}`,
        transferror: this.userAccount.account,
        amount:
          Number(this.inputAmount.value) + Number(this.inputAmount.value) / 100,
      });
    } else if (this.ria) {
      this.riaTransfers.push({
        code: this.transferCode,
        amount: Number(this.inputAmount.value),
      });
      this.addRia();
      this.userTransactions.push({
        date: this.today,
        receiver: `Ria - ${this.transferCode}`,
        transferror: this.userAccount.account,
        amount:
          Number(this.inputAmount.value) + Number(this.inputAmount.value) / 100,
      });
    } else if (this.moneygram) {
      this.gramTransfers.push({
        code: this.transferCode,
        amount: Number(this.inputAmount.value),
      });
      this.addGram();
      this.userTransactions.push({
        date: this.today,
        receiver: `Moneygram - ${this.transferCode}`,
        transferror: this.userAccount.account,
        amount:
          Number(this.inputAmount.value) + Number(this.inputAmount.value) / 100,
      });
    }

    this.userAccount.amount = String(
      Number(this.userAccount.amount) -
        Number(this.inputAmount.value) -
        Number(this.inputAmount.value) / 100
    );
    this.updateAccount();

    this.updateTransactions();

    this.western = false;
    this.ria = false;
    this.moneygram = false;
    this.inputAmount.reset();
    this.transferSent = true;
    this.transferCode = '';
  }

  public receive() {
    const checker = (transfer: addMoneytransfers) => {
      transfer.code == String(this.inputTransferCode.value);
    };
    if (this.western) {
      if (!this.wuTransfers.some(checker)) {
        this.wrongTransferCode = true;
      }
      this.wuTransfers.forEach((transfer, index) => {
        if (transfer.code == String(this.inputTransferCode.value)) {
          const received = this.wuTransfers.splice(index, 1);
          this.addWu();
          this.userAccount.amount = String(
            Number(this.userAccount.amount) + Number(received[0].amount)
          );
          this.updateAccount();
          this.userTransactions.push({
            date: this.today,
            receiver: this.userAccount.account,
            transferror: 'Western',
            amount: received[0].amount,
          });
          this.updateTransactions();
          this.western = false;
          this.inputTransferCode.reset();
          this.transferReceived = true;
        }
      });
    } else if (this.ria) {
      if (!this.riaTransfers.some(checker)) {
        this.wrongTransferCode = true;
      }
      this.riaTransfers.forEach((transfer, index) => {
        if (transfer.code == String(this.inputTransferCode.value)) {
          const received = this.riaTransfers.splice(index, 1);
          this.addRia();
          this.userAccount.amount = String(
            Number(this.userAccount.amount) + Number(received[0].amount)
          );
          this.updateAccount();
          this.userTransactions.push({
            date: this.today,
            receiver: this.userAccount.account,
            transferror: 'Ria',
            amount: received[0].amount,
          });
          this.updateTransactions();
          this.ria = false;
          this.inputTransferCode.reset();
          this.transferReceived = true;
        }
      });
    } else if (this.moneygram) {
      if (!this.riaTransfers.some(checker)) {
        this.wrongTransferCode = true;
      }
      this.gramTransfers.forEach((transfer, index) => {
        if (transfer.code == String(this.inputTransferCode.value)) {
          const received = this.gramTransfers.splice(index, 1);
          this.addGram();
          this.userAccount.amount = String(
            Number(this.userAccount.amount) + Number(received[0].amount)
          );
          this.updateAccount();
          this.userTransactions.push({
            date: this.today,
            receiver: this.userAccount.account,
            transferror: 'Moneygram',
            amount: received[0].amount,
          });
          this.updateTransactions();
          this.moneygram = false;
          this.inputTransferCode.reset();
          this.transferReceived = true;
        }
      });
    }
  }

  // Methods

  private addWu() {
    this.http.addWestern(this.wuTransfers).subscribe();
  }
  private addRia() {
    this.http.addRia(this.riaTransfers).subscribe();
  }
  private addGram() {
    this.http.addGram(this.gramTransfers).subscribe();
  }

  private updateAccount() {
    this.http.updateAccount(this.userAccount).subscribe();
  }

  private updateTransactions() {
    this.http
      .updateTransactions(this.userTransactions, this.loggedUserId)
      .subscribe();
  }
}
