import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personalnumber',
  templateUrl: './personalnumber.component.html',
  styleUrls: ['./personalnumber.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalnumberComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
