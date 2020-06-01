import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import {LoginService} from '../../services/login.service';
import {Router} from '@angular/router';
import swal from 'sweetalert2';
import {UsuarioNav} from '../../models/usuario.models';

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
  usuarioNav: UsuarioNav;
  constructor(private formBuilder: FormBuilder, private _loginService: LoginService, private router: Router) { 
   

  }
  usuarioValido: boolean;

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
        usuario: ['', Validators.required],
        password: ['', Validators.required]
      });
      this.usuarioNav = new UsuarioNav(0,0,'','','');

  }

  get f() { return this.registerForm.controls; }

  onSubmit(form: NgForm){
    this.submitted = true;

    if(this.registerForm.invalid) {
      return;
    } else {

      this._loginService.ValidarUsuario(this.registerForm.controls.usuario.value, this.registerForm.controls.password.value).subscribe(
        response => {
          
          this.usuarioNav.cve_usuario = Number.parseInt(response['cve_usuario'], 10);
          this.usuarioNav.cve_perfil = Number.parseInt(response['cve_perfil'], 10);
          this.usuarioNav.nombre_perfil = response['nombre_perfil'];
          this.usuarioNav.nombre_usuario = response['nombre_usuario'];
          this.usuarioNav.token = response['token'];
         
          
          if (this.usuarioNav.cve_usuario > 0 )
          {
            sessionStorage.setItem('cve_usuario_nav', this.usuarioNav.cve_usuario.toString());
            sessionStorage.setItem('cve_perfil_nav', this.usuarioNav.cve_perfil.toString());
            sessionStorage.setItem('nombre_perfil_nav', this.usuarioNav.nombre_perfil);
            sessionStorage.setItem('nombre_usuario', this.usuarioNav.nombre_usuario);
            sessionStorage.setItem('token', this.usuarioNav.token);

            this.router.navigate(['/home']);
          } else {
           swal.fire('Advertencia', 'Usuario o contraseña incorrecto', 'warning')
          }
        },
        error => {

          console.log(error);
        }
      );


    
    }
  }

  onReset() {
    this.submitted = true;
  }


}