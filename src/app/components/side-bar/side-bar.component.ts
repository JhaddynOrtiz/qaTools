import { Component, OnInit } from '@angular/core';

import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  constructor(private authService: AuthServiceService) { }

  userInfo: any = '';
  ngOnInit() {
    const authUser = this.authService.isAuth();
    this.userInfo = authUser;
    console.log('auth user ', authUser);

  }
}
