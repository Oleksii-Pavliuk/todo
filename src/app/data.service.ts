import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Timestamp} from 'rxjs';



// create Task interface 
export interface Task {
  id: number,
  name:string,
  description:string,
  deleted: boolean,
  translated: boolean,
  translated_date: Timestamp<number> | null,
  done: boolean,
  done_date: Timestamp<number> | null,
  user_id: number
}




@Injectable({
  providedIn: 'root'
})
export class DataService{
  items: Task[] = [];

  // add task to tasks
  addItem(name: unknown, description: unknown, username : string = 'test') {
    const urls = 'https://server-54cbxxg5ca-ts.a.run.app/addTask';
    const body = { "name" : name, "description": description, "username" : username};
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const req = this.http.post(urls,body, {headers: headers})
    
    req.subscribe((data: string| any ) => {
      return data == 'ok' ? true : false
    });
    this.items.push(    {
      id: this.items.length + 1,
      name: name as string,
      description: description as string,
      done: false,
      translated: false,
      deleted: false,
      translated_date: null,
      done_date: null,
      user_id: 0
    })
  }


  // get locac array of items
  getItems(refresh: boolean){
    if(refresh){
      this.getTasks()
    }
    return this.items
  }

  // get tasks
  getTasks(username: string = sessionStorage.getItem('user') as string  ) {
    this.items = []
    const urls = 'https://server-54cbxxg5ca-ts.a.run.app/getTasks';
    const body = { "username": username };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const req = this.http.post(urls,body, {headers: headers})
    
    req.subscribe((data: { data : Task[]} | any ) => {
      data.data.forEach((task : Task )=> {
        this.items.push(task)
      })
      // logs the array of items to the console
    })
    return this.items
  }


  // edit task
  editItem(name: unknown, description: unknown, id: number){
    const urls = 'https://server-54cbxxg5ca-ts.a.run.app/editTask';
    const body = { "name": name, "description" : description, "id" : id };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const req = this.http.post(urls,body, {headers: headers})
    
    req.subscribe((data: string| any ) => {
        return data == 'ok' ? true : false
    });
  }



  // change task
  changeitem(task: Task) {
    const urls = 'https://server-54cbxxg5ca-ts.a.run.app/changeTask';
    const body = { "id" : task.id };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const req = this.http.post(urls,body, {headers: headers})
    
    req.subscribe((data: string| any ) => {
        return data == 'ok' ? true : false
    });
    this.items.map((item) => {
      item === task? item.done = !item.done : item;
    });
  }



  // Translate item
  async translateItem(task: Task) : Promise<{ name: string; text: string; }> {
    const urls = 'https://server-54cbxxg5ca-ts.a.run.app/translateTask';
    const body = { "id" : task.id , "name" : task.name, "text" : task.description};
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    try {
      const response = await this.http.post(urls, body, {headers: headers}).toPromise();
      console.log(response)
      return response as {name: string, text: string}
    } catch (error) {
      console.error('Error checking user:', error);
      return {name: 'Error', text: error as string}
    }
  }



  // delete task
  deleteItem(task: Task) {
    const urls = 'https://server-54cbxxg5ca-ts.a.run.app/deleteTask';
    const body = { "id" : task.id };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const req = this.http.post(urls,body, {headers: headers})
    
    req.subscribe((data: string| any ) => {
        return data == 'ok' ? true : false
    });
    this.items.map((item) => {
      item === task? item.deleted= !item.deleted : item;
    });
  }


  constructor(private http: HttpClient){}
  

}
