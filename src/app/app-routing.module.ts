import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentCreateComponent } from './student-create/student-create.component';
import { StudentEditComponent } from './student-edit/student-edit.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { SearchAttendanceComponent } from './search-attendance/search-attendance.component';

const routes: Routes = [
  {
    path : "",
    component : DashboardComponent
  },
  {
    path : "dashboard",
    component : DashboardComponent
  },
  {
    path:"student-list",
    component:StudentListComponent,
  
  },
  {
    path:"student-create",
    component:StudentCreateComponent
    
  },
  {
    path:"student-edit/:id",
    component:StudentEditComponent
  },
  {
    path:"attendance-list",
    component:AttendanceComponent

  },
  {
    path:"search-attendance",
    component:SearchAttendanceComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }