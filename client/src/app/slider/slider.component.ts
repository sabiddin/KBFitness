import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  counter = 0;

  constructor() { 
    setTimeout(() => {
      console.log(this.counter);
    }, 1000);
  }

  ngOnInit(): void {
  }

}
