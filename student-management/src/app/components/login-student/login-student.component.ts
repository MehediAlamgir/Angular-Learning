import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StudentsService } from '../../students.service';
import {Router} from '@angular/router'
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login-student',
  templateUrl: './login-student.component.html',
  styleUrls: ['./login-student.component.css']
})
export class LoginStudentComponent {
  constructor(private student: StudentsService, private router:Router, private authService: AuthService) { }
  ngOnInit(): void {
    this.authService.setIsValid(false);
  }
  studentData: any = [];
  message: boolean = false;
  isValid: any = '';
  isSuccess: any = '';

  @Output() dataSent = new EventEmitter<string>();

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
        this.authService.setIsValid(true);
        this.authService.login();

        this.router.navigate(['list']);
      }
      else {
        this.isValid = "Invalid";
        this.isSuccess = "Failed";
        this.authService.setIsValid(false);
        console.log("Invalid User: " + this.isValid);
      }

      this.loginForm.reset();

    });
  }

  removeMessage() {
    this.message = false;
  }

}
