import { Component } from '@angular/core';
import { StudentsService } from './students.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'student-management';
  isLoggedIn: boolean = false;

  constructor(private dataService: StudentsService) {}

  ngOnInit() {
    this.dataService.isValidUser.subscribe(isValid => {
      this.isLoggedIn = isValid;
    });
  }
}
