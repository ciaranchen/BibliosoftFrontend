import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibrarianSearchBookComponent } from './routes/librarian/librarian-search-book/librarian-search-book.component';
import { LibrarianAddBookComponent } from './routes/librarian/librarian-add-book/librarian-add-book.component';
import { HomeComponent } from "./routes/common/home/home.component";

import { BookDetailComponent } from './routes/common/book-detail/book-detail.component';
import { AdminLoginComponent } from './routes/admin/admin-login/admin-login.component';
import { AdminHomeComponent } from './routes/admin/admin-home/admin-home.component';
import {LoginComponent} from "./routes/common/login/login.component";
import {AdminManageLibrarianComponent} from "./routes/admin/admin-manage-librarian/admin-manage-librarian.component";

import { ReaderViewPaymentComponent } from './routes/reader/reader-view-payment/reader-view-payment.component';

const routes: Routes = [
  // common routes
  { path: '', component: HomeComponent },
  { path: 'book/:ISBN', component: BookDetailComponent },
  { path: 'login/:role', component: LoginComponent },
  // admin/*
  { path: 'admin/home', component: AdminHomeComponent },
  { path: 'admin/login', component: AdminLoginComponent },
  // librarian/*
  { path: 'librarian/add_book', component: LibrarianAddBookComponent },
  // reader/*
  { path: 'reader/view_payment', component: ReaderViewPaymentComponent },
  // testing url
  { path: 'search_book', component: LibrarianSearchBookComponent },
  { path: 'admin_librarian', component: AdminManageLibrarianComponent }

];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule { }
