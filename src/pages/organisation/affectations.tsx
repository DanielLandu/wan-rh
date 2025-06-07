import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, Users, UserCheck, Calendar, Edit, Trash2 } from 'lucide-react';

export default function Affectations() {
  const [searchQuery, setSearchQuery] = useState('');
  const [teamFilter, setTeamFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [openAddDialog, setOpenAddDialog] = useState(false);

  // Mock data
  const assignments = [
    {
      id: '1',
      employe: {
        nom: 'Jean Dupont',
        matricule: 'EMP001',
        photo: '/placeholder-user.jpg'
      },
      equipe: 'Équipe Ventes Nord',
      departement: 'Commercial',
      role: 'Chef d\'équipe',
      dateAffectation: '2023-03-15',
      statut: 'Actif'
    },
    {
      id: '2',
      employe: {
        nom: 'Marie Dubois',
        matricule: 'EMP002',
        photo: null
      },
      equipe: 'Équipe Ventes Nord',
      departement: 'Commercial',
      role: 'Commercial Senior',
      dateAffectation: '2023-04-01',
      statut: 'Actif'
    },
    {
      id: '3',
      employe: {
        nom: 'Pierre Martin',
        matricule: 'EMP003',
        photo: null
      },
      equipe: 'Équipe Comptabilité',
      departement: 'Finance',
      role: 'Comptable',
      dateAffectation: '2023-02-10',
      statut: 'Actif'
    },
    {
      id: '4',
      employe: {
        nom: 'Sophie Leroy',
        matricule: 'EMP004',
        photo: '/placeholder-user.jpg'
      },
      equipe: 'Équipe Maintenance',
      departement: 'Technique',
      role: 'Technicien',
      dateAffectation: '2023-05-20',
      statut: 'Temporaire'
    }
  ];

  const teams = ['Équipe Ventes Nord', 'Équipe Comptabilité', 'Équipe Maintenance', 'Équipe Logistique'];
  const roles = ['Chef d\'équipe', 'Commercial Senior', 'Comptable', 'Technicien', 'Assistant'];

  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.employe.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         assignment.employe.matricule.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTeam = teamFilter === 'all' || assignment.equipe === teamFilter;
    const matchesRole = roleFilter === 'all' || assignment.role === roleFilter;
    
    return matchesSearch && matchesTeam && matchesRole;
  });

  const totalAssignments = assignments.length;
  const activeAssignments = assignments.filter(a => a.statut === 'Actif').length;
  const temporaryAssignments = assignments.filter(a => a.statut === 'Temporaire').length;

  return (
    <div className="space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gestion des Affectations</h2>
          <p className="text-muted-foreground">
            Gérez l'affectation des employés aux équipes et leurs rôles
          </p>
        </div>
        <Button onClick={() => setOpenAddDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle affectation
        </Button>
      </div>

      {/* Statistiques */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Affectations</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAssignments}</div>
            <p className="text-xs text-muted-foreground">
              Affectations en cours
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Affectations Actives</CardTitle>
            <UserCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeAssignments}</div>
            <p className="text-xs text-muted-foreground">
              {((activeAssignments / totalAssignments) * 100).toFixed(1)}% du total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Affectations Temporaires</CardTitle>
            <Calendar className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{temporaryAssignments}</div>
            <p className="text-xs text-muted-foreground">
              À durée limitée
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Équipes Actives</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teams.length}</div>
            <p className="text-xs text-muted-foreground">
              Avec des membres
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des Affectations</CardTitle>
          <CardDescription>
            Consultez et gérez toutes les affectations d'employés
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher une affectation..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Select defaultValue={teamFilter} onValueChange={setTeamFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Équipe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les équipes</SelectItem>
                  {teams.map(team => (
                    <SelectItem key={team} value={team}>{team}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select defaultValue={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Rôle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les rôles</SelectItem>
                  {roles.map(role => (
                    <SelectItem key={role} value={role}>{role}</SelectItem>
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
                  <TableHead>Équipe</TableHead>
                  <TableHead>Département</TableHead>
                  <TableHead>Rôle</TableHead>
                  <TableHead>Date d'affectation</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssignments.map((assignment) => (
                  <TableRow key={assignment.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={assignment.employe.photo || undefined} alt={assignment.employe.nom} />
                          <AvatarFallback>
                            {assignment.employe.nom.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{assignment.employe.nom}</div>
                          <div className="text-sm text-muted-foreground">
                            {assignment.employe.matricule}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{assignment.equipe}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{assignment.departement}</Badge>
                    </TableCell>
                    <TableCell>{assignment.role}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{assignment.dateAffectation}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          assignment.statut === 'Actif' ? 'default' : 
                          assignment.statut === 'Temporaire' ? 'outline' : 
                          'destructive'
                        }
                      >
                        {assignment.statut}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
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

      {/* Dialog Nouvelle Affectation */}
      <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Nouvelle affectation</DialogTitle>
            <DialogDescription>
              Affectez un employé à une équipe avec un rôle spécifique
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="employe">Employé</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un employé" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Jean Dupont</SelectItem>
                  <SelectItem value="2">Marie Dubois</SelectItem>
                  <SelectItem value="3">Pierre Martin</SelectItem>
                  <SelectItem value="4">Sophie Leroy</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="equipe">Équipe</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    {teams.map(team => (
                      <SelectItem key={team} value={team}>{team}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="role">Rôle dans l'équipe</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map(role => (
                      <SelectItem key={role} value={role}>{role}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">Date d'affectation</Label>
                <Input id="date" type="date" />
              </div>
              <div>
                <Label htmlFor="statut">Statut</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Actif">Actif</SelectItem>
                    <SelectItem value="Temporaire">Temporaire</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenAddDialog(false)}>
              Annuler
            </Button>
            <Button type="submit">Créer l'affectation</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}