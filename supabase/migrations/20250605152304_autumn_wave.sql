/*
  # Insert initial data for WANEC RH

  1. Initial Data
    - Default roles for the system
    - Admin user
    - Sample departments
    - Sample employee records
*/

-- =============================
-- 1. INSERT INITIAL ROLES
-- =============================

INSERT INTO roles (nom) VALUES 
  ('Administrateur'),
  ('RH'),
  ('Manager'),
  ('Employé')
ON CONFLICT DO NOTHING;

-- =============================
-- 2. INSERT ADMIN USER
-- =============================

INSERT INTO utilisateurs (nom, email, mot_de_passe, role_id) VALUES 
  ('Admin WANEC', 'admin@wanec.com', 'password', (SELECT id FROM roles WHERE nom = 'Administrateur'))
ON CONFLICT (email) DO NOTHING;

-- =============================
-- 3. INSERT DEPARTMENTS
-- =============================

INSERT INTO departements (nom) VALUES 
  ('Direction'),
  ('Ressources Humaines'),
  ('Finance'),
  ('Commercial'),
  ('Logistique'),
  ('Technique'),
  ('Maintenance')
ON CONFLICT DO NOTHING;

-- =============================
-- 4. INSERT SAMPLE EMPLOYEES
-- =============================

-- Insert sample employees with real data
INSERT INTO employes (user_id, matricule, departement_id, poste, date_embauche, statut) VALUES
  (
    (SELECT id FROM utilisateurs WHERE email = 'admin@wanec.com'),
    'EMP001',
    (SELECT id FROM departements WHERE nom = 'Direction'),
    'Directeur Général',
    '2020-01-01',
    'Actif'
  ),
  (
    NULL,
    'EMP002',
    (SELECT id FROM departements WHERE nom = 'Ressources Humaines'),
    'Responsable RH',
    '2020-02-15',
    'Actif'
  ),
  (
    NULL,
    'EMP003',
    (SELECT id FROM departements WHERE nom = 'Finance'),
    'Chef Comptable',
    '2020-03-10',
    'Actif'
  ),
  (
    NULL,
    'EMP004',
    (SELECT id FROM departements WHERE nom = 'Commercial'),
    'Directeur Commercial',
    '2020-04-05',
    'Actif'
  ),
  (
    NULL,
    'EMP005',
    (SELECT id FROM departements WHERE nom = 'Logistique'),
    'Responsable Logistique',
    '2020-05-20',
    'Actif'
  )
ON CONFLICT (matricule) DO NOTHING;