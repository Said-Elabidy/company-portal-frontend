import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    RouterModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  selectedFile: File | null = null;
  emailExists = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      arabicName: ['', [Validators.required, Validators.maxLength(100)]],
      englishName: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.pattern(/^01[0-9]{9}$/)],
      websiteURL: ['', Validators.pattern(/^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/)],
      logo: [null]
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
  if (this.registerForm.invalid) {
    this.registerForm.markAllAsTouched();
    return;
  }

  this.emailExists = false;

  const formData = new FormData();
  formData.append('ArabicName', this.registerForm.value.arabicName!);
  formData.append('EnglishName', this.registerForm.value.englishName!);
  formData.append('Email', this.registerForm.value.email!);

  if (this.registerForm.value.phoneNumber)
    formData.append('PhoneNumber', this.registerForm.value.phoneNumber);

  if (this.registerForm.value.websiteURL)
    formData.append('WebsiteURL', this.registerForm.value.websiteURL);

  if (this.selectedFile)
    formData.append('Logo', this.selectedFile);

  this.http.post<any>('https://localhost:7106/api/Registeration', formData).subscribe({
    next: (res) => {
      // نخزن الـ UserId والإيميل بعد التسجيل
      localStorage.setItem('userId', res.userId);
      localStorage.setItem('email', this.registerForm.value.email!);

      // بعدها نرسل OTP
      this.http.post('https://localhost:7106/api/Otp/send', {
        email: this.registerForm.value.email
      }).subscribe(() => {
        this.snackBar.open('Registration successful! Please verify OTP.', 'Close', { duration: 3000 });
        this.router.navigate(['/confirm-otp']);
      });
    },
    error: err => {
      if (err.status === 400 && err.error === 'Email already exists') {
        this.emailExists = true;
        this.registerForm.get('email')?.setErrors({ emailExists: true });
      } else {
        console.error('Unexpected error:', err);
        this.snackBar.open('Something went wrong. Please try again later.', 'Close', { duration: 3000 });
      }
    }
  });
}
}