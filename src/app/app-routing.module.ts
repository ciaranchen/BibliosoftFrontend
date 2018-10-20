import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibrarianSearchBookComponent } from './routes/librarian/librarian-search-book/librarian-search-book.component';
import { LibrarianAddBookComponent } from './routes/librarian/librarian-add-book/librarian-add-book.component';
import { HomeComponent } from './routes/common/home/home.component';

import { BookDetailComponent } from './routes/common/book-detail/book-detail.component';
import { AdminLoginComponent } from './routes/admin/admin-login/admin-login.component';
import { AdminHomeComponent } from './routes/admin/admin-home/admin-home.component';
import { LoginComponent } from './routes/common/login/login.component';

import { ReaderViewPaymentComponent } from './routes/reader/reader-view-payment/reader-view-payment.component';
import {AboutComponent} from './routes/common/about/about.component';
import {LibrarianBorrowComponent} from './routes/librarian/librarian-borrow/librarian-borrow.component';
import {ManageUserComponent} from './routes/common/manage-user/manage-user.component';
import {BorrowRecordsComponent} from './routes/common/borrow-records/borrow-records.component';
import {LogoutComponent} from './routes/common/logout/logout.component';
import {LibrarianReturnComponent} from './routes/librarian/librarian-return/librarian-return.component';
import {AdminChangePasswordComponent} from './routes/admin/admin-change-password/admin-change-password.component';
import { ReaderProfileComponent } from './routes/reader/reader-profile/reader-profile.component';
import { ReaderBorrowingComponent } from './routes/reader/reader-borrowing/reader-borrowing.component';
import {LibrarianViewFineComponent} from './routes/librarian/librarian-view-fine/librarian-view-fine.component';

const routes: Routes = [
  // home pages
  { path: '', component: HomeComponent },
  { path: 'librarian', component: LibrarianBorrowComponent },
  { path: 'admin', component: AdminChangePasswordComponent },
  { path: 'reader', component: ReaderProfileComponent },
  // common routes
  { path: 'search', component: LibrarianSearchBookComponent },
  { path: 'book/:ISBN', component: BookDetailComponent },
  { path: 'login/:role', component: LoginComponent },
  { path: 'manage/:role', component: ManageUserComponent },
  { path: 'logout', component: LogoutComponent },
  // admin/*
  { path: 'admin/home', component: AdminHomeComponent },
  { path: 'admin/login', component: AdminLoginComponent },
  // librarian/*
  { path: 'librarian/add_book', component: LibrarianAddBookComponent },
  // reader/*

  // testing url
  { path: 'about', component: AboutComponent },
  { path: 'librarian/borrow', component: LibrarianBorrowComponent },
  { path: 'librarian/return', component: LibrarianReturnComponent },
  { path: 'borrow_record/:reader', component: BorrowRecordsComponent },
  { path: 'reader/profile', component: ReaderProfileComponent },
  { path: 'reader/borrowed/:reader', component: ReaderBorrowingComponent },
  { path: 'librarian/view_fine', component: LibrarianViewFineComponent },
  { path: 'reader/view_payment', component: ReaderViewPaymentComponent },
  { path: 'admin/change_password', component: AdminChangePasswordComponent },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule { }
