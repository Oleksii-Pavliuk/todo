import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';



// create User interface
export interface User { 
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
  async addUser(user : User): Promise<boolean> {
    console.log(user)
    const urls = 'https://server-54cbxxg5ca-ts.a.run.app/addUser';
    const body = { "username": user.username, "password" : user.password };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    try {
      const response   = await this.http.post(urls, body, {headers: headers}).toPromise() as {data: [User]};
      console.log(response)
      console.log(response.data[0].username)
      if (response.data[0].username !== undefined) {
        sessionStorage.setItem('user', String(response.data[0].username));
      }else{
        return false
      }
      if (response.data[0].admin == true){
        sessionStorage.setItem('admin', 'true')
      }
      return true  
    } catch (error) {
      console.error('Error checking user:', error);
      return false
    }
  }

 

  // get users
  getUsers() {
    this.users = []
    const urls = 'https://server-54cbxxg5ca-ts.a.run.app/getUsers';
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const req = this.http.post(urls, {headers: headers})
    
    req.subscribe((data : User[] | any) => {
      console.log(data)
      data.forEach((user : User )=> {
        this.users.push(user)
      });
    });
    return this.users
  }

  // login user
  async checkUser(user: User): Promise<boolean> { 
    console.log(user)
    const urls = 'https://server-54cbxxg5ca-ts.a.run.app/checkUser';
    const body = { "username": String(user.username), "password" : String(user.password) };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    try {
      const response   = await this.http.post(urls, body, {headers: headers}).toPromise() as {data: [User]};
      console.log(response)
      console.log(response.data[0].username)
      if (response.data[0].username !== undefined) {
        sessionStorage.setItem('user', String(response.data[0].username));
      }else{
        return false
      }
      if (response.data[0].admin == true){
        sessionStorage.setItem('admin', 'true')
      }
      return true  
    } catch (error) {
      console.error('Error checking user:', error);
      return false
    }
  }

  // delete user
  deleteuser(user: User) {
    const urls = 'https://server-54cbxxg5ca-ts.a.run.app/deleteUser';
    const body = { "username": user.username};
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const req = this.http.post(urls,body, {headers: headers})
    
    req.subscribe((data: string | any) => {
        return data == 'ok' ? true : false 
      });
  }


  constructor(private http: HttpClient){}

}