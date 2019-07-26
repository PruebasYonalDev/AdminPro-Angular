import { Component, OnInit } from '@angular/core';

declare function init_Plugin();


@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_Plugin();
  }

}
