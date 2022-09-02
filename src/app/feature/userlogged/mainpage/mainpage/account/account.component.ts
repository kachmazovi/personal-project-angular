import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { accountId } from 'src/app/shared/interfaces/register.interface';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  constructor() {}

  @Input() geo = new BehaviorSubject('geo');
  @Input() eng = new BehaviorSubject('eng');
  @Input() lang = this.geo;
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
