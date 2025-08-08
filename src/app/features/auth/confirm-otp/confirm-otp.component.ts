import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-otp',
  standalone: true,
  templateUrl: './confirm-otp.component.html',
  styleUrls: ['./confirm-otp.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class ConfirmOtpComponent implements OnInit, OnDestroy {
  otpForm!: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  email: string = '';
  countdown: number = 300; // 5 دقائق بالثواني
  intervalId: any;
  isExpired: boolean = false;
  isLoading: boolean = false; // لتعطيل الزر أثناء طلب الـ API

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.email = localStorage.getItem('email') || '';

    if (!this.email) {
      this.errorMessage = 'Email not found. Please start registration again.';
      // تعطيل الفورم لو ما فيش إيميل
      this.otpForm = this.fb.group({
        otp: [{ value: '', disabled: true }, [Validators.required, Validators.pattern(/^[0-9]{4,6}$/)]],
      });
      return;
    }

    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.pattern(/^[0-9]{4,6}$/)]],
    });

    // امسح رسالة الخطأ عند تغير قيمة الـ OTP
    this.otpForm.get('otp')?.valueChanges.subscribe(() => {
      this.errorMessage = '';
    });

    this.startTimer();
  }

  startTimer() {
    this.intervalId = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        clearInterval(this.intervalId);
        this.isExpired = true;
      }
    }, 1000);
  }

  get formattedTime(): string {
    const minutes = Math.floor(this.countdown / 60).toString().padStart(2, '0');
    const seconds = (this.countdown % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }

  onSubmit() {
    if (this.otpForm.invalid || this.isExpired) {
      this.otpForm.markAllAsTouched();
      return;
    }

    this.errorMessage = '';
    this.isLoading = true;

    const otpCode = this.otpForm.value.otp;

    this.http.post<{ message: string }>('https://localhost:7106/api/Otp/verify', {
      email: this.email,
      code: otpCode
    }).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.successMessage = res.message;
        setTimeout(() => {
          this.router.navigate(['/create-password']);
        }, 1000);
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
        if (err.error && typeof err.error === 'string') {
          this.errorMessage = err.error;
        } else if (err.error && err.error.message) {
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage = 'OTP verification failed. Please try again.';
        }
      }
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
}
