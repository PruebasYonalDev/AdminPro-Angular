import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Router } from '@angular/router';

declare function init_Plugin();

@Component({
  selector: 'app-nopage404',
  templateUrl: './nopage404.component.html',
  styles: [`
  .error-box {
    height: 100%;
    position: fixed;
    background: url(../../../assets/images/background/error-bg.jpg) no-repeat center center #fff;
    width: 100%; }
    .error-box .footer {
      width: 100%;
      left: 0px;
      right: 0px; }

  .error-body {
    padding-top: 5%; }
    .error-body h1 {
      font-size: 210px;
      font-weight: 900;
      text-shadow: 4px 4px 0 #ffffff, 6px 6px 0 #263238;
      line-height: 210px; }

  `]
})
export class Nopage404Component implements OnInit {

year: number = new Date().getFullYear();

  constructor(
    public usuarioService: UsuarioService,
    public router: Router
  ) { }

  ngOnInit() {
    init_Plugin();
  }

  regresar() {

    this.usuarioService.logout();
    this.router.navigate(['/login']);

  }

}
