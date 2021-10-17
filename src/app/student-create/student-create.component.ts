import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css']
})
export class StudentCreateComponent implements OnInit {

  studentForm:FormGroup
  constructor(private studentService:StudentService,private router:Router) {
    this.studentForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'class':new FormControl('',Validators.required),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'phoneNumber': new FormControl('', [Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      'semester': new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
  }

  submitStudent(){
    Object.keys(this.studentForm.controls).forEach(field => {
      const control = this.studentForm.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      }
    });

    if(this.studentForm.valid){
      console.log(this.studentForm.value);
      this.studentService.saveStudent(this.studentForm.value).subscribe(() => {
        this.router.navigate(['/student-list'])
      },() => {
        alert("Something Went Wrong")
      })
      
    }
  }

}