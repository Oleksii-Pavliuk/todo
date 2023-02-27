import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';



// create User interface
export interface User { 
  id:number | null,
  username: string,
  password: string,
  admin: boolean
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users: User[] = [];

  // add user
  async addUser(user : User) {
    console.log(user)
    const urls = 'https://australia-southeast1-optimal-life-378201.cloudfunctions.net/addUser';
    const body = { "username": user.username, "password" : user.password };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    try {
      const response = await this.http.post(urls, body, {headers: headers}).toPromise();
      return response === 'ok';
    } catch (error) {
      console.error('Error checking user:', error);
      return false;
    }
  }

 

  // get users
  getUsers() {
    const urls = 'https://australia-southeast1-optimal-life-378201.cloudfunctions.net/getUsers';
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const req = this.http.post(urls, {headers: headers})
    
    req.subscribe((data: { data : User[]} | any ) => {
      data.data.forEach((user : User )=> {
        this.users.push(user)
      });
    });
  }

  // login user
  async checkUser(user: User): Promise<boolean> {
    console.log(user)
    const urls = 'https://australia-southeast1-optimal-life-378201.cloudfunctions.net/checkUser';
    const body = { "username": String(user.username), "password" : String(user.password) };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    try {
      const response = await this.http.post(urls, body, {headers: headers}).toPromise();
      return response === 200;
    } catch (error) {
      console.error('Error checking user:', error);
      return false;
    }
  }

  // delete user
  deleteuser(user: User) {
    const urls = 'https://australia-southeast1-optimal-life-378201.cloudfunctions.net/deleteUser';
    const body = { "id": user.id};
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const req = this.http.post(urls,body, {headers: headers})
    
    req.subscribe((data: string | any) => {
        return data == 'ok' ? true : false 
      });
  }


  constructor(private http: HttpClient){}

}