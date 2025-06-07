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
import { Search, Plus, Calendar as CalendarIcon, GraduationCap, Users, Clock, BookOpen } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function Formations() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  // Mock data
  const trainings = [
    {
      id: '1',
      titre: 'Formation Leadership',
      description: 'Développement des compétences de leadership et management',
      categorie: 'Management',
      formateur: 'Dr. Marie Dubois',
      dateDebut: '2025-02-15',
      dateFin: '2025-02-17',
      duree: '3 jours',
      participants: 12,
      capaciteMax: 15,
      lieu: 'Salle de conférence A',
      statut: 'Planifiée',
      cout: 2500
    },
    {
      id: '2',
      titre: 'Sécurité au Travail',
      description: 'Formation obligatoire sur les règles de sécurité',
      categorie: 'Sécurité',
      formateur: 'Pierre Leroy',
      dateDebut: '2025-01-20',
      dateFin: '2025-01-20',
      duree: '1 jour',
      participants: 25,
      capaciteMax: 30,
      lieu: 'Auditorium',
      statut: 'En cours',
      cout: 800
    },
    {
      id: '3',
      titre: 'Comptabilité Avancée',
      description: 'Techniques avancées de comptabilité et reporting',
      categorie: 'Finance',
      formateur: 'Sophie Bernard',
      dateDebut: '2025-01-10',
      dateFin: '2025-01-12',
      duree: '3 jours',
      participants: 8,
      capaciteMax: 10,
      lieu: 'Salle de formation B',
      statut: 'Terminée',
      cout: 1800
    }
  ];

  const categories = ['Management', 'Sécurité', 'Finance', 'Technique', 'Commercial', 'RH'];
  const statuses = ['Planifiée', 'En cours', 'Terminée', 'Annulée'];

  const filteredTrainings = trainings.filter(training => {
    const matchesSearch = training.titre.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         training.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || training.statut === statusFilter;
    const matchesCategory = categoryFilter === 'all' || training.categorie === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const totalTrainings = trainings.length;
  const activeTrainings = trainings.filter(t => t.statut === 'En cours' || t.statut === 'Planifiée').length;
  const totalParticipants = trainings.reduce((sum, t) => sum + t.participants, 0);
  const totalCost = trainings.reduce((sum, t) => sum + t.cout, 0);

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
          <h2 className="text-3xl font-bold tracking-tight">Gestion des Formations</h2>
          <p className="text-muted-foreground">
            Planifiez et gérez les programmes de formation des employés
          </p>
        </div>
        <Button onClick={() => setOpenAddDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle formation
        </Button>
      </div>

      {/* Statistiques */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Formations</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTrainings}</div>
            <p className="text-xs text-muted-foreground">
              Programmes disponibles
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Formations Actives</CardTitle>
            <BookOpen className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{activeTrainings}</div>
            <p className="text-xs text-muted-foreground">
              En cours ou planifiées
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Participants</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{totalParticipants}</div>
            <p className="text-xs text-muted-foreground">
              Employés formés
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Coût Total</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalCost)}</div>
            <p className="text-xs text-muted-foreground">
              Budget formations
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des Formations</CardTitle>
          <CardDescription>
            Consultez et gérez toutes les formations programmées
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher une formation..."
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
              <Select defaultValue={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes catégories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Formation</TableHead>
                  <TableHead>Formateur</TableHead>
                  <TableHead>Période</TableHead>
                  <TableHead>Participants</TableHead>
                  <TableHead>Lieu</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTrainings.map((training) => (
                  <TableRow key={training.id}>
                    <TableCell>
                      <div>
                        <div className="flex items-center gap-2">
                          <GraduationCap className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{training.titre}</span>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {training.description}
                        </div>
                        <Badge variant="outline" className="mt-1">
                          {training.categorie}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>{training.formateur}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="h-3 w-3 text-muted-foreground" />
                          <span>{training.dateDebut}</span>
                        </div>
                        <div className="text-muted-foreground">
                          au {training.dateFin}
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span>{training.duree}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">
                          {training.participants}/{training.capaciteMax}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {((training.participants / training.capaciteMax) * 100).toFixed(0)}% rempli
                      </div>
                    </TableCell>
                    <TableCell>{training.lieu}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          training.statut === 'Terminée' ? 'default' : 
                          training.statut === 'En cours' ? 'outline' : 
                          training.statut === 'Planifiée' ? 'secondary' :
                          'destructive'
                        }
                      >
                        {training.statut}
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

      {/* Dialog Nouvelle Formation */}
      <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Nouvelle formation</DialogTitle>
            <DialogDescription>
              Planifiez une nouvelle session de formation
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="titre">Titre de la formation</Label>
              <Input id="titre" placeholder="Ex: Formation Excel Avancé" />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                placeholder="Décrivez les objectifs et le contenu de la formation"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="categorie">Catégorie</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="formateur">Formateur</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Dr. Marie Dubois</SelectItem>
                    <SelectItem value="2">Pierre Leroy</SelectItem>
                    <SelectItem value="3">Sophie Bernard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Date de début</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, 'dd/MM/yyyy') : 'Sélectionner'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label>Date de fin</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, 'dd/MM/yyyy') : 'Sélectionner'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="capacite">Capacité max</Label>
                <Input id="capacite" type="number" placeholder="15" />
              </div>
              <div>
                <Label htmlFor="lieu">Lieu</Label>
                <Input id="lieu" placeholder="Salle A" />
              </div>
              <div>
                <Label htmlFor="cout">Coût</Label>
                <Input id="cout" type="number" placeholder="2500" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenAddDialog(false)}>
              Annuler
            </Button>
            <Button type="submit">Créer la formation</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}