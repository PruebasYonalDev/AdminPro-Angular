import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import Swal from 'sweetalert2';
import { MedicosModel } from 'src/app/models/medicos.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  medicoM: MedicosModel[] = [];

  totalMedicos: number = 0;

  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 5000
  });


  constructor(
    public http: HttpClient,
    public usuarioService: UsuarioService
  ) { }

  cargarMedicoId(id: string) {

    const url = URL_SERVICIOS + '/medico/' + id;

    return this.http.get(url)
          .pipe(
          map(
            (respMedicos: any) => respMedicos.medico
          ));

  }

  cargarMedicos() {

    const url = URL_SERVICIOS + '/medico';

    return this.http.get( url ).pipe(

      map((resp: any) => {

        this.totalMedicos = resp.total;
        return resp.medico;

        }

      ));
  }

  buscarMedico(termino: string) {

    const url = URL_SERVICIOS + '/busqueda/coleccion/medico/' + termino;

    return this.http.get(url)
        .pipe(
          map( (resp: any) => resp.medico )
        );

   }

   borrarMedico( id: string ) {

    const url = URL_SERVICIOS + '/medico/' + id + '?token=' + this.usuarioService.token;

    return this.http.delete(url)
          .pipe(
            map(
              (medicoEliminado: any) => {
              Swal.fire('Medico borrado', 'El medico ' + medicoEliminado.medico.nombre + ' a sido eliminado correctamente', 'success');
              return medicoEliminado;
            })
          );

   }

   guardarMedico(medico: MedicosModel) {

     if (medico._id) {
       // Actualizar
       const url = URL_SERVICIOS + '/medico/' + medico._id + '?token=' + this.usuarioService.token;

       return this.http.put(url, medico)
    .pipe(
      map(
      (medicoGuardado: any) => {

        this.Toast.fire({
          type: 'success',
          title: 'Medico ' + medicoGuardado.medico.nombre + ' Actualizado'
        });

        return medicoGuardado.medico;

      }));

    } else {
      // Guardar
    const url = URL_SERVICIOS + '/medico?token=' + this.usuarioService.token;

    return this.http.post(url, medico)
    .pipe(
      map(
      (medicoGuardado: any) => {

        this.Toast.fire({
          type: 'success',
          title: 'Medico ' + medicoGuardado.medico.nombre + ' Creado'
        });

        return medicoGuardado.medico;

    }));

    }


   }



}
