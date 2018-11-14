import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchBookComponent } from './routes/common/search-book/search-book.component';
import { LibrarianAddBookComponent } from './routes/librarian/librarian-add-book/librarian-add-book.component';
import { HomeComponent } from './routes/common/home/home.component';

import { BookDetailComponent } from './routes/common/book-detail/book-detail.component';
import { AdminLoginComponent } from './routes/admin/admin-login/admin-login.component';
import { AdminRulesComponent } from './routes/admin/admin-rules/admin-rules.component';
import { LoginComponent } from './routes/common/login/login.component';

import {AboutComponent} from './routes/common/about/about.component';
import {LibrarianBorrowComponent} from './routes/librarian/librarian-borrow/librarian-borrow.component';
import {ManageUserComponent} from './routes/common/manage-user/manage-user.component';
import {LogoutComponent} from './routes/common/logout/logout.component';
import {LibrarianReturnComponent} from './routes/librarian/librarian-return/librarian-return.component';
import {AdminChangePasswordComponent} from './routes/admin/admin-change-password/admin-change-password.component';
import { ReaderProfileComponent } from './routes/reader/reader-profile/reader-profile.component';
import { ReaderBorrowingComponent } from './routes/reader/reader-borrowing/reader-borrowing.component';
import {ReaderFineComponent} from './routes/reader/reader-fine/reader-fine.component';
import {LibrarianIncomeComponent} from './routes/librarian/librarian-income/librarian-income.component';
import {AdminPostComponent} from './routes/admin/admin-post/admin-post.component';
import {LibrarianProfileComponent} from './routes/librarian/librarian-profile/librarian-profile.component';
import {BorrowDetailComponent} from './routes/common/borrow-detail/borrow-detail.component';
import {ResetPasswordComponent} from "./routes/common/reset-password/reset-password.component";

const routes: Routes = [
  // home pages
  { path: '', component: HomeComponent },
  { path: 'librarian', component: LibrarianIncomeComponent },
  { path: 'admin', component: AdminRulesComponent },
  { path: 'reader', component: ReaderProfileComponent },
  // common routes
  { path: 'search', component: SearchBookComponent },
  { path: 'book/:ISBN', component: BookDetailComponent },
  { path: 'book_by_barcode/:barcode', component: BookDetailComponent },
  { path: 'login/:role', component: LoginComponent },
  { path: ':role/manage_user', component: ManageUserComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'about', component: AboutComponent },
  { path: 'borrow/:borrow', component: BorrowDetailComponent },
  // admin/*
  { path: 'admin/rules', component: AdminRulesComponent },
  { path: 'admin/login', component: AdminLoginComponent },
  { path: 'admin/password', component: AdminChangePasswordComponent },
  { path: 'admin/post', component: AdminPostComponent },
  // librarian/*
  { path: 'librarian/profile', component: LibrarianProfileComponent },
  { path: 'librarian/add_book', component: LibrarianAddBookComponent },
  { path: 'librarian/reader/profile/:reader', component: ReaderProfileComponent },
  { path: 'librarian/reader/borrowed/:reader', component: ReaderBorrowingComponent },
  { path: 'librarian/reader/fine/:reader', component: ReaderFineComponent },
  { path: 'librarian/borrow', component: LibrarianBorrowComponent },
  { path: 'librarian/return', component: LibrarianReturnComponent },
  // reader/*
  { path: 'reader/profile', component: ReaderProfileComponent },
  { path: 'reader/borrowed', component: ReaderBorrowingComponent },
  { path: 'reader/fined', component: ReaderFineComponent },

  // testing url
  { path: 'librarian/other/profile/:librarian', component: LibrarianProfileComponent },
  { path: 'reset_password', component: ResetPasswordComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule { }
