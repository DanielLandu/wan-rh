import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import Layout from '@/components/layout/layout';
import TableauDeBordGlobal from '@/pages/tableau-de-bord/global';
import TableauDeBordDepartement from '@/pages/tableau-de-bord/par-departement';
import Personnel from '@/pages/personnel/employe';
import ProfilEmploye from '@/pages/personnel/profil-employe';
import Role from '@/pages/personnel/role';
import Utilisateur from '@/pages/personnel/utilisateur';
import Presence from '@/pages/feuille-de-temps/presence';
import Conges from '@/pages/feuille-de-temps/conges';
import FeuilleDeTemps from '@/pages/feuille-de-temps/feuille-de-temps';
import Objectifs from '@/pages/performance/objectifs';
import Evaluations from '@/pages/performance/evaluations';
import Indicateurs from '@/pages/performance/indicateurs';
import Bulletin from '@/pages/finance/paie/bulletin';
import GrilleSalaire from '@/pages/finance/paie/grille-salaire';
import Paiements from '@/pages/finance/paie/paiements';
import Devis from '@/pages/finance/depenses/devis';
import Facture from '@/pages/finance/depenses/facture';
import RapportMensuel from '@/pages/finance/depenses/rapport-mensuel';
import Logistique from '@/pages/logistique';
import Maintenance from '@/pages/maintenance';
import Cuisine from '@/pages/cuisine';
import Departements from '@/pages/organisation/departements';
import Equipes from '@/pages/organisation/equipes';
import Affectations from '@/pages/organisation/affectations';
import Formations from '@/pages/entrainement/formations';
import Formateurs from '@/pages/entrainement/formateurs';
import Transfert from '@/pages/administration/transfert';
import Demission from '@/pages/administration/demission';
import Voyage from '@/pages/administration/voyage';
import Promotion from '@/pages/administration/promotion';
import Plaintes from '@/pages/administration/plaintes';
import Avertissements from '@/pages/administration/avertissements';
import Terminaison from '@/pages/administration/terminaison';
import Annonces from '@/pages/administration/annonces';
import Vacances from '@/pages/administration/vacances';
import Recrutement from '@/pages/recrutement/recrutement';
import Contrat from '@/pages/contrat/contrat';
import Evenement from '@/pages/evenement/evenement';
import Reunion from '@/pages/reunion/reunion';
import Document from '@/pages/document/document';
import Messages from '@/pages/messagerie/messages';
import Notifications from '@/pages/messagerie/notifications';
import Alertes from '@/pages/messagerie/alertes';
import RapportGlobal from '@/pages/rapports/rapport-global';
import RapportCarburant from '@/pages/rapports/rapport-carburant';
import RapportMaintenance from '@/pages/rapports/rapport-maintenance';
import RapportFinance from '@/pages/rapports/rapport-finance';
import RapportPerformance from '@/pages/rapports/rapport-performance';
import Parametres from '@/pages/parametres/parametres';
import Tutoriels from '@/pages/support/tutoriels';
import FAQ from '@/pages/support/faq';
import ContacterSupport from '@/pages/support/contacter-support';
import DashboardMobile from '@/pages/mobile/dashboard-mobile';
import ScanQR from '@/pages/mobile/scan-qr';
import RapportMobile from '@/pages/mobile/rapport-mobile';
import SynchronisationOffline from '@/pages/mobile/synchronisation-offline';
import LoginPage from '@/pages/auth/login';
import { AuthProvider } from '@/contexts/auth-context';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="wanec-theme">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<Navigate to="/tableau-de-bord/global\" replace />} />
              
              {/* Tableau de Bord */}
              <Route path="/tableau-de-bord/global" element={<TableauDeBordGlobal />} />
              <Route path="/tableau-de-bord/par-departement" element={<TableauDeBordDepartement />} />
              
              {/* Personnel */}
              <Route path="/personnel/employe" element={<Personnel />} />
              <Route path="/personnel/profil-employe" element={<ProfilEmploye />} />
              <Route path="/personnel/role" element={<Role />} />
              <Route path="/personnel/utilisateur" element={<Utilisateur />} />
              
              {/* Feuille de Temps */}
              <Route path="/feuille-de-temps/presence" element={<Presence />} />
              <Route path="/feuille-de-temps/conges" element={<Conges />} />
              <Route path="/feuille-de-temps/feuille-de-temps" element={<FeuilleDeTemps />} />
              
              {/* Performance */}
              <Route path="/performance/objectifs" element={<Objectifs />} />
              <Route path="/performance/evaluations" element={<Evaluations />} />
              <Route path="/performance/indicateurs" element={<Indicateurs />} />
              
              {/* Finance - Paie */}
              <Route path="/finance/paie/bulletin" element={<Bulletin />} />
              <Route path="/finance/paie/grille-salaire" element={<GrilleSalaire />} />
              <Route path="/finance/paie/paiements" element={<Paiements />} />
              
              {/* Finance - Dépenses */}
              <Route path="/finance/depenses/devis" element={<Devis />} />
              <Route path="/finance/depenses/facture" element={<Facture />} />
              <Route path="/finance/depenses/rapport-mensuel" element={<RapportMensuel />} />
              
              {/* Logistique, Maintenance, Cuisine */}
              <Route path="/logistique" element={<Logistique />} />
              <Route path="/maintenance" element={<Maintenance />} />
              <Route path="/cuisine" element={<Cuisine />} />
              
              {/* Organisation */}
              <Route path="/organisation/departements" element={<Departements />} />
              <Route path="/organisation/equipes" element={<Equipes />} />
              <Route path="/organisation/affectations" element={<Affectations />} />
              
              {/* Entraînement */}
              <Route path="/entrainement/formations" element={<Formations />} />
              <Route path="/entrainement/formateurs" element={<Formateurs />} />
              
              {/* Administration */}
              <Route path="/administration/transfert" element={<Transfert />} />
              <Route path="/administration/demission" element={<Demission />} />
              <Route path="/administration/voyage" element={<Voyage />} />
              <Route path="/administration/promotion" element={<Promotion />} />
              <Route path="/administration/plaintes" element={<Plaintes />} />
              <Route path="/administration/avertissements" element={<Avertissements />} />
              <Route path="/administration/terminaison" element={<Terminaison />} />
              <Route path="/administration/annonces" element={<Annonces />} />
              <Route path="/administration/vacances" element={<Vacances />} />
              
              {/* Autres modules */}
              <Route path="/recrutement" element={<Recrutement />} />
              <Route path="/contrat" element={<Contrat />} />
              <Route path="/evenement" element={<Evenement />} />
              <Route path="/reunion" element={<Reunion />} />
              <Route path="/document" element={<Document />} />
              
              {/* Messagerie */}
              <Route path="/messagerie/messages" element={<Messages />} />
              <Route path="/messagerie/notifications" element={<Notifications />} />
              <Route path="/messagerie/alertes" element={<Alertes />} />
              
              {/* Rapports */}
              <Route path="/rapports/rapport-global" element={<RapportGlobal />} />
              <Route path="/rapports/rapport-carburant" element={<RapportCarburant />} />
              <Route path="/rapports/rapport-maintenance" element={<RapportMaintenance />} />
              <Route path="/rapports/rapport-finance" element={<RapportFinance />} />
              <Route path="/rapports/rapport-performance" element={<RapportPerformance />} />
              
              {/* Paramètres et Support */}
              <Route path="/parametres" element={<Parametres />} />
              <Route path="/support/tutoriels" element={<Tutoriels />} />
              <Route path="/support/faq" element={<FAQ />} />
              <Route path="/support/contacter-support" element={<ContacterSupport />} />
              
              {/* Mobile */}
              <Route path="/mobile/dashboard-mobile" element={<DashboardMobile />} />
              <Route path="/mobile/scan-qr" element={<ScanQR />} />
              <Route path="/mobile/rapport-mobile" element={<RapportMobile />} />
              <Route path="/mobile/synchronisation-offline" element={<SynchronisationOffline />} />
            </Route>
          </Routes>
        </Router>
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;