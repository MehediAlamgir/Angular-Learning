import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  url = 'http://localhost:3000/students'
  constructor(private http: HttpClient) { }
  getAllStudent() {
    return this.http.get(this.url);

  }
  saveStudentData(data: any) {
    console.log(data);
    return this.http.post(this.url, data);
  }

  deleteStudent(studentID: any) {
    return this.http.delete(`${this.url}/${studentID}`);
  }

  getStudentById(id: any) {
    return this.http.get(`${this.url}/${id}`);
  }

  updateStudentData(id: number, data: any) {
    return this.http.put(`${this.url}/${id}`, data);
  }

  getStudentByEmail(email: any) {
    return this.http.get('http://localhost:3000/users?students=' + email);
  }

  private isValidSource = new BehaviorSubject<boolean>(false);
  isValidUser = this.isValidSource.asObservable();

  setIsValid(isValid: boolean) {
    this.isValidSource.next(isValid);
  }

}
