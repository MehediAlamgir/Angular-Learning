import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { IDeactivateComponent } from '../../candeactivate-guard.service';

import { StudentsService } from '../../students.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements IDeactivateComponent{

  constructor(private student: StudentsService) { }
  addStudent = new FormGroup({

    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    dateOfBirth: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4), this.checkPasswordStrength]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(4), this.confirmPasswordValidator]),
    type: new FormControl('', Validators.required)

  });

  isSuccess: boolean = false;
  successMessage: string = "";
  submitted = false;
  onSubmit() {
    this.submitted = true;

    if (this.addStudent.invalid) {
      return;
    }

    this.student.saveStudentData(this.addStudent.value).subscribe((result: any) => {
      console.log(result);

      this.submitted = false;
      this.isSuccess = true;
      this.successMessage = "Student Added";
      this.addStudent.reset();
    });
  }

  removeMessage() {
    this.isSuccess = false;
  }

  get formControls() {
    return this.addStudent.controls;
  }

  checkPasswordStrength(control: AbstractControl): ValidationErrors | null {
    const password = control.value;
    if (!password) {
      return null;
    }

    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{4,}$/;
    if (!regex.test(password)) {
      return { invalidPassword: true };
    }

    return null;
  }

  confirmPasswordValidator(control: AbstractControl): { [key: string]: any } | null {
    const password = control.root.get('password');
    console.log("control.value: " + control.value);
    console.log("password.value: " + (password ? password.value : null));
    return password && control.value !== password.value ? { 'confirmPassword': true } : null;
  }

  canExit(){
    /*console.log("firstName: "+this.formControls.firstName.value+" lastName: "+ this.formControls.lastName.value+" gender: "+ this.formControls.gender.value+
                " dateOfBirth: "+this.formControls.dateOfBirth.value+" type: "+ this.formControls.type.value+" email: "+this.formControls.email.value+
                "password: "+this.formControls.password.value+" confirmPassword: "+this.formControls.confirmPassword.value);
    */
    if (this.formControls.firstName.value || this.formControls.lastName.value || this.formControls.gender.value ||
      this.formControls.dateOfBirth.value || this.formControls.type.value || this.formControls.email.value ||
      this.formControls.password.value || this.formControls.confirmPassword.value)
    {
      return confirm('You have unsaved chnages. Do you want to discard these change?');
    }
    else{
      return true;
    }

  }

}
