import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
  accountId,
  accounts,
  registeredUser,
} from 'src/app/shared/interfaces/register.interface';
import { loa, loans } from 'src/app/shared/interfaces/loan.interface';
import { dep, deposits } from 'src/app/shared/interfaces/deposit.interface';
import { loanId } from 'src/app/shared/interfaces/loan.interface';
import { depositId } from 'src/app/shared/interfaces/deposit.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiRequestsService {
  constructor(private http: HttpClient) {}

  private baseUrl = 'http://localhost:3000';

  registerUser<user>(
    name: string,
    surname: string,
    personalNumber: string,
    phoneNumber: string,
    username: string,
    password: string
  ): Observable<user> {
    return this.http.post<user>(`${this.baseUrl}/users`, {
      name: name,
      surname: surname,
      personalNumber: personalNumber,
      phoneNumber: phoneNumber,
      username: username,
      password: password,
    });
  }

  getUsers(): Observable<registeredUser[]> {
    return this.http.get<registeredUser[]>(`${this.baseUrl}/users`);
  }

  getUserID(id: string): Observable<registeredUser> {
    return this.http.get<registeredUser>(`${this.baseUrl}/users/${id}`);
  }

  // Acounts
  addAccount<accounts>(
    name: string,
    surname: string,
    account: string,
    amount: string
  ): Observable<accounts> {
    return this.http.post<accounts>(`${this.baseUrl}/accounts`, {
      name: name,
      surname: surname,
      account: account,
      amount: amount,
    });
  }

  getAccount(id: string): Observable<accountId> {
    return this.http.get<accountId>(`${this.baseUrl}/accounts/${id}`);
  }

  updateAccount(userAccount: accountId) {
    return this.http.put(`${this.baseUrl}/accounts/${userAccount.id}`, {
      name: userAccount.name,
      surname: userAccount.surname,
      account: userAccount.account,
      amount: userAccount.amount,
      id: userAccount.id,
    });
  }

  // Loans
  addLoan<loans>(loan: loans) {
    return this.http.post<loans>(`${this.baseUrl}/loans`, {
      loans: loan,
    });
  }
  getLoan(id: string): Observable<loanId> {
    return this.http.get<loanId>(`${this.baseUrl}/loans/${id}`);
  }

  updateLoan(loans: loa[], id: string) {
    return this.http.put(`${this.baseUrl}/loans/${id}`, {
      loans: loans,
      id: id,
    });
  }
  // deleteLoan(id: string) {
  //   return this.http.delete(`${this.baseUrl}/loans/${id}`);
  // }

  // Deposits
  addDeposit<deposits>(deposit: deposits) {
    return this.http.post<deposits>(`${this.baseUrl}/deposits`, {
      deposits: deposit,
    });
  }

  getDeposit(id: string): Observable<depositId> {
    return this.http.get<depositId>(`${this.baseUrl}/deposits/${id}`);
  }

  updateDeposit(deposit: dep[], id: string) {
    return this.http.put(`${this.baseUrl}/deposits/${id}`, {
      deposits: deposit,
      id: id,
    });
  }
  // deleteDeposit(id: string) {
  //   return this.http.delete(`${this.baseUrl}/deposits/${id}`);
  // }
}
