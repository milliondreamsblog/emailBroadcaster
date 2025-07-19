import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmailService } from '../../services/email'

@Component({
  selector: 'send-email',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './send-email.html',
  styleUrls: ['./send-email.css']
})
export class SendEmailComponent {
  emailData = {
    subject: '',
    content: '',
    recipients: ''
  };

  constructor(private emailService: EmailService) {}

  send() {
    //@ts-ignore
    this.emailService.sendEmail(this.emailData).subscribe(res => {
      alert('Emails sent!');
    });
  }
}
