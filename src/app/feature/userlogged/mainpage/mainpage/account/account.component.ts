import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { accountId } from 'src/app/shared/interfaces/account.interface';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  constructor() {}

  @Input() lang = new BehaviorSubject('geo');
  @Input() showAmount = false;

  @Input() userAccount: BehaviorSubject<accountId> = new BehaviorSubject({
    account: '',
    amount: '',
    id: '',
  });

  @Output() showHideAmount = new EventEmitter();

  public showAmountButton() {
    this.showHideAmount.emit();
  }

  ngOnInit(): void {}
}
