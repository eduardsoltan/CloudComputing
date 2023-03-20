import { Component } from '@angular/core';
import { University } from '../University';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-universities',
  templateUrl: './universities.component.html',
  styleUrls: ['./universities.component.css']
})
export class UniversitiesComponent {
  universities: University[] = [];
  searchParam: string = '';

  constructor(private apiService: ApiService) {}

  getUniversities() {
    this.apiService.getUniversities(this.searchParam)
      .subscribe(universities => {
        console.log(universities);
        this.universities = universities;
      });
  }
}
