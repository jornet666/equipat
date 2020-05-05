import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  constructor(private formBuilder:FormBuilder,private router:Router) { }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
        usuario: ['',Validators.required],
        password: ['', Validators.required]

      });
  }

  get f() { return this.registerForm.controls; }

  onSubmit(){
    this.submitted = true;

    if(this.registerForm.invalid){
      return;
    }else{
      if(this.registerForm.controls['usuario'].value == 'admin' && this.registerForm.controls['password'].value == '1234'){
         this.router.navigate(['/menu']);
      }else{
        alert("Usuario inválido");
      }
     
    }
  }
  
  
  onReset(){
    this.submitted = true;
  }
}
