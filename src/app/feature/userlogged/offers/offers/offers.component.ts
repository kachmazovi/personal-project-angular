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
  public lang = new BehaviorSubject('eng');

  constructor(private loginServ: LoginService) {
    this.loginServ.loggedUserId.subscribe((id) => {
      this.loggedUserId = id;
    });
    this.loginServ.language.subscribe((language) => {
      this.lang.next(language);
    });
  }

  ngOnInit(): void {}
}
