import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

// Top bar
@Component({
  selector: 'top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent {
  user = this.cookieService.get('user')
  logout(){
    this.cookieService.deleteAll()
    this.Router.navigate(['/']);
  }

  constructor(private cookieService: CookieService,
    private Router: Router,) { }
}
