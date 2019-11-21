import { Component, OnInit } from '@angular/core';
import { HospitalService } from 'src/app/services/service.index';
import { Hospital } from '../../models/hospital';
import Swal from 'sweetalert2';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit {

  hospital: Hospital [] = [];

  cargando: boolean = true;

  constructor(
    public hospitalService: HospitalService,
    public modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cragarHospitales();

    this.modalUploadService.notificacion
          .subscribe( () => this.cragarHospitales() );
  }

  crearHospital() {

    Swal.fire({
      title: 'Ingrese el nombre del hospital',
      input: 'text',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Bebes escribir el nombre del hospital!';
        }

        this.hospitalService.crearHospital(value)
              .subscribe( () => this.cragarHospitales() );
    }
  });

  }

  cragarHospitales() {

    this.cargando = true;

    this.hospitalService.cargarHospitales()
    .subscribe( hospitales => this.hospital = hospitales);
    this.cargando = false;

  }

  buscarHospital(termino: string) {

    if (termino.length <= 0) {
      this.cragarHospitales();
      return;
    }

    this.hospitalService.buscarHospital(termino)
                .subscribe(reciboHospitales => this.hospital = reciboHospitales);

  }

  actualizarHospital(hospital: Hospital) {

    return this.hospitalService.actualizarHospital(hospital).subscribe();

  }

  borrarHospital(hospital: Hospital) {

    this.hospitalService.borrarHospital(hospital._id)
          .subscribe(
            //  en esta funcion no se llama al parametro por que ya existe la funcion de swal en el servicio
            () => this.cragarHospitales()
          );

  }

  actualizarImagen(hospital: Hospital) {

    this.modalUploadService.mostrarModal('hospital', hospital._id)

  }

}
