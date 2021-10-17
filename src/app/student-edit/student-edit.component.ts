import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../student.service';


@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {
  id: number = 0;
  studentForm: FormGroup;
  constructor(private activeRoute: ActivatedRoute,private router:Router,private userService:StudentService) {
    this.studentForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'class':new FormControl('',Validators.required),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'phoneNumber': new FormControl('', [Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      'semester': new FormControl('', Validators.required)
    })

  }


  ngOnInit(): void {
    this.activeRoute.params.subscribe((paramsData) => {
      this.id = paramsData.id;
      this.userService.getUserByID(paramsData.id).subscribe((data) => {
        console.log(data)
        delete data.id
        this.studentForm.setValue(data)
      })
    })



  }

submitStudent() {
 

  Object.keys(this.studentForm.controls).forEach(field => {
    const control = this.studentForm.get(field);
    if (control instanceof FormControl) {
      control.markAsTouched({ onlySelf: true });
    }
  });

  if(this.studentForm.valid){
    this.userService.updateUserById(this.id,this.studentForm.value).subscribe((data) => {
      this.router.navigate(["/student-list"])
    })
  }

}


}