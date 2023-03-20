import { Component } from '@angular/core';
import { UdemyCourse } from '../udemyCourse';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-udemy-courses',
  templateUrl: './udemy-courses.component.html',
  styleUrls: ['./udemy-courses.component.css']
})
export class UdemyCoursesComponent {
  searchParam: string = '';
  courses: UdemyCourse[] = [];
  url: string = 'https://www.udemy.com';

  constructor(private apiService: ApiService) {
  }

  search() {
    this.apiService.getUdemyCourses(this.searchParam)
      .subscribe(courses => this.courses = courses);
  }
}
