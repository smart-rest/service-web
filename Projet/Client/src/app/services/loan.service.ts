import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Injectable } from '@angular/core';

import { BaseHttpService } from './baseHttpService';
import { Loan } from '../model/loan';

@Injectable()
export class LoanService extends BaseHttpService {
  public loan(bookId, copyId, userId): Observable<void> {
    return this.http
    // 4 parametres : bookId, copyId, userId, loanDate (j'ai rajouté le book)
    .post(`${this.baseUrl}/loans`,{bookId: `${bookId}`,copyId: `${copyId}`, userId: `${userId}`, loanDate: '2021/12/15'})
    .pipe(
      map(() => null),
      catchError((err) => { console.log(err); return null; })
    );
  }

  public getAll(): Observable<Loan[]> {
    return this.http
    .get<Loan[]>(`${this.baseUrl}/loans`);
  }

  public return(copyId): Observable<void> {
    return this.http
    .delete(`${this.baseUrl}/loans/${copyId}`)
    .pipe(
      map(() => null),
      catchError((err) => { console.log(err); return null; })
    );
  }
}
