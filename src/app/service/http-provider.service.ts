import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from './web-api.service';

//var apiUrl = "https://localhost:44370/";

var apiUrl = "http://192.168.10.10:105";

var httpLink = {
  getAllPost: apiUrl + "/api/post/getAllPost",
  deletePostById: apiUrl + "/api/post/deletePostById",
  getPostDetailById: apiUrl + "/api/post/getPostDetailById",
  savePost: apiUrl + "/api/post/savePost"
}

@Injectable({
  providedIn: 'root'
})
export class HttpProviderService {

  constructor(private webApiService: WebApiService) { }

  public getAllPost(): Observable<any> {
    return this.webApiService.get(httpLink.getAllPost);
  }

  public deletePostById(model: any): Observable<any> {
    return this.webApiService.post(httpLink.deletePostById + '?postId=' + model, "");
  }

  public getPostDetailById(model: any): Observable<any> {
    return this.webApiService.get(httpLink.getPostDetailById + '?postId=' + model);
  }

  public savePost(model: any): Observable<any> {
    return this.webApiService.post(httpLink.savePost, model);
  }
  
}
