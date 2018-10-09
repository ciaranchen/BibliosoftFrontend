import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibrarianSearchBookComponent } from './routes/librarian/librarian-search-book/librarian-search-book.component';
import { LibrarianAddBookComponent } from './routes/librarian/librarian-add-book/librarian-add-book.component';
import { HomeComponent } from "./routes/home/home.component";

import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { AdminLoginComponent } from './routes/admin/admin-login/admin-login.component';
import { LibrarianLoginComponent } from './routes/librarian/librarian-login/librarian-login.component';
import { AdminHomeComponent } from './routes/admin/admin-home/admin-home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  // admin/*
  { path: 'admin/home', component: AdminHomeComponent },
  { path: 'admin/login', component: AdminLoginComponent },
  // librarian/*
  { path: 'librarian/login', component: LibrarianLoginComponent },
  // reader/*

  // testing url
  { path: 'search_book', component: LibrarianSearchBookComponent },
  { path: 'add_book', component: LibrarianAddBookComponent },
  { path: 'detail/:ISBN', component: BookDetailComponent },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule { }
