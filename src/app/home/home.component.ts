import { Component, Input, OnDestroy, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../service/http-provider.service';
import { User } from '../models/user';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../service';

@Component({
  selector: 'ng-modal-confirm',
  template: `
  <div class="modal-header">
    <h5 class="modal-title" id="modal-title">Delete Confirmation</h5>
    <button type="button" class="btn close" aria-label="Close button" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <p>Are you sure you want to delete?</p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">CANCEL</button>
    <button type="button" ngbAutofocus class="btn btn-success" (click)="modal.close('Ok click')">OK</button>
  </div>
  `,
})
export class NgModalConfirm {
  constructor(public modal: NgbActiveModal) { }
}

const MODALS: { [name: string]: Type<any> } = {
  deleteModal: NgModalConfirm,
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit,OnDestroy {
  closeResult = '';
  postList: any = [];
  currentUser: User=new User();
  currentUserSubscription: Subscription;
  constructor(private router: Router, private modalService: NgbModal,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService, private httpProvider : HttpProviderService) { 

      this.currentUserSubscription = this.authenticationService.currentUser.subscribe(x => this.currentUser = x ?? {} as User);


    }
    

  ngOnInit(): void {
    
   
    this.getAllPosts();

  }
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
}

  async getAllPosts() {
    this.httpProvider.getAllPost().subscribe((data : any) => {
      if (data != null ) {
        var resultData = data;
        if (resultData) {
          this.postList = resultData;
        }
      }
    },
    (error : any)=> {
        if (error) {
          if (error.status == 404) {
            if(error.error && error.error.message){
              // this.postList = [];
            }
          }
        }
      });
  }

  AddPost() {
    this.router.navigate(['AddPost']);
  }

  deletePostConfirmation(post: any) {
    this.modalService.open(MODALS['deleteModal'],
      {
        ariaLabelledBy: 'modal-basic-title'
      }).result.then((result) => {
        this.deletePost(post);
      },
        (reason) => {});
  }

  deletePost(post: any) {
    this.httpProvider.deletePostById(post).subscribe((data : any) => {
      if (data != null ) {
        var resultData = data;
        if (resultData != null ) {
          this.toastr.success('Deleted');
          this.getAllPosts();
        }
      }
    },
    (error : any) => {});
  }
}