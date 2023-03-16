import { BehaviorSubject } from "rxjs";

export class AuthService {
    private loggedIn: boolean = false;

    private isValidSource = new BehaviorSubject<boolean>(false);
    isValidUser = this.isValidSource.asObservable();

    setIsValid(isValid: boolean) {
      this.isValidSource.next(isValid);
    }

    login(){
        this.loggedIn = true;
    }

    logout(){
        this.loggedIn = false;
    }

    isAuthenticated() {
        return this.loggedIn;
    }

}