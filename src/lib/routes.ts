import { Home, Users, Clock, LineChart, BarChart4, Truck, Wrench, ChefHat, 
  Network, GraduationCap, Building2, UserPlus, FileText, Calendar, FileSpreadsheet,
  MessageSquare, FileBarChart, Settings, LifeBuoy, Smartphone } from 'lucide-react';

export const routes = [
  {
    label: 'Tableau de Bord',
    icon: Home,
    path: '/tableau-de-bord',
    children: [
      { label: 'Global', path: '/tableau-de-bord/global' },
      { label: 'Par Département', path: '/tableau-de-bord/par-departement' }
    ]
  },
  {
    label: 'Personnel',
    icon: Users,
    path: '/personnel',
    children: [
      { label: 'Employés', path: '/personnel/employe' },
      { label: 'Profils', path: '/personnel/profil-employe' },
      { label: 'Rôles', path: '/personnel/role' },
      { label: 'Utilisateurs', path: '/personnel/utilisateur' },
    ]
  },
  {
    label: 'Feuille de Temps',
    icon: Clock,
    path: '/feuille-de-temps',
    children: [
      { label: 'Présence', path: '/feuille-de-temps/presence' },
      { label: 'Congés', path: '/feuille-de-temps/conges' },
      { label: 'Feuille de Temps', path: '/feuille-de-temps/feuille-de-temps' },
    ]
  },
  {
    label: 'Performance',
    icon: LineChart,
    path: '/performance',
    children: [
      { label: 'Objectifs', path: '/performance/objectifs' },
      { label: 'Évaluations', path: '/performance/evaluations' },
      { label: 'Indicateurs', path: '/performance/indicateurs' },
    ]
  },
  {
    label: 'Finance',
    icon: BarChart4,
    path: '/finance',
    children: [
      { label: 'Paie', path: '/finance/paie', 
        subMenu: [
          { label: 'Bulletin', path: '/finance/paie/bulletin' },
          { label: 'Grille Salariale', path: '/finance/paie/grille-salaire' },
          { label: 'Paiements', path: '/finance/paie/paiements' },
        ]
      },
      { label: 'Dépenses', path: '/finance/depenses',
        subMenu: [
          { label: 'Devis', path: '/finance/depenses/devis' },
          { label: 'Facture', path: '/finance/depenses/facture' },
          { label: 'Rapport Mensuel', path: '/finance/depenses/rapport-mensuel' },
        ]
      },
    ]
  },
  {
    label: 'Logistique',
    icon: Truck,
    path: '/logistique'
  },
  {
    label: 'Maintenance',
    icon: Wrench,
    path: '/maintenance'
  },
  {
    label: 'Cuisine',
    icon: ChefHat,
    path: '/cuisine'
  },
  {
    label: 'Organisation',
    icon: Network,
    path: '/organisation',
    children: [
      { label: 'Départements', path: '/organisation/departements' },
      { label: 'Équipes', path: '/organisation/equipes' },
      { label: 'Affectations', path: '/organisation/affectations' },
    ]
  },
  {
    label: 'Entraînement',
    icon: GraduationCap,
    path: '/entrainement',
    children: [
      { label: 'Formations', path: '/entrainement/formations' },
      { label: 'Formateurs', path: '/entrainement/formateurs' },
    ]
  },
  {
    label: 'Administration',
    icon: Building2,
    path: '/administration',
    children: [
      { label: 'Transfert', path: '/administration/transfert' },
      { label: 'Démission', path: '/administration/demission' },
      { label: 'Voyage', path: '/administration/voyage' },
      { label: 'Promotion', path: '/administration/promotion' },
      { label: 'Plaintes', path: '/administration/plaintes' },
      { label: 'Avertissements', path: '/administration/avertissements' },
      { label: 'Terminaison', path: '/administration/terminaison' },
      { label: 'Annonces', path: '/administration/annonces' },
      { label: 'Vacances', path: '/administration/vacances' },
    ]
  },
  {
    label: 'Recrutement',
    icon: UserPlus,
    path: '/recrutement'
  },
  {
    label: 'Contrat',
    icon: FileText,
    path: '/contrat'
  },
  {
    label: 'Événement',
    icon: Calendar,
    path: '/evenement'
  },
  {
    label: 'Réunion',
    icon: Calendar,
    path: '/reunion'
  },
  {
    label: 'Document',
    icon: FileSpreadsheet,
    path: '/document'
  },
  {
    label: 'Messagerie',
    icon: MessageSquare,
    path: '/messagerie',
    children: [
      { label: 'Messages', path: '/messagerie/messages' },
      { label: 'Notifications', path: '/messagerie/notifications' },
      { label: 'Alertes', path: '/messagerie/alertes' },
    ]
  },
  {
    label: 'Rapports',
    icon: FileBarChart,
    path: '/rapports',
    children: [
      { label: 'Rapport Global', path: '/rapports/rapport-global' },
      { label: 'Rapport Carburant', path: '/rapports/rapport-carburant' },
      { label: 'Rapport Maintenance', path: '/rapports/rapport-maintenance' },
      { label: 'Rapport Finance', path: '/rapports/rapport-finance' },
      { label: 'Rapport Performance', path: '/rapports/rapport-performance' },
    ]
  },
  {
    label: 'Paramètres',
    icon: Settings,
    path: '/parametres'
  },
  {
    label: 'Support',
    icon: LifeBuoy,
    path: '/support',
    children: [
      { label: 'Tutoriels', path: '/support/tutoriels' },
      { label: 'FAQ', path: '/support/faq' },
      { label: 'Contacter Support', path: '/support/contacter-support' },
    ]
  },
  {
    label: 'Mobile',
    icon: Smartphone,
    path: '/mobile',
    children: [
      { label: 'Dashboard Mobile', path: '/mobile/dashboard-mobile' },
      { label: 'Scan QR', path: '/mobile/scan-qr' },
      { label: 'Rapport Mobile', path: '/mobile/rapport-mobile' },
      { label: 'Synchronisation Offline', path: '/mobile/synchronisation-offline' },
    ]
  }
];