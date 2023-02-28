import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

// Top bar
@Component({
  selector: 'top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent {
  user = sessionStorage.getItem('user')
  admin = sessionStorage.getItem('admin')
  logout(){
    sessionStorage.clear()
    this._snackBar.open('Loged out successfully', ' ', { duration: 500 })
    this.Router.navigate(['authenticate']);
 
  }


  constructor(
    private Router: Router,
    private _snackBar: MatSnackBar) {}
}
