import { Routes } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';
import { BookLoanComponent } from './book-loan/book-loan.component';

export const appRoutes: Routes = [
    {
      path: 'books',
      component: BookListComponent
    },
    {
      path: 'books/:bookId/loan',
      component: BookLoanComponent
    },
    { 
      path: '**',
      redirectTo: '/books',
      pathMatch: 'full'
    }
  ];