import { Component } from '@angular/core';
import { MyCourse } from '../MyCourse';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css']
})
export class MyCoursesComponent {
  courses: MyCourse[] = [];
  newCourse: MyCourse = {
    id: 0,
    name: '',
    credits: 0,
    description: ''
  };

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.getCourses();
  }

  getCourses() {
    this.apiService.getMyCourses()
      .subscribe(courses => {
        console.log(courses);
        this.courses = courses
      });
  }

  addNewCourse() {
    this.apiService.addCourse(this.newCourse)
    .subscribe((c: MyCourse) => { 
      this.courses.push(c);
      this.newCourse.name = '';
      this.newCourse.credits = 0;
      this.newCourse.description = '';
    });
  }

  deleteCourse(course: MyCourse) {
    this.courses = this.courses.filter(elem => elem.id != course.id);

    this.apiService.deleteCourse(course.id).subscribe(result => {
      console.log(result);
    });
  }
}
