import { Component, OnInit } from '@angular/core';
import {student} from '../model';
import {attendance} from '../model';
import { StudentService } from '../student.service';
import { AttendanceService } from '../attendance.service';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-search-attendance',
  templateUrl: './search-attendance.component.html',
  styleUrls: ['./search-attendance.component.css']
})
export class SearchAttendanceComponent implements OnInit {

  presentStudentList:Array<student> = []
  currDate=new Date().toISOString().slice(0,10);
  date=this.currDate;
  searchForm:FormGroup;
  constructor(private studentService:StudentService, private attendanceservice: AttendanceService,public datepipe:DatePipe,private router:Router) {
  this.searchForm= new FormGroup({
    attendancedate: new FormControl(),
    // statusall:new FormControl()
  });
  }
  ngOnInit(): void {
    this.loadData();
  }
  
  loadData(){
    this.presentStudentList= [];
     this.attendanceservice.getAll().subscribe((data)=>{
      data.forEach((student)=>{
        if(student.date==this.date){
          console.log(student);
          student.present.forEach((studentdata) => {
            this.presentStudentList.push(studentdata);
          });
        }
      })
     })
  }
  changeDate(){
    this.loadData();
  }

}