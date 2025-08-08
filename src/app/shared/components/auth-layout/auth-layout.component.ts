import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css']
})
export class AuthLayoutComponent {
  
  constructor(private router: Router) {}

   get isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    // localStorage.removeItem('token');
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
