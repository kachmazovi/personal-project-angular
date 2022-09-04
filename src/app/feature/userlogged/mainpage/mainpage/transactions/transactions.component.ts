import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { accountId } from 'src/app/shared/interfaces/account.interface';
import { transfers } from 'src/app/shared/interfaces/transactions.interface';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsComponent implements OnInit {
  @Input() lang = new BehaviorSubject('geo');
  @Input() showTrans = true;
  @Input() haveTransfers = new BehaviorSubject(false);
  @Input() userAccount: BehaviorSubject<accountId> = new BehaviorSubject({
    account: '',
    amount: '',
    id: '',
  });
  @Input() userTransactions: BehaviorSubject<transfers[]> = new BehaviorSubject(
    [
      {
        date: '',
        receiver: '',
        transferror: '',
        amount: 0,
      },
    ]
  );

  constructor() {}

  ngOnInit(): void {}

  @Output() showTransactions = new EventEmitter();

  public showHide() {
    this.showTransactions.emit();
  }
}
