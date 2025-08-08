import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CompanyInfo } from '../../shared/models/company-info';
@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private baseUrl = 'http://localhost:7106/api/company';

  constructor(private http: HttpClient) { }

  getCompanyInfo(userId: string): Observable<CompanyInfo> {
    return this.http.get<CompanyInfo>(`${this.baseUrl}/company-info/${userId}`);
  }
}