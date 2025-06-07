/*
  # Complete HR System Database Schema

  1. New Tables
    - `evaluations` - Employee performance evaluations
    - `objectifs` - Employee objectives and goals
    - `salaires` - Employee salary information
    - `primes` - Employee bonuses and incentives
    - `equipements_new` - Equipment and asset management
    - `rations` - Meal planning and catering
    - `fournisseurs_new` - Supplier management
    - `recrutement` - Recruitment and job postings
    - `candidats` - Job candidates
    - `contrats_new` - Employment contracts
    - `evenements_new` - Company events
    - `reunions_new` - Meetings
    - `annonces_new` - Company announcements
    - `plaintes` - Employee complaints
    - `avertissements` - Employee warnings
    - `transferts_new` - Employee transfers
    - `promotions_new` - Employee promotions
    - `voyages` - Business travel records

  2. Junction Tables
    - `evenements_participants` - Event participants
    - `reunions_participants` - Meeting participants
    - `annonces_departements_new` - Announcement department targeting

  3. Security
    - Enable RLS on all new tables
    - Add appropriate policies for data access control
    - Create indexes for performance optimization
*/

-- =============================
-- PERFORMANCE & EVALUATIONS
-- =============================

CREATE TABLE IF NOT EXISTS evaluations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employe_id UUID REFERENCES employees(id),
    evaluateur_id UUID REFERENCES employees(id),
    date_evaluation DATE,
    periode TEXT,
    performance_score INTEGER,
    commentaires TEXT,
    objectifs_atteints TEXT[],
    points_amelioration TEXT[],
    statut TEXT
);

CREATE TABLE IF NOT EXISTS objectifs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employe_id UUID REFERENCES employees(id),
    titre TEXT,
    description TEXT,
    date_debut DATE,
    date_fin DATE,
    priorite TEXT,
    statut TEXT,
    progression INTEGER
);

-- =============================
-- SALAIRES & PRIMES
-- =============================

CREATE TABLE IF NOT EXISTS salaires (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employe_id UUID REFERENCES employees(id),
    montant_base NUMERIC,
    devise TEXT DEFAULT 'USD',
    date_effet DATE,
    historique JSONB
);

CREATE TABLE IF NOT EXISTS primes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employe_id UUID REFERENCES employees(id),
    type TEXT,
    montant NUMERIC,
    date_attribution DATE,
    raison TEXT
);

-- =============================
-- EQUIPEMENTS & INVENTAIRE
-- =============================

CREATE TABLE IF NOT EXISTS equipements_new (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nom TEXT,
    type TEXT,
    numero_serie TEXT,
    statut TEXT,
    date_acquisition DATE,
    cout_acquisition NUMERIC,
    employe_id UUID REFERENCES employees(id),
    notes TEXT
);

-- =============================
-- CUISINE & RATIONS
-- =============================

CREATE TABLE IF NOT EXISTS rations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date DATE,
    type_repas TEXT,
    nombre_personnes INTEGER,
    menu TEXT[],
    cout_total NUMERIC
);

CREATE TABLE IF NOT EXISTS fournisseurs_new (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nom TEXT,
    type TEXT,
    contact_principal TEXT,
    telephone TEXT,
    email TEXT,
    adresse TEXT,
    produits_services TEXT[],
    evaluation_score INTEGER,
    statut TEXT
);

-- =============================
-- RECRUTEMENT & CONTRATS
-- =============================

CREATE TABLE IF NOT EXISTS recrutement (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    poste TEXT,
    departement_id INTEGER REFERENCES departments(id),
    description TEXT,
    qualifications TEXT[],
    date_publication DATE,
    date_limite DATE,
    statut TEXT,
    nombre_postes INTEGER,
    type_contrat TEXT
);

CREATE TABLE IF NOT EXISTS candidats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    recrutement_id UUID REFERENCES recrutement(id),
    nom TEXT,
    email TEXT,
    telephone TEXT,
    cv_url TEXT,
    lettre_motivation TEXT,
    date_candidature DATE,
    statut TEXT,
    notes TEXT
);

CREATE TABLE IF NOT EXISTS contrats_new (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employe_id UUID REFERENCES employees(id),
    type_contrat TEXT,
    date_debut DATE,
    date_fin DATE,
    conditions TEXT,
    salaire_base NUMERIC,
    avantages TEXT[],
    statut TEXT,
    fichier_url TEXT
);

-- =============================
-- EVENEMENTS & REUNIONS
-- =============================

CREATE TABLE IF NOT EXISTS evenements_new (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    titre TEXT,
    description TEXT,
    date_debut TIMESTAMP,
    date_fin TIMESTAMP,
    lieu TEXT,
    organisateur_id UUID REFERENCES employees(id),
    type TEXT,
    statut TEXT,
    budget NUMERIC
);

CREATE TABLE IF NOT EXISTS reunions_new (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    titre TEXT,
    description TEXT,
    date_heure TIMESTAMP,
    duree INTEGER, -- en minutes
    lieu TEXT,
    organisateur_id UUID REFERENCES employees(id),
    ordre_du_jour TEXT[],
    compte_rendu TEXT,
    statut TEXT
);

-- =============================
-- ANNONCES
-- =============================

CREATE TABLE IF NOT EXISTS annonces_new (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    titre TEXT,
    contenu TEXT,
    date_publication TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    auteur_id UUID REFERENCES employees(id),
    importance TEXT,
    date_expiration DATE,
    statut TEXT
);

-- =============================
-- JUNCTION TABLES
-- =============================

CREATE TABLE IF NOT EXISTS evenements_participants (
    evenement_id UUID REFERENCES evenements_new(id) ON DELETE CASCADE,
    employe_id UUID REFERENCES employees(id) ON DELETE CASCADE,
    PRIMARY KEY (evenement_id, employe_id)
);

CREATE TABLE IF NOT EXISTS reunions_participants (
    reunion_id UUID REFERENCES reunions_new(id) ON DELETE CASCADE,
    employe_id UUID REFERENCES employees(id) ON DELETE CASCADE,
    PRIMARY KEY (reunion_id, employe_id)
);

CREATE TABLE IF NOT EXISTS annonces_departements_new (
    annonce_id UUID REFERENCES annonces_new(id) ON DELETE CASCADE,
    departement_id INTEGER REFERENCES departments(id) ON DELETE CASCADE,
    PRIMARY KEY (annonce_id, departement_id)
);

-- =============================
-- PLAINTES & AVERTISSEMENTS
-- =============================

CREATE TABLE IF NOT EXISTS plaintes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    plaignant_id UUID REFERENCES employees(id),
    accuse_id UUID REFERENCES employees(id),
    date_plainte DATE,
    description TEXT,
    categorie TEXT,
    gravite TEXT,
    statut TEXT,
    resolution TEXT,
    date_resolution DATE
);

CREATE TABLE IF NOT EXISTS avertissements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employe_id UUID REFERENCES employees(id),
    emetteur_id UUID REFERENCES employees(id),
    date_emission DATE,
    raison TEXT,
    description TEXT,
    gravite TEXT,
    consequences TEXT[],
    delai_correction DATE,
    statut TEXT
);

-- =============================
-- TRANSFERTS & PROMOTIONS
-- =============================

CREATE TABLE IF NOT EXISTS transferts_new (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employe_id UUID REFERENCES employees(id),
    ancien_departement_id INTEGER REFERENCES departments(id),
    nouveau_departement_id INTEGER REFERENCES departments(id),
    date_effet DATE,
    raison TEXT,
    initiateur_id UUID REFERENCES employees(id),
    statut TEXT,
    commentaires TEXT
);

CREATE TABLE IF NOT EXISTS promotions_new (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employe_id UUID REFERENCES employees(id),
    ancien_poste TEXT,
    nouveau_poste TEXT,
    date_effet DATE,
    augmentation_salaire NUMERIC,
    raison TEXT,
    approbateur_id UUID REFERENCES employees(id),
    statut TEXT
);

-- =============================
-- VOYAGES
-- =============================

CREATE TABLE IF NOT EXISTS voyages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employe_id UUID REFERENCES employees(id),
    destination TEXT,
    date_depart DATE,
    date_retour DATE,
    motif TEXT,
    budget_prevu NUMERIC,
    depenses_reelles NUMERIC,
    statut TEXT,
    rapport TEXT,
    documents_url TEXT[]
);

