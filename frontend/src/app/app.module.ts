import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { UserService } from './services/user.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { AuthGuard } from './guards/auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { UserUpdateComponent } from './pages/user-update/user-update.component';
import { SearchPipe } from './pipes/search.pipe';
import { LoaderComponent } from './components/loader/loader.component';
import { ChatRoomComponent } from './pages/chat-room/chat-room.component';
import { ChatFeedComponent } from './components/chat-feed/chat-feed.component';
import { ChatListComponent } from './pages/chat-list/chat-list.component';
import { RandomUserProfileComponent } from './pages/random-user-profile/random-user-profile.component';
import { ChatService } from './services/chat.service';
import { ChatFormComponent } from './components/chat-form/chat-form.component';
import { AllusersComponent } from './pages/allusers/allusers.component';
 
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
    ChatListComponent,
    RandomUserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    UserService, AuthGuard, ChatService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
