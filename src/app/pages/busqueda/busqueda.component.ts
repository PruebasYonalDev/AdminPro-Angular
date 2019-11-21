import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Usuario } from 'src/app/models/usuario.model';
import { Hospital } from 'src/app/models/hospital';
import { MedicosModel } from 'src/app/models/medicos.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  usuarioModel: Usuario[] = [];
  hospitalModel: Hospital[] = [];
  medicoModel: MedicosModel[] = [];

  constructor(
    public activateRouter: ActivatedRoute,
    public http: HttpClient
  ) {
    this.activateRouter.params.subscribe(
      params => {
        const termino = params.termino;
        this.buscarGlobal(termino);
      }
    );
   }

  ngOnInit() {
  }

  buscarGlobal( termino: string ) {

    const url = URL_SERVICIOS + '/busqueda/todo/' + termino;

    return this.http.get( url )
          .subscribe(
            (resp: any) => {
              this.hospitalModel = resp.hospitales;
              this.medicoModel = resp.medicos;
              this.usuarioModel = resp.usuarios;
            }
          );

  }

}
