import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor(
    public http: HttpClient
  ) { }


  subirArchivo( archivo: File, tipo: string, id: string) {

    return new Promise( (resolve, reject) => {

      let formData = new FormData();
      let xhr = new XMLHttpRequest();

      formData.append( 'imagen', archivo, archivo.name );

      xhr.onreadystatechange = () => {

        if (xhr.readyState === 4 ) {

          if (xhr.status === 200) {
            console.log( 'Imagen Subida' );
            resolve( JSON.parse( xhr.response ) );
          } else {
            console.log( 'Fallo Subida' );
            reject( xhr.response );
          }
        }
      };

      let url = URL_SERVICIOS + '/upload/' + tipo + '/' + id;

      xhr.open('PUT', url, true);
      xhr.send( formData );

    });
  }

  // subirArchivo(archivo: File, tipo: string, id: string) {
  //   const url = URL_SERVICIOS + '/upload/' + tipo + '/' + id;
  //   const formData: FormData = new FormData();
  //   formData.append('imagen', archivo, archivo.name);
  //   return this.http.put(url, formData, { reportProgress: true });
  //   }

}
