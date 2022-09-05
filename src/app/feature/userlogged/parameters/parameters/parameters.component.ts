import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, catchError, of, tap } from 'rxjs';
import { ApiRequestsService } from 'src/app/core/api.requests/apirequests.service';
import {
  registeredUser,
  user,
} from 'src/app/shared/interfaces/register.interface';
import { LoginService } from 'src/app/shared/services/login/login.service';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParametersComponent implements OnInit {
  public loggedUserId = '';
  public lang = new BehaviorSubject('eng');

  constructor(
    private loginServ: LoginService,
    private http: ApiRequestsService
  ) {
    this.loginServ.loggedUserId.subscribe((id) => {
      this.loggedUserId = id;
    });
    this.loginServ.language.subscribe((language) => {
      this.lang.next(language);
    });
    this.loginServ.loggedUserData.subscribe((user) => {
      this.userData.next(user);
      this.userDataObj = user;
    });
  }

  ngOnInit(): void {
    this.getUsers();
    this.inputUsername.valueChanges.subscribe((input) => {
      this.acceptableUsername = true;
      this.allUsers.some((user) => {
        if (user.username == input) {
          this.acceptableUsername = false;
        }
      });
    });
    this.inputCurrentPassword.valueChanges.subscribe((input) => {
      if (input?.length == 0 || input == this.userDataObj.password) {
        this.wrongCurrentPassword = false;
      } else this.wrongCurrentPassword = true;
    });
  }

  private allUsers: user[] = [];

  private getUsers() {
    this.http
      .getUsers()
      .pipe(
        tap((response: registeredUser[]) => {
          this.allUsers = response;
        }),
        catchError((err) => {
          console.log(err.message);
          return of('error');
        })
      )
      .subscribe();
  }

  public saved = new BehaviorSubject(false);

  // Menu

  public personal = true;
  public username = false;
  public password = false;

  public clickPersonal() {
    this.username = false;
    this.password = false;
    this.personal = true;
  }
  public clickUsername() {
    this.personal = false;
    this.password = false;
    this.username = true;
  }
  public clickPassword() {
    this.username = false;
    this.personal = false;
    this.password = true;
  }

  // change-username

  public acceptableUsername = true;

  public inputUsername = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
  ]);

  public userDataObj: registeredUser = {
    name: '',
    surname: '',
    personalNumber: '',
    phoneNumber: '',
    username: '',
    password: '',
    id: '',
  };

  public userData: BehaviorSubject<registeredUser> = new BehaviorSubject({
    name: '',
    surname: '',
    personalNumber: '',
    phoneNumber: '',
    username: '',
    password: '',
    id: '',
  });

  public saveUsername() {
    this.userDataObj.username = String(this.inputUsername.value);
    this.http.updateUser(this.userDataObj).subscribe();
    this.inputUsername.reset();
    this.saved.next(true);
    setTimeout(() => {
      this.saved.next(false);
    }, 2000);
  }

  // change-password

  public wrongCurrentPassword = false;
  public inputCurrentPassword = new FormControl('', Validators.required);

  public inputPassword = new FormControl('', [
    Validators.required,
    Validators.pattern(
      '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^ws]).{8,}$'
    ),
  ]);

  public savePassword() {
    this.userDataObj.password = String(this.inputPassword.value);
    this.http.updateUser(this.userDataObj).subscribe();
    this.inputPassword.reset();
    this.saved.next(true);
    setTimeout(() => {
      this.saved.next(false);
    }, 2000);
  }
}
