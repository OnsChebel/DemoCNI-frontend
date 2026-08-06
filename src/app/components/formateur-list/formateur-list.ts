import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormateurModel } from '../../models/formateur.model';
import { FormateurService } from '../../services/formateur.service';

@Component({
  selector: 'app-formateur-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './formateur-list.html',
  styleUrl: './formateur-list.css'
})
export class FormateurListComponent implements OnInit {
  formateurs: FormateurModel[] = [];
  formateurSelectionne: FormateurModel = this.reinitialiserFormateur();
  isFormulaireOuvert = false;

  criteresRecherche = {
    nomPrenom: '',
    specialite: '',
    direction: '',
    entreprise: ''
  };

  constructor(private formateurService: FormateurService) {}

  ngOnInit(): void {
    this.chargerFormateurs();
  }

  chargerFormateurs(): void {
    this.formateurService.getFormateurs().subscribe({
      next: (data) => this.formateurs = data,
      error: (err) => console.error('Erreur lors du chargement des formateurs', err)
    });
  }

  get formateursFiltres() {
    return this.formateurs.filter(f => {
      const matchNom = !this.criteresRecherche.nomPrenom ||
        (f.nom_prenom && f.nom_prenom.toLowerCase().includes(this.criteresRecherche.nomPrenom.toLowerCase()));

      const matchSpecialite = !this.criteresRecherche.specialite ||
        (f.specialite && f.specialite.toLowerCase().includes(this.criteresRecherche.specialite.toLowerCase()));

      const matchDirection = !this.criteresRecherche.direction ||
        (f.direction && f.direction.toLowerCase().includes(this.criteresRecherche.direction.toLowerCase()));

      const matchEntreprise = !this.criteresRecherche.entreprise ||
        (f.entreprise && f.entreprise.toLowerCase().includes(this.criteresRecherche.entreprise.toLowerCase()));

      return matchNom && matchSpecialite && matchDirection && matchEntreprise;
    });
  }

  reinitialiserFiltres(): void {
    this.criteresRecherche = { nomPrenom: '', specialite: '', direction: '', entreprise: '' };
  }

  ouvrirAjout(): void {
    this.formateurSelectionne = this.reinitialiserFormateur();
    this.isFormulaireOuvert = true;
  }

  ouvrirModification(formateur: FormateurModel): void {
    this.formateurSelectionne = { ...formateur };
    this.isFormulaireOuvert = true;
  }

  enregistrer(): void {
    if (this.formateurSelectionne.id) {
      this.formateurService.updateFormateur(this.formateurSelectionne.id, this.formateurSelectionne).subscribe({
        next: () => {
          this.chargerFormateurs();
          this.isFormulaireOuvert = false;
        },
        error: (err) => console.error('Erreur lors de la modification', err)
      });
    } else {
      this.formateurService.createFormateur(this.formateurSelectionne).subscribe({
        next: () => {
          this.chargerFormateurs();
          this.isFormulaireOuvert = false;
        },
        error: (err) => console.error('Erreur lors de la création', err)
      });
    }
  }

  supprimer(id: number | undefined): void {
    if (id && confirm('هل أنت متأكد من حذف هذا المكون؟')) {
      this.formateurService.deleteFormateur(id).subscribe({
        next: () => this.chargerFormateurs(),
        error: (err) => console.error('Erreur lors de la suppression', err)
      });
    }
  }

  private reinitialiserFormateur(): FormateurModel {
    return { nom_prenom: '', specialite: '', direction: '', entreprise: '', login: '',
      password: '' };
  }
}
