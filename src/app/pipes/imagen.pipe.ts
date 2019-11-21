import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario' ): any {

    let url = URL_SERVICIOS + '/img';

    if (!img) {
      return url + '/noexiste/imagen';
    }

    if (img.indexOf('htts') >= 0) {
      return img;
    }

    switch (tipo) {
      case 'usuario':
        url += '/usuario/' + img;
        break;
      case 'medico':
        url += '/medico/' + img;
        break;
      case 'hospital':
        url += '/hospital/' + img;
        break;

      default:
        console.log('Tipo de usuario no existe, usuario, medico, hospital');
        url += '/noexiste/imagen';
        break;
    }
    return url;
  }

}
