import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { EditStudentComponent } from './components/edit-student/edit-student.component';
import { ListStudentComponent } from './components/list-student/list-student.component';
import { LoginStudentComponent } from './components/login-student/login-student.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'add',
    component: AddStudentComponent

    /*
    Lazy loading path define syntax. Components has to be standalone for lazy loading. Here AddStudentComponent is not standalone
    components. That's why lazy loading is not working for AddStudentComponent component
    */

    //loadComponent:()=>import('./components/add-student/add-student.component').then(opt=>opt.AddStudentComponent)
    
  },
  {
    path: 'edit/:id',
    component: EditStudentComponent
  },
  {
    path: 'list',
    component: ListStudentComponent
  },
  {
    path: 'login',
    component: LoginStudentComponent
  },
  {
    path:"**",
    component:PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
