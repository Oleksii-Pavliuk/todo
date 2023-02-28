import { Component, OnInit } from '@angular/core';
import { DataService, Task } from '../data.service';
import { ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.css']
})
export class UserHistoryComponent implements OnInit{

  tasks:  Task[] | undefined
  user : string | undefined


  ngOnInit() {
    // Get the product id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const usernameFromRoute = String(routeParams.get('username'));
    let items = this.DataService.getTasks(usernameFromRoute);
    this.tasks = items
    this.user = usernameFromRoute
  }

  constructor(
    private route: ActivatedRoute,
    private DataService: DataService
  ) {}
}
