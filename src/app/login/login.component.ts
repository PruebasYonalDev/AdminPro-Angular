import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_Plugin();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame: boolean = false;
  auth2: any; // The Sign-In object.

  constructor(
    public router: Router,
    public UsuarioServices: UsuarioService
    ) { }

  ngOnInit() {
    init_Plugin();
    this.googleInit();

    this.email = localStorage.getItem('email') || '';

    if (this.email.length > 1) {
      this.recuerdame = true;
    }

  }

  googleInit() {

    gapi.load('auth2', () => {

      this.auth2 = gapi.auth2.init({
        client_id: '649830003148-528uer3jgk4cmsgus9avi11vsou8qnth.apps.googleusercontent.com',
        cookiepilocy: 'single_host_origin',
        scope: 'profile email'

      });

      this.attachSignin( document.getElementById('btnGoogle'));

    });

  }

  attachSignin( element ) {

    this.auth2.attachClickHandler( element, {}, ( googleUser ) => {

      // const profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;
      // console.log(token);

      this.UsuarioServices.loginGoogle(token)
      .subscribe( () => window.location.href = '#/dashboard');

    });
  }

  ingresar( forma: NgForm) {

    if (forma.invalid) {
      return;
    }

    const usuario = new Usuario(null, forma.value.email, forma.value.password);

    this.UsuarioServices.login(usuario, forma.value.recuerdame)
    .subscribe( res => this.router.navigate(['/dashboard']));
    // console.log(forma.value);

  }

}