-- =============================
-- INDEXES
-- =============================

CREATE INDEX IF NOT EXISTS idx_evaluations_employe_new ON evaluations(employe_id);
CREATE INDEX IF NOT EXISTS idx_objectifs_employe_new ON objectifs(employe_id);
CREATE INDEX IF NOT EXISTS idx_salaires_employe_new ON salaires(employe_id);
CREATE INDEX IF NOT EXISTS idx_primes_employe_new ON primes(employe_id);
CREATE INDEX IF NOT EXISTS idx_equipements_employe_new ON equipements_new(employe_id);
CREATE INDEX IF NOT EXISTS idx_contrats_employe_new ON contrats_new(employe_id);
CREATE INDEX IF NOT EXISTS idx_plaintes_plaignant_new ON plaintes(plaignant_id);
CREATE INDEX IF NOT EXISTS idx_avertissements_employe_new ON avertissements(employe_id);
CREATE INDEX IF NOT EXISTS idx_transferts_employe_new ON transferts_new(employe_id);
CREATE INDEX IF NOT EXISTS idx_promotions_employe_new ON promotions_new(employe_id);
CREATE INDEX IF NOT EXISTS idx_voyages_employe_new ON voyages(employe_id);
CREATE INDEX IF NOT EXISTS idx_annonces_auteur_new ON annonces_new(auteur_id);
CREATE INDEX IF NOT EXISTS idx_evenements_organisateur_new ON evenements_new(organisateur_id);
CREATE INDEX IF NOT EXISTS idx_reunions_organisateur_new ON reunions_new(organisateur_id);

-- =============================
-- ROW LEVEL SECURITY
-- =============================

ALTER TABLE evaluations ENABLE ROW LEVEL SECURITY;
ALTER TABLE objectifs ENABLE ROW LEVEL SECURITY;
ALTER TABLE salaires ENABLE ROW LEVEL SECURITY;
ALTER TABLE primes ENABLE ROW LEVEL SECURITY;
ALTER TABLE equipements_new ENABLE ROW LEVEL SECURITY;
ALTER TABLE rations ENABLE ROW LEVEL SECURITY;
ALTER TABLE fournisseurs_new ENABLE ROW LEVEL SECURITY;
ALTER TABLE recrutement ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidats ENABLE ROW LEVEL SECURITY;
ALTER TABLE contrats_new ENABLE ROW LEVEL SECURITY;
ALTER TABLE evenements_new ENABLE ROW LEVEL SECURITY;
ALTER TABLE reunions_new ENABLE ROW LEVEL SECURITY;
ALTER TABLE plaintes ENABLE ROW LEVEL SECURITY;
ALTER TABLE avertissements ENABLE ROW LEVEL SECURITY;
ALTER TABLE transferts_new ENABLE ROW LEVEL SECURITY;
ALTER TABLE promotions_new ENABLE ROW LEVEL SECURITY;
ALTER TABLE voyages ENABLE ROW LEVEL SECURITY;
ALTER TABLE annonces_new ENABLE ROW LEVEL SECURITY;
ALTER TABLE evenements_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE reunions_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE annonces_departements_new ENABLE ROW LEVEL SECURITY;

-- =============================
-- POLICIES (Drop existing ones first to avoid conflicts)
-- =============================

-- Drop existing policies if they exist
DO $$
BEGIN
    -- Drop policies for evaluations
    DROP POLICY IF EXISTS "Users can view their own evaluations" ON evaluations;
    
    -- Drop policies for objectifs  
    DROP POLICY IF EXISTS "Users can view their own objectives" ON objectifs;
    
    -- Drop policies for salaires
    DROP POLICY IF EXISTS "Only HR and admin can view salaries" ON salaires;
    
    -- Drop policies for equipements
    DROP POLICY IF EXISTS "Users can view equipment" ON equipements;
    DROP POLICY IF EXISTS "Users can view equipment" ON equipements_new;
    
    -- Drop policies for plaintes
    DROP POLICY IF EXISTS "Users can view their own complaints" ON plaintes;
    
    -- Drop policies for avertissements
    DROP POLICY IF EXISTS "Users can view their own warnings" ON avertissements;
    
    -- Drop policies for transferts
    DROP POLICY IF EXISTS "Users can view their own transfers" ON transferts;
    DROP POLICY IF EXISTS "Users can view their own transfers" ON transferts_new;
    
    -- Drop policies for promotions
    DROP POLICY IF EXISTS "Users can view their own promotions" ON promotions;
    DROP POLICY IF EXISTS "Users can view their own promotions" ON promotions_new;
    
    -- Drop policies for voyages
    DROP POLICY IF EXISTS "Users can view their own travel records" ON voyages;
    
    -- Drop policies for annonces
    DROP POLICY IF EXISTS "All users can view announcements" ON annonces;
    DROP POLICY IF EXISTS "All users can view announcements" ON annonces_new;
    
    -- Drop policies for participants tables
    DROP POLICY IF EXISTS "Users can view event participants" ON evenements_participants;
    DROP POLICY IF EXISTS "Users can view meeting participants" ON reunions_participants;
    DROP POLICY IF EXISTS "Users can view announcement departments" ON annonces_departements;
    DROP POLICY IF EXISTS "Users can view announcement departments" ON annonces_departements_new;
    
EXCEPTION
    WHEN OTHERS THEN
        -- Ignore errors if policies don't exist
        NULL;
END $$;

-- Create new policies
CREATE POLICY "Users can view their own evaluations"
    ON evaluations FOR SELECT
    TO authenticated
    USING (employe_id IN (SELECT id FROM employees WHERE user_id = auth.uid()) OR 
           evaluateur_id IN (SELECT id FROM employees WHERE user_id = auth.uid()) OR
           ((auth.jwt() ->> 'role') = ANY (ARRAY['admin', 'hr'])));

CREATE POLICY "Users can view their own objectives"
    ON objectifs FOR SELECT
    TO authenticated
    USING (employe_id IN (SELECT id FROM employees WHERE user_id = auth.uid()) OR
           ((auth.jwt() ->> 'role') = ANY (ARRAY['admin', 'hr', 'manager'])));

CREATE POLICY "Only HR and admin can view salaries"
    ON salaires FOR SELECT
    TO authenticated
    USING (((auth.jwt() ->> 'role') = ANY (ARRAY['admin', 'hr'])));

CREATE POLICY "Users can view equipment"
    ON equipements_new FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Users can view their own complaints"
    ON plaintes FOR SELECT
    TO authenticated
    USING (plaignant_id IN (SELECT id FROM employees WHERE user_id = auth.uid()) OR
           ((auth.jwt() ->> 'role') = ANY (ARRAY['admin', 'hr'])));

CREATE POLICY "Users can view their own warnings"
    ON avertissements FOR SELECT
    TO authenticated
    USING (employe_id IN (SELECT id FROM employees WHERE user_id = auth.uid()) OR
           ((auth.jwt() ->> 'role') = ANY (ARRAY['admin', 'hr'])));

CREATE POLICY "Users can view their own transfers"
    ON transferts_new FOR SELECT
    TO authenticated
    USING (employe_id IN (SELECT id FROM employees WHERE user_id = auth.uid()) OR
           ((auth.jwt() ->> 'role') = ANY (ARRAY['admin', 'hr'])));

CREATE POLICY "Users can view their own promotions"
    ON promotions_new FOR SELECT
    TO authenticated
    USING (employe_id IN (SELECT id FROM employees WHERE user_id = auth.uid()) OR
           ((auth.jwt() ->> 'role') = ANY (ARRAY['admin', 'hr'])));

CREATE POLICY "Users can view their own travel records"
    ON voyages FOR SELECT
    TO authenticated
    USING (employe_id IN (SELECT id FROM employees WHERE user_id = auth.uid()) OR
           ((auth.jwt() ->> 'role') = ANY (ARRAY['admin', 'hr'])));

CREATE POLICY "All users can view announcements"
    ON annonces_new FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Users can view event participants"
    ON evenements_participants FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Users can view meeting participants"
    ON reunions_participants FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Users can view announcement departments"
    ON annonces_departements_new FOR SELECT
    TO authenticated
    USING (true);