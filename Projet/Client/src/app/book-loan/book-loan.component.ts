import { NgxSmartModalService } from 'ngx-smart-modal';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Book } from '../model/book';
import { Copy } from '../model/copy';
import { BookService } from '../services/book.service';
import { LoanService } from '../services/loan.service';
import { CopyService } from '../services/copy.service';
import { UserSelectionCloseEvent } from '../user-selection/user-selection.component';

@Component({
  selector: 'app-book-loan',
  templateUrl: './book-loan.component.html',
  styleUrls: ['./book-loan.component.css']
})
export class BookLoanComponent implements OnInit {
  private bookId: string;
  public book$: Observable<Book>;
  public copies$: Observable<Copy[]>;
  public loanCopyId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    private copyService: CopyService,
    private loanService: LoanService,
    private ngxSmartModalService: NgxSmartModalService) { }

  ngOnInit() {
    this.bookId = this.route.snapshot.paramMap.get('bookId');
    this.book$ = this.bookService.get(this.bookId);
    this.copies$ = this.copyService.getAll(this.bookId);
    // true -> this.copies$ = this.copyService.getAvailable(this.bookId);
  }

  public async loan(copyId: string) {
    this.loanCopyId = copyId;
    this.ngxSmartModalService.getModal('loanModal').open();
  }

  onClosed(event: UserSelectionCloseEvent) {
    this.ngxSmartModalService.getModal('loanModal').close();

    if (event.user && event.isValidated) {
      this.loanService.loan(this.loanCopyId, event.user.id)
        .pipe(
          tap(() => this.router.navigateByUrl('/users'))
        )
        .subscribe();
    }

    this.loanCopyId = null;
  }
}
