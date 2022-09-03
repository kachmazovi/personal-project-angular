import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss'],
})
export class DepositComponent implements OnInit {
  @Input() lang = new BehaviorSubject('geo');
  @Input() showDeposit = false;
  @Input() sumDeposit = new BehaviorSubject(0);
  public showAmount = new BehaviorSubject(true);

  @Output() hideDepositButton = new EventEmitter();
  public showDepositButton() {
    this.hideDepositButton.emit();
  }

  constructor() {}

  ngOnInit(): void {
    this.sumDeposit.subscribe((v) => {
      if (v > 0) {
        this.showAmount.next(false);
      } else this.showAmount.next(true);
    });
  }
}
