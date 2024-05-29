import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { RegisterComponent } from './components/register/register.component';
import { loginGuard } from './login.guard';
import { userGuard } from './user.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
    canActivate: [userGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Registration',
    canActivate: [userGuard],
  },
  {
    path: '',
    component: ProfileEditComponent,
    title: 'Profile Edit Page',
    canActivate: [loginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
