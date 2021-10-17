import { Component, OnInit } from '@angular/core';
import {student} from '../model';
import { StudentService } from '../student.service';
import { AttendanceService } from '../attendance.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currDate=new Date().toISOString().slice(0,10);
  date=this.currDate;
  totalStudents:number=0;
  present:number=0;
  constructor(private studentService:StudentService,private attendanceservice:AttendanceService) { 
    console.log(this.totalStudents);
  }

  ngOnInit(): void {
    this.gettotal();
    this.presentToday();
  }
  gettotal(){
    this.studentService.getAllUser().subscribe((data)=>{
        data.forEach((student)=>{
          this.totalStudents+=1;
        })
    })
  }
  presentToday(){
    this.attendanceservice.getAll().subscribe((data)=>{
      // console.log(data);
       data.forEach((student)=>{
         if(student.date==this.date){
           console.log(student);
           student.present.forEach((studentdata) => {
             this.present+=1;
           });
         }
       })
      })

  }
}