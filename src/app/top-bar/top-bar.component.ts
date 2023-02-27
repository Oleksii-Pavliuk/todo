import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../users.service';

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
    this.Router.navigate(['/']);
  }

  constructor(
    private Router: Router) { }
}
