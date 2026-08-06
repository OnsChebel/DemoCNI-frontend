export interface FormateurModel {
  id?: number;
  nom_prenom: string;
  specialite: string;
  direction: string;
  entreprise: string;
  login?: string;
  password?: string;
  isFirstLogin?: boolean;
}

export interface FormateurSession {
  id: number;
  nom_prenom: string;
  isFirstLogin: boolean;
}
