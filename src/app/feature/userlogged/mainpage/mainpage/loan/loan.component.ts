import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiRequestsService } from 'src/app/core/api.requests/apirequests.service';
import { loanId, loans } from 'src/app/shared/interfaces/loan.interface';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss'],
})
export class LoanComponent implements OnInit {
  @Input() geo = new BehaviorSubject('geo');
  @Input() eng = new BehaviorSubject('eng');
  @Input() lang = this.geo;
  @Input() showLoan = false;
  @Input() sumLoan = new BehaviorSubject(0);
  public showAmount = new BehaviorSubject(true);

  @Output() hideLoanButton = new EventEmitter();
  public showLoanButton() {
    this.hideLoanButton.emit();
  }

  constructor(private http: ApiRequestsService) {}

  ngOnInit(): void {
    this.sumLoan.subscribe((v) => {
      if (v > 0) {
        this.showAmount.next(false);
      } else this.showAmount.next(true);
    });
  }
}
