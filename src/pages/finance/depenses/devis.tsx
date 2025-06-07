import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Search, Plus, Calendar as CalendarIcon, FileText, DollarSign, Clock, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function Devis() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [quoteDate, setQuoteDate] = useState<Date>();

  // Mock data
  const quotes = [
    {
      id: '1',
      numero: 'DEV-2025-001',
      description: 'Équipements informatiques pour le département technique',
      departement: 'Technique',
      montant: 15000,
      dateCreation: '2025-01-15',
      dateValidite: '2025-02-15',
      statut: 'En attente',
      fournisseur: 'TechCorp Solutions'
    },
    {
      id: '2',
      numero: 'DEV-2025-002',
      description: 'Mobilier de bureau pour les nouveaux locaux',
      departement: 'Administration',
      montant: 8500,
      dateCreation: '2025-01-10',
      dateValidite: '2025-02-10',
      statut: 'Approuvé',
      fournisseur: 'Office Furniture Ltd'
    },
    {
      id: '3',
      numero: 'DEV-2025-003',
      description: 'Véhicules de service pour la logistique',
      departement: 'Logistique',
      montant: 45000,
      dateCreation: '2025-01-20',
      dateValidite: '2025-03-20',
      statut: 'En révision',
      fournisseur: 'Auto Services SARL'
    }
  ];

  const departments = ['Administration', 'Technique', 'Logistique', 'Commercial', 'Finance'];
  const statuses = ['En attente', 'Approuvé', 'Refusé', 'En révision', 'Expiré'];

  const filteredQuotes = quotes.filter(quote => {
    const matchesSearch = quote.numero.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         quote.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         quote.fournisseur.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || quote.statut === statusFilter;
    const matchesDepartment = departmentFilter === 'all' || quote.departement === departmentFilter;
    
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const totalQuotes = quotes.length;
  const approvedQuotes = quotes.filter(q => q.statut === 'Approuvé').length;
  const pendingQuotes = quotes.filter(q => q.statut === 'En attente').length;
  const totalAmount = quotes.reduce((sum, q) => sum + q.montant, 0);

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
          <h2 className="text-3xl font-bold tracking-tight">Gestion des Devis</h2>
          <p className="text-muted-foreground">
            Créez et gérez les demandes de devis pour les achats
          </p>
        </div>
        <Button onClick={() => setOpenAddDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nouveau devis
        </Button>
      </div>

      {/* Statistiques */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Devis</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalQuotes}</div>
            <p className="text-xs text-muted-foreground">
              Ce mois
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approuvés</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{approvedQuotes}</div>
            <p className="text-xs text-muted-foreground">
              {((approvedQuotes / totalQuotes) * 100).toFixed(1)}% du total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Attente</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{pendingQuotes}</div>
            <p className="text-xs text-muted-foreground">
              À traiter
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
              Valeur des devis
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des Devis</CardTitle>
          <CardDescription>
            Consultez et gérez toutes les demandes de devis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un devis..."
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
                  <TableHead>Description</TableHead>
                  <TableHead>Département</TableHead>
                  <TableHead>Fournisseur</TableHead>
                  <TableHead>Montant</TableHead>
                  <TableHead>Date création</TableHead>
                  <TableHead>Validité</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredQuotes.map((quote) => (
                  <TableRow key={quote.id}>
                    <TableCell>
                      <Badge variant="outline" className="font-mono">
                        {quote.numero}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-[300px]">
                        <div className="font-medium truncate">{quote.description}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{quote.departement}</Badge>
                    </TableCell>
                    <TableCell>{quote.fournisseur}</TableCell>
                    <TableCell>
                      <span className="font-medium">
                        {formatCurrency(quote.montant)}
                      </span>
                    </TableCell>
                    <TableCell>{quote.dateCreation}</TableCell>
                    <TableCell>{quote.dateValidite}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          quote.statut === 'Approuvé' ? 'default' : 
                          quote.statut === 'En attente' ? 'outline' : 
                          quote.statut === 'Refusé' ? 'destructive' :
                          'secondary'
                        }
                      >
                        {quote.statut}
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

      {/* Dialog Nouveau Devis */}
      <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Nouveau devis</DialogTitle>
            <DialogDescription>
              Créez une nouvelle demande de devis
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="numero">Numéro de devis</Label>
                <Input 
                  id="numero" 
                  placeholder="DEV-2025-004"
                />
              </div>
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
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                placeholder="Décrivez les biens ou services à acheter"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fournisseur">Fournisseur</Label>
                <Input 
                  id="fournisseur" 
                  placeholder="Nom du fournisseur"
                />
              </div>
              <div>
                <Label htmlFor="montant">Montant estimé</Label>
                <Input 
                  id="montant" 
                  type="number" 
                  placeholder="15000"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Date de création</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {quoteDate ? format(quoteDate, 'dd/MM/yyyy') : 'Sélectionner'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={quoteDate}
                      onSelect={setQuoteDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label htmlFor="validite">Date de validité</Label>
                <Input 
                  id="validite" 
                  type="date"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenAddDialog(false)}>
              Annuler
            </Button>
            <Button type="submit">Créer le devis</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}