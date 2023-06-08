import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AddPostComponent } from './add-post/add-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login';
import { RegisterComponent } from './register.ts';
import { AlertComponent } from './components';
import { ErrorInterceptor, JwtInterceptor } from './helpers';
import { fakeBackendProvider } from './helpers/fake.backend';
import { WebSocketAPI } from './service/web-socket';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddPostComponent,
    EditPostComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule,
  ],
  providers: [WebSocketAPI],
  bootstrap: [AppComponent],
})
export class AppModule {}
