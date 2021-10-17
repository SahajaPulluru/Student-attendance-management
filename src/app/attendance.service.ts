import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { attendance } from './model';
@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  attendanceData:Array<attendance> = [];
  constructor(private http:HttpClient) { }

  saveAttendance(attendance:attendance){
    this.attendanceData.push(attendance)
    return this.http.post(`https://615f2120af36590017204880.mockapi.io/attendance`,attendance)
  }
  getAll(){
    return this.http.get<Array<attendance>>('https://615f2120af36590017204880.mockapi.io/attendance')
  }

}