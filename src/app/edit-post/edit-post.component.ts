import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../service/http-provider.service';
import { postForm } from '../models/post.model';
import { AuthenticationService } from '../service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {
  editPostForm: postForm = new postForm();

  @ViewChild("postForm")
  postForm!: NgForm;

  isSubmitted: boolean = false;
  postId: any;

  constructor(private toastr: ToastrService, private route: ActivatedRoute,private auth:AuthenticationService, private router: Router,
    private httpProvider: HttpProviderService) { }

  ngOnInit(): void {
    this.postId = this.route.snapshot.params['postId'];
    this.getPostDetailById();
  }

  getPostDetailById() {
    this.httpProvider.getPostDetailById(this.postId).subscribe((data: any) => {
      if (data != null ) {
        var resultData = data;
        if (resultData) {
          this.editPostForm.postId = resultData.postId;
          this.editPostForm.message = resultData.message;
          this.editPostForm.timeStamp = resultData.timeStamp;
          this.editPostForm.userId = resultData.userId;
        }
      }
    },
      (error: any) => { });
  }

  EditPost(isValid: any) {
    this.isSubmitted = true;
    if (isValid) {

    this.toastr.success('Success');

      this.httpProvider.updatePost(this.editPostForm).subscribe(async data => {
        if (data != null ) {
          var resultData = data;
          if (resultData != null ) {
              this.toastr.success('Success');
              setTimeout(() => {
                this.router.navigate(['/Home']);
              }, 500);
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

