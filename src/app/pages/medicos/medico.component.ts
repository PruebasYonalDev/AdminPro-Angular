import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital';
import { MedicoService } from '../../services/medico/medico.service';
import { HospitalService } from 'src/app/services/service.index';
import { MedicosModel } from 'src/app/models/medicos.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitalModel: Hospital[] = [];
  medicoModel: MedicosModel = new MedicosModel('', '', '', '', '');
  hospital: Hospital = new Hospital('');

  constructor(
    public medicoService: MedicoService,
    public hospitalService: HospitalService,
    public router: Router,
    public activateRoute: ActivatedRoute,
    public modalUploadService: ModalUploadService
  ) {

    activateRoute.params.subscribe( params => {

      const id = params.id;

      if (id !== 'nuevo') {
        this.cargarMedicos(id);
      }

    });

   }

  ngOnInit() {
    this.hospitalService.cargarHospitales()
          .subscribe( respHospitales => this.hospitalModel = respHospitales);

    this.modalUploadService.notificacion.subscribe(resp => this.medicoModel.img = resp.imgMedicoGuadada.img);
  }

  cargarMedicos(id: string) {
    this.medicoService.cargarMedicoId(id)
          .subscribe(
            (respMedico: any) => {
              this.medicoModel = respMedico;
              this.medicoModel.hospital = respMedico.hospital._id;
              this.cambioHospital(this.medicoModel.hospital);
            }
          );
  }

  guardarMedico(f: NgForm) {

    if (!f.valid) {
      return;
    }

    this.medicoService.guardarMedico(this.medicoModel)
            .subscribe(
              medicoGuardado => {
                this.medicoModel._id = medicoGuardado._id;
                this.router.navigate(['/medico', medicoGuardado._id]);
              }
            );

  }

  cambioHospital(id: string) {

    this.hospitalService.obtenerHospital(id)
          .subscribe(
            respHospital => this.hospital = respHospital);

  }

  cambiarFoto() {

    this.modalUploadService.mostrarModal('medico', this.medicoModel._id);

  }

}
