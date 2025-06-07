import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Search, Plus, Calendar as CalendarIcon, Clock, Download, Edit, FileText } from 'lucide-react';
import { format, startOfWeek, endOfWeek, addDays } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function FeuilleDeTemps() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWeek, setSelectedWeek] = useState<Date>(new Date());
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  // Mock data
  const timesheets = [
    {
      id: '1',
      employe: {
        nom: 'Jean Dupont',
        matricule: 'EMP001',
        departement: 'Commercial',
        photo: '/placeholder-user.jpg'
      },
      semaine: '02-08 Jan 2025',
      heuresTravaillees: 42,
      heuresSupplementaires: 2,
      projets: [
        { nom: 'Projet Alpha', heures: 25 },
        { nom: 'Projet Beta', heures: 17 }
      ],
      statut: 'Soumis',
      dateCreation: '2025-01-08'
    },
    {
      id: '2',
      employe: {
        nom: 'Marie Martin',
        matricule: 'EMP002',
        departement: 'Finance',
        photo: null
      },
      semaine: '02-08 Jan 2025',
      heuresTravaillees: 40,
      heuresSupplementaires: 0,
      projets: [
        { nom: 'Comptabilité', heures: 40 }
      ],
      statut: 'Approuvé',
      dateCreation: '2025-01-08'
    },
    {
      id: '3',
      employe: {
        nom: 'Pierre Leroy',
        matricule: 'EMP003',
        departement: 'Technique',
        photo: null
      },
      semaine: '02-08 Jan 2025',
      heuresTravaillees: 38,
      heuresSupplementaires: 0,
      projets: [
        { nom: 'Maintenance', heures: 20 },
        { nom: 'Support', heures: 18 }
      ],
      statut: 'Brouillon',
      dateCreation: '2025-01-07'
    }
  ];

  const weekStart = startOfWeek(selectedWeek, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(selectedWeek, { weekStartsOn: 1 });

  const filteredTimesheets = timesheets.filter(timesheet =>
    timesheet.employe.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
    timesheet.employe.matricule.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalHours = timesheets.reduce((sum, ts) => sum + ts.heuresTravaillees, 0);
  const totalOvertime = timesheets.reduce((sum, ts) => sum + ts.heuresSupplementaires, 0);
  const submittedCount = timesheets.filter(ts => ts.statut === 'Soumis').length;
  const approvedCount = timesheets.filter(ts => ts.statut === 'Approuvé').length;

  return (
    <div className="space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Feuilles de Temps</h2>
          <p className="text-muted-foreground">
            Gérez les feuilles de temps et le suivi des heures travaillées
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
          <Button onClick={() => setOpenAddDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nouvelle feuille
          </Button>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Heures Totales</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalHours}h</div>
            <p className="text-xs text-muted-foreground">
              Cette semaine
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Heures Sup.</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{totalOvertime}h</div>
            <p className="text-xs text-muted-foreground">
              Heures supplémentaires
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Soumises</CardTitle>
            <FileText className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{submittedCount}</div>
            <p className="text-xs text-muted-foreground">
              En attente validation
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approuvées</CardTitle>
            <FileText className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{approvedCount}</div>
            <p className="text-xs text-muted-foreground">
              Feuilles validées
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Feuilles de Temps</CardTitle>
          <CardDescription>
            Semaine du {format(weekStart, 'dd MMM', { locale: fr })} au {format(weekEnd, 'dd MMM yyyy', { locale: fr })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un employé..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[200px] justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    Semaine du {format(weekStart, 'dd/MM')}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedWeek}
                    onSelect={(date) => date && setSelectedWeek(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employé</TableHead>
                  <TableHead>Semaine</TableHead>
                  <TableHead>Heures Normales</TableHead>
                  <TableHead>Heures Sup.</TableHead>
                  <TableHead>Projets</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTimesheets.map((timesheet) => (
                  <TableRow key={timesheet.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={timesheet.employe.photo || undefined} alt={timesheet.employe.nom} />
                          <AvatarFallback>
                            {timesheet.employe.nom.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{timesheet.employe.nom}</div>
                          <div className="text-sm text-muted-foreground">
                            {timesheet.employe.matricule} • {timesheet.employe.departement}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{timesheet.semaine}</TableCell>
                    <TableCell>
                      <span className="font-medium">{timesheet.heuresTravaillees}h</span>
                    </TableCell>
                    <TableCell>
                      <span className={timesheet.heuresSupplementaires > 0 ? 'font-medium text-orange-600' : ''}>
                        {timesheet.heuresSupplementaires}h
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {timesheet.projets.map((projet, index) => (
                          <div key={index} className="text-sm">
                            <span className="font-medium">{projet.nom}</span>
                            <span className="text-muted-foreground ml-2">({projet.heures}h)</span>
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          timesheet.statut === 'Approuvé' ? 'default' : 
                          timesheet.statut === 'Soumis' ? 'outline' : 
                          'secondary'
                        }
                      >
                        {timesheet.statut}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setOpenEditDialog(true)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Dialog Nouvelle Feuille */}
      <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Nouvelle feuille de temps</DialogTitle>
            <DialogDescription>
              Créez une nouvelle feuille de temps pour un employé
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="employe">Employé</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un employé" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Jean Dupont</SelectItem>
                    <SelectItem value="2">Marie Martin</SelectItem>
                    <SelectItem value="3">Pierre Leroy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Semaine</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      Semaine du {format(weekStart, 'dd/MM')}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedWeek}
                      onSelect={(date) => date && setSelectedWeek(date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <div className="space-y-4">
              <Label className="text-base font-medium">Répartition des heures par jour</Label>
              {Array.from({ length: 7 }, (_, i) => {
                const day = addDays(weekStart, i);
                return (
                  <div key={i} className="grid grid-cols-3 gap-4 items-center">
                    <Label className="text-sm">
                      {format(day, 'EEEE dd/MM', { locale: fr })}
                    </Label>
                    <Input 
                      type="number" 
                      placeholder="Heures"
                      min="0"
                      max="24"
                      step="0.5"
                    />
                    <Input 
                      placeholder="Description des tâches"
                      className="text-sm"
                    />
                  </div>
                );
              })}
            </div>

            <div>
              <Label htmlFor="commentaires">Commentaires</Label>
              <Textarea 
                id="commentaires" 
                placeholder="Commentaires ou notes sur la semaine"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenAddDialog(false)}>
              Annuler
            </Button>
            <Button variant="outline">Sauvegarder brouillon</Button>
            <Button type="submit">Soumettre</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog Modifier Feuille */}
      <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Modifier la feuille de temps</DialogTitle>
            <DialogDescription>
              Modifiez les détails de la feuille de temps
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {/* Contenu similaire au dialog d'ajout mais avec des valeurs pré-remplies */}
            <div className="text-center text-muted-foreground">
              Formulaire de modification...
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenEditDialog(false)}>
              Annuler
            </Button>
            <Button type="submit">Sauvegarder</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}