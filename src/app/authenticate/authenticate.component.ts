import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormControl, Validators,} from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

import { DataService } from '../data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent {

  authForm = this.formBuilder.group({     
    username: new FormControl( ' ' ,Validators.required) ,
    password: new FormControl('',Validators.required),
  
    });

    OnSubmit(action:string = 'Login'){
      if(action == 'Login'){
        if(this.DataService.checkUser({username: this.authForm.get('username')?.value as string, password: this.authForm.get('password')?.value as string})){
          this.cookieService.set('user', this.authForm.get('username')?.value as string);
          console.log('saved to local storage' + localStorage.getItem('user'))
        }else{
          this._snackBar.open('Wrong credentials', '', {duration:5000})
        }
      }else if(action == 'Register'){
        this.DataService.addUser({username: this.authForm.get('username')?.value as string, password: this.authForm.get('password')?.value as string})
        this.cookieService.set('user', this.authForm.get('username')?.value as string);
        console.log('saved to local storage' + localStorage.getItem('user'))
      }
      this.Router.navigate(['/']);
    }


    constructor(
      private Router: Router,
      private formBuilder : FormBuilder,
      private DataService: DataService,
      private cookieService: CookieService,
      private _snackBar: MatSnackBar,) {}

}
