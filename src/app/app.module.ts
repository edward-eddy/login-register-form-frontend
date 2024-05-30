import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { RegisterComponent } from './components/register/register.component';
import { loginAuthService } from './services/login-auth.service';
import { UserService } from './services/user.service';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ToastrModule, provideToastr } from 'ngx-toastr';
import { tokenHeaderInterceptor } from './token-headder.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileEditComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    loginAuthService,
    UserService,
    provideAnimations(),
    provideToastr(),
    provideHttpClient(withFetch()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: tokenHeaderInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
