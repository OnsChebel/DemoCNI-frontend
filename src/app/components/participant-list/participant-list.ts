import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {InscriptionInfo, ParticipantModel} from '../../models/participant.model';
import { ParticipantService } from '../../services/participant.service';

@Component({
  selector: 'app-participant-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './participant-list.html',
  styleUrl: './participant-list.css'
})
export class ParticipantListComponent implements OnInit {
  participants: ParticipantModel[] = [];

  participantSelectionne: ParticipantModel = this.reinitialiserParticipant();
  isFormulaireOuvert = false;

  formationsAffichees: InscriptionInfo[] = [];
  isModalFormationsOuverte = false;

  criteresRecherche = {
    theme: '',
    dateDebut: '',
    numSalle: ''
  };

  constructor(private participantService: ParticipantService) {}

  ngOnInit(): void {
    this.chargerParticipants();
  }

  chargerParticipants(): void {
    this.participantService.getParticipants().subscribe({
      next: (data) => {
        this.participants = data;
      },
      error: (err) => console.error('Erreur lors du chargement', err)
    });
  }


  get participantsFiltres() {
    return this.participants.filter(p => {
      const matchTheme = !this.criteresRecherche.theme ||
        (p.formations && p.formations.some(f => f.theme.toLowerCase().includes(this.criteresRecherche.theme.toLowerCase())));

      const matchDate = !this.criteresRecherche.dateDebut ||
        (p.formations && p.formations.some(f => f.dateDebut && f.dateDebut.includes(this.criteresRecherche.dateDebut)));

      const matchSalle = !this.criteresRecherche.numSalle ||
        (p.formations && p.formations.some(f => f.numSalle && f.numSalle.toString() === this.criteresRecherche.numSalle.toString()));

      return matchTheme && matchDate && matchSalle;
    });
  }


  reinitialiserFiltres(): void {
    this.criteresRecherche = { theme: '', dateDebut: '', numSalle: '' };
  }

  ouvrirAjout(): void {
    this.participantSelectionne = this.reinitialiserParticipant();
    this.isFormulaireOuvert = true;
  }

  ouvrirModification(participant: ParticipantModel): void {
    this.participantSelectionne = { ...participant };
    this.isFormulaireOuvert = true;
  }

  enregistrer(): void {
    if (this.participantSelectionne.id) {
      this.participantService.updateParticipant(this.participantSelectionne.id, this.participantSelectionne).subscribe({
        next: () => {
          this.chargerParticipants();
          this.isFormulaireOuvert = false;
        },
        error: (err) => console.error('Erreur lors de la modification', err)
      });
    } else {
      this.participantService.createParticipant(this.participantSelectionne).subscribe({
        next: () => {
          this.chargerParticipants();
          this.isFormulaireOuvert = false;
        },
        error: (err) => console.error('Erreur lors de la création', err)
      });
    }
  }

  supprimer(id: number | undefined): void {
    if (id && confirm('هل أنت متأكد من حذف هذا المشارك؟')) {
      this.participantService.deleteParticipant(id).subscribe({
        next: () => this.chargerParticipants(),
        error: (err) => console.error('Erreur lors de la suppression', err)
      });
    }
  }

  afficherFormations(formations: InscriptionInfo[] = []): void {
    this.formationsAffichees = formations;
    this.isModalFormationsOuverte = true;
  }

  fermerModalFormations(): void {
    this.isModalFormationsOuverte = false;
    this.formationsAffichees = [];
  }

  private reinitialiserParticipant(): ParticipantModel {
    return {
      nom_prenom: '',
      cin: '',
      entreprise: '',
      tel_fix: 0,
      fax: '',
      tel_port: 0,
      mail: '',
      theme_part: '',
      num_salle: 1,
      date_debut: ''
    };
  }
}
