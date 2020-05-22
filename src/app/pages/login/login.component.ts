import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import {LoginService} from '../servicios/login.service';
import {Router} from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})

export class LoginComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  usuario: string;
  constructor(private formBuilder: FormBuilder, private _loginService: LoginService, private router: Router) { }
  usuarioValido: boolean;

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
        usuario: ['', Validators.required],
        password: ['', Validators.required]
      });
      //this._loginService.ValidarUsuario('test', '123456789');

  }

  get f() { return this.registerForm.controls; }

  onSubmit(form: NgForm){
    this.submitted = true;

    if(this.registerForm.invalid) {
      return;
    } else {
      if (this.registerForm.controls.usuario.value === 'admin' && this.registerForm.controls.password.value === '1234')
      {
        this.router.navigate(['/home']);
      } else {
        swal.fire('Advertencia', 'Usuario o contraseña incorrecto', 'warning')
      }
    }
  }

  onReset() {
    this.submitted = true;
  }


}