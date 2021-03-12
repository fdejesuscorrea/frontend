import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http'
import {BackendURI} from '../../config'

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http:HttpClient) { }
  uploadCars(fd:FormData){
    return this.http.post(BackendURI+'/upload',fd);
  }
}
