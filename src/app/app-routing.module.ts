import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import {TasksComponent} from './tasks/tasks.component'
import { UserHistoryComponent } from './user-history/user-history.component';

const routes: Routes = [
  { path: '', component: TasksComponent},
  { path: 'tasks/:taskId', component: EditTaskComponent },
  { path: 'authenticate', component: AuthenticateComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'dashboard/:username', component: UserHistoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
