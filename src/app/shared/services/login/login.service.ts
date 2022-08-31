import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { accountId, registeredUser } from '../../interfaces/register.interface';
import { depositId } from '../../interfaces/deposit.interface';
import { loanId } from '../../interfaces/loan.interface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor() {}

  public language = new BehaviorSubject('geo');
  public userLogged = new BehaviorSubject(false);
  public loggedUserId = new BehaviorSubject('');
  public loggedUserData: BehaviorSubject<registeredUser> = new BehaviorSubject({
    name: '',
    surname: '',
    personalNumber: '',
    phoneNumber: '',
    username: '',
    password: '',
    id: '',
  });
}
