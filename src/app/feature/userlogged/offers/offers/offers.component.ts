import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoginService } from 'src/app/shared/services/login/login.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OffersComponent implements OnInit {
  public loggedUserId = '';
  public geo = new BehaviorSubject('geo');
  public eng = new BehaviorSubject('eng');
  public lang = this.geo;

  constructor(private loginServ: LoginService) {
    this.loginServ.loggedUserId.subscribe((id) => {
      this.loggedUserId = id;
    });
    this.loginServ.language.subscribe((language) => {
      this.lang.next(language);
    });
  }

  ngOnInit(): void {}

  // public loan: loans = {
  //   loans: [
  //     {
  //       name: 'l1',
  //       amount: '100',
  //     },
  //     {
  //       name: 'l2',
  //       amount: '200',
  //     },
  //     {
  //       name: 'l3',
  //       amount: '1232',
  //     },
  //   ],
  // };
  // @Output() click = new EventEmitter();
  // public addLoan() {
  //   this.http.updateLoan(this.loan, '1').subscribe();
  //   this.click.emit();
  // }
}
