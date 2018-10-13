import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './routes/common/home/home.component';
import { LibrarianAddBookComponent } from './routes/librarian/librarian-add-book/librarian-add-book.component';
import { LibrarianSearchBookComponent } from './routes/librarian/librarian-search-book/librarian-search-book.component';
import { BookDetailComponent } from './routes/common/book-detail/book-detail.component';
import { MessagesComponent } from './components/messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { AdminLoginComponent } from './routes/admin/admin-login/admin-login.component';
import { LibrarianLoginComponent } from './routes/librarian/librarian-login/librarian-login.component';
import { AdminHomeComponent } from './routes/admin/admin-home/admin-home.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LibrarianAddBookComponent,
    LibrarianSearchBookComponent,
    BookDetailComponent,
    MessagesComponent,
    AdminLoginComponent,
    LibrarianLoginComponent,
    AdminHomeComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
