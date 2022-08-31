import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { exchangeResponseInterface } from '../interfaces/exchange.response.interface';

import { ExchangeService } from './exchange.service';

describe('ExchangeService', () => {
  let service: ExchangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(ExchangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should be string', () => {
    expect(service.leftCurrency).toEqual('/GEL');
  });
  it('should be string', () => {
    expect(service.rightCurrency).toEqual('/GEL');
  });
  it('get observable getter', () => {
    service.getter().subscribe((v) => {
      expect(v).toEqual({} as exchangeResponseInterface);
    });
  });
});
