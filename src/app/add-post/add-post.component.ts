import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../service/http-provider.service';
import { postForm } from '../models/post.model';
import { AuthenticationService } from '../service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {
  addPostForm: postForm = new postForm();

  @ViewChild("postForm")
  postForm!: NgForm;

  isSubmitted: boolean = false;

  constructor(private router: Router,
    private auth:AuthenticationService,
    private httpProvider: HttpProviderService, private toastr: ToastrService,
    private appComponent:AppComponent
    ) { }

  ngOnInit(): void {
  }

  AddPost(isValid: any) {
    this.isSubmitted = true;
    if (isValid) {
      this.addPostForm.userId.userId=this.auth.currentUserValue?.userId!;
      this.appComponent.savePost(this.addPostForm)
      this.toastr.success('Success');

      this.router.navigate(['/Home']);

    }
  }

}

