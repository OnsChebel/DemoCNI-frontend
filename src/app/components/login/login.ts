import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  username = '';
  password = '';
  erreurMessage = '';


  constructor(private router: Router, private http: HttpClient) {}

  seConnecter(): void {

    const loginRequest = {
      login: this.username,
      password: this.password
    };


    this.http.post<{ token: string }>('http://localhost:8081/api/auth/login', loginRequest)
      .subscribe({
        next: (response) => {
          this.erreurMessage = '';


          localStorage.setItem('token', response.token);

          alert('تم تسجيل الدخول بنجاح !');


          this.router.navigate(['/menu']);
        },
        error: (err) => {

          if (err.status === 401) {
            this.erreurMessage = 'اسم المستخدم أو كلمة العبور خاطئة';
          } else {
            this.erreurMessage = 'خطأ في الاتصال بالخادم (Erreur Serveur)';
          }
        }
      });
  }
}
