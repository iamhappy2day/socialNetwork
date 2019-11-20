import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { UserService } from './services/user.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from './guards/auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { UserUpdateComponent } from './user-update/user-update.component';
import { AllusersComponent } from './allusers/allusers.component';
import { SearchPipe } from './pipes/search.pipe';
import { LoaderComponent } from './loader/loader.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { ChatFormComponent } from './chat-room/chat-form/chat-form.component';
import { ChatFeedComponent } from './chat-room/chat-feed/chat-feed.component';
import { ChatListComponent } from './chat-list/chat-list.component';
 
@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    UserProfileComponent,
    UserUpdateComponent,
    AllusersComponent,
    SearchPipe,
    LoaderComponent,
    ChatRoomComponent,
    ChatFormComponent,
    ChatFeedComponent,
    ChatListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    UserService, AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
