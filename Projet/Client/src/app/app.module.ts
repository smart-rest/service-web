import { NgxSmartModalModule } from 'ngx-smart-modal';

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BookListComponent } from './book-list/book-list.component';
import { appRoutes } from './routes';
import { BookService } from './services/book.service';
import { CopyService } from './services/copy.service';
import { UserService } from './services/user.service';
import { UserSelectionComponent } from './user-selection/user-selection.component';
import { BookLoanComponent } from './book-loan/book-loan.component';
import { LoanService } from './services/loan.service';
import { LoanListComponent } from './loan-list/loan-list.component';

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    BookLoanComponent,
    UserSelectionComponent,
    LoanListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' }),
    NgxSmartModalModule.forRoot(),
    FormsModule
  ],
  providers: [
    BookService,
    CopyService,
    UserService,
    LoanService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
