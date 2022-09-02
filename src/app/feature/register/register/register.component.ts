import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiRequestsService } from 'src/app/core/api.requests/apirequests.service';
import { userData } from '../../../shared/interfaces/register.interface';
import { LoginService } from 'src/app/shared/services/login/login.service';
import { matchValidator } from '../validators/validator';
import { catchError, of, tap } from 'rxjs';
import { loans } from 'src/app/shared/interfaces/loan.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {
  public geo = 'geo';
  public eng = 'eng';
  public lang = '';

  public personalErr = false;
  public phoneErr = false;
  public usernameErr = false;
  public passwordErr = false;
  public confirmErr = false;

  public alreadyUsedPersonalNum = false;
  public alreadyUsedPhoneNum = false;
  public alreadyUsedUsername = false;

  public userRegistered = false;

  private registeredUsers: userData[] = [];

  private generateAccount = 'GE00TB';

  constructor(
    private loginServ: LoginService,
    private request: ApiRequestsService
  ) {}

  ngOnInit(): void {
    for (let i = 0; i < 16; i++) {
      this.generateAccount += Math.floor(Math.random() * 10);
    }
    this.request
      .getUsers()
      .pipe(
        tap((response) => {
          response.forEach((user) => {
            this.registeredUsers.push({
              personalNumber: user.personalNumber,
              phoneNumber: user.phoneNumber,
              username: user.username,
            });
          });
          catchError((err) => {
            console.log(err.message);
            return of();
          });
        })
      )
      .subscribe();
    this.loginServ.language.subscribe((v) => {
      if (v == 'geo') {
        this.lang = this.geo;
      } else {
        this.lang = this.eng;
      }
    });
    this.personalNumber.valueChanges.subscribe((num) => {
      this.alreadyUsedPersonalNum = false;
      this.registeredUsers.forEach((user) => {
        if (this.personalNumber.value == user.personalNumber) {
          this.alreadyUsedPersonalNum = true;
        }
      });
      if (num == null || String(num).length == 11) {
        this.personalErr = false;
      } else if (String(num).length != 0 && String(num).length != 11) {
        this.personalErr = true;
      }
    });
    this.phoneNumber.valueChanges.subscribe((num) => {
      this.alreadyUsedPhoneNum = false;
      this.registeredUsers.forEach((user) => {
        if (this.phoneNumber.value == user.phoneNumber) {
          this.alreadyUsedPhoneNum = true;
        }
      });
      if (num == null || String(num).length == 9) {
        this.phoneErr = false;
      } else if (String(num).length != 0 && String(num).length != 9) {
        this.phoneErr = true;
      }
    });
    this.username.valueChanges.subscribe((username) => {
      this.alreadyUsedUsername = false;
      this.registeredUsers.forEach((user) => {
        if (this.username.value == user.username) {
          this.alreadyUsedUsername = true;
        }
      });
      if (String(username).length < 5 && String(username).length != 0) {
        this.usernameErr = true;
      } else {
        this.usernameErr = false;
      }
    });
    this.password.valueChanges.subscribe((password) => {
      if (this.password.invalid && String(password).length != 0) {
        this.passwordErr = true;
      } else this.passwordErr = false;
      if (
        password != this.confirmPassword.value &&
        String(password).length != 0
      ) {
        this.confirmErr = true;
      } else this.confirmErr = false;
    });
    this.confirmPassword.valueChanges.subscribe((password) => {
      if (
        this.password.value != this.confirmPassword.value &&
        String(password).length != 0
      ) {
        this.confirmErr = true;
      } else this.confirmErr = false;
    });
  }

  public registerForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    surname: new FormControl<string>('', [Validators.required]),
    personalNumber: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(11),
      Validators.maxLength(11),
    ]),
    phoneNumber: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(9),
      Validators.maxLength(9),
    ]),
    username: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    passwordGroup: new FormGroup(
      {
        password: new FormControl<string>('', [
          Validators.required,
          Validators.pattern(
            '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^ws]).{8,}$'
          ),
        ]),
        confirmPassword: new FormControl<string>('', [Validators.required]),
      },
      [matchValidator('password', 'confirmPassword')]
    ),
    terms: new FormControl<boolean>(false, {
      nonNullable: true,
      validators: [Validators.requiredTrue],
    }),
  });

  public register() {
    this.request
      .registerUser(
        this.name.value,
        this.surname.value,
        this.personalNumber.value,
        this.phoneNumber.value,
        this.username.value,
        this.password.value
      )
      .subscribe();
    this.request.addAccount(this.generateAccount, '10000').subscribe();
    this.request
      .addDeposit([
        {
          date: '00000000000',
          amount: 0,
        },
      ])
      .subscribe();
    this.request
      .addLoan([
        {
          date: '00000000000',
          amount: 0,
        },
      ])
      .subscribe();
    this.userRegistered = true;
  }

  public registered() {
    location.reload();
  }

  //Getters

  get passwordGroup() {
    return this.registerForm.get('passwordGroup') as FormGroup;
  }
  get password() {
    return this.passwordGroup.get('password') as FormControl;
  }
  get confirmPassword() {
    return this.passwordGroup.get('confirmPassword') as FormControl;
  }
  get name() {
    return this.registerForm.get('name') as FormControl;
  }
  get surname() {
    return this.registerForm.get('surname') as FormControl;
  }
  get personalNumber() {
    return this.registerForm.get('personalNumber') as FormControl;
  }
  get phoneNumber() {
    return this.registerForm.get('phoneNumber') as FormControl;
  }
  get username() {
    return this.registerForm.get('username') as FormControl;
  }
  get term() {
    return this.registerForm.get('terms') as FormControl;
  }
}
