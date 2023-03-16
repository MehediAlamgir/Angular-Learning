import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { StudentsService } from './students.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'student-management';
  isLoggedIn: boolean = false;

  constructor(private dataService: StudentsService, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.dataService.isValidUser.subscribe(isValid => {
      this.isLoggedIn = isValid;
    });
  }

  logout()
  {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
