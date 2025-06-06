export interface Database {
  public: {
    Tables: {
      roles: {
        Row: {
          id: string
          nom: string
        }
        Insert: {
          id?: string
          nom: string
        }
        Update: {
          id?: string
          nom?: string
        }
      }
      utilisateurs: {
        Row: {
          id: string
          nom: string
          email: string
          mot_de_passe: string
          role_id: string | null
          photo_profil: string | null
          date_creation: string
        }
        Insert: {
          id?: string
          nom: string
          email: string
          mot_de_passe: string
          role_id?: string | null
          photo_profil?: string | null
          date_creation?: string
        }
        Update: {
          id?: string
          nom?: string
          email?: string
          mot_de_passe?: string
          role_id?: string | null
          photo_profil?: string | null
          date_creation?: string
        }
      }
      departements: {
        Row: {
          id: string
          nom: string
        }
        Insert: {
          id?: string
          nom: string
        }
        Update: {
          id?: string
          nom?: string
        }
      }
      employes: {
        Row: {
          id: string
          user_id: string | null
          matricule: string | null
          departement_id: string | null
          poste: string | null
          date_embauche: string | null
          statut: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          matricule?: string | null
          departement_id?: string | null
          poste?: string | null
          date_embauche?: string | null
          statut?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          matricule?: string | null
          departement_id?: string | null
          poste?: string | null
          date_embauche?: string | null
          statut?: string | null
        }
      }
      presences: {
        Row: {
          id: string
          employe_id: string | null
          date_presence: string | null
          heure_arrivee: string | null
          heure_depart: string | null
          statut: string | null
        }
        Insert: {
          id?: string
          employe_id?: string | null
          date_presence?: string | null
          heure_arrivee?: string | null
          heure_depart?: string | null
          statut?: string | null
        }
        Update: {
          id?: string
          employe_id?: string | null
          date_presence?: string | null
          heure_arrivee?: string | null
          heure_depart?: string | null
          statut?: string | null
        }
      }
      conges: {
        Row: {
          id: string
          employe_id: string | null
          date_debut: string | null
          date_fin: string | null
          raison: string | null
          statut: string | null
        }
        Insert: {
          id?: string
          employe_id?: string | null
          date_debut?: string | null
          date_fin?: string | null
          raison?: string | null
          statut?: string | null
        }
        Update: {
          id?: string
          employe_id?: string | null
          date_debut?: string | null
          date_fin?: string | null
          raison?: string | null
          statut?: string | null
        }
      }
    }
  }
}