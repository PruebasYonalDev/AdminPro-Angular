import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  procentaje1: number = 20;
  procentaje2: number = 30;

  constructor() { }

  ngOnInit() {
  }

  // actualizar( event: number ) {
  //   console.log('evento', event);
  //   this.procentaje1 = event;
  // }
}
