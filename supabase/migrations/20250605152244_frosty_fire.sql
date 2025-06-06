/*
  # Create base tables for WANEC RH

  1. New Tables
    - `roles` - User roles in the system
    - `utilisateurs` - User accounts
    - `departements` - Company departments 
    - `employes` - Employee records
    - `presences` - Employee attendance records
    - `conges` - Leave requests
    - `feuilles_de_temps` - Timesheet records
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- =============================
-- 1. ROLES & UTILISATEURS
-- =============================

CREATE TABLE IF NOT EXISTS roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nom TEXT NOT NULL
);

ALTER TABLE roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read roles"
    ON roles
    FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Only administrators can insert/update roles"
    ON roles
    FOR ALL
    TO authenticated
    USING (auth.jwt() ->> 'role' = 'admin');

CREATE TABLE IF NOT EXISTS utilisateurs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nom TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    mot_de_passe TEXT NOT NULL,
    role_id UUID REFERENCES roles(id),
    photo_profil TEXT,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE utilisateurs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own data"
    ON utilisateurs
    FOR SELECT
    TO authenticated
    USING (id = auth.uid() OR auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Only administrators can insert/update users"
    ON utilisateurs
    FOR ALL
    TO authenticated
    USING (auth.jwt() ->> 'role' = 'admin');

-- =============================
-- 2. EMPLOYÉS & DÉPARTEMENTS
-- =============================

CREATE TABLE IF NOT EXISTS departements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nom TEXT NOT NULL
);

ALTER TABLE departements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read departments"
    ON departements
    FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Only administrators can insert/update departments"
    ON departements
    FOR ALL
    TO authenticated
    USING (auth.jwt() ->> 'role' = 'admin');

CREATE TABLE IF NOT EXISTS employes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES utilisateurs(id) ON DELETE SET NULL,
    matricule TEXT UNIQUE,
    departement_id UUID REFERENCES departements(id),
    poste TEXT,
    date_embauche DATE,
    statut TEXT
);

ALTER TABLE employes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read employee data"
    ON employes
    FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Users can read their own employee data"
    ON employes
    FOR SELECT
    TO authenticated
    USING (user_id = auth.uid());

CREATE POLICY "Only administrators and HR can insert/update employees"
    ON employes
    FOR ALL
    TO authenticated
    USING (auth.jwt() ->> 'role' IN ('admin', 'hr'));

-- =============================
-- 3. PRÉSENCES, CONGÉS, TEMPS
-- =============================

CREATE TABLE IF NOT EXISTS presences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employe_id UUID REFERENCES employes(id),
    date_presence DATE,
    heure_arrivee TIME,
    heure_depart TIME,
    statut TEXT
);

ALTER TABLE presences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own attendance"
    ON presences
    FOR SELECT
    TO authenticated
    USING (employe_id IN (SELECT id FROM employes WHERE user_id = auth.uid()) OR auth.jwt() ->> 'role' IN ('admin', 'hr', 'manager'));

CREATE POLICY "Users can insert their own attendance"
    ON presences
    FOR INSERT
    TO authenticated
    WITH CHECK (employe_id IN (SELECT id FROM employes WHERE user_id = auth.uid()) OR auth.jwt() ->> 'role' IN ('admin', 'hr'));

CREATE TABLE IF NOT EXISTS conges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employe_id UUID REFERENCES employes(id),
    date_debut DATE,
    date_fin DATE,
    raison TEXT,
    statut TEXT
);

ALTER TABLE conges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own leave requests"
    ON conges
    FOR SELECT
    TO authenticated
    USING (employe_id IN (SELECT id FROM employes WHERE user_id = auth.uid()) OR auth.jwt() ->> 'role' IN ('admin', 'hr', 'manager'));

CREATE POLICY "Users can insert their own leave requests"
    ON conges
    FOR INSERT
    TO authenticated
    WITH CHECK (employe_id IN (SELECT id FROM employes WHERE user_id = auth.uid()));

CREATE TABLE IF NOT EXISTS feuilles_de_temps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employe_id UUID REFERENCES employes(id),
    semaine DATE,
    heures_travaillees INTEGER
);

ALTER TABLE feuilles_de_temps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own timesheets"
    ON feuilles_de_temps
    FOR SELECT
    TO authenticated
    USING (employe_id IN (SELECT id FROM employes WHERE user_id = auth.uid()) OR auth.jwt() ->> 'role' IN ('admin', 'hr', 'manager'));

CREATE POLICY "Users can insert/update their own timesheets"
    ON feuilles_de_temps
    FOR ALL
    TO authenticated
    USING (employe_id IN (SELECT id FROM employes WHERE user_id = auth.uid()) OR auth.jwt() ->> 'role' IN ('admin', 'hr'));

-- =============================
-- 4. INDEXES ET CONTRAINTES SUPPLÉMENTAIRES
-- =============================

CREATE INDEX IF NOT EXISTS idx_employe_user ON employes(user_id);
CREATE INDEX IF NOT EXISTS idx_employe_departement ON employes(departement_id);
CREATE INDEX IF NOT EXISTS idx_presence_employe ON presences(employe_id);
CREATE INDEX IF NOT EXISTS idx_conges_employe ON conges(employe_id);
CREATE INDEX IF NOT EXISTS idx_feuilles_employe ON feuilles_de_temps(employe_id);