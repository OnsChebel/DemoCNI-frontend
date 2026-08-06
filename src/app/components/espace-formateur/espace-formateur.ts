import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormateurService } from '../../services/formateur.service';
import { FormateurSession } from '../../models/formateur.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-espace-formateur',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './espace-formateur.html',
  styleUrl: './espace-formateur.css'
})
export class EspaceFormateurComponent implements OnInit {

  formateurConnecte: FormateurSession | null = null;
  credentials = { login: '', password: '' };

  passwords = { ancienPassword: '', nouveauPassword: '', confirmation: '' };
  erreurPassword = '';
  messageSuccesPassword = '';

  mesCycles: any[] = [];
  cycleSelectionne: any = null;
  afficherModalParticipants = false;

  constructor(private formateurService: FormateurService, private router: Router) {}

  ngOnInit(): void {
    const session = localStorage.getItem('formateurSession');
    if (session) {
      this.formateurConnecte = JSON.parse(session);
      if (!this.formateurConnecte?.isFirstLogin) {
        this.chargerMesCycles();
      }
    }
    else {
      this.router.navigate(['/login']);
    }
  }

  seConnecter(): void {
    this.formateurService.login(this.credentials).subscribe({
      next: (res) => {
        this.formateurConnecte = res;
        localStorage.setItem('formateurSession', JSON.stringify(res));
        if (!res.isFirstLogin) {
          this.chargerMesCycles();
        }
      },
      error: () => alert('اسم المستخدم أو كلمة السر غير صحيحة')
    });
  }

  seDeconnecter(): void {
    localStorage.clear();
    this.formateurConnecte = null;
    this.mesCycles = [];
    this.router.navigate(['/login']);
  }

  validerChangementMotDePasse(): void {
    this.erreurPassword = '';

    if (this.passwords.nouveauPassword !== this.passwords.confirmation) {
      this.erreurPassword = 'كلمات السر غير متطابقة';
      return;
    }

    if (this.passwords.nouveauPassword.length < 4) {
      this.erreurPassword = 'كلمة السر يجب أن تحتوي على 4 عناصر على الأقل';
      return;
    }

    this.formateurService.changePassword({
      formateurId: this.formateurConnecte!.id,
      ancienPassword: this.passwords.ancienPassword,
      nouveauPassword: this.passwords.nouveauPassword
    }).subscribe({
      next: () => {
        this.messageSuccesPassword = 'تم تغيير كلمة السر بنجاح!';
        if (this.formateurConnecte) {
          this.formateurConnecte.isFirstLogin = false;
          localStorage.setItem('formateurSession', JSON.stringify(this.formateurConnecte));
        }
        setTimeout(() => {
          this.chargerMesCycles();
        }, 1200);
      },
      error: (err) => {
        this.erreurPassword = err.error?.message || 'خطأ أثناء تغيير كلمة السر';
      }
    });
  }

  chargerMesCycles(): void {
    if (this.formateurConnecte) {
      this.formateurService.getMesCycles(this.formateurConnecte.id).subscribe({
        next: (data) => this.mesCycles = data,
        error: (err) => console.error(err)
      });
    }
  }

  ouvrirModalParticipants(cycle: any): void {
    this.cycleSelectionne = cycle;
    this.cycleSelectionne.participants = [];

    this.formateurService.getParticipantsByCycle(cycle.id).subscribe({
      next: (data) => {
        this.cycleSelectionne.participants = data;
        this.afficherModalParticipants = true;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des participants :', err);
        this.afficherModalParticipants = true;
      }
    });
  }

  fermerModalParticipants(): void {
    this.afficherModalParticipants = false;
    this.cycleSelectionne = null;
  }
}
