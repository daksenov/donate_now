import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserModel } from './models/user.model';
import { Subject } from 'rxjs/Subject';

/**
 * Very simple auth service for demo purposes
 */
@Injectable()
export class AuthService {

  public profile: UserModel;

  public userLoggedIn$: Subject<boolean> = new Subject();

  constructor(
    private router: Router,
  ) {

  }

  authorizeUser(userdata: User) {
    this.profile = new UserModel(userdata);
    localStorage.setItem('profile', JSON.stringify(this.profile));
    this.userLoggedIn$.next(true);
  }

  logout(): Promise<boolean> {
    localStorage.removeItem('profile');
    this.userLoggedIn$.next(false);
    return this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    let profile = this.getProfile();
    return !!profile;
  }

  getProfile(): UserModel {
    if (!this.profile) {
      let data = localStorage.getItem('profile');
      this.profile = JSON.parse(data);
    }

    let loggedIn = !!this.profile;
    this.userLoggedIn$.next(loggedIn);

    return this.profile;
  }
}
