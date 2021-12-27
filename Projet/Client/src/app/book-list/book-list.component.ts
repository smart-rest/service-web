import { Observable, pipe } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';

import { Book } from '../model/book';
import { BookService } from '../services/book.service';
import { CopyService } from '../services/copy.service';
import { Copy } from '../model/copy';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  public books$: Observable<Book[]>;

  constructor(private bookService: BookService, private copyService: CopyService) { }

  ngOnInit() { this.init(); }

  public init() {
    this.books$ = this.bookService.getAll()
      .pipe(
        tap(this.addCopies.bind(this))
      );
  }

  private addCopies(books: Book[]) {
    for (const book of books) {
      this.copyService.getAvailable(book.id)
       .pipe(
         map(copies => book.copies = copies)
       )
       .subscribe();
    }
  }
}
