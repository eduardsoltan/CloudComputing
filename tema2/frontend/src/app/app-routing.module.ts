import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyCoursesComponent } from './my-courses/my-courses.component';
import { UdemyCoursesComponent } from './udemy-courses/udemy-courses.component';
import { UniversitiesComponent } from './universities/universities.component';

const routes: Routes = [
  { path: 'myCourses', component: MyCoursesComponent },
  { path: 'udemyCourses', component: UdemyCoursesComponent },
  { path: 'universities', component: UniversitiesComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
