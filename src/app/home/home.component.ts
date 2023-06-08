import { Component, Input, OnDestroy, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../service/http-provider.service';
import { User } from '../models/user';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../service';
import { globalVariables } from '../utils/global';
import { WebSocketAPI } from '../service/web-socket';

@Component({
  selector: 'ng-modal-confirm',
  template: `
    <div class="modal-header">
      <h5 class="modal-title" id="modal-title">Delete Confirmation</h5>
      <button
        type="button"
        class="btn close"
        aria-label="Close button"
        aria-describedby="modal-title"
        (click)="modal.dismiss('Cross click')"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>Are you sure you want to delete?</p>
    </div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-outline-secondary"
        (click)="modal.dismiss('cancel click')"
      >
        CANCEL
      </button>
      <button
        type="button"
        ngbAutofocus
        class="btn btn-success"
        (click)="modal.close('Ok click')"
      >
        OK
      </button>
    </div>
  `,
})
export class NgModalConfirm {
  constructor(public modal: NgbActiveModal) {}
}

const MODALS: { [name: string]: Type<any> } = {
  deleteModal: NgModalConfirm,
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  closeResult = '';
  public postList: any[] = [];
  currentUser: User = new User();
  currentUserSubscription: Subscription;
  postListSubscription?: Subscription;
  constructor(
    private router: Router,
    private modalService: NgbModal,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService,
    private webSocketAPI: WebSocketAPI
  ) {
    this.currentUserSubscription =
      this.authenticationService.currentUser.subscribe(
        (x) => (this.currentUser = x ?? ({} as User))
      );
  }

  ngOnInit(): void {
    this.postList = globalVariables.postList;
    this.postListSubscription = this.webSocketAPI.postListUpdated.subscribe(
      (updatedPostList) => {
        this.postList = updatedPostList;
      }
    );
  }
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }

  AddPost() {
    this.router.navigate(['AddPost']);
  }

  deletePostConfirmation(post: any) {
    this.modalService
      .open(MODALS['deleteModal'], {
        ariaLabelledBy: 'modal-basic-title',
      })
      .result.then(
        (result) => {
          this.deletePost(post);
        },
        (reason) => {}
      );
  }

  deletePost(post: any) {
    this.webSocketAPI.deletePost(post);
    this.toastr.success('Deleted');
  }
}
