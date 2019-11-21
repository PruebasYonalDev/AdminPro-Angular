import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';

import Swal from 'sweetalert2';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;

  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
    public usuarioService: UsuarioService,
    public modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarUsuarios();

    this.modalUploadService.notificacion.subscribe( resp =>  this.cargarUsuarios() );
  }

  mostrarModal(id: string) {
    this.modalUploadService.mostrarModal( 'usuario', id );
  }

  cargarUsuarios() {

    this.cargando = true;

    this.usuarioService.cargarUsuarios(this.desde)
          .subscribe((resp: any) => {

            this.totalRegistros = resp.total;
            this.usuarios = resp.usuarios;

            this.cargando = false;

          });

  }

  cambiarDesde(valor: number) {

    const desde = this.desde + valor;
    console.log(desde);

    if (desde >= this.totalRegistros) {
      return;
    }
    if (desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();

  }

  buscarUsuario( termino: string ) {

    if (termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;

    this.usuarioService.buscarUsuarios(termino)
    .subscribe( (usuarios: Usuario[]) => {

      this.usuarios = usuarios;
      this.cargando = false;

    });
  }

  borrarUsuario( usuario: Usuario ) {

    if (usuario._id === this.usuarioService.usuario._id) {
      Swal.fire( usuario.nombre, 'No te puedes borrar ti mismo!', 'error');
      return;
    }

    Swal.fire({
      title: 'Estas seguro?',
      text: 'Estas a punto de borrar a! ' + usuario.nombre,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {

      if (result.value) {
        this.usuarioService.borrarUsuario(usuario._id)
            .subscribe( usuarioBorrado => {
               console.log(usuarioBorrado);
               this.cargarUsuarios();
              });
      }

    });

  }

  guardarUsuarios( usuario: Usuario ) {

    this.usuarioService.actualizarUsuario(usuario)
          .subscribe();

  }

}
