import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { ApiRequestsService } from 'src/app/core/api.requests/apirequests.service';
import { registeredUser } from 'src/app/shared/interfaces/register.interface';
import { LoginService } from 'src/app/shared/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  constructor(
    private loginServ: LoginService,
    private http: ApiRequestsService,
    private router: Router
  ) {}
  private loggedUser: registeredUser[] = [];
  public wrongData = false;

  ngOnInit(): void {
    this.loginServ.language.next('geo');
    this.getUsers();
    this.loginForm.valueChanges.subscribe((v) => {
      this.wrongData = false;
    });
  }

  public loginForm = new FormGroup({
    username: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [Validators.required]),
  });
  get username() {
    return this.loginForm.get('username') as FormControl;
  }
  get password() {
    return this.loginForm.get('password') as FormControl;
  }

  public geo =
    'https://tbconline.ge/tbcrd/assets/flag-switch2.98021754eb93859098c11d8bb08c5800.svg';

  public eng =
    'https://tbconline.ge/tbcrd/assets/flag-switch.0a3d7467a79326fee75b25ce4bb25f59.svg';

  public lang = this.geo;

  public changeLang() {
    if (this.lang == this.geo) {
      this.lang = this.eng;
      this.loginServ.language.next('eng');
    } else {
      this.lang = this.geo;
      this.loginServ.language.next('geo');
    }
    this.loginForm.reset();
  }

  public login() {
    this.loggedUser.forEach((user) => {
      if (
        user.username == this.username.value &&
        user.password == this.password.value
      ) {
        this.loginServ.userLogged.next(true);
        this.loginServ.loggedUserId.next(user.id);
        this.loginServ.loggedUserData.next(user);
        this.router.navigateByUrl('/userlogged/mainpage');
      } else this.wrongData = true;
    });
  }

  private getUsers() {
    this.http
      .getUsers()
      .pipe(
        tap((response) => {
          this.loggedUser = response;
        }),
        catchError((err) => {
          console.log(err.message);
          return of('error');
        })
      )
      .subscribe();
  }
}
