import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, Users, Building2, Edit, Trash2, UserPlus } from 'lucide-react';

export default function Equipes() {
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);

  // Mock data
  const teams = [
    {
      id: '1',
      nom: 'Équipe Ventes Nord',
      departement: 'Commercial',
      chef: 'Jean Dupont',
      nombreMembres: 8,
      membres: ['Marie Dubois', 'Pierre Martin', 'Sophie Leroy', 'Thomas Bernard'],
      dateCreation: '2023-03-15',
      objectifs: ['Augmenter CA de 15%', 'Fidéliser clients']
    },
    {
      id: '2',
      nom: 'Équipe Comptabilité',
      departement: 'Finance',
      chef: 'Marie Martin',
      nombreMembres: 5,
      membres: ['Paul Durand', 'Claire Moreau', 'Luc Petit'],
      dateCreation: '2023-01-10',
      objectifs: ['Optimiser processus', 'Réduire délais']
    },
    {
      id: '3',
      nom: 'Équipe Maintenance',
      departement: 'Technique',
      chef: 'Pierre Leroy',
      nombreMembres: 6,
      membres: ['André Blanc', 'Michel Roux', 'David Noir'],
      dateCreation: '2023-02-20',
      objectifs: ['Maintenance préventive', 'Réduire pannes']
    }
  ];

  const departments = ['Commercial', 'Finance', 'Technique', 'Logistique', 'Administration'];

  const filteredTeams = teams.filter(team => {
    const matchesSearch = team.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         team.chef.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || team.departement === departmentFilter;
    
    return matchesSearch && matchesDepartment;
  });

  const totalTeams = teams.length;
  const totalMembers = teams.reduce((sum, team) => sum + team.nombreMembres, 0);
  const averageTeamSize = Math.round(totalMembers / totalTeams);

  return (
    <div className="space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gestion des Équipes</h2>
          <p className="text-muted-foreground">
            Organisez et gérez les équipes de travail par département
          </p>
        </div>
        <Button onClick={() => setOpenAddDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle équipe
        </Button>
      </div>

      {/* Statistiques */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Équipes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTeams}</div>
            <p className="text-xs text-muted-foreground">
              Équipes actives
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Membres</CardTitle>
            <UserPlus className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{totalMembers}</div>
            <p className="text-xs text-muted-foreground">
              Employés en équipe
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taille Moyenne</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{averageTeamSize}</div>
            <p className="text-xs text-muted-foreground">
              Membres par équipe
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Départements</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{departments.length}</div>
            <p className="text-xs text-muted-foreground">
              Avec des équipes
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des Équipes</CardTitle>
          <CardDescription>
            Consultez et gérez toutes les équipes de l'organisation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher une équipe..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
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
                  <TableHead>Équipe</TableHead>
                  <TableHead>Département</TableHead>
                  <TableHead>Chef d'équipe</TableHead>
                  <TableHead>Membres</TableHead>
                  <TableHead>Objectifs</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTeams.map((team) => (
                  <TableRow key={team.id}>
                    <TableCell>
                      <div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{team.nom}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Créée le {team.dateCreation}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{team.departement}</Badge>
                    </TableCell>
                    <TableCell>{team.chef}</TableCell>
                    <TableCell>
                      <div>
                        <div className="flex items-center gap-1">
                          <UserPlus className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{team.nombreMembres} membres</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {team.membres.slice(0, 2).join(', ')}
                          {team.membres.length > 2 && ` +${team.membres.length - 2}`}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {team.objectifs.slice(0, 2).map((objectif, index) => (
                          <Badge key={index} variant="secondary" className="text-xs block w-fit">
                            {objectif}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedTeam(team);
                            setOpenEditDialog(true);
                          }}
                        >
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

      {/* Dialog Nouvelle Équipe */}
      <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Créer une nouvelle équipe</DialogTitle>
            <DialogDescription>
              Formez une nouvelle équipe de travail
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="nom">Nom de l'équipe</Label>
              <Input id="nom" placeholder="Ex: Équipe Ventes Sud" />
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
                <Label htmlFor="chef">Chef d'équipe</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Jean Dupont</SelectItem>
                    <SelectItem value="2">Marie Martin</SelectItem>
                    <SelectItem value="3">Pierre Leroy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="objectifs">Objectifs (séparés par des virgules)</Label>
              <Input id="objectifs" placeholder="Augmenter CA, Améliorer qualité" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenAddDialog(false)}>
              Annuler
            </Button>
            <Button type="submit">Créer l'équipe</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog Modifier Équipe */}
      <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Modifier l'équipe</DialogTitle>
            <DialogDescription>
              Modifiez les informations de l'équipe sélectionnée
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="edit-nom">Nom de l'équipe</Label>
              <Input 
                id="edit-nom" 
                defaultValue={selectedTeam?.nom}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-departement">Département</Label>
                <Select defaultValue={selectedTeam?.departement}>
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
                <Label htmlFor="edit-chef">Chef d'équipe</Label>
                <Select defaultValue={selectedTeam?.chef}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Jean Dupont</SelectItem>
                    <SelectItem value="2">Marie Martin</SelectItem>
                    <SelectItem value="3">Pierre Leroy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="edit-objectifs">Objectifs</Label>
              <Input 
                id="edit-objectifs" 
                defaultValue={selectedTeam?.objectifs?.join(', ')}
              />
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