import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchBookComponent } from './routes/common/search-book/search-book.component';
import { LibrarianAddBookComponent } from './routes/librarian/librarian-add-book/librarian-add-book.component';
import { HomeComponent } from './routes/common/home/home.component';

import { BookDetailComponent } from './routes/common/book-detail/book-detail.component';
import { AdminLoginComponent } from './routes/admin/admin-login/admin-login.component';
import { AdminRulesComponent } from './routes/admin/admin-rules/admin-rules.component';
import { LoginComponent } from './routes/common/login/login.component';

import { ReaderViewPaymentComponent } from './routes/reader/reader-view-payment/reader-view-payment.component';
import {AboutComponent} from './routes/common/about/about.component';
import {LibrarianBorrowComponent} from './routes/librarian/librarian-borrow/librarian-borrow.component';
import {ManageUserComponent} from './routes/common/manage-user/manage-user.component';
import {LogoutComponent} from './routes/common/logout/logout.component';
import {LibrarianReturnComponent} from './routes/librarian/librarian-return/librarian-return.component';
import {AdminChangePasswordComponent} from './routes/admin/admin-change-password/admin-change-password.component';
import { ReaderProfileComponent } from './routes/reader/reader-profile/reader-profile.component';
import { ReaderBorrowingComponent } from './routes/reader/reader-borrowing/reader-borrowing.component';
import {LibrarianViewFineComponent} from './routes/librarian/librarian-view-fine/librarian-view-fine.component';
import {ReaderFineComponent} from './routes/reader/reader-fine/reader-fine.component';
import {LibrarianHomeComponent} from "./routes/librarian/librarian-home/librarian-home.component";
import {AdminPostComponent} from "./routes/admin/admin-post/admin-post.component";

const routes: Routes = [
  // home pages
  { path: '', component: HomeComponent },
  { path: 'librarian', component: LibrarianHomeComponent },
  { path: 'admin', component: AdminRulesComponent },
  { path: 'reader', component: ReaderProfileComponent },
  // common routes
  { path: 'search', component: SearchBookComponent },
  { path: 'book/:ISBN', component: BookDetailComponent },
  { path: 'login/:role', component: LoginComponent },
  { path: ':role/manage_user', component: ManageUserComponent },
  { path: 'logout', component: LogoutComponent },
  // admin/*
  { path: 'admin/rules', component: AdminRulesComponent },
  { path: 'admin/login', component: AdminLoginComponent },
  { path: 'admin/password', component: AdminChangePasswordComponent },
  { path: 'admin/post', component: AdminPostComponent },
  // librarian/*
  { path: 'librarian/add_book', component: LibrarianAddBookComponent },
  { path: 'librarian/reader/profile/:reader', component: ReaderProfileComponent },
  { path: 'librarian/reader/borrowed/:reader', component: ReaderBorrowingComponent },
  { path: 'librarian/borrow', component: LibrarianBorrowComponent },
  { path: 'librarian/return', component: LibrarianReturnComponent },
  // reader/*
  { path: 'reader/profile', component: ReaderProfileComponent },
  { path: 'reader/borrowed', component: ReaderBorrowingComponent },

  // testing url
  { path: 'about', component: AboutComponent },
  { path: 'reader/fined', component: ReaderFineComponent },
  { path: 'librarian/view_fine', component: LibrarianViewFineComponent },
  { path: 'reader/view_payment', component: ReaderViewPaymentComponent },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule { }
