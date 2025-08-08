import { Component, OnInit } from '@angular/core';
import { CompanyInfo } from '../../../shared/models/company-info';
import { CompanyService } from '../../../core/services/company.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-company-info',
  standalone: true,  
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.css'],
  imports: [CommonModule]
})
export class CompanyInfoComponent implements OnInit {

  companyInfo?: CompanyInfo;
  userId: string = '';

  constructor(private companyService: CompanyService) { }


  parseJwt(token: string) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c =>
      '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    ).join(''));
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}
  
ngOnInit(): void {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decoded = this.parseJwt(token);
      this.userId = decoded?.nameid ?? '';

      if (this.userId && this.userId.trim() !== '') {
        this.companyService.getCompanyInfo(this.userId).subscribe({
          next: (data) => {
            // إصلاح مسار الصورة
            if (data.logoUrl) {
              const baseUrl = 'https://localhost:7106/';
              data.logoUrl = baseUrl + data.logoUrl.replace(/\\/g, '/');

              console.log(data.logoUrl);
            }
            this.companyInfo = data;
          },
          error: (err) => {
            console.error('Error fetching company info', err);
          }
        });
      }
    } catch (error) {
      console.error('Error decoding token', error);
    }
  }
}
 
}
 
