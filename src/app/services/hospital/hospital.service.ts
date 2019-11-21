import { Injectable } from '@angular/core';
import { Hospital } from '../../models/hospital';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  totalHospitales: number = 0;

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

  cargarHospitales() {

    const url = URL_SERVICIOS + '/hospital';

    return this.http.get(url)
        .pipe(
          map((resp: any) => {
              this.totalHospitales = resp.total;
              return resp.hospitales;
            }
        ));

  }

  crearHospital(nombre: string) {

  const url = URL_SERVICIOS + '/hospital?token=' + this.usuarioService.token;

  // return this.http.post(url, nombre)
  return this.http.post(url, {nombre})
          .pipe(
          map( (resp: any) => {

            this.Toast.fire({
              type: 'success',
              title: 'Hospital Creado'
            });

            return resp.hospital;

          }));

  }

  actualizarHospital(hospital: Hospital) {
  // actualizarHospital(id: string) {

    const url = URL_SERVICIOS + '/hospital/' + hospital._id + '?token=' + this.usuarioService.token;

    return this.http.put(url, hospital)
        .pipe(
          map( (resp: any) => {

            Swal.fire('Hospital Actualizado!', hospital.nombre, 'success' );
            return resp.hospital;

          })
        );

  }

  buscarHospital(termino: string) {

    const url = URL_SERVICIOS + '/busqueda/coleccion/hospital/' + termino;

    return this.http.get(url)
        .pipe(
          map( (resp: any) => resp.hospital )
        );

  }

  borrarHospital(id: string) {

    const url = URL_SERVICIOS + '/hospital/' + id + '?token=' + this.usuarioService.token;

    return this.http.delete(url)
    .pipe(
      map( resp =>

        this.Toast.fire({
          type: 'success',
          title: 'Hospital Eliminado'
        })
    ));

  }

  obtenerHospital(id: string) {

    const url = URL_SERVICIOS + '/hospital/' + id;

    return this.http.get(url)
          .pipe(
            map( (resp: any) => resp.hospital)
          );

  }

}
