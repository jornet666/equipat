import { Component, OnInit, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { HttpResponse, HttpClient, HttpHeaders } from '@angular/common/http';
//import { Observable} from 'rxjs/Observable';





@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }
  usuarioValido: boolean;
  urlApi = 'https://renoenlineaapi.azurewebsites.net/api/site/siteLogin';

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
        usuario: ['', Validators.required],
        password: ['', Validators.required]
      });
  }

  get f() { return this.registerForm.controls; }

  onSubmit(){
    this.submitted = true;

    if(this.registerForm.invalid){
      return;
    } else{

      this.ValidarUsuario(this.registerForm.controls['usuario'].value,this.registerForm.controls['password'].value);
      if(this.registerForm.controls['usuario'].value == 'admin' && this.registerForm.controls['password'].value == '1234')
      {
        this.router.navigate(['/home']);
      } else{
        alert('Usuario inválido');
      }
    }
  }
  
  ValidarUsuario(usuarioH: string, passwordH: string){
    // const body: ULogin= new ULogin[usuario = usuarioH, password =passwordH];
    
    const body = {usuario: usuarioH ,
                  password: passwordH };
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
        })
      };
    var res:any;

    this.http.post(this.urlApi,JSON.stringify(body), httpOptions).subscribe(data => res = data);
    console.log(JSON.stringify(body));
    console.log(res);

  }
  onReset(){
    this.submitted = true;
  }


}