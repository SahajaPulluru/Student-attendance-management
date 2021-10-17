import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserModule } from '@angular/platform-browser';
import { AttendanceService } from '../attendance.service';
import { attendance } from '../model';
import { attendanceChart } from '../model';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

    months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    d = new Date();
  currMonth=(this.d.getMonth()+1).toString();
  monthName=this.months[this.d.getMonth()]; // "July" (or current month)
attendanceData:Array<attendanceChart>=[];
temp:Array<attendanceChart>=[];
view:any = [900, 250];

// options
showXAxis = true;
showYAxis = true;
gradient = false;
showXAxisLabel = true;
xAxisLabel = 'Date';
showYAxisLabel = true;
yAxisLabel = 'No. of Students';

colorScheme = {
  domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
};
  constructor(private attendanceservice: AttendanceService) {
   }

  ngOnInit(): void {
    this.loadData();
  }

  sortDate(a:any,b:any){                  //Comparator function for sorting the dates
    if ( a.date < b.date ){
      return -1;
    }
    if ( a.date > b.date ){
      return 1;
    }
    return 0;
  }
 loadData(){
    
     this.attendanceservice.getAll().subscribe((data)=>{
      data.sort(this.sortDate)                   
    
      data.forEach((date)=>{
        let month=date.date.slice(5,7);
        
      
        console.log(this.currMonth);
        if(this.currMonth===month){              
          let count=0;
        date.present.forEach((present)=>{
          count++;
        })
        this.temp.push({"name":date.date,"value":count})
        }
      })
     })
     this.attendanceData=this.temp;
     console.log(this.attendanceData);
  }

}