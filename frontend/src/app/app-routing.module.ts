import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { AuthGuard } from './guards/auth.guard';
import { UserUpdateComponent } from './pages/user-update/user-update.component';
import { AllusersComponent } from './pages/allusers/allusers.component';
import { ChatRoomComponent } from './pages/chat-room/chat-room.component';
import { ChatListComponent } from './pages/chat-list/chat-list.component';
import { RandomUserProfileComponent } from './pages/random-user-profile/random-user-profile.component';

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
    path: 'users/:id',
    component: RandomUserProfileComponent,
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
    component: ChatRoomComponent,
    canActivate: [AuthGuard]  
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
