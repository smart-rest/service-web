import { Observable, of } from 'rxjs';

import { Injectable } from '@angular/core';

import { Copy } from '../model/copy';
import { BaseHttpService } from './baseHttpService';

@Injectable()
export class CopyService extends BaseHttpService {
  getAvailable(bookId: string): Observable<Copy[]> {
    /*To be implemented*/
    return of([new Copy('myId', '2018-01-01')]);
  }
}
