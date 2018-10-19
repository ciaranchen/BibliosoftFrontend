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
import {AboutComponent} from "./routes/common/about/about.component";
import {LibrarianBorrowComponent} from "./routes/librarian/librarian-borrow/librarian-borrow.component";
import {ManageUserComponent} from "./routes/common/manage-user/manage-user.component";
import {AdminChangePasswordComponent} from './routes/admin/admin-change-password/admin-change-password.component'
import {LibrarianViewFineComponent} from './routes/librarian/librarian-view-fine/librarian-view-fine.component'
const routes: Routes = [
  // common routes
  { path: '', component: HomeComponent },
  { path: 'search', component: LibrarianSearchBookComponent },
  { path: 'book/:ISBN', component: BookDetailComponent },
  { path: 'login/:role', component: LoginComponent },
  { path: 'manage/:role', component: ManageUserComponent },
  // admin/*
  { path: 'admin/home', component: AdminHomeComponent },
  { path: 'admin/login', component: AdminLoginComponent },
  { path: 'admin/change_password', component: AdminChangePasswordComponent },
  // librarian/*
  { path: 'librarian/add_book', component: LibrarianAddBookComponent },
  { path: 'librarian/view_fine', component: LibrarianViewFineComponent },
  // reader/*
  { path: 'reader/view_payment', component: ReaderViewPaymentComponent },
  // testing url
  { path: 'about', component: AboutComponent },
  { path: 'librarian_book', component: LibrarianBorrowComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule { }
