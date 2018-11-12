import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MessageService } from './utils/message.service';

import { HomeComponent } from './routes/common/home/home.component';
import { LibrarianAddBookComponent } from './routes/librarian/librarian-add-book/librarian-add-book.component';
import { SearchBookComponent } from './routes/common/search-book/search-book.component';
import { BookDetailComponent } from './routes/common/book-detail/book-detail.component';
import { AppRoutingModule } from './app-routing.module';
import { AdminLoginComponent } from './routes/admin/admin-login/admin-login.component';
import { AdminRulesComponent } from './routes/admin/admin-rules/admin-rules.component';
import { LogoutComponent } from './routes/common/logout/logout.component';
import { AboutComponent } from './routes/common/about/about.component';
import { LoginComponent } from './routes/common/login/login.component';
import { LibrarianBorrowComponent } from './routes/librarian/librarian-borrow/librarian-borrow.component';
import { ReaderFineComponent } from './routes/reader/reader-fine/reader-fine.component';
import { ManageUserComponent } from './routes/common/manage-user/manage-user.component';
import { LibrarianReturnComponent } from './routes/librarian/librarian-return/librarian-return.component';
import { ReaderBorrowingComponent } from './routes/reader/reader-borrowing/reader-borrowing.component';
import { ReaderProfileComponent } from './routes/reader/reader-profile/reader-profile.component';
import { AdminChangePasswordComponent } from './routes/admin/admin-change-password/admin-change-password.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {StateService} from './utils/state.service';
import { LibrarianIncomeComponent } from './routes/librarian/librarian-income/librarian-income.component';
import {
  ErrorStateMatcher, MatButtonModule, MatCardModule,
  MatDatepickerModule, MatExpansionModule,
  MatGridListModule, MatIconModule, MatInputModule,
  MatListModule, MatNativeDateModule, MatPaginatorModule, MatSnackBarModule, MatSortModule, MatStepperModule,
  MatTableModule, MatToolbarModule, ShowOnDirtyErrorStateMatcher
} from '@angular/material';
import { LibrarianProfileComponent } from './routes/librarian/librarian-profile/librarian-profile.component';
import { AdminPostComponent } from './routes/admin/admin-post/admin-post.component';
import { MAT_STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { PlotlyIncomeMultiLinesComponent } from './components/plotly-income-multilines/plotly-income-multi-lines.component';
import { PlotlyIncomePieComponent } from './components/plotly-income-pie/plotly-income-pie.component';
import { IncomeDetailComponent } from './components/income-detail/income-detail.component';
import { BorrowDetailComponent } from './routes/common/borrow-detail/borrow-detail.component';

@NgModule({
  declarations: [
    // component
    NavbarComponent,
    PlotlyIncomeMultiLinesComponent,
    PlotlyIncomePieComponent,
    IncomeDetailComponent,
    // pages
    AppComponent,
    // - home pages
    HomeComponent,
    AdminRulesComponent,
    LibrarianIncomeComponent,
    // - common pages
    LogoutComponent,
    AboutComponent,
    LoginComponent,
    SearchBookComponent,
    BookDetailComponent,
    ManageUserComponent,
    BorrowDetailComponent,
    // - admin pages
    AdminLoginComponent,
    AdminPostComponent,
    AdminChangePasswordComponent,
    // - librarian pages
    LibrarianAddBookComponent,
    LibrarianBorrowComponent,
    LibrarianReturnComponent,
    LibrarianProfileComponent,
    // - reader pages
    ReaderFineComponent,
    ReaderBorrowingComponent,
    ReaderProfileComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    // ng-bootstrap Module
    NgbModule,
    // Material Module
    BrowserAnimationsModule,
    MatListModule,
    MatGridListModule,
    MatToolbarModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatExpansionModule,
    MatButtonModule,
    MatStepperModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatPaginatorModule,
    MatSnackBarModule
  ],
  providers: [
    MessageService, StateService,
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
    { provide: MAT_STEPPER_GLOBAL_OPTIONS, useValue: { showError: true } }],
  bootstrap: [AppComponent]
})
export class AppModule { }
