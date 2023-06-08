import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../service/http-provider.service';
import { postForm } from '../models/post.model';
import { AuthenticationService } from '../service';
import { AppComponent } from '../app.component';
import { HomeComponent } from '../home/home.component';
import { WebSocketAPI } from '../service/web-socket';

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
    private httpProvider: HttpProviderService,
    private webSocketAPI: WebSocketAPI
    
   ) { }

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
      this.editPostForm.userId.userId = this.auth.currentUserValue?.userId!;

      // Call the StompService to send the edited post data
  this.webSocketAPI!.updatePost(this.editPostForm);
  this.toastr.success('Success');

  this.router.navigate(['/Home']);
  }
}
}

