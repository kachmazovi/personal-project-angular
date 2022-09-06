import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, of, tap } from 'rxjs';
import { ApiRequestsService } from 'src/app/core/api.requests/apirequests.service';
import {
  registeredUser,
  user,
} from 'src/app/shared/interfaces/register.interface';
import { LoginService } from 'src/app/shared/services/login/login.service';

@Component({
  selector: 'app-userlogged',
  templateUrl: './userlogged.component.html',
  styleUrls: ['./userlogged.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserloggedComponent implements OnInit, OnDestroy {
  private loggedUserId = '';

  public geo = new BehaviorSubject('geo');
  public eng = new BehaviorSubject('eng');
  public changelang = new BehaviorSubject('');
  public lang = new BehaviorSubject('geo');

  public changeLang() {
    if (this.lang == this.geo) {
      this.lang = this.eng;
      this.loginServ.language.next('eng');
    } else {
      this.lang = this.geo;
      this.loginServ.language.next('geo');
    }
  }

  constructor(
    private loginServ: LoginService,
    private http: ApiRequestsService,
    private router: Router
  ) {
    this.loginServ.loggedUserId.subscribe((id) => {
      this.loggedUserId = id;
    });
    this.loginServ.language.subscribe((language) => {
      this.lang.next(language);
      this.changelang.next(
        `${
          language == 'geo'
            ? 'https://tbconline.ge/tbcrd/assets/flag-switch2.98021754eb93859098c11d8bb08c5800.svg'
            : 'https://tbconline.ge/tbcrd/assets/flag-switch.0a3d7467a79326fee75b25ce4bb25f59.svg'
        }`
      );
    });
  }

  ngOnInit(): void {
    this.getUser();
  }

  ngOnDestroy(): void {}

  public loggedUser: BehaviorSubject<registeredUser> = new BehaviorSubject({
    name: '',
    surname: '',
    personalNumber: '',
    phoneNumber: '',
    username: '',
    password: '',
    id: '',
  });

  private getUser() {
    this.http
      .getUserID(this.loggedUserId)
      .pipe(
        tap((response: registeredUser) => {
          this.loggedUser.next(response);
        }),
        catchError((err) => {
          console.log(err.message);
          return of('error');
        })
      )
      .subscribe();
  }

  public logOut() {
    this.loginServ.userLogged.next(false);
    this.router.navigateByUrl('/login');
  }
}
