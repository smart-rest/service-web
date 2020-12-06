import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Injectable } from '@angular/core';

import { BaseHttpService } from './baseHttpService';

@Injectable()
export class LoanService extends BaseHttpService {
  loan(copyId, userId): Observable<void> {
    /* to be changed */
    return of({})
      .pipe(
        map(() => null),
        catchError((err) => { console.log(err); return null; })
      );
  }
}
