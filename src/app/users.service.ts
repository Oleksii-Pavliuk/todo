import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';



// create User interface
export interface User { 
  username: string,
  password: string,
  admin: boolean
}

 
const url = "http://localhost:3000/"

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  users: User[] = [];

  // add user
  async addUser(user : User): Promise<boolean> {
    console.log(user)
    const urls = url + 'addUser';
    const body = { "username": user.username, "password" : user.password };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    try {
      const response   = await this.http.post(urls, body, {headers: headers}).toPromise() as {data: [User],token: string};
      console.log(response)
      console.log(response.data[0].username)
      if (response.data[0].username !== undefined) {
        sessionStorage.setItem('user', String(response.data[0].username));
        sessionStorage.setItem('token', String(response.token))
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
    const urls = url + 'getUsers';
    const body = { };
    const token = sessionStorage.getItem('token')
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization','Bearer ' + token);
    const req = this.http.post(urls,body, {headers: headers})
    
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
    const urls = url + 'checkUser';
    const body = { "username": String(user.username), "password" : String(user.password) };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    try {
      const response   = await this.http.post(urls, body, {headers: headers}).toPromise() as {data: [User],token:string};
      console.log(response)
      console.log(response.data[0].username)
      if (response.data[0].username !== undefined) {
        sessionStorage.setItem('user', String(response.data[0].username));
        sessionStorage.setItem('token', String(response.token))
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
    const urls = url + 'deleteUser';
    const body = { "username": user.username};
    const token = sessionStorage.getItem('token')
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization','Bearer ' + token);
    const req = this.http.post(urls,body, {headers: headers})
    
    req.subscribe((data: string | any) => {
        return data == 'ok' ? true : false 
      });
  }


  constructor(private http: HttpClient){}

}