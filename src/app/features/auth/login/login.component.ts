import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { material } from '../../../shared/material/material.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, material],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (res) => {
          console.log('Login Success', res);
          localStorage.setItem('token', res.token);

          this.router.navigate(['/company-info']);
        },
        error: (err) => {
          console.error('Login Failed', err);
        }
      });
    }
  }
}
