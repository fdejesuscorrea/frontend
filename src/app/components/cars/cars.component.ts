import { Component, OnInit } from '@angular/core';
import {CarsService} from '../../services/cars.service';
import {Router} from '@angular/router'
import {ElementRef, ViewChild} from '@angular/core'
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
  @ViewChild("carImage", {
    read: ElementRef
  }) imagen?: ElementRef;
  @ViewChild("excelFile", {
    read: ElementRef
  }) excel?: ElementRef;
  excelFile?:File[];
  cars:any=[]
  carInfo:any={}
  carImage?:File[];
  editId?:string;
  carEdit?:any;
  flag?:boolean;
  constructor(private router :Router,private carsService:CarsService,private uploadService:UploadService) {
      this.flag=true;
   }
  ngOnInit(): void {
    this.initCars();
  }





  initCars(){
    this.carsService.getCars().subscribe(
      (res:any)=>{
        this.cars=res.cars;
      },
      (err:any)=>{
         this.router.navigate(["/signin"]);
      }
    );
   }
   create(){
     if(this.imagen){
      this.carImage = this.imagen.nativeElement.files;
  
     }
    const formData = new FormData();
    if(this.carImage){
      formData.append("file",this.carImage[0]);
  
    }
    const {licensePlate,carBrand,carModel,carDetail,repairDetail} = this.carInfo;
    console.log(licensePlate,carBrand,carModel,carDetail,repairDetail);
    formData.append("licensePlate",licensePlate);
    formData.append("carBrand",carBrand);
    formData.append("carModel",carModel);
    formData.append("carDetail",carDetail);
    formData.append("repairDetail",repairDetail);  
    this.carsService.setCar(formData).subscribe(
      (res:any)=>{
        this.initCars();
        this.showRegForm();
      },
      err=>{
        alert("La placa ingresada ya existe en el sistema");
      }
    );
  }

  uploadFile(){
    if(this.excel){
      this.excelFile = this.excel.nativeElement.files;
     }
     if(this.excelFile?.length==0){
        return alert("hay que ingresar un excel");
     }
     const formData = new FormData();
     if(this.excelFile){
        formData.append("excel",this.excelFile[0])
      }
      this.uploadService.uploadCars(formData).subscribe(
        (res:any)=>{
        this.initCars();
        this.initCars();
        this.initCars();
        }
      );
      this.initCars();
        this.initCars();
        this.initCars();

  }
  findImage(){
    alert("funcionalidd no incluida dentro de los criterios");
  }
  delete(id:any){
    const car = document.getElementById(id);
    if(confirm(`Estás seguro de que quieres borrar el auto de placa ${car?.firstChild?.textContent}?`)){
      this.carsService.deleteCar(id).subscribe(
        res=>{
          this.initCars();
        }
      );
      this.router.navigate(["/cars"]);
    }
  }
update(){
  const {licensePlate,carBrand,carModel,carDetail,repairDetail} = this.carInfo;
  if(this.imagen){
    this.carImage = this.imagen.nativeElement.files;
   }
  const formData = new FormData();
  if(this.carImage){
    formData.append("file",this.carImage[0]);
  }
  if(licensePlate){
    formData.append("licensePlate",licensePlate);
  }
  if(carBrand){
    formData.append("carBrand",carBrand);
  }
  if(carModel){
    formData.append("carModel",carModel);
  }
  if(carDetail){
    formData.append("carDetail",carDetail);
  }
  if(repairDetail){
    formData.append("repairDetail",repairDetail);
  }
    this.regFormToEditForm();
    this.showRegForm();
    this.flag=!this.flag;
    this.resetlabels();
    this.carsService.updateCar(this.editId,formData).subscribe(
      (res:any)=>{
        this.initCars();
      },
      err=>{
        alert("la placa ingresada no puede estar ya ingresada para otro vehiculo");
      }
    );
    this.router.navigate(["/cars"]);

  }
  





  showRegForm(){
    const form = document.getElementById("regForm");
    if(!form){
      return
    }
    if(form.style.display==="none"){
      form.style.display="";
    }else{
      form.style.display="none";
    }
    const addButton=document.getElementById("addButton");
    if(!addButton){return}
    if(addButton.innerHTML=="Añadir Auto"){
      addButton.innerHTML="Cancelar";
    }else{
      addButton.innerHTML="Añadir Auto";
    }
    
  }
 
resetlabels(){
  if(this.flag){
    const lip =document.getElementById("lip");
    const cab =document.getElementById("cab");
    const cam = document.getElementById("cam");
    const cad = document.getElementById("cad");
    const red = document.getElementById("red");
    const img = document.getElementById("info");
    if(lip && cab &&cam && cad && red && img){
      lip.innerHTML="Placa (aaa-###)";
      cab.innerHTML= "Marca";
      cam.innerHTML= "Modelo";
      cad.innerText="Detalles del Auto";
      red.innerHTML="Detalles de la Reparacion";
      img.innerHTML="";
    }
  }
  
}
showUpdate(id:any){
  this.flag=!this.flag;
  this.showRegForm();
  this.regFormToEditForm();
  if(id!="0"){
    console.log(id);
    this.editId=id;
  for(var i =0;i<this.cars.length;i++){
    if(this.cars[i].id==id){
      this.carEdit=this.cars[i];
      break;
    }

  }
  if(this.carEdit){
    const {licensePlate,carBrand,carModel,carDetail,repairDetail,carImage} =this.carEdit;
    const lip =document.getElementById("lip");
    const cab =document.getElementById("cab");
    const cam = document.getElementById("cam");
    const cad = document.getElementById("cad");
    const red = document.getElementById("red");
    const img = document.getElementById("info");
    if(lip && cab &&cam && cad && red && img){
      lip.innerHTML+="   actual: "+licensePlate;
      cab.innerHTML+= "    actual: "+carBrand;
      cam.innerHTML+= "    actual: "+carModel;
      cad.innerText+="     actual: "+carDetail;
      red.innerHTML+="     actual: "+repairDetail;
      img.innerHTML+="     actual: "+carImage;
    }
  }
  
  }else{

  }
  this.resetlabels();
}

regFormToEditForm(){
  const btnedit = document.getElementById("confirmEdit");
  const btncancel = document.getElementById("cancelEdit");
  const btnadd = document.getElementById("addButton");
  const btnconf=document.getElementById("confirmCreate");
  const transform=(btn:any)=>{
    if(btn){
      if(btn.style.display=="none"){
        btn.style.display="";
      }else{
        btn.style.display="none"
      }
    }    
  }
  transform(btnedit);
  transform(btncancel);
  transform(btnconf);
  if(btnadd){
    if(btnadd.style.display=="none"){
      btnadd.style.display="block";
    }else{
      btnadd.style.display="none"
    }
  }
}
}