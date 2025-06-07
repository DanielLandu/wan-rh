import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, Edit, Trash2, DollarSign, TrendingUp, Users, Building } from 'lucide-react';

export default function GrilleSalaire() {
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState(null);

  // Mock data
  const salaryScales = [
    {
      id: '1',
      grade: 'A1',
      niveau: 'Directeur',
      salaireMin: 180000,
      salaireMax: 250000,
      departement: 'Direction',
      nombreEmployes: 3,
      description: 'Postes de direction générale'
    },
    {
      id: '2',
      grade: 'B1',
      niveau: 'Manager Senior',
      salaireMin: 120000,
      salaireMax: 180000,
      departement: 'Tous',
      nombreEmployes: 8,
      description: 'Responsables de département'
    },
    {
      id: '3',
      grade: 'B2',
      niveau: 'Manager',
      salaireMin: 90000,
      salaireMax: 120000,
      departement: 'Tous',
      nombreEmployes: 15,
      description: 'Chefs d\'équipe et superviseurs'
    },
    {
      id: '4',
      grade: 'C1',
      niveau: 'Senior',
      salaireMin: 70000,
      salaireMax: 90000,
      departement: 'Technique',
      nombreEmployes: 25,
      description: 'Techniciens et spécialistes seniors'
    },
    {
      id: '5',
      grade: 'C2',
      niveau: 'Confirmé',
      salaireMin: 50000,
      salaireMax: 70000,
      departement: 'Tous',
      nombreEmployes: 45,
      description: 'Employés confirmés'
    },
    {
      id: '6',
      grade: 'D1',
      niveau: 'Junior',
      salaireMin: 35000,
      salaireMax: 50000,
      departement: 'Tous',
      nombreEmployes: 32,
      description: 'Employés débutants'
    }
  ];

  const departments = ['Direction', 'Commercial', 'Finance', 'Technique', 'RH', 'Logistique'];

  const filteredScales = salaryScales.filter(scale => {
    const matchesSearch = scale.grade.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         scale.niveau.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || 
                             scale.departement === departmentFilter || 
                             scale.departement === 'Tous';
    
    return matchesSearch && matchesDepartment;
  });

  const totalEmployees = salaryScales.reduce((sum, scale) => sum + scale.nombreEmployes, 0);
  const averageSalary = salaryScales.reduce((sum, scale) => sum + ((scale.salaireMin + scale.salaireMax) / 2), 0) / salaryScales.length;
  const totalGrades = salaryScales.length;
  const highestSalary = Math.max(...salaryScales.map(scale => scale.salaireMax));

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Grille Salariale</h2>
          <p className="text-muted-foreground">
            Gérez les échelles de salaires et les grilles de rémunération
          </p>
        </div>
        <Button onClick={() => setOpenAddDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nouveau grade
        </Button>
      </div>

      {/* Statistiques */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Grades</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalGrades}</div>
            <p className="text-xs text-muted-foreground">
              Niveaux de rémunération
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Employés Couverts</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEmployees}</div>
            <p className="text-xs text-muted-foreground">
              Total des employés
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Salaire Moyen</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(averageSalary)}</div>
            <p className="text-xs text-muted-foreground">
              Moyenne des échelles
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Salaire Maximum</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(highestSalary)}</div>
            <p className="text-xs text-muted-foreground">
              Plus haut niveau
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Échelles de Salaires</CardTitle>
          <CardDescription>
            Consultez et gérez toutes les grilles salariales par grade
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un grade..."
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
                  <TableHead>Grade</TableHead>
                  <TableHead>Niveau</TableHead>
                  <TableHead>Fourchette Salariale</TableHead>
                  <TableHead>Département</TableHead>
                  <TableHead>Employés</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredScales.map((scale) => (
                  <TableRow key={scale.id}>
                    <TableCell>
                      <Badge variant="outline" className="font-mono">
                        {scale.grade}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{scale.niveau}</div>
                        <div className="text-sm text-muted-foreground">
                          {scale.description}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm">
                          <span className="font-medium">Min:</span> {formatCurrency(scale.salaireMin)}
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Max:</span> {formatCurrency(scale.salaireMax)}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={scale.departement === 'Tous' ? 'default' : 'secondary'}>
                        {scale.departement}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{scale.nombreEmployes}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedGrade(scale);
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

      {/* Dialog Nouveau Grade */}
      <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Créer un nouveau grade</DialogTitle>
            <DialogDescription>
              Définissez un nouveau niveau dans la grille salariale
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="grade">Code Grade</Label>
                <Input id="grade" placeholder="Ex: C3" />
              </div>
              <div>
                <Label htmlFor="niveau">Niveau</Label>
                <Input id="niveau" placeholder="Ex: Expert" />
              </div>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input id="description" placeholder="Description du niveau" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="salaireMin">Salaire Minimum</Label>
                <Input 
                  id="salaireMin" 
                  type="number" 
                  placeholder="45000"
                />
              </div>
              <div>
                <Label htmlFor="salaireMax">Salaire Maximum</Label>
                <Input 
                  id="salaireMax" 
                  type="number" 
                  placeholder="65000"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="departement">Département</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un département" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tous">Tous les départements</SelectItem>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenAddDialog(false)}>
              Annuler
            </Button>
            <Button type="submit">Créer le grade</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog Modifier Grade */}
      <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Modifier le grade</DialogTitle>
            <DialogDescription>
              Modifiez les détails du grade sélectionné
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-grade">Code Grade</Label>
                <Input 
                  id="edit-grade" 
                  defaultValue={selectedGrade?.grade}
                />
              </div>
              <div>
                <Label htmlFor="edit-niveau">Niveau</Label>
                <Input 
                  id="edit-niveau" 
                  defaultValue={selectedGrade?.niveau}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Input 
                id="edit-description" 
                defaultValue={selectedGrade?.description}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-salaireMin">Salaire Minimum</Label>
                <Input 
                  id="edit-salaireMin" 
                  type="number" 
                  defaultValue={selectedGrade?.salaireMin}
                />
              </div>
              <div>
                <Label htmlFor="edit-salaireMax">Salaire Maximum</Label>
                <Input 
                  id="edit-salaireMax" 
                  type="number" 
                  defaultValue={selectedGrade?.salaireMax}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="edit-departement">Département</Label>
              <Select defaultValue={selectedGrade?.departement}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un département" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tous">Tous les départements</SelectItem>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
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