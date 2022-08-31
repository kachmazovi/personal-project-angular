import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { exchangeResponseInterface } from '../interfaces/exchange.response.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExchangeService {
  constructor(private http: HttpClient) {}

  public leftCurrency: string = '/GEL';
  public rightCurrency: string = '/GEL';

  private baseUrl =
    'https://v6.exchangerate-api.com/v6/f86838651f0b9e79d6db27cd/pair';

  public getter(): Observable<exchangeResponseInterface> {
    return this.http.get<exchangeResponseInterface>(
      this.baseUrl + '/' + this.leftCurrency + '/' + this.rightCurrency
    );
  }
}
