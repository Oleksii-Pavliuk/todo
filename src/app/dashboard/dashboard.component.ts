import { Component } from '@angular/core';

import { UsersService } from '../users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent {

  users = this.UsersService.getUsers();




  constructor( private UsersService: UsersService) {}

}
