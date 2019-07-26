import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subcrition: Subscription;

  constructor() {


    this.subcrition = this.regresaObservable()
    // .pipe(
    //   retry(2)
    //   )
    .subscribe(
      // (numero: string) => console.log('Subs...', numero ),
      numero => console.log('Subs...', numero ),
      error => console.log('error en el intervalo'),
      () => console.log('Completado'));

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('Este componente se a cerrado..');
    this.subcrition.unsubscribe();
  }

  // regresaObservable(): Observable<number | string> {
  regresaObservable(): Observable<any> {

  return new Observable ( (subscribe: Subscriber<any>) => {

    let contador = 0;

    let interval = setInterval( () => {

      contador ++;

      const salida = {
        valor: contador
      };

      subscribe.next( salida );

      // if (contador === 3) {
      //   clearInterval(interval);
      //   subscribe.complete();
      // }

      // if (contador === 2) {
      //   clearInterval(interval);
      //   subscribe.error('Auxilio');
      // }

    }, 1000 );

  }).pipe(
    map( resp => resp.valor),
    filter( ( valor, index ) => {

      if ( (valor % 2) === 1) {
        return true;
      } else {
        return false;
      }

    })

  );

  // return obs;

  }

}
