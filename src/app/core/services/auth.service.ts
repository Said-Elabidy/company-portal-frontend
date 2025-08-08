import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://localhost:7106/api/Auth'; // استخدم baseUrl واحد

  constructor(private http: HttpClient) {}

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, data);
  }

  register(companyData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/RegisterCompany`, companyData);
  }
}
