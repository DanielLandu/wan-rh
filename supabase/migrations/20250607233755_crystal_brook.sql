/*
  # Complete HR System Database Schema

  1. New Tables
    - `evaluations` - Employee performance evaluations
    - `objectifs` - Employee objectives and goals
    - `salaires` - Salary information
    - `primes` - Bonuses and incentives
    - `equipements` - Equipment management
    - `rations` - Meal planning and costs
    - `fournisseurs` - Suppliers management
    - `recrutement` - Recruitment processes
    - `candidats` - Job candidates
    - `contrats` - Employment contracts
    - `evenements` - Company events
    - `reunions` - Meetings
    - `annonces` - Announcements
    - `plaintes` - Complaints
    - `avertissements` - Warnings
    - `transferts` - Employee transfers
    - `promotions` - Employee promotions
    - `voyages` - Business travel

  2. Security
    - Enable RLS on all new tables
    - Add appropriate policies for data access control

  3. Indexes
    - Add performance indexes for frequently queried columns
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

CREATE INDEX IF NOT EXISTS idx_evaluations_employe ON evaluations(employe_id);
CREATE INDEX IF NOT EXISTS idx_objectifs_employe ON objectifs(employe_id);
CREATE INDEX IF NOT EXISTS idx_salaires_employe ON salaires(employe_id);
CREATE INDEX IF NOT EXISTS idx_primes_employe ON primes(employe_id);
CREATE INDEX IF NOT EXISTS idx_equipements_employe ON equipements_new(employe_id);
CREATE INDEX IF NOT EXISTS idx_contrats_employe ON contrats_new(employe_id);
CREATE INDEX IF NOT EXISTS idx_plaintes_plaignant ON plaintes(plaignant_id);
CREATE INDEX IF NOT EXISTS idx_avertissements_employe ON avertissements(employe_id);
CREATE INDEX IF NOT EXISTS idx_transferts_employe ON transferts_new(employe_id);
CREATE INDEX IF NOT EXISTS idx_promotions_employe ON promotions_new(employe_id);
CREATE INDEX IF NOT EXISTS idx_voyages_employe ON voyages(employe_id);
CREATE INDEX IF NOT EXISTS idx_annonces_auteur ON annonces_new(auteur_id);
CREATE INDEX IF NOT EXISTS idx_evenements_organisateur ON evenements_new(organisateur_id);
CREATE INDEX IF NOT EXISTS idx_reunions_organisateur ON reunions_new(organisateur_id);

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
-- POLICIES
-- =============================

-- Policies for evaluations
CREATE POLICY "Users can view their own evaluations"
    ON evaluations FOR SELECT
    TO authenticated
    USING (employe_id IN (SELECT id FROM employees WHERE user_id = auth.uid()) OR 
           evaluateur_id IN (SELECT id FROM employees WHERE user_id = auth.uid()) OR
           ((auth.jwt() ->> 'role') = ANY (ARRAY['admin', 'hr'])));

-- Policies for objectives
CREATE POLICY "Users can view their own objectives"
    ON objectifs FOR SELECT
    TO authenticated
    USING (employe_id IN (SELECT id FROM employees WHERE user_id = auth.uid()) OR
           ((auth.jwt() ->> 'role') = ANY (ARRAY['admin', 'hr', 'manager'])));

-- Policies for salaries
CREATE POLICY "Only HR and admin can view salaries"
    ON salaires FOR SELECT
    TO authenticated
    USING (((auth.jwt() ->> 'role') = ANY (ARRAY['admin', 'hr'])));

-- Policies for equipment
CREATE POLICY "Users can view equipment"
    ON equipements_new FOR SELECT
    TO authenticated
    USING (true);

-- Policies for complaints
CREATE POLICY "Users can view their own complaints"
    ON plaintes FOR SELECT
    TO authenticated
    USING (plaignant_id IN (SELECT id FROM employees WHERE user_id = auth.uid()) OR
           ((auth.jwt() ->> 'role') = ANY (ARRAY['admin', 'hr'])));

-- Policies for warnings
CREATE POLICY "Users can view their own warnings"
    ON avertissements FOR SELECT
    TO authenticated
    USING (employe_id IN (SELECT id FROM employees WHERE user_id = auth.uid()) OR
           ((auth.jwt() ->> 'role') = ANY (ARRAY['admin', 'hr'])));

-- Policies for transfers
CREATE POLICY "Users can view their own transfers"
    ON transferts_new FOR SELECT
    TO authenticated
    USING (employe_id IN (SELECT id FROM employees WHERE user_id = auth.uid()) OR
           ((auth.jwt() ->> 'role') = ANY (ARRAY['admin', 'hr'])));

-- Policies for promotions
CREATE POLICY "Users can view their own promotions"
    ON promotions_new FOR SELECT
    TO authenticated
    USING (employe_id IN (SELECT id FROM employees WHERE user_id = auth.uid()) OR
           ((auth.jwt() ->> 'role') = ANY (ARRAY['admin', 'hr'])));

-- Policies for travel
CREATE POLICY "Users can view their own travel records"
    ON voyages FOR SELECT
    TO authenticated
    USING (employe_id IN (SELECT id FROM employees WHERE user_id = auth.uid()) OR
           ((auth.jwt() ->> 'role') = ANY (ARRAY['admin', 'hr'])));

-- Policies for announcements
CREATE POLICY "All users can view announcements"
    ON annonces_new FOR SELECT
    TO authenticated
    USING (true);

-- Policies for participants tables
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