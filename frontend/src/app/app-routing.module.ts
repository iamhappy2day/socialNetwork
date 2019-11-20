import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterPageComponent } from './register-page/register-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from './guards/auth.guard';
import { UserUpdateComponent } from './user-update/user-update.component';
import { AllusersComponent } from './allusers/allusers.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { ChatListComponent } from './chat-list/chat-list.component';

const routes: Routes = [
  { path: '', 
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { 
    path: 'users/user-profile/:id',
    component: UserProfileComponent,
    canActivate: [AuthGuard]  
  },
  { 
    path: 'users/user-profile/:id/update',
    component: UserUpdateComponent,
    canActivate: [AuthGuard]  
  },
  { 
    path: 'people',
    component: AllusersComponent,
    canActivate: [AuthGuard]  
  },
  { 
    path: 'chat',
    component: ChatRoomComponent,
    canActivate: [AuthGuard]  
  },
  { 
    path: 'users/user-profile/:id/messages',
    component: ChatListComponent,
    canActivate: [AuthGuard]  
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
