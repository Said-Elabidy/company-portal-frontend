import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-create-password',
  standalone: true,
  templateUrl: './create-password.component.html',
  styleUrls: ['./create-password.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
})
export class CreatePasswordComponent implements OnInit {
  
  passwordForm!: FormGroup;
  errorMessage = '';
  successMessage = '';
  userId = '';
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId') || '';

    // لو مفيش userId رجّع المستخدم للشاشة الأولى
    if (!this.userId) {
      this.router.navigate(['/register']);
      return;
    }

    this.passwordForm = this.fb.group(
      {
        password: [
          '',
          [
            Validators.required,
            Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*#?&]).{8,}$')
          ]
        ],
        confirmPassword: ['', Validators.required]
      },
      { validators: this.passwordMatchValidator }
    );
  }

  // التحقق إن الباسوردين متطابقين
  passwordMatchValidator(form: FormGroup) {
    const pass = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return pass === confirm ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.passwordForm.invalid) {
      this.errorMessage = 'Please fill all fields correctly.';
      return;
    }

    const data = {
      userId: this.userId,
      password: this.passwordForm.value.password,
      confirmPassword: this.passwordForm.value.confirmPassword
    };

    this.http.post('https://localhost:7106/api/Registeration/set-password', data)
      .subscribe({
        next: () => {
          this.successMessage = '✅ Password created successfully! Redirecting to login...';
          setTimeout(() => {
            localStorage.removeItem('userId'); // تنظيف البيانات بعد النجاح
            this.router.navigate(['/login']);
          }, 3000);
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = err.error || '❌ Failed to create password. Please try again.';
        }
      });
  }
}
