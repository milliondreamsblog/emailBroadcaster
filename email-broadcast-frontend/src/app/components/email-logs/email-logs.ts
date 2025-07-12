import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailService } from '../../services/email';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';
//@ts-ignore
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-email-logs',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './email-logs.html',
  styleUrls: ['./email-logs.css']
})
export class EmailLogsComponent implements OnInit {
  logs: any[] = [];
  page: number = 1;
  limit: number = 10;
  totalPages: number = 1;
  loading: boolean = false;

  constructor(private emailService: EmailService) {}

  ngOnInit() {
    this.fetchLogs();
  }

  fetchLogs() {
    this.loading = true;
    this.emailService.getLogs(this.page, this.limit).subscribe({
      next: (data: any) => {
        this.logs = data.logs || [];
        this.totalPages = Math.ceil(data.total / this.limit);
        this.loading = false;
      },
      error: () => {
        this.logs = [];
        this.loading = false;
      }
    });
  }

  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.fetchLogs();
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.fetchLogs();
    }
  }

  exportLogs() {
    this.emailService.exportLogs().subscribe(blob => {
      const file = new Blob([blob], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(file, 'email_logs.xlsx');
    });
  }
}
