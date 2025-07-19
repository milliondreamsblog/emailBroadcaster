import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrl = 'http://localhost:3000/api'; 

  constructor(private http: HttpClient) {}

  sendEmail(data: { subject: string; body: string; recipients: string[] }) {
    return this.http.post(`${this.apiUrl}/send-email`, data);
  }

  getLogs(page: number = 1, limit: number = 10) {
    return this.http.get(`${this.apiUrl}/logs?page=${page}&limit=${limit}`);
  }

  exportLogs() {
    return this.http.get(`${this.apiUrl}/logs/export`, {
      responseType: 'blob' 
    });
  }
}
