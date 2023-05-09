import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../service/http-provider.service';
import { postForm } from '../models/post.model';
import { AuthenticationService } from '../service';

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
    private httpProvider: HttpProviderService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  AddPost(isValid: any) {
    this.isSubmitted = true;
    if (isValid) {
      this.addPostForm.userId.userId=this.auth.currentUserValue?.userId!;

      this.httpProvider.savePost(this.addPostForm).subscribe(async data => {
        if (data != null ) {
          if (data != null ) {
            var resultData = data;
            if (resultData != null) {
              this.toastr.success('Success');
              setTimeout(() => {
                this.router.navigate(['/Home']);
              }, 500);
            }
          }
        }
      },
        async error => {
          this.toastr.error(error.message);
          setTimeout(() => {
            this.router.navigate(['/Home']);
          }, 500);
        });
    }
  }

}

