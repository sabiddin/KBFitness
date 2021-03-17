import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Fitness Tracker App';
  constructor(private authService: AuthService) {
    this.authService.initAuthListener();
  }
  ngOnInit(): void {

  }


}
