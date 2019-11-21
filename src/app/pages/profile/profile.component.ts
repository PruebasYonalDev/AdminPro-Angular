import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  subirImagen: File;
  imagenTemp: any;

  constructor(
    public usuarioService: UsuarioService
  ) {
    this.usuario = this.usuarioService.usuario;
   }

  ngOnInit() {
  }

  guardar(usuario: Usuario) {

    if (!this.usuario.google) {
      this.usuario.email = usuario.email;
    }
    this.usuario.nombre = usuario.nombre;

    this.usuarioService.actualizarUsuario( this.usuario )
                .subscribe();
  }

  seleccionImagen( archivo: File ) {

    if ( !archivo ) {
      this.subirImagen = null;
      return;
    }

    if ( archivo.type.indexOf('image') < 0 ) {
      Swal.fire(
          'Solo Imágenes!',
          'El archivo seleccionado no es una imagen',
          'error'
        );
      this.subirImagen = null;
      return;
      }

    this.subirImagen = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => this.imagenTemp = reader.result;

  }

  cambiarImagen() {

    this.usuarioService.cambiarImagen( this.subirImagen, this.usuario._id );

  }

}
