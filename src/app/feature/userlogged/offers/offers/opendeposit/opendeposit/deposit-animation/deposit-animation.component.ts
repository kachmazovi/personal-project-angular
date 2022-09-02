import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoginService } from 'src/app/shared/services/login/login.service';

@Component({
  selector: 'app-deposit-animation',
  templateUrl: './deposit-animation.component.html',
  styleUrls: ['./deposit-animation.component.scss'],
})
export class DepositAnimationComponent implements OnInit {
  public lang = new BehaviorSubject('geo');

  constructor(private loginServ: LoginService) {
    this.loginServ.language.subscribe((language) => {
      this.lang.next(language);
    });
  }

  ngOnInit(): void {}
}
