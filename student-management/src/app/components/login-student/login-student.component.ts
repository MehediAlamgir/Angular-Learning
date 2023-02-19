import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StudentsService } from '../../students.service';

@Component({
  selector: 'app-login-student',
  templateUrl: './login-student.component.html',
  styleUrls: ['./login-student.component.css']
})
export class LoginStudentComponent {
  constructor(private student: StudentsService) { }
  studentData: any = [];
  message: boolean = false;
  isValid: any = '';
  isSuccess: any = '';

  submitted = false;
  errorMessage: string | undefined;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  onSubmit() {
    this.submitted = true;

    this.student.getAllStudent().subscribe((result) => {
      console.log(result);

      this.studentData = result as Array<any>;
      const isEmailExists = this.studentData.find((user: any) => user.email == this.loginForm.value.email);
      const isPasswordExists = this.studentData.find((user: any) => user.password == this.loginForm.value.password);

      console.log("Email: " + isEmailExists + ",  Password: " + isPasswordExists);

      this.message = true;

      if (isEmailExists && isPasswordExists) {
        console.log("Valid User");
        this.isValid = "Valid";
        this.isSuccess = "Successfull";
      }
      else {
        this.isValid = "Invalid";
        this.isSuccess = "Failed";
        console.log("Invalid User: " + this.isValid);
      }

      this.loginForm.reset();

    });
  }

  removeMessage() {
    this.message = false;
  }

}
