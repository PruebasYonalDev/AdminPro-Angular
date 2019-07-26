import { Component, OnInit, Inject, ElementRef } from '@angular/core';

import { SettingsService } from 'src/app/services/service.index';
// import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(
    // @Inject(DOCUMENT) private _document,
    public _ajustes: SettingsService
    ) {}

  ngOnInit() {
    this.colocarCheck();
  }

  cambiarColor(link: any, tema: string) {
  // console.log(link);

  this.aplicarCheck(link);

  this._ajustes.aplicarTema(tema);

  }

  aplicarCheck(link: any) {

    let selector: any = document.getElementsByClassName('selector');

    for ( let ref of selector ) {
      ref.classList.remove('working');
    }

    link.classList.add('working');
  }

  colocarCheck() {

    let selector: any = document.getElementsByClassName('selector');

    let tema = this._ajustes.ajustes.tema;

    for ( let ref of selector ) {
      if (ref.getAttribute('data-theme') === tema) {
        ref.classList.add('working');
        break;
      }
    }
  }

}
