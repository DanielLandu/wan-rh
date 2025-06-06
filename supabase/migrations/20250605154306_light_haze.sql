/*
  # Additional tables for WANEC RH

  1. New Tables
    - `evaluations` - Employee performance evaluations
    - `objectifs` - Employee objectives and goals
    - `salaires` - Salary information
    - `primes` - Bonuses and incentives
    - `equipements` - Equipment inventory
    - `rations` - Food rations management
    - `fournisseurs` - Suppliers management
*/

-- =============================
-- PERFORMANCE & EVALUATIONS
-- =============================

CREATE TABLE IF NOT EXISTS evaluations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employe_id UUID REFERENCES employes(id),
    evaluateur_id UUID REFERENCES employes(id),
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
    employe_id UUID REFERENCES employes(id),
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
    employe_id UUID REFERENCES employes(id),
    montant_base NUMERIC,
    devise TEXT DEFAULT 'USD',
    date_effet DATE,
    historique JSONB
);

CREATE TABLE IF NOT EXISTS primes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employe_id UUID REFERENCES employes(id),
    type TEXT,
    montant NUMERIC,
    date_attribution DATE,
    raison TEXT
);

-- =============================
-- EQUIPEMENTS & INVENTAIRE
-- =============================

CREATE TABLE IF NOT EXISTS equipements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nom TEXT,
    type TEXT,
    numero_serie TEXT,
    statut TEXT,
    date_acquisition DATE,
    cout_acquisition NUMERIC,
    employe_id UUID REFERENCES employes(id),
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

CREATE TABLE IF NOT EXISTS fournisseurs (
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
-- INDEXES
-- =============================

CREATE INDEX IF NOT EXISTS idx_evaluations_employe ON evaluations(employe_id);
CREATE INDEX IF NOT EXISTS idx_objectifs_employe ON objectifs(employe_id);
CREATE INDEX IF NOT EXISTS idx_salaires_employe ON salaires(employe_id);
CREATE INDEX IF NOT EXISTS idx_primes_employe ON primes(employe_id);
CREATE INDEX IF NOT EXISTS idx_equipements_employe ON equipements(employe_id);

-- =============================
-- ROW LEVEL SECURITY
-- =============================

ALTER TABLE evaluations ENABLE ROW LEVEL SECURITY;
ALTER TABLE objectifs ENABLE ROW LEVEL SECURITY;
ALTER TABLE salaires ENABLE ROW LEVEL SECURITY;
ALTER TABLE primes ENABLE ROW LEVEL SECURITY;
ALTER TABLE equipements ENABLE ROW LEVEL SECURITY;
ALTER TABLE rations ENABLE ROW LEVEL SECURITY;
ALTER TABLE fournisseurs ENABLE ROW LEVEL SECURITY;

-- Policies for evaluations
CREATE POLICY "Users can view their own evaluations"
    ON evaluations FOR SELECT
    TO authenticated
    USING (employe_id IN (SELECT id FROM employes WHERE user_id = auth.uid()) OR 
           evaluateur_id IN (SELECT id FROM employes WHERE user_id = auth.uid()) OR
           auth.jwt() ->> 'role' IN ('admin', 'hr'));

-- Policies for objectives
CREATE POLICY "Users can view their own objectives"
    ON objectifs FOR SELECT
    TO authenticated
    USING (employe_id IN (SELECT id FROM employes WHERE user_id = auth.uid()) OR
           auth.jwt() ->> 'role' IN ('admin', 'hr', 'manager'));

-- Policies for salaries
CREATE POLICY "Only HR and admin can view salaries"
    ON salaires FOR SELECT
    TO authenticated
    USING (auth.jwt() ->> 'role' IN ('admin', 'hr'));

-- Policies for equipment
CREATE POLICY "Users can view equipment"
    ON equipements FOR SELECT
    TO authenticated
    USING (true);