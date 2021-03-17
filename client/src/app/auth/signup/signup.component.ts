import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';
import { User } from 'src/app/_models/User';
import { AuthService } from 'src/app/_services/auth.service';
import * as fromRoot from '../../app.reducer';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit
// , OnDestroy 
{
  maxDate;
  user: User = {};

  // isLoading = false;
  isLoading$: Observable<boolean>;
  // private loadingSubs: Subscription;

  constructor(
    private authService: AuthService,
    private uiService: UIService,
    private store: Store<{ui: fromRoot.State}>) { }
  ngOnInit(): void {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    // this.loadingSubs = this.uiService.loadingSubjectChanged.subscribe(isLoading => this.isLoading = isLoading);
    this.isLoading$ = this.store.select(fromRoot.getIsLoadingState);
  }
  // ngOnDestroy(): void {
  //   if (this.loadingSubs) {
  //     this.loadingSubs.unsubscribe();
  //   }
  // }

  onSubmit(form: NgForm): void {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
    console.log(form.form);
  }

}
