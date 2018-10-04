import { NgModule } from '@angular/core';
import { RouterModule, Routes, Route } from '@angular/router';
import { LibrarianSearchBookComponent } from './librarian-search-book/librarian-search-book.component';
import { LibrarianAddBookComponent } from './librarian-add-book/librarian-add-book.component';
import { HomeComponent } from './home/home.component';
import { BookDetailComponent } from './book-detail/book-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'search_book', pathMatch: 'full' },
  { path: 'search_book', component: LibrarianSearchBookComponent },
  { path: 'add_book', component: LibrarianAddBookComponent },
  { path: 'detail/:ISBN', component: BookDetailComponent },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule { }
