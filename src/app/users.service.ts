import { Injectable } from '@angular/core';



// create User interface
export interface User { 
  id:number,
  username: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users: User[] = [];

  // add user
  addUser(user: User) {
    this.users.push(user);
  }

  // get users
  getUsers() {
    return this.users;
  }

  // login user
  checkUser(user: User){
    let accounts = this.getUsers()
    if(accounts.includes(user)){
      return true
    }else{
      return false
    }
  }

  // delete user
  deleteuser(user: User) {
    this.users.filter((obj) => {
      obj != user;
    });
  }
}
