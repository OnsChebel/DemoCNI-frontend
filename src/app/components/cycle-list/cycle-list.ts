import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CycleModel } from '../../models/cycle.model';
import { CycleService } from '../../services/cycle.service';

@Component({
  selector: 'app-cycle-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cycle-list.html',
  styleUrl: './cycle-list.css'
})
export class CycleListComponent implements OnInit {
  cycles: CycleModel[] = [];
  cycleSelectionne: CycleModel = this.reinitialiserCycle();
  isFormulaireOuvert = false;

  constructor(private cycleService: CycleService) {}

  ngOnInit(): void {
    this.chargerCycles();
  }

  chargerCycles(): void {
    this.cycleService.getCycles().subscribe({
      next: (data) => this.cycles = data,
      error: (err) => console.error('Erreur lors du chargement des cycles', err)
    });
  }

  ouvrirAjout(): void {
    this.cycleSelectionne = this.reinitialiserCycle();
    this.isFormulaireOuvert = true;
  }

  ouvrirModification(cycle: CycleModel): void {
    this.cycleSelectionne = { ...cycle };
    this.isFormulaireOuvert = true;
  }

  enregistrer(): void {
    if (this.cycleSelectionne.id) {
      this.cycleService.updateCycle(this.cycleSelectionne.id, this.cycleSelectionne).subscribe({
        next: () => {
          this.chargerCycles();
          this.isFormulaireOuvert = false;
        },
        error: (err) => console.error('Erreur lors de la modification', err)
      });
    } else {
      this.cycleService.createCycle(this.cycleSelectionne).subscribe({
        next: () => {
          this.chargerCycles();
          this.isFormulaireOuvert = false;
        },
        error: (err) => console.error('Erreur lors de la création', err)
      });
    }
  }

  supprimer(id: number | undefined): void {
    if (id && confirm('هل أنت متأكد من حذف هذه الدورة التكوينية؟')) {
      this.cycleService.deleteCycle(id).subscribe({
        next: () => this.chargerCycles(),
        error: (err) => console.error('Erreur lors de la suppression', err)
      });
    }
  }

  private reinitialiserCycle(): CycleModel {
    return {
      num_act: '',
      theme: '',
      date_deb: '',
      date_fin: '',
      for1: '',
      for2: '',
      for3: '',
      num_salle: 1
    };
  }
}
