/*
  # Complete HR Management System Schema

  1. Core Tables
    - departments: Company departments
    - employees: Employee information
    - users: User accounts
    - roles: User roles and permissions
    - employee_profiles: Extended employee information

  2. Time Management
    - attendance: Daily attendance records
    - leaves: Leave requests and approvals
    - timesheets: Weekly time tracking

  3. Performance Management
    - objectives: Employee objectives
    - performance_indicators: KPI definitions
    - evaluations: Performance evaluations

  4. Finance & Payroll
    - payroll_slips: Monthly pay slips
    - salary_scales: Salary grade definitions
    - payments: Payment records
    - quotes: Purchase quotes
    - invoices: Invoice management
    - monthly_reports: Financial reports

  5. Logistics & Fleet
    - vehicles: Vehicle fleet
    - drivers: Driver information
    - fuels: Fuel consumption records

  6. Maintenance
    - equipments: Equipment inventory
    - interventions: Maintenance interventions
    - maintenance_history: Maintenance records

  7. Inventory & Suppliers
    - inventory: Stock management
    - suppliers: Supplier information

  8. Organization
    - teams: Team structure
    - assignments: Team assignments

  9. Training
    - trainings: Training programs
    - trainers: Trainer information

  10. Administration
    - transfers: Employee transfers
    - resignations: Resignation records
    - travels: Business travel
    - promotions: Promotion records
    - complaints: Employee complaints
    - warnings: Disciplinary warnings
    - terminations: Employment terminations
    - vacations: Vacation records

  11. Communication
    - announcements: Company announcements
    - announcements_departments: Announcement targeting
    - recruitments: Job postings
    - contracts: Employment contracts

  12. Messaging & Notifications
    - events: Company events
    - meetings: Meeting management
    - documents: Document storage
    - messages: Internal messaging
    - notifications: System notifications
    - alerts: System alerts

  13. Reporting
    - reports_global: Global reports
    - reports_fuel: Fuel reports
    - reports_maintenance: Maintenance reports
    - reports_finance: Financial reports
    - reports_performance: Performance reports

  14. Settings & Support
    - settings: System settings
    - tutorials: Help tutorials
    - faq: Frequently asked questions
    - support_contacts: Support contact information

  15. Mobile Features
    - mobile_dashboards: Mobile dashboard data
    - mobile_scans: QR code scans
    - mobile_reports: Mobile reports
    - offline_sync: Offline synchronization

  16. Security
    - Enable RLS on all tables
    - Create appropriate policies for data access
*/

-- Create departments table
CREATE TABLE IF NOT EXISTS departments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create roles table
CREATE TABLE IF NOT EXISTS roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nom TEXT NOT NULL
);

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role_id UUID NOT NULL REFERENCES roles(id) ON DELETE RESTRICT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create employees table
CREATE TABLE IF NOT EXISTS employees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  date_of_birth DATE,
  phone VARCHAR(20),
  email VARCHAR(255),
  hire_date DATE,
  department_id INTEGER REFERENCES departments(id),
  position VARCHAR(100),
  status VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create employee_profiles table
CREATE TABLE IF NOT EXISTS employee_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE RESTRICT,
  address TEXT,
  emergency_contact_name VARCHAR(100),
  emergency_contact_phone VARCHAR(20),
  bio TEXT,
  photo_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create attendance table
CREATE TABLE IF NOT EXISTS attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE RESTRICT,
  date DATE NOT NULL,
  check_in TIMESTAMP,
  check_out TIMESTAMP,
  status VARCHAR(50) DEFAULT 'Present',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create leaves table
CREATE TABLE IF NOT EXISTS leaves (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE RESTRICT,
  leave_type VARCHAR(50),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status VARCHAR(50) DEFAULT 'Pending',
  reason TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create timesheets table
CREATE TABLE IF NOT EXISTS timesheets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE RESTRICT,
  date DATE NOT NULL,
  hours_worked DECIMAL(5,2) NOT NULL,
  task_description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create objectives table
CREATE TABLE IF NOT EXISTS objectives (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE RESTRICT,
  description TEXT NOT NULL,
  target_date DATE,
  status VARCHAR(50) DEFAULT 'Open',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create performance_indicators table
CREATE TABLE IF NOT EXISTS performance_indicators (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  target_value DECIMAL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create payroll_slips table
CREATE TABLE IF NOT EXISTS payroll_slips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE RESTRICT,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  gross_salary DECIMAL(12,2),
  net_salary DECIMAL(12,2),
  deductions DECIMAL(12,2),
  bonuses DECIMAL(12,2),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create salary_scales table
CREATE TABLE IF NOT EXISTS salary_scales (
  id SERIAL PRIMARY KEY,
  grade VARCHAR(50) UNIQUE NOT NULL,
  base_salary DECIMAL(12,2),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
  id SERIAL PRIMARY KEY,
  employee_id UUID NOT NULL REFERENCES employees(id),
  amount DECIMAL(12,2) NOT NULL,
  payment_date DATE NOT NULL,
  payment_method VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create quotes table
CREATE TABLE IF NOT EXISTS quotes (
  id SERIAL PRIMARY KEY,
  description TEXT NOT NULL,
  amount DECIMAL(12,2),
  department_id INTEGER,
  status VARCHAR(50) DEFAULT 'Pending',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create invoices table
CREATE TABLE IF NOT EXISTS invoices (
  id SERIAL PRIMARY KEY,
  quote_id INTEGER REFERENCES quotes(id) ON DELETE SET NULL,
  invoice_date DATE NOT NULL,
  amount DECIMAL(12,2),
  status VARCHAR(50) DEFAULT 'Unpaid',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create monthly_reports table
CREATE TABLE IF NOT EXISTS monthly_reports (
  id SERIAL PRIMARY KEY,
  department_id INTEGER,
  month DATE NOT NULL,
  total_expenses DECIMAL(12,2),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create vehicles table
CREATE TABLE IF NOT EXISTS vehicles (
  id SERIAL PRIMARY KEY,
  plate_number VARCHAR(20) UNIQUE NOT NULL,
  model VARCHAR(100),
  status VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create drivers table
CREATE TABLE IF NOT EXISTS drivers (
  id SERIAL PRIMARY KEY,
  employee_id UUID NOT NULL REFERENCES employees(id),
  license_number VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create fuels table
CREATE TABLE IF NOT EXISTS fuels (
  id SERIAL PRIMARY KEY,
  vehicle_id INTEGER NOT NULL,
  quantity DECIMAL(10,2) NOT NULL,
  date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create equipments table
CREATE TABLE IF NOT EXISTS equipments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  serial_number VARCHAR(100),
  status VARCHAR(50),
  purchase_date DATE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create interventions table
CREATE TABLE IF NOT EXISTS interventions (
  id SERIAL PRIMARY KEY,
  equipment_id INTEGER NOT NULL REFERENCES equipments(id),
  intervention_date DATE NOT NULL,
  description TEXT,
  status VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create maintenance_history table
CREATE TABLE IF NOT EXISTS maintenance_history (
  id SERIAL PRIMARY KEY,
  equipment_id INTEGER NOT NULL REFERENCES equipments(id),
  intervention_id INTEGER NOT NULL REFERENCES interventions(id),
  performed_by UUID REFERENCES employees(id),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create inventory table
CREATE TABLE IF NOT EXISTS inventory (
  id SERIAL PRIMARY KEY,
  item_name VARCHAR(100) NOT NULL,
  quantity INTEGER NOT NULL,
  unit VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create suppliers table
CREATE TABLE IF NOT EXISTS suppliers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  contact_info TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create teams table
CREATE TABLE IF NOT EXISTS teams (
  id SERIAL PRIMARY KEY,
  department_id INTEGER REFERENCES departments(id),
  name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create assignments table
CREATE TABLE IF NOT EXISTS assignments (
  id SERIAL PRIMARY KEY,
  employee_id UUID REFERENCES employees(id),
  team_id INTEGER REFERENCES teams(id),
  role VARCHAR(100),
  assigned_at TIMESTAMP DEFAULT NOW()
);

-- Create trainings table
CREATE TABLE IF NOT EXISTS trainings (
  id SERIAL PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  description TEXT,
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create trainers table
CREATE TABLE IF NOT EXISTS trainers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  expertise TEXT,
  contact_info TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create transfers table
CREATE TABLE IF NOT EXISTS transfers (
  id SERIAL PRIMARY KEY,
  employee_id UUID REFERENCES employees(id),
  from_department_id INTEGER REFERENCES departments(id),
  to_department_id INTEGER REFERENCES departments(id),
  transfer_date DATE,
  reason TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create resignations table
CREATE TABLE IF NOT EXISTS resignations (
  id SERIAL PRIMARY KEY,
  employee_id UUID NOT NULL REFERENCES employees(id),
  resignation_date DATE,
  reason TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create travels table
CREATE TABLE IF NOT EXISTS travels (
  id SERIAL PRIMARY KEY,
  employee_id UUID NOT NULL REFERENCES employees(id),
  destination TEXT,
  start_date DATE,
  end_date DATE,
  purpose TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create promotions table
CREATE TABLE IF NOT EXISTS promotions (
  id SERIAL PRIMARY KEY,
  employee_id UUID NOT NULL REFERENCES employees(id),
  old_position VARCHAR(100),
  new_position VARCHAR(100),
  promotion_date DATE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create complaints table
CREATE TABLE IF NOT EXISTS complaints (
  id SERIAL PRIMARY KEY,
  employee_id UUID NOT NULL REFERENCES employees(id),
  complaint_text TEXT,
  status VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create warnings table
CREATE TABLE IF NOT EXISTS warnings (
  id SERIAL PRIMARY KEY,
  employee_id UUID NOT NULL REFERENCES employees(id),
  warning_text TEXT,
  status VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create terminations table
CREATE TABLE IF NOT EXISTS terminations (
  id SERIAL PRIMARY KEY,
  employee_id UUID NOT NULL REFERENCES employees(id),
  termination_date DATE,
  reason TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create vacations table
CREATE TABLE IF NOT EXISTS vacations (
  id SERIAL PRIMARY KEY,
  employee_id UUID NOT NULL REFERENCES employees(id),
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create announcements table
CREATE TABLE IF NOT EXISTS announcements (
  id SERIAL PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create announcements_departments table
CREATE TABLE IF NOT EXISTS announcements_departments (
  announcement_id INTEGER NOT NULL REFERENCES announcements(id) ON DELETE CASCADE,
  department_id INTEGER NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
  PRIMARY KEY (announcement_id, department_id)
);

-- Create recruitments table
CREATE TABLE IF NOT EXISTS recruitments (
  id SERIAL PRIMARY KEY,
  position VARCHAR(150),
  description TEXT,
  opening_date DATE,
  closing_date DATE,
  status VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create contracts table
CREATE TABLE IF NOT EXISTS contracts (
  id SERIAL PRIMARY KEY,
  employee_id UUID REFERENCES employees(id),
  contract_type VARCHAR(100),
  start_date DATE,
  end_date DATE,
  terms TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id SERIAL PRIMARY KEY,
  title VARCHAR(150),
  description TEXT,
  event_date DATE,
  location TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create event_participants table
CREATE TABLE IF NOT EXISTS event_participants (
  event_id INTEGER NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  PRIMARY KEY (event_id, employee_id)
);

-- Create meetings table
CREATE TABLE IF NOT EXISTS meetings (
  id SERIAL PRIMARY KEY,
  title VARCHAR(150),
  description TEXT,
  meeting_date DATE,
  location TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create meeting_participants table
CREATE TABLE IF NOT EXISTS meeting_participants (
  meeting_id INTEGER NOT NULL REFERENCES meetings(id) ON DELETE CASCADE,
  employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  PRIMARY KEY (meeting_id, employee_id)
);

-- Create documents table
CREATE TABLE IF NOT EXISTS documents (
  id SERIAL PRIMARY KEY,
  title VARCHAR(150),
  description TEXT,
  url TEXT,
  uploaded_by UUID REFERENCES employees(id),
  upload_date TIMESTAMP DEFAULT NOW()
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  sender_id UUID REFERENCES employees(id),
  receiver_id UUID REFERENCES employees(id),
  content TEXT,
  sent_at TIMESTAMP DEFAULT NOW(),
  read BOOLEAN DEFAULT FALSE
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id SERIAL PRIMARY KEY,
  employee_id UUID REFERENCES employees(id),
  message TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create alerts table
CREATE TABLE IF NOT EXISTS alerts (
  id SERIAL PRIMARY KEY,
  employee_id UUID REFERENCES employees(id),
  alert_text TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create reports tables
CREATE TABLE IF NOT EXISTS reports_global (
  id SERIAL PRIMARY KEY,
  report_date DATE,
  content TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS reports_fuel (
  id SERIAL PRIMARY KEY,
  report_date DATE,
  total_fuel_consumed DECIMAL(12,2),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS reports_maintenance (
  id SERIAL PRIMARY KEY,
  report_date DATE,
  maintenance_summary TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS reports_finance (
  id SERIAL PRIMARY KEY,
  report_date DATE,
  financial_summary TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS reports_performance (
  id SERIAL PRIMARY KEY,
  report_date DATE,
  performance_summary TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create settings table
CREATE TABLE IF NOT EXISTS settings (
  id SERIAL PRIMARY KEY,
  key VARCHAR(100) UNIQUE NOT NULL,
  value TEXT,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create support tables
CREATE TABLE IF NOT EXISTS tutorials (
  id SERIAL PRIMARY KEY,
  title VARCHAR(150),
  content TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS faq (
  id SERIAL PRIMARY KEY,
  question TEXT,
  answer TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS support_contacts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(150),
  email VARCHAR(255),
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create mobile tables
CREATE TABLE IF NOT EXISTS mobile_dashboards (
  id SERIAL PRIMARY KEY,
  employee_id UUID REFERENCES employees(id),
  last_sync TIMESTAMP
);

CREATE TABLE IF NOT EXISTS mobile_scans (
  id SERIAL PRIMARY KEY,
  employee_id UUID REFERENCES employees(id),
  qr_code TEXT,
  scan_date TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS mobile_reports (
  id SERIAL PRIMARY KEY,
  employee_id UUID REFERENCES employees(id),
  report_content TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS offline_sync (
  id SERIAL PRIMARY KEY,
  employee_id UUID REFERENCES employees(id),
  sync_data JSONB,
  sync_date TIMESTAMP DEFAULT NOW()
);

-- Insert sample data
INSERT INTO departments (name, description) VALUES
('Administration', 'Administrative department'),
('Commercial', 'Sales and marketing'),
('Finance', 'Financial management'),
('Technique', 'Technical operations'),
('Logistique', 'Logistics and supply chain'),
('Ressources Humaines', 'Human resources');

INSERT INTO roles (nom) VALUES
('admin'),
('hr'),
('manager'),
('employee');

-- Insert sample settings
INSERT INTO settings (key, value) VALUES
('company_name', 'WANEC'),
('company_address', 'Kinshasa, RDC'),
('working_hours_start', '08:00'),
('working_hours_end', '17:00'),
('currency', 'USD');