import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http'
import {BackendURI} from '../../config'
@Injectable({
  providedIn: 'root'
})
export class CarsService {

  constructor(private http:HttpClient) { }
  getCars(){
    return this.http.get(BackendURI+'/cars');
  }
  setCar(data:any){
    return this.http.post(BackendURI+'/cars',data);
  }
  deleteCar(id:any){
    console.log("deleteCar en cars service");
    return this.http.delete(BackendURI+'/cars/'+id);
  }
  updateCar(id:any,data:any){
    return this.http.put(BackendURI+"/cars/"+id,data);
  }
}
