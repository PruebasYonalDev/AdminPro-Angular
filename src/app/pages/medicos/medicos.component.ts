import { Component, OnInit } from '@angular/core';
import { MedicosModel } from 'src/app/models/medicos.model';
import { MedicoService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  MedicosModel: MedicosModel [] = [];
  cargando: boolean = true;
  vacio: boolean = false;

  constructor(
    public medicoService: MedicoService
  ) { }

  ngOnInit() {

    this.cargarMedicos();

  }

  buscarMedico(termino: string) {

    if (termino.length <= 0) {
      this.cargarMedicos();
      return;
    }


    this.cargando = true;

    this.medicoService.buscarMedico(termino)
    .subscribe( (respMedico: MedicosModel[]) => {

      // if (!respMedico) {
      //   this.vacio = true;
      //   }

      this.MedicosModel = respMedico;
      this.cargando = false;

    });

  }

  cargarMedicos() {

    this.cargando = true;

    this.medicoService.cargarMedicos()
    .subscribe(respMedicos => this.MedicosModel = respMedicos);

    this.cargando = false;

  }

  borrarMedico( medico: MedicosModel ) {

    Swal.fire({
      title: 'Estas seguro?',
      text: 'Estas a punto de borrar a! ' + medico.nombre,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {

      if (result.value) {
        this.medicoService.borrarMedico(medico._id)
            .subscribe( usuarioBorrado => {
               console.log(usuarioBorrado);
               this.cargarMedicos();
              });
      }

    });

  }

}
