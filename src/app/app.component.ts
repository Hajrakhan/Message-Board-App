import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/user';
import { AuthenticationService } from './service';
import { AbstractControl } from '@angular/forms';
import { WebSocketAPI } from './service/web-socket';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent {

  // constructor(private router: Router) { }
  currentUser?: User;

  webSocketAPI?: WebSocketAPI;
  postList: any = [];

  connect(){
    this.webSocketAPI!.connect();
  }
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
) {
  this.authenticationService.currentUser.subscribe(x => this.currentUser = x!);

}

ngOnInit() {
  this.webSocketAPI = new WebSocketAPI(this);
}
disconnect(){
  this.webSocketAPI!.disconnect();
}

savePost(model: any){
  this.webSocketAPI!.send(model);
}

handleMessage(message: string) {
  const parsedMessage = JSON.parse(message);
  this.postList.push(JSON.parse(parsedMessage.body));
  console.log(this.postList);
}


  HomeClick(){
    this.router.navigate(['Home']);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
}
}
