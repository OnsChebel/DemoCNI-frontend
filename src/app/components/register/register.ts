import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html'
})
export class RegisterComponent {
  participant = {
    nom_prenom: '',
    cin: '',
    mail: '',
    password: '',
    tel_port: null,
    entreprise: ''
  };

  messageErreur = '';
  messageSucces = '';

  constructor(private http: HttpClient, private router: Router) {}

  onRegister(): void {
    this.http.post('http://localhost:8081/api/auth/register-participant', this.participant).subscribe({
      next: (res: any) => {
        this.messageSucces = 'تم إنشاء الحساب بنجاح! يمكنك الآن تسجيل الدخول';
        this.messageErreur = '';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        this.messageErreur = err.error?.message || 'حدث خطأ أثناء إنشاء الحساب';
        this.messageSucces = '';
      }
    });
  }
}
