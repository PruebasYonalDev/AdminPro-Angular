import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { SubirArchivoService } from '../../services/subirArchivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {


  subirImagen: File;
  imagenTemp: any;

  constructor(
    public subirArchivoService: SubirArchivoService,
    public modalUploadService: ModalUploadService
  ) { }

  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 5000
  });


  ngOnInit() {
  }

  cerrarModal() {
    this.subirImagen = null;
    this.imagenTemp = null;

    this.modalUploadService.ocultarModal();
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

  subirImgen() {

    this.subirArchivoService.subirArchivo(this.subirImagen, this.modalUploadService.tipo, this.modalUploadService.id )
          // .then(resp => {
          .then(resp => {
            console.log( resp );
            this.modalUploadService.notificacion.emit( resp );
            this.cerrarModal();

            this.Toast.fire({
              type: 'success',
              title: 'Imagen de usuario actualizada'
            });

          })
          .catch(error => {
              console.log('error al cargar...');
          });

  }
}
