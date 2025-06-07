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
import { Search, Plus, Calendar as CalendarIcon, Star, TrendingUp, Users, FileText } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function Evaluations() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [periodFilter, setPeriodFilter] = useState('all');
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [evaluationDate, setEvaluationDate] = useState<Date>();

  // Mock data
  const evaluations = [
    {
      id: '1',
      employe: {
        nom: 'Jean Dupont',
        matricule: 'EMP001',
        departement: 'Commercial',
        photo: '/placeholder-user.jpg'
      },
      evaluateur: {
        nom: 'Sophie Bernard',
        poste: 'Manager Commercial'
      },
      dateEvaluation: '2025-01-15',
      periode: 'Q4 2024',
      performanceScore: 92,
      commentaires: 'Excellent travail, objectifs dépassés',
      objectifsAtteints: ['Augmentation des ventes', 'Formation équipe'],
      pointsAmelioration: ['Gestion du temps', 'Reporting'],
      statut: 'Terminé'
    },
    {
      id: '2',
      employe: {
        nom: 'Marie Martin',
        matricule: 'EMP002',
        departement: 'Finance',
        photo: null
      },
      evaluateur: {
        nom: 'Pierre Leroy',
        poste: 'Directeur Financier'
      },
      dateEvaluation: '2025-01-10',
      periode: 'Q4 2024',
      performanceScore: 88,
      commentaires: 'Très bon travail, amélioration continue',
      objectifsAtteints: ['Optimisation processus', 'Réduction délais'],
      pointsAmelioration: ['Communication', 'Leadership'],
      statut: 'Terminé'
    },
    {
      id: '3',
      employe: {
        nom: 'Thomas Bernard',
        matricule: 'EMP005',
        departement: 'Logistique',
        photo: null
      },
      evaluateur: {
        nom: 'Sophie Bernard',
        poste: 'Manager RH'
      },
      dateEvaluation: '2025-01-20',
      periode: 'Q1 2025',
      performanceScore: 0,
      commentaires: '',
      objectifsAtteints: [],
      pointsAmelioration: [],
      statut: 'En cours'
    }
  ];

  const periods = ['Q1 2025', 'Q4 2024', 'Q3 2024', 'Q2 2024'];
  const statuses = ['En cours', 'Terminé', 'En attente'];

  const filteredEvaluations = evaluations.filter(evaluation => {
    const matchesSearch = evaluation.employe.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         evaluation.employe.matricule.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || evaluation.statut === statusFilter;
    const matchesPeriod = periodFilter === 'all' || evaluation.periode === periodFilter;
    
    return matchesSearch && matchesStatus && matchesPeriod;
  });

  const totalEvaluations = evaluations.length;
  const completedEvaluations = evaluations.filter(evaluation => evaluation.statut === 'Terminé').length;
  const averageScore = evaluations
    .filter(evaluation => evaluation.performanceScore > 0)
    .reduce((sum, evaluation) => sum + evaluation.performanceScore, 0) / 
    evaluations.filter(evaluation => evaluation.performanceScore > 0).length;

  return (
    <div className="space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Évaluations de Performance</h2>
          <p className="text-muted-foreground">
            Gérez les évaluations périodiques des employés
          </p>
        </div>
        <Button onClick={() => setOpenAddDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle évaluation
        </Button>
      </div>

      {/* Statistiques */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Évaluations</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEvaluations}</div>
            <p className="text-xs text-muted-foreground">
              Cette période
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Terminées</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{completedEvaluations}</div>
            <p className="text-xs text-muted-foreground">
              {((completedEvaluations / totalEvaluations) * 100).toFixed(1)}% du total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Score Moyen</CardTitle>
            <Star className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{averageScore.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">
              Sur 100 points
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Employés Évalués</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedEvaluations}</div>
            <p className="text-xs text-muted-foreground">
              Évaluations complètes
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des Évaluations</CardTitle>
          <CardDescription>
            Consultez et gérez toutes les évaluations de performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher une évaluation..."
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
              <Select defaultValue={periodFilter} onValueChange={setPeriodFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Période" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes périodes</SelectItem>
                  {periods.map(period => (
                    <SelectItem key={period} value={period}>{period}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employé</TableHead>
                  <TableHead>Évaluateur</TableHead>
                  <TableHead>Période</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEvaluations.map((evaluation) => (
                  <TableRow key={evaluation.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={evaluation.employe.photo || undefined} alt={evaluation.employe.nom} />
                          <AvatarFallback>
                            {evaluation.employe.nom.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{evaluation.employe.nom}</div>
                          <div className="text-sm text-muted-foreground">
                            {evaluation.employe.matricule} • {evaluation.employe.departement}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{evaluation.evaluateur.nom}</div>
                        <div className="text-sm text-muted-foreground">
                          {evaluation.evaluateur.poste}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{evaluation.periode}</Badge>
                    </TableCell>
                    <TableCell>
                      {evaluation.performanceScore > 0 ? (
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-primary">
                            {evaluation.performanceScore}
                          </span>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm text-muted-foreground">/100</span>
                          </div>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>{evaluation.dateEvaluation}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          evaluation.statut === 'Terminé' ? 'default' : 
                          evaluation.statut === 'En cours' ? 'outline' : 
                          'secondary'
                        }
                      >
                        {evaluation.statut}
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

      {/* Dialog Nouvelle Évaluation */}
      <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Créer une nouvelle évaluation</DialogTitle>
            <DialogDescription>
              Lancez une nouvelle évaluation de performance pour un employé
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="employe">Employé à évaluer</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un employé" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Jean Dupont</SelectItem>
                    <SelectItem value="2">Marie Martin</SelectItem>
                    <SelectItem value="3">Thomas Bernard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="evaluateur">Évaluateur</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner l'évaluateur" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Sophie Bernard</SelectItem>
                    <SelectItem value="2">Pierre Leroy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="periode">Période d'évaluation</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner la période" />
                  </SelectTrigger>
                  <SelectContent>
                    {periods.map(period => (
                      <SelectItem key={period} value={period}>{period}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Date d'évaluation</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {evaluationDate ? format(evaluationDate, 'dd/MM/yyyy') : 'Sélectionner'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={evaluationDate}
                      onSelect={setEvaluationDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div>
              <Label htmlFor="commentaires">Commentaires initiaux</Label>
              <Textarea 
                id="commentaires" 
                placeholder="Notes ou commentaires pour cette évaluation"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenAddDialog(false)}>
              Annuler
            </Button>
            <Button type="submit">Créer l'évaluation</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}