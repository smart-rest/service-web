
import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';

import { Book } from '../model/book';
import { BaseHttpService } from './baseHttpService';

@Injectable()
export class BookService extends BaseHttpService {
  public getAll(): Observable<Book[]> {
    return this.http
      .get<Book[]>(`${this.baseUrl}/books`);
  }

  public get(bookId: string): Observable<Book> {
    return this.http
      .get<Book>(`${this.baseUrl}/books/${bookId}`);
  }
}
