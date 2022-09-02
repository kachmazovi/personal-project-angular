import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accountnumber',
  templateUrl: './accountnumber.component.html',
  styleUrls: ['./accountnumber.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountnumberComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
