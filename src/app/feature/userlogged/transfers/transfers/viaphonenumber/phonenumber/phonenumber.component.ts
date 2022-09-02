import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-phonenumber',
  templateUrl: './phonenumber.component.html',
  styleUrls: ['./phonenumber.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhonenumberComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
