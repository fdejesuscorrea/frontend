import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entercar',
  templateUrl: './entercar.component.html',
  styleUrls: ['./entercar.component.css']
})
export class EntercarComponent implements OnInit {
  carInfo:any={
    
  }
  constructor() { }

  ngOnInit(): void {
  }
  enterCar(){
    console.log("entering car");
  }

}
