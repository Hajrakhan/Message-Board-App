import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ReactiveFormsModule } from '@angular/forms';

import { AlertService, AuthenticationService } from '../service';
import { AppComponent } from '../app.component';
import { HttpProviderService } from '../service/http-provider.service';
import { WebSocketAPI } from '../service/web-socket';

@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  loading = false;
  submitted = false;
  returnUrl?: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private appcomponent: AppComponent,
    private http: HttpProviderService,
    private webSocketAPI: WebSocketAPI
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm!.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm!.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService
      .login(this.f['username'].value, this.f['password'].value)
      .pipe(first())
      .subscribe(
        (data) => {
          this.appcomponent.connect();
          this.http.getAllPost().subscribe(
            (postList: any[]) => {
              if (postList && postList.length > 0) {
                this.webSocketAPI.postListUpdated.next(postList);
              }
              this.router.navigate([this.returnUrl]);
            },
            (error) => {
              this.alertService.error(error);
              this.loading = false;
            }
          );
        },
        (error) => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }
}
