import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormControl, Validators,} from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

import { UsersService } from '../users.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent {

  authForm = this.formBuilder.group({
    username: new FormControl( '' ,Validators.required) ,
    password: new FormControl('',Validators.required),

    });

    OnSubmit(action:string = 'Login'){
      if(action == 'Login'){
        this.UsersService.checkUser({username: this.authForm.get('username')?.value as string, password: this.authForm.get('password')?.value as string, admin: false})
        .then((result) => {
          if(result){
            this._snackBar.open('Welcome', sessionStorage.getItem('user') as string, {duration:5000})
            this.Router.navigate(['/']);
          }else{
            this._snackBar.open('Wrong credentials', '', {duration:5000})
          }
        })
      }else if(action == 'Register'){
        this.UsersService.addUser({ username: this.authForm.get('username')?.value as string, password: this.authForm.get('password')?.value as string, admin: false})
        .then((result) => {
          if(result){
            this._snackBar.open('Welcome', sessionStorage.getItem('user') as string, {duration:5000})
            this.Router.navigate(['/']);

          }else{
            this._snackBar.open('Wrong credentials', '', {duration:5000})
          }
      })
    }
    }


    constructor(
      private Router: Router,
      private formBuilder : FormBuilder,
      private UsersService: UsersService,
      private cookieService: CookieService,
      private _snackBar: MatSnackBar,) {}

}
