import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/_services/auth.service';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit
// , OnDestroy 
{

  @Output() sidenavClose = new EventEmitter<void>();
  // isAuth: boolean;
  // authSubscription: Subscription;
  isAuth$: Observable<boolean>;
  constructor(private authService: AuthService, private store: Store<fromRoot.State>) { }
  ngOnInit(): void {
    // this.authSubscription = this.authService.authChange.subscribe(authStatus => {
    //   this.isAuth = authStatus;
    // }
    // );
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
  }
  onSidenavClose(): void {
    this.sidenavClose.emit();
  }
  onLogout(): void {
    this.authService.logout();
    this.onSidenavClose();
  }
  // ngOnDestroy(): void {
  //   this.authSubscription.unsubscribe();
  // }
}
