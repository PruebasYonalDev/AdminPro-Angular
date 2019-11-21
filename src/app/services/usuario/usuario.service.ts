import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';

// RxJs
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any[] = [];

  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 5000
  });

  constructor(
    public http: HttpClient,
    public route: Router,
    public subirArchivoService: SubirArchivoService
  ) {

    this.cargarStorage();

  }

  estaLogeado() {
    return (this.token.length > 5 ) ? true : false;
  }

  cargarStorage() {
    if (localStorage.getItem('Token')) {

      this.token = localStorage.getItem('Token');
      this.usuario = JSON.parse(localStorage.getItem('Usuario'));
      this.menu = JSON.parse(localStorage.getItem('Menu'));

    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }

  guardarStorage( id: string, token: string, usuario: Usuario, menu: any ) {

    localStorage.setItem('Id', id);
    localStorage.setItem('Token', token);
    localStorage.setItem('Usuario', JSON.stringify(usuario));
    localStorage.setItem('Menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;

  }

  logout() {

    localStorage.removeItem('Token');
    localStorage.removeItem('Usuario');
    localStorage.removeItem('Id');
    localStorage.removeItem('Menu');

    this.route.navigate(['/login']);

  }

  loginGoogle( token: string) {

    const url = URL_SERVICIOS + '/login/google';

    return this.http.post( url, {token} )
    .pipe(
      map( (res: any) => {

        this.guardarStorage(res.id, res.token, res.usuario, res.menu);

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

        this.guardarStorage(res.id, res.token, res.usuario, res.menu);

        return true;

        }), catchError( err => {

          this.Toast.fire({
            type: 'error',
            title: 'Error al ingresar ' + err.error.mensaje
          });

          return throwError(err);

        })
      );

  }

   crearUsuario( usuario: Usuario) {

    const url = URL_SERVICIOS + '/usuarios';

    return this.http.post( url, usuario ).pipe(
      map( (res: any) => {

        this.Toast.fire({
          type: 'success',
          title: 'Usuario Creado'
        });
        return res.usuario;
      }), catchError( err => {

        this.Toast.fire({
          type: 'error',
          title: err.error.mensaje + err.error.errors.message
        });

        return throwError(err);

      }));

   }

   actualizarUsuario(usuario: Usuario) {

    let url = URL_SERVICIOS + '/usuarios/' + usuario._id;
    url += '?token=' + this.token;

    return this.http.put(url, usuario)
                .pipe(
                  map( (resp: any) => {

                    if (usuario._id === this.usuario._id) {
                      const usuarioDB: Usuario = resp.usuarios;
                      this.guardarStorage(usuarioDB._id, this.token, usuarioDB, this.menu);
                    }


                    Swal.fire('Usuario Actualizado!', usuario.nombre, 'success' );
                    return true;

                  }), catchError( err => {

                    this.Toast.fire({
                      type: 'error',
                      title: err.error.mensaje + err.error.errors.message
                    });

                    return throwError(err);

                  })
                );
   }

   cambiarImagen( archivo: File, id: string,  ) {

    this.subirArchivoService.subirArchivo(archivo, 'usuario', id )
        .then( (res: any) => {
        // .subscribe( (res: any) => {

          this.usuario.img = res.imgUsuarioGuardada.img;

          this.Toast.fire({title: 'Imagen Actualizada', type: 'success'});
          this.guardarStorage( id, this.token, this.usuario, this.menu );

        })
        .catch( res => {
          console.log( res );
        });

   }

   cargarUsuarios(desde: number = 0) {

    const url = URL_SERVICIOS + '/usuarios?desde=' + desde;

    return this.http.get( url );

   }

   buscarUsuarios(termino: string) {

    const url = URL_SERVICIOS + '/busqueda/coleccion/usuario/' + termino;

    return this.http.get(url)
        .pipe(
          map( (resp: any) => resp.usuario )
        );

   }

   borrarUsuario(id: string) {

    const url = URL_SERVICIOS + '/usuarios/' + id + '?token=' + this.token;

    return this.http.delete(url)
          .pipe(
            map( resp => Swal.fire('Usuario borrado', 'El usuario a sido eliminado correctamente', 'success'))
          );
   }
}
