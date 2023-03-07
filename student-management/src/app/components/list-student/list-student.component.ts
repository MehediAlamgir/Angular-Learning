import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../../students.service';


@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.css']
})
export class ListStudentComponent {
  constructor(private student: StudentsService) { }
  studentData: any = [];
  searchText: string = '';

  ngOnInit(): void {
    this.student.getAllStudent().subscribe((allData) => {
      console.log(allData);
      this.studentData = allData;
    });
  }

  deleteStudent(studentId: any) {
    //console.log(studentId);
    this.student.deleteStudent(studentId).subscribe((result) => {
      console.log(result);
      this.ngOnInit();
    });
  }

  onSearchTextEntered(searchValue: string) {
    this.searchText = searchValue;
    //console.log("searchValue: "+this.searchText);
  }
}
