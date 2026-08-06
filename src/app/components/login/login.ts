import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
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

    this.http.post<any>('http://localhost:8081/api/auth/login', loginRequest)
      .subscribe({
        next: (response) => {
          this.erreurMessage = '';

          if (response.token) {
            localStorage.setItem('token', response.token);
          }

          const userObj = response.user || { id: response.id, mail: this.username, role: response.role };
          localStorage.setItem('currentUser', JSON.stringify(userObj));

          if (response.role === 'FORMATEUR') {
            const formateurSession = {
              id: response.user.id,
              nom_prenom: response.user.nom_prenom,
              isFirstLogin: response.user.isFirstLogin
            };
            localStorage.setItem('formateurSession', JSON.stringify(formateurSession));
            this.router.navigate(['/espace-formateur']);

          } else if (response.role === 'PARTICIPANT' || userObj.role === 'PARTICIPANT') {
            this.router.navigate(['/participant-dashboard']);

          } else {
            this.router.navigate(['/menu']);
          }
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
