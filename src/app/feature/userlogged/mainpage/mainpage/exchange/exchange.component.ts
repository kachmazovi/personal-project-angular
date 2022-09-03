import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss'],
})
export class ExchangeComponent implements OnInit {
  constructor() {}

  @Input() lang = new BehaviorSubject('geo');
  @Input() currencies: string[] = [];
  @Input() amountOutputLeft = new BehaviorSubject('');
  @Input() amountOutputRight = new BehaviorSubject('');
  @Input() leftInputNum = new FormControl('');
  @Input() rightInputNum = new FormControl('');
  @Input() leftNum = 1;
  @Input() exchangeRate: number = 1;

  ngOnInit(): void {
    this.leftInputNum.valueChanges.subscribe((v) => {
      this.leftNum = Number(v);
      this.amountOutputRight.next(
        String(Math.round(Number(v) * this.exchangeRate * 100) / 100)
      );
    });
    this.rightInputNum.valueChanges.subscribe((v) => {
      this.amountOutputLeft.next(
        String(Math.round((Number(v) / this.exchangeRate) * 100) / 100)
      );
    });
  }

  @Output() selectedLeft = new EventEmitter();
  public onSelectedLeft(value: string) {
    this.selectedLeft.emit(value);
  }

  @Output() selectedRight = new EventEmitter();
  public onSelectedRight(value: string) {
    this.selectedRight.emit(value);
  }
}
