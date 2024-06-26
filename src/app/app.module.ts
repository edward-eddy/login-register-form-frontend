import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { RegisterComponent } from './components/register/register.component';
import { loginAuthService } from './services/login-auth.service';
import { UserService } from './services/user.service';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ToastrModule, provideToastr } from 'ngx-toastr';
import { tokenHeaderInterceptor } from './token-headder.interceptor';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { OtpComponent } from './components/otp/otp.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileEditComponent,
    RegisterComponent,
    SideNavComponent,
    OtpComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
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
    provideHttpClient(withInterceptorsFromDi()),

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
