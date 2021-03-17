import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';
import { User } from 'src/app/_models/User';
import { AuthService } from 'src/app/_services/auth.service';
import * as fromRoot from '../../app.reducer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit
// ,OnDestroy
{
  public loginForm: FormGroup;
  user: User = {};
  // isLoading = false;
  // changing it to observable of boolean type to get it from store.
  isLoading$: Observable<boolean>;
  private loadingSubs: Subscription;
  initializeForm(): void {
    this.loginForm = new FormGroup(
      {
        email: new FormControl('', { validators: [Validators.required, Validators.email] }),
        password: new FormControl('', { validators: [Validators.required] }),
      }
    );
  }
  constructor(
    private authService: AuthService,
    private uiService: UIService,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit(): void {
    // this.isLoading$ = this.store.pipe(map(state => state.ui.isLoading));
    this.isLoading$ = this.store.select(fromRoot.getIsLoadingState);
    this.initializeForm();
    // this.loadingSubs = this.uiService.loadingSubjectChanged.subscribe(isLoading => this.isLoading = isLoading);
  }
  // ngOnDestroy(): void {
  //   if (this.loadingSubs) {
  //     this.loadingSubs.unsubscribe();
  //   }
  // }
  onSubmit(): void {
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });

  }

}
