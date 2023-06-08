import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/user';
import { AuthenticationService } from './service';
import { AbstractControl } from '@angular/forms';
import { WebSocketAPI } from './service/web-socket';
import { globalVariables } from './utils/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent {

  // constructor(private router: Router) { }
  currentUser?: User;

  postList: any = [];

  connect(){
    this.webSocketAPI!.connect();
  }
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private webSocketAPI: WebSocketAPI    
) {
  this.authenticationService.currentUser.subscribe(x => this.currentUser = x!);

}

ngOnInit() {
}
disconnect(){
  this.webSocketAPI!.disconnect();
}

  HomeClick(){
    this.router.navigate(['Home']);
  }

  logout() {
    this.authenticationService.logout();
    globalVariables.postList=[];
    this.router.navigate(['/login']);
    this.disconnect();
}
}
