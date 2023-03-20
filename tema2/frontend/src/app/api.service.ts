import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UdemyCourse } from './udemyCourse';
import { Observable, of } from 'rxjs';
import { University } from './University';
import { MyCourse } from './MyCourse';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private myCoursesUrl = 'http://localhost:5001/courses';
  private universityUrl = 'http://localhost:5001/universities';
  private udemyUrl = 'http://localhost:5001/udemyCourses?search';


  constructor(private httpClient: HttpClient) { }

  getUdemyCourses(searchParam: string): Observable<UdemyCourse[]> {
    const url = `${this.udemyUrl}=${searchParam}`;

    return this.httpClient.get<UdemyCourse[]>(url);
  }

  getUniversities(searchParam: string): Observable<University[]> {
    const url = `${this.universityUrl}/${searchParam}`;

    return this.httpClient.get<University[]>(url);
  }

  getMyCourses(): Observable<MyCourse[]> {
    return this.httpClient.get<MyCourse[]>(this.myCoursesUrl);
  }

  deleteCourse(id: number) {
    let url = `${this.myCoursesUrl}/${id}`;

    return this.httpClient.delete(url);
  }

  addCourse(course: MyCourse) {
    return this.httpClient.post<MyCourse>(this.myCoursesUrl, course);
  }
}
