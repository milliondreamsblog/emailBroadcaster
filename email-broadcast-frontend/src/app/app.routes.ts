import { Routes } from '@angular/router';
import { SendEmailComponent } from './components/send-email/send-email';
import { EmailLogsComponent } from './components/email-logs/email-logs';

export const routes: Routes = [
  { path: 'send', component: SendEmailComponent },
  { path: 'logs', component: EmailLogsComponent },
  { path: '', redirectTo: 'send', pathMatch: 'full' }
];
