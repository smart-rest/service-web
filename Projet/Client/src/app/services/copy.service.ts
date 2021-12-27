import { Observable, of } from 'rxjs';

import { Injectable } from '@angular/core';

import { Copy } from '../model/copy';
import { BaseHttpService } from './baseHttpService';

@Injectable()
export class CopyService extends BaseHttpService {
  getAvailable(bookId: string): Observable<Copy[]> {
    return this.http
      .get<Copy[]>(`${this.baseUrl}/books/${bookId}/availableCopies`);

  }

  getAll(bookId: string): Observable<Copy[]> {
    return this.http
      .get<Copy[]>(`${this.baseUrl}/books/${bookId}/copies`);
  }
}
