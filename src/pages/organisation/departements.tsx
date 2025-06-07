import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Building2, Users, Edit, Trash2 } from 'lucide-react';

export default function Departements() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  // Mock data
  const departments = [
    {
      id: '1',
      nom: 'Administration',
      description: 'Gestion administrative et support général',
      nombreEmployes: 12,
      manager: 'Sophie Bernard',
      budget: 45000,
      dateCreation: '2020-01-15'
    },
    {
      id: '2',
      nom: 'Commercial',
      description: 'Ventes, marketing et relations clients',
      nombreEmployes: 25,
      manager: 'Jean Dupont',
      budget: 85000,
      dateCreation: '2020-01-15'
    },
    {
      id: '3',
      nom: 'Finance',
      description: 'Comptabilité, budget et contrôle financier',
      nombreEmployes: 8,
      manager: 'Marie Martin',
      budget: 35000,
      dateCreation: '2020-01-15'
    },
    {
      id: '4',
      nom: 'Technique',
      description: 'Maintenance, réparations et support technique',
      nombreEmployes: 18,
      manager: 'Pierre Leroy',
      budget: 65000,
      dateCreation: '2020-01-15'
    },
    {
      id: '5',
      nom: 'Logistique',
      description: 'Transport, approvisionnement et distribution',
      nombreEmployes: 15,
      manager: 'Thomas Bernard',
      budget: 55000,
      dateCreation: '2020-01-15'
    }
  ];

  const filteredDepartments = departments.filter(dept =>
    dept.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dept.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalEmployees = departments.reduce((sum, dept) => sum + dept.nombreEmployes, 0);
  const totalBudget = departments.reduce((sum, dept) => sum + dept.budget, 0);

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
          <h2 className="text-3xl font-bold tracking-tight">Gestion des Départements</h2>
          <p className="text-muted-foreground">
            Organisez et gérez la structure départementale de l'entreprise
          </p>
        </div>
        <Button onClick={() => setOpenAddDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nouveau département
        </Button>
      </div>

      {/* Statistiques */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Départements</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{departments.length}</div>
            <p className="text-xs text-muted-foreground">
              Unités organisationnelles
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employés</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{totalEmployees}</div>
            <p className="text-xs text-muted-foreground">
              Répartis dans tous les départements
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget Total</CardTitle>
            <Building2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(totalBudget)}</div>
            <p className="text-xs text-muted-foreground">
              Budget annuel alloué
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Moyenne par Département</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(totalEmployees / departments.length)}</div>
            <p className="text-xs text-muted-foreground">
              Employés par département
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des Départements</CardTitle>
          <CardDescription>
            Consultez et gérez tous les départements de l'organisation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un département..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Département</TableHead>
                  <TableHead>Manager</TableHead>
                  <TableHead>Employés</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Date création</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDepartments.map((department) => (
                  <TableRow key={department.id}>
                    <TableCell>
                      <div>
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{department.nom}</span>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {department.description}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{department.manager}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{department.nombreEmployes}</span>
                      </div>
                    </TableCell>
                    <TableCell>{formatCurrency(department.budget)}</TableCell>
                    <TableCell>{department.dateCreation}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedDepartment(department);
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

      {/* Dialog Nouveau Département */}
      <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Créer un nouveau département</DialogTitle>
            <DialogDescription>
              Ajoutez un nouveau département à la structure organisationnelle
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="nom">Nom du département</Label>
              <Input id="nom" placeholder="Ex: Ressources Humaines" />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                placeholder="Décrivez les responsabilités du département"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="manager">Manager</Label>
                <Input id="manager" placeholder="Nom du responsable" />
              </div>
              <div>
                <Label htmlFor="budget">Budget annuel</Label>
                <Input id="budget" type="number" placeholder="50000" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenAddDialog(false)}>
              Annuler
            </Button>
            <Button type="submit">Créer le département</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog Modifier Département */}
      <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Modifier le département</DialogTitle>
            <DialogDescription>
              Modifiez les informations du département sélectionné
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="edit-nom">Nom du département</Label>
              <Input 
                id="edit-nom" 
                defaultValue={selectedDepartment?.nom}
              />
            </div>
            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Textarea 
                id="edit-description" 
                defaultValue={selectedDepartment?.description}
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-manager">Manager</Label>
                <Input 
                  id="edit-manager" 
                  defaultValue={selectedDepartment?.manager}
                />
              </div>
              <div>
                <Label htmlFor="edit-budget">Budget annuel</Label>
                <Input 
                  id="edit-budget" 
                  type="number" 
                  defaultValue={selectedDepartment?.budget}
                />
              </div>
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