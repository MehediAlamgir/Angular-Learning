import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AddStudentComponent } from "./components/add-student/add-student.component";

export interface IDeactivateComponent{
    canExit: () => Observable<boolean> | Promise<boolean> | boolean;
}

export class CanDeactivateGuardService implements CanDeactivate<IDeactivateComponent>{
    canDeactivate(component: IDeactivateComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState: RouterStateSnapshot) {
        return component.canExit();
    }
    
}