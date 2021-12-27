import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Loan } from '../model/loan';
import { LoanService } from '../services/loan.service';
import { UserService } from '../services/user.service';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.css']
})
export class LoanListComponent implements OnInit {
  public loans$: Observable<Loan[]>;

  constructor(
    private loanService:LoanService,
    private userService:UserService,
    private bookService:BookService,
    private router: Router
  ) { }

  ngOnInit() {
    this.init();
  }

  public init() {
    this.loans$ = this.loanService.getAll();
    console.log("loans récupérés")
    console.log(this.loans$)
  }

  public returnCopy(copyId){
    this.loanService.return(copyId)
    .pipe(
      //pas convaincu
      tap(() => this.router.navigateByUrl('/users'))
    )
    .subscribe();
  }

  public getBookName(bookId){
    return this.bookService.get(bookId).pipe(
      tap((book)=>book.name)//pas testé, marche probablement pas
    )
  }

  public getUserName(userId){
    return this.userService.get(userId).pipe(
      tap((user)=>user.name)//same
    )
  }
}
