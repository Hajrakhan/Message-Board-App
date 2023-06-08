import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { AppComponent } from '../app.component';
import { HomeComponent } from '../home/home.component';
import { Inject, Injectable } from '@angular/core';
import { globalVariables } from '../utils/global';
import { Subject } from 'rxjs';

export class WebSocketAPI {
    webSocketEndPoint: string = 'http://localhost:9090/ws';
    topic: string = "/topic/postChanged";
    stompClient: any;
    postListUpdated: Subject<any[]> = new Subject<any[]>();
     
    connect() {
        console.log("Initialize WebSocket Connection");
        let ws = new SockJS(this.webSocketEndPoint);
        this.stompClient = Stomp.over(ws);
        const _this = this;
        _this.stompClient.connect({}, function (frame :any) {
            _this.stompClient.subscribe(_this.topic, function (sdkEvent :any) {
                _this.onMessageReceived(sdkEvent);
            });
            //_this.stompClient.reconnect_delay = 2000;
        }, this.errorCallBack);
    };

    disconnect() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }
        console.log("Disconnected");
    }

    // on error, schedule a reconnection attempt
    errorCallBack(error: any) {
        console.log("errorCallBack -> " + error)
        setTimeout(() => {
            this.connect();
        }, 5000);
    }

 /**
  * Send message to sever via web socket
  * @param {*} message 
  */
    addPost(model : any) {
        console.log("calling logout api via web socket");
        this.stompClient.send("/app//addPost",{}, JSON.stringify(model));
    }
    updatePost(model: any) {
        console.log("calling updatePost API via WebSocket");
        return this.stompClient.send(`/app//updatePost`, {}, JSON.stringify(model));
    }
    
    deletePost(model : any) {
        console.log("calling logout api via web socket");
        this.stompClient.send("/app//deletePost",{}, JSON.stringify(model));
    }
    onMessageReceived(model: any) {
        const parsedMessage = JSON.parse(JSON.stringify(model));
        const updatedPostList = JSON.parse(parsedMessage.body);
        if (Array.isArray(updatedPostList)) {
          this.postListUpdated.next(updatedPostList);
        }
      }
      
   
}