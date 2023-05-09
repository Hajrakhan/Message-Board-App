import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiUrls } from '../utils/api-urls';


@Injectable({
  providedIn: 'root'
})
export class HttpProviderService {

  constructor(private httpClient: HttpClient) { }

  public getAllPost(): Observable<any> {
    return this.httpClient.get(apiUrls.getAllPost);
  }

  public deletePostById(model: any): Observable<any> {
    const url = `${apiUrls.deletePostById}/${model.postId}`;
  
    // Set the request headers
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    
    // Create the request options
    const options = {
      headers: headers,
      body: {
        userId: model.userId
      }
    };
  
    return this.httpClient.delete(url , options);;
  }

  public getPostDetailById(model: any): Observable<any> {
    return this.httpClient.get(apiUrls.getPostDetailById + '/' + model);
  }

  public savePost(model: any): Observable<any> {
    return this.httpClient.post(apiUrls.savePost, model);
  }

  public updatePost(model: any): Observable<any> {
    
    return this.httpClient.put(apiUrls.updatePost +'/' + model.postId, model);
  }
}
