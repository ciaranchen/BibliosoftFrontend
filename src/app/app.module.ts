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
import { AdminHomeComponent } from './routes/admin/admin-home/admin-home.component';
import { LogoutComponent } from './routes/common/logout/logout.component';
import { AboutComponent } from './routes/common/about/about.component';
import { LoginComponent } from './routes/common/login/login.component';
import { PostComponent } from './components/post/post.component';
import { AdminManageLibrarianComponent } from './routes/admin/admin-manage-librarian/admin-manage-librarian.component';
import { LibrarianManageReaderComponent } from './routes/librarian/librarian-manage-reader/librarian-manage-reader.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LibrarianAddBookComponent,
    LibrarianSearchBookComponent,
    BookDetailComponent,
    MessagesComponent,
    AdminLoginComponent,
    AdminHomeComponent,
    LogoutComponent,
    AboutComponent,
    LoginComponent,
    PostComponent,
    AdminManageLibrarianComponent,
    LibrarianManageReaderComponent
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
