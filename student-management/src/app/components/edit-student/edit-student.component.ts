import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StudentsService } from '../../students.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent {
  constructor(private student: StudentsService, private router: ActivatedRoute) { }

  editStudent = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    dateOfBirth: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    type: new FormControl('', Validators.required)
  });

  isSuccess: boolean = false;
  successMessage: string = "";
  submitted = false;

  ngOnInit(): void {
    //console.log(this.router.snapshot.params['id']);
    this.student.getStudentById(this.router.snapshot.params['id']).
      subscribe((result: any) => {
        console.log(result);
        this.editStudent = new FormGroup({
          firstName: new FormControl(result['firstName']),
          lastName: new FormControl(result['lastName']),
          gender: new FormControl(result['gender']),
          dateOfBirth: new FormControl(result['dateOfBirth']),
          email: new FormControl(result['email']),
          type: new FormControl(result['type'])
        });
      });
  }

  updateData() {
    this.submitted = true;

    if (this.editStudent.invalid) {
      return;
    }

    this.student.updateStudentData(this.router.snapshot.params['id'], this.editStudent.value).
      subscribe((result) => {
        console.log(result);
        this.isSuccess = true;
        this.submitted = false;
        this.successMessage = "Student Data Updated."
      })
  }

  removeMessage() {
    this.isSuccess = false;
  }

  get formControls() {
    return this.editStudent.controls;
  }

}
