import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Search, Plus, Calendar as CalendarIcon, Receipt, DollarSign, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function Facture() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [invoiceDate, setInvoiceDate] = useState<Date>();

  // Mock data
  const invoices = [
    {
      id: '1',
      numero: 'FAC-2025-001',
      fournisseur: 'TechCorp Solutions',
      description: 'Équipements informatiques',
      departement: 'Technique',
      montant: 15000,
      dateFacture: '2025-01-20',
      dateEcheance: '2025-02-20',
      statut: 'Payée',
      devisId: 'DEV-2025-001'
    },
    {
      id: '2',
      numero: 'FAC-2025-002',
      fournisseur: 'Office Furniture Ltd',
      description: 'Mobilier de bureau',
      departement: 'Administration',
      montant: 8500,
      dateFacture: '2025-01-25',
      dateEcheance: '2025-02-25',
      statut: 'En attente',
      devisId: 'DEV-2025-002'
    },
    {
      id: '3',
      numero: 'FAC-2025-003',
      fournisseur: 'Energy Solutions',
      description: 'Facture électricité',
      departement: 'Administration',
      montant: 2800,
      dateFacture: '2025-01-30',
      dateEcheance: '2025-02-15',
      statut: 'En retard',
      devisId: null
    }
  ];

  const departments = ['Administration', 'Technique', 'Logistique', 'Commercial', 'Finance'];
  const statuses = ['En attente', 'Payée', 'En retard', 'Annulée'];

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.numero.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         invoice.fournisseur.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         invoice.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || invoice.statut === statusFilter;
    const matchesDepartment = departmentFilter === 'all' || invoice.departement === departmentFilter;
    
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const totalInvoices = invoices.length;
  const paidInvoices = invoices.filter(i => i.statut === 'Payée').length;
  const pendingInvoices = invoices.filter(i => i.statut === 'En attente').length;
  const overdueInvoices = invoices.filter(i => i.statut === 'En retard').length;
  const totalAmount = invoices.reduce((sum, i) => sum + i.montant, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gestion des Factures</h2>
          <p className="text-muted-foreground">
            Suivez et gérez toutes les factures fournisseurs
          </p>
        </div>
        <Button onClick={() => setOpenAddDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle facture
        </Button>
      </div>

      {/* Statistiques */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Factures</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalInvoices}</div>
            <p className="text-xs text-muted-foreground">
              Ce mois
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Payées</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{paidInvoices}</div>
            <p className="text-xs text-muted-foreground">
              {((paidInvoices / totalInvoices) * 100).toFixed(1)}% du total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Attente</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{pendingInvoices}</div>
            <p className="text-xs text-muted-foreground">
              À traiter
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Retard</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{overdueInvoices}</div>
            <p className="text-xs text-muted-foreground">
              Échues
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Montant Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalAmount)}</div>
            <p className="text-xs text-muted-foreground">
              Valeur des factures
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des Factures</CardTitle>
          <CardDescription>
            Consultez et gérez toutes les factures fournisseurs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher une facture..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Select defaultValue={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  {statuses.map(status => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select defaultValue={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Département" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les départements</SelectItem>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Numéro</TableHead>
                  <TableHead>Fournisseur</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Département</TableHead>
                  <TableHead>Montant</TableHead>
                  <TableHead>Date facture</TableHead>
                  <TableHead>Échéance</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell>
                      <div>
                        <Badge variant="outline" className="font-mono">
                          {invoice.numero}
                        </Badge>
                        {invoice.devisId && (
                          <div className="text-xs text-muted-foreground mt-1">
                            Devis: {invoice.devisId}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{invoice.fournisseur}</div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-[200px] truncate">
                        {invoice.description}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{invoice.departement}</Badge>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">
                        {formatCurrency(invoice.montant)}
                      </span>
                    </TableCell>
                    <TableCell>{invoice.dateFacture}</TableCell>
                    <TableCell>
                      <div className={
                        invoice.statut === 'En retard' ? 'text-red-600 font-medium' : ''
                      }>
                        {invoice.dateEcheance}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          invoice.statut === 'Payée' ? 'default' : 
                          invoice.statut === 'En attente' ? 'outline' : 
                          invoice.statut === 'En retard' ? 'destructive' :
                          'secondary'
                        }
                      >
                        {invoice.statut}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Voir détails
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Dialog Nouvelle Facture */}
      <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Nouvelle facture</DialogTitle>
            <DialogDescription>
              Enregistrez une nouvelle facture fournisseur
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="numero">Numéro de facture</Label>
                <Input 
                  id="numero" 
                  placeholder="FAC-2025-004"
                />
              </div>
              <div>
                <Label htmlFor="fournisseur">Fournisseur</Label>
                <Input 
                  id="fournisseur" 
                  placeholder="Nom du fournisseur"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input 
                id="description" 
                placeholder="Description des biens/services"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="departement">Département</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map(dept => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="montant">Montant</Label>
                <Input 
                  id="montant" 
                  type="number" 
                  placeholder="15000"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Date de facture</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {invoiceDate ? format(invoiceDate, 'dd/MM/yyyy') : 'Sélectionner'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={invoiceDate}
                      onSelect={setInvoiceDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label htmlFor="echeance">Date d'échéance</Label>
                <Input 
                  id="echeance" 
                  type="date"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="devis">Devis associé (optionnel)</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un devis" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DEV-2025-001">DEV-2025-001</SelectItem>
                  <SelectItem value="DEV-2025-002">DEV-2025-002</SelectItem>
                  <SelectItem value="DEV-2025-003">DEV-2025-003</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenAddDialog(false)}>
              Annuler
            </Button>
            <Button type="submit">Enregistrer la facture</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}