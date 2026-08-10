import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CycleService } from '../../services/cycle.service';
import { InscriptionService } from '../../services/inscription.service';
import {ChatbotComponent} from '../chatbot/chatbot';

@Component({
  selector: 'app-espace-participant',
  standalone: true,
  imports: [CommonModule, FormsModule,ChatbotComponent],
  templateUrl: './espace-participant.html'
})
export class EspaceParticipantComponent implements OnInit {
  cyclesDisponibles: any[] = [];
  mesInscriptions: any[] = [];
  participantConnecte: any = {};
  afficherArchives = false;

  cycleSelectionne: any = null;
  formComplement = {
    tel_fix: null,
    fax: ''
  };
  afficherModal = false;

  messageSucces = '';
  messageErreur = '';

  constructor(
    private cycleService: CycleService,
    private inscriptionService: InscriptionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userStr = localStorage.getItem('currentUser');
    if (userStr) {
      this.participantConnecte = JSON.parse(userStr);
      this.formComplement.tel_fix = this.participantConnecte.tel_fix || null;
      this.formComplement.fax = this.participantConnecte.fax || '';
    }

    this.chargerCycles();
    this.chargerMesInscriptions();
  }

  chargerCycles(): void {
    this.cycleService.getCycles().subscribe({
      next: (data) => this.cyclesDisponibles = data,
      error: (err) => console.error(err)
    });
  }

  chargerMesInscriptions(): void {
    if (!this.participantConnecte?.id) return;
    this.inscriptionService.getInscriptionsByParticipant(this.participantConnecte.id).subscribe({
      next: (data) => this.mesInscriptions = data,
      error: (err) => console.error(err)
    });
  }

  seDeconnecter(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  toggleArchives(): void {
    this.afficherArchives = !this.afficherArchives;
  }

  get cyclesAffiches(): any[] {
    const today = new Date().toISOString().split('T')[0];
    return this.cyclesDisponibles.filter(c => {
      if (!c.date_fin) return false;
      return this.afficherArchives ? (c.date_fin < today) : (c.date_fin >= today);
    });
  }

  ouvrirModalInscription(cycle: any): void {
    this.cycleSelectionne = cycle;
    this.afficherModal = true;
  }

  fermerModal(): void {
    this.afficherModal = false;
    this.cycleSelectionne = null;
  }

  validerInscription(): void {
    const dto = {
      participantId: this.participantConnecte.id,
      cycleId: this.cycleSelectionne.id,
      tel_fix: this.formComplement.tel_fix,
      fax: this.formComplement.fax
    };

    this.inscriptionService.inscrire(dto).subscribe({
      next: (res) => {
        this.messageSucces = res.message;
        this.messageErreur = '';
        this.fermerModal();
        this.chargerMesInscriptions();
      },
      error: (err) => {
        this.messageErreur = err.error?.message || 'حدث خطأ أثناء التسجيل';
        this.messageSucces = '';
      }
    });
  }

  annulerInscription(cycleId: number): void {
    if (confirm('هل أنت تأكد من إلغاء التسجيل في هذه الدورة؟')) {
      this.inscriptionService.annulerInscription(this.participantConnecte.id, cycleId).subscribe({
        next: (res) => {
          this.messageSucces = res.message;
          this.messageErreur = '';
          this.chargerMesInscriptions();
        },
        error: (err) => {
          this.messageErreur = err.error?.message || 'حدث خطأ أثناء إلغاء التسجيل';
        }
      });
    }
  }

  estInscritEtConfirme(cycleId: number): boolean {
    return this.mesInscriptions.some(ins => ins.cycle.id === cycleId && ins.statut === 'CONFIRMEE');
  }
}
