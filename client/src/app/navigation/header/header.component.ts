import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/_services/auth.service';
import * as fromRoot from '../../app.reducer';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit
  // , OnDestroy
  {
  @Output() sidenavToggle = new EventEmitter<void>();
  // isAuth: boolean;
  // authSubscription: Subscription;
  isAuth$: Observable<boolean>;
  constructor(private authService: AuthService, private store: Store<fromRoot.State> ) { }

  ngOnInit(): void {
    // this.authSubscription = this.authService.authChange.subscribe(authStatus => {
    //   this.isAuth = authStatus;
    // });
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
  }
  onToggleSideNav(): void {
    this.sidenavToggle.emit();
  }
  onLogout(): void {
    this.authService.logout();
  }
  // ngOnDestroy(): void {
  //   this.authSubscription.unsubscribe();
  // }

}
