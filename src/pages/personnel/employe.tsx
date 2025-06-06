import { useState } from 'react';
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { 
  ChevronLeft, ChevronRight, Download, MoreHorizontal, Plus, Search, SlidersHorizontal 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Données factices pour démonstration
const employeesData = [
  { 
    id: '1', 
    matricule: 'EMP001', 
    nom: 'Jean Dupont', 
    poste: 'Directeur Commercial', 
    departement: 'Commercial', 
    dateEmbauche: '15/03/2020', 
    statut: 'Actif',
    email: 'jean.dupont@wanec.com',
    telephone: '+243 123 456 789',
    photo: '/placeholder-user.jpg'
  },
  { 
    id: '2', 
    matricule: 'EMP002', 
    nom: 'Marie Dubois', 
    poste: 'Chef Comptable', 
    departement: 'Finance', 
    dateEmbauche: '05/06/2019', 
    statut: 'Actif',
    email: 'marie.dubois@wanec.com',
    telephone: '+243 987 654 321',
    photo: null
  },
  { 
    id: '3', 
    matricule: 'EMP003', 
    nom: 'Pierre Martin', 
    poste: 'Technicien', 
    departement: 'Technique', 
    dateEmbauche: '22/01/2021', 
    statut: 'Actif',
    email: 'pierre.martin@wanec.com',
    telephone: '+243 456 789 123',
    photo: null
  },
  { 
    id: '4', 
    matricule: 'EMP004', 
    nom: 'Sophie Leroy', 
    poste: 'Assistante RH', 
    departement: 'Ressources Humaines', 
    dateEmbauche: '10/09/2020', 
    statut: 'Congé',
    email: 'sophie.leroy@wanec.com',
    telephone: '+243 789 123 456',
    photo: '/placeholder-user.jpg'
  },
  { 
    id: '5', 
    matricule: 'EMP005', 
    nom: 'Thomas Bernard', 
    poste: 'Chauffeur', 
    departement: 'Logistique', 
    dateEmbauche: '03/11/2022', 
    statut: 'Actif',
    email: 'thomas.bernard@wanec.com',
    telephone: '+243 321 654 987',
    photo: null
  },
];

export default function Personnel() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [openAddDialog, setOpenAddDialog] = useState(false);
  
  // Filtrage des employés
  const filteredEmployees = employeesData.filter(employee => {
    const matchesSearch = employee.nom.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         employee.matricule.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || employee.statut === statusFilter;
    const matchesDepartment = departmentFilter === 'all' || employee.departement === departmentFilter;
    
    return matchesSearch && matchesStatus && matchesDepartment;
  });
  
  const totalEmployees = filteredEmployees.length;
  const employeesPerPage = 5;
  const totalPages = Math.ceil(totalEmployees / employeesPerPage);
  
  const startIndex = (currentPage - 1) * employeesPerPage;
  const displayedEmployees = filteredEmployees.slice(startIndex, startIndex + employeesPerPage);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-3xl font-bold tracking-tight">Gestion des employés</h2>
        <Button onClick={() => setOpenAddDialog(true)}>
          <Plus className="mr-2 h-4 w-4" /> Ajouter un employé
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Liste des employés</CardTitle>
          <CardDescription>
            Gérez les informations des employés, leurs rôles et leurs statuts.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
            <div className="relative w-full sm:w-auto flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher..."
                className="pl-8 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Select defaultValue={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="Actif">Actif</SelectItem>
                  <SelectItem value="Congé">En congé</SelectItem>
                  <SelectItem value="Suspendu">Suspendu</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Département" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les départements</SelectItem>
                  <SelectItem value="Commercial">Commercial</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Technique">Technique</SelectItem>
                  <SelectItem value="Ressources Humaines">Ressources Humaines</SelectItem>
                  <SelectItem value="Logistique">Logistique</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employé</TableHead>
                  <TableHead>Poste</TableHead>
                  <TableHead>Département</TableHead>
                  <TableHead>Date d'embauche</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayedEmployees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={employee.photo || undefined} alt={employee.nom} />
                          <AvatarFallback>{employee.nom.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-medium">{employee.nom}</span>
                          <span className="text-xs text-muted-foreground">{employee.matricule}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{employee.poste}</TableCell>
                    <TableCell>{employee.departement}</TableCell>
                    <TableCell>{employee.dateEmbauche}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={employee.statut === 'Actif' ? 'default' : 
                                employee.statut === 'Congé' ? 'outline' : 
                                'destructive'}
                      >
                        {employee.statut}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Voir le profil</DropdownMenuItem>
                          <DropdownMenuItem>Éditer</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Changer le statut</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Désactiver
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {displayedEmployees.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                      Aucun employé trouvé
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Affichage de {Math.min(totalEmployees, startIndex + 1)} à {Math.min(totalEmployees, startIndex + employeesPerPage)} sur {totalEmployees} employés
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>

      <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Ajouter un nouvel employé</DialogTitle>
            <DialogDescription>
              Remplissez les informations du nouvel employé. Vous pourrez compléter son profil plus tard.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="nom">Nom complet</Label>
                <Input id="nom" placeholder="Nom et prénom" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="matricule">Matricule</Label>
                <Input id="matricule" placeholder="ex: EMP006" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="email@wanec.com" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="telephone">Téléphone</Label>
                <Input id="telephone" placeholder="+243 XXX XXX XXX" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="departement">Département</Label>
                <Select>
                  <SelectTrigger id="departement">
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="commercial">Commercial</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="technique">Technique</SelectItem>
                    <SelectItem value="rh">Ressources Humaines</SelectItem>
                    <SelectItem value="logistique">Logistique</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="poste">Poste</Label>
                <Input id="poste" placeholder="ex: Technicien" />
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="date">Date d'embauche</Label>
              <Input id="date" type="date" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenAddDialog(false)}>
              Annuler
            </Button>
            <Button type="submit">Ajouter</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}