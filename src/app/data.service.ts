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
  addItem(name: unknown, description: unknown, user_id : number = 1) {
    const urls = 'https://australia-southeast1-optimal-life-378201.cloudfunctions.net/addTask';
    const body = { "name" : name, "description": description, "user_id" : user_id};
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


  // get tasks
  getTasks(user_id: number = 1) {
    this.items = []
    const urls = 'https://australia-southeast1-optimal-life-378201.cloudfunctions.net/getTasks';
    const body = { "user_id": user_id };
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
    const urls = 'https://australia-southeast1-optimal-life-378201.cloudfunctions.net/editTask';
    const body = { "name": name, "description" : description, "id" : id };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const req = this.http.post(urls,body, {headers: headers})
    
    req.subscribe((data: string| any ) => {
        return data == 'ok' ? true : false
    });
  }



  // change task
  changeitem(task: Task) {
    const urls = 'https://australia-southeast1-optimal-life-378201.cloudfunctions.net/changeTask';
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
    const urls = 'https://australia-southeast1-optimal-life-378201.cloudfunctions.net/translateTask';
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
    const urls = 'https://australia-southeast1-optimal-life-378201.cloudfunctions.net/deleteTask';
    const body = { "id" : task.id };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const req = this.http.post(urls,body, {headers: headers})
    
    req.subscribe((data: string| any ) => {
        return data == 'ok' ? true : false
    });
    const index =this.items.indexOf(task);

    const x = this.items.splice(index, 1);
  }


  constructor(private http: HttpClient){}
  

}
