export interface InscriptionInfo {
  theme: string;
  dateDebut: string;
  numSalle: number;
  statut?: string;
}

export interface ParticipantModel {
  id?: number;
  nom_prenom: string;
  cin: string;
  entreprise: string;
  tel_fix: number;
  fax: string;
  tel_port: number;
  mail: string;
  theme_part?: string;
  num_salle?: number;
  date_debut?: string;
  formations?: InscriptionInfo[];
}
