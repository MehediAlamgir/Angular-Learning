import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuardService } from './candeactivate-guard.service';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { EditStudentComponent } from './components/edit-student/edit-student.component';
import { ListStudentComponent } from './components/list-student/list-student.component';
import { LoginStudentComponent } from './components/login-student/login-student.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { StudentGuardService } from './student-guard.service';

const routes: Routes = [
  {
    //Default route. In this case component name will not show in url. only root url will show
    path: '',
    component: LoginStudentComponent
  },
  /*{
    //Default route with redirect. In this case component name will show in url
    path:'',
    redirectTo:'login',
    pathMatch:'full'
  }, */
  {
    path: 'add',
    component: AddStudentComponent,
    canDeactivate:[CanDeactivateGuardService]

    /*
    Lazy loading path define syntax. Components has to be standalone for lazy loading. Here AddStudentComponent is not standalone
    components. That's why lazy loading is not working for AddStudentComponent component
    */

    //loadComponent:()=>import('./components/add-student/add-student.component').then(opt=>opt.AddStudentComponent)
    
  },
  {
    path: 'edit/:id',
    component: EditStudentComponent,
    canActivate: [StudentGuardService]
  },
  {
    path: 'list',
    component: ListStudentComponent,
    canActivate: [StudentGuardService]
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
