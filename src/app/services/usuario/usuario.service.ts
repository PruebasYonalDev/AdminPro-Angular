import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient,
    public route: Router
  ) {
    this.cargarStorage();
  }

  estaLogeado() {
    return (this.token.length > 5 ) ? true : false;
  }

  cargarStorage() {
    if (localStorage.getItem('Token')) {

      this.token = localStorage.getItem('Token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));

    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  guardarStorage( id: string, token: string, usuario: Usuario ) {

    localStorage.setItem('Id', id);
    localStorage.setItem('Token', token);
    localStorage.setItem('Usuario', JSON.stringify(usuario));

  }

  logout() {

    localStorage.removeItem('Token');
    localStorage.removeItem('Usuario');
    localStorage.removeItem('Id');

    this.route.navigate(['/login']);

  }

  loginGoogle( token: string) {

    const url = URL_SERVICIOS + '/login/google';

    return this.http.post( url, {token} )
    .pipe(
      map( (res: any) => {

        this.guardarStorage(res.id, res.token, res.usuario);

        return true;

      })
    );
  }

  login( usuario: Usuario, recordar: boolean = false ) {

    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    const url = URL_SERVICIOS + '/login';

    return this.http.post(url, usuario )
    .pipe(
      map( (res: any) => {

        this.guardarStorage(res.id, res.token, res.usuario);

        return true;

        })
      );

  }

   crearUsuario( usuario: Usuario) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 5000
    });
    const url = URL_SERVICIOS + '/usuarios';

    return this.http.post( url, usuario ).pipe(
      map( (res: any) => {

        Toast.fire({
          type: 'success',
          title: 'Usuario Creado'
        });
        return res.usuario;
        // Swal.fire(
        //   'Usuario Creado!',
        //   usuario.email,
        //   'success'
        // );
      }));

   }
}
