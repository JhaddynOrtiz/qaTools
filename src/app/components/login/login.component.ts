import { Component } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(public authService: AuthServiceService, private router: Router){}

  email: string = '';
  password: string = ''; 

  onLogin() {
    console.log(this.email, this.password);
    const credentials = this.authService.autentication(this.email, this.password);
    if(credentials) {
      console.log('credentials', credentials);
      this.router.navigate(['/convert']);
    }
  }
}
