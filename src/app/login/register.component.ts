import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import Swal from 'sweetalert2';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';


declare function init_Plugin();


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})

export class RegisterComponent implements OnInit {



  forma: FormGroup;

  constructor(
    public UsuarioServices: UsuarioService,
    public router: Router
  ) { }

  sonIguales( campo1: string, campo2: string) {

    // en esta funcion la respuesta debe de ser un NULL para que sea valido en caso contrario 
    // debe de retornar un TRUE

    return ( group: FormGroup ) => {

      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

      if ( pass1 === pass2 ) {
        return null;
      }

      return {
        sonIguales: true
      };

    };

  }

  ngOnInit() {
    init_Plugin();

    this.forma = new FormGroup({

      nombre: new FormControl(null, Validators.required),
      correo: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      condiciones: new FormControl(false)

    }, {
      // esta funcion trabaja con un formGroup
      validators: this.sonIguales( 'password', 'password2')
    });

    this.forma.setValue({
      nombre: 'test',
      correo: 'test@test.com',
      password: '123456',
      password2: '123456',
      condiciones: true
    });
  }

  resgistrarUsuario() {

    if (this.forma.invalid) {
      return;
    }

    if (!this.forma.value.condiciones) {

      Swal.fire(
        'Importate!',
        'Debes aceptar las condiciones!',
        'warning'
      );

      return;
    }

    const usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password,
    );

    this.UsuarioServices.crearUsuario( usuario )
        .subscribe(res => this.router.navigate(['/login']));
  }
}
