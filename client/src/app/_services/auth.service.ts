import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { config, Subject } from 'rxjs';
import { AuthData } from '../_models/auth-data.model';
import { User } from '../_models/user.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from './training.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UIService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';
import * as AUTH from '../auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private isAuthenticated = false;
  // We will be using the event emitter from rxjs called Subject 
  // which is an observable but like an event.
  // authChange = new Subject<boolean>();

  constructor(
    private router: Router,
    private angularFireAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UIService,
    private store: Store<fromRoot.State>) { }
  initAuthListener(): void {
    this.angularFireAuth.authState.subscribe(user => {
      if (user) {
        // this.isAuthenticated = true;
        this.store.dispatch(new AUTH.SetAuthenticated());
        // this.authChange.next(true);
        this.router.navigate(['/training']);
      }
      else {
        this.trainingService.cancelSubscriptions();
        // this.isAuthenticated = false;
        this.store.dispatch(new AUTH.SetUnauthenticated());
        // this.authChange.next(false);
        this.router.navigate(['/login']);
      }
    });
  }
  registerUser(authData: AuthData): void {
    // this.uiService.loadingSubjectChanged.next(true);
    // this.store.dispatch({type: 'START_LOADING'});
    this.store.dispatch (new UI.StartLoading());
    this.angularFireAuth.createUserWithEmailAndPassword(
      authData.email,
      authData.password)
      .then(result => {
        // this.uiService.loadingSubjectChanged.next(false);
        // this.store.dispatch({type: 'STOP_LOADING'});
        this.store.dispatch (new UI.StopLoading());
        console.log(result);
      })
      .catch(error => {
        // this.uiService.loadingSubjectChanged.next(false);
        // this.store.dispatch({type: 'STOP_LOADING'});
        this.store.dispatch (new UI.StopLoading());
        this.uiService.showSnackbar(error.message, 'Authentication Failed', 3000);
        console.log(error);
      });
  }
  login(authData: AuthData): void {
    // this.uiService.loadingSubjectChanged.next(true);
    // this.store.dispatch({type: 'START_LOADING'});
    this.store.dispatch (new UI.StartLoading());
    this.angularFireAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        // this.store.dispatch({type: 'STOP_LOADING'});
        this.store.dispatch (new UI.StopLoading());
        // this.uiService.loadingSubjectChanged.next(false);
        console.log(result);
      })
      .catch(error => {
        // this.uiService.loadingSubjectChanged.next(false);
        // this.store.dispatch({type: 'STOP_LOADING'});
        this.store.dispatch (new UI.StopLoading());
        this.uiService.showSnackbar(error.message, 'Authentication Failed', 3000);
        console.log(error);
      });

  }
  logout(): void {
    this.angularFireAuth.signOut();
  }
  // isAuth(): boolean {
  //   return this.isAuthenticated;
  // }
}
