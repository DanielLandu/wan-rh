import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, FileDown, Filter } from 'lucide-react';

export default function PromotionPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [openAddDialog, setOpenAddDialog] = useState(false);

  // Mock data for demonstration
  const promotions = [
    {
      id: '1',
      employeNom: 'Jean Dupont',
      ancienPoste: 'Commercial Junior',
      nouveauPoste: 'Commercial Senior',
      dateEffet: '2025-07-01',
      augmentation: '15%',
      statut: 'En attente',
    },
    {
      id: '2',
      employeNom: 'Marie Martin',
      ancienPoste: 'Analyste',
      nouveauPoste: 'Chef d\'équipe',
      dateEffet: '2025-07-15',
      augmentation: '20%',
      statut: 'Approuvé',
    },
  ];

  return (
    <div className="space-y-4 p-8 pt-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Promotions</h2>
          <p className="text-muted-foreground">
            Gérez les promotions et l'évolution de carrière des employés
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => setOpenAddDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nouvelle promotion
          </Button>
          <Button variant="outline">
            <FileDown className="mr-2 h-4 w-4" />
            Exporter
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des promotions</CardTitle>
          <CardDescription>
            Consultez et gérez toutes les promotions des employés
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher..."
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
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="technique">Technique</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="en_attente">En attente</SelectItem>
                  <SelectItem value="approuve">Approuvé</SelectItem>
                  <SelectItem value="refuse">Refusé</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="mt-6 rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employé</TableHead>
                  <TableHead>Ancien poste</TableHead>
                  <TableHead>Nouveau poste</TableHead>
                  <TableHead>Date d'effet</TableHead>
                  <TableHead>Augmentation</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {promotions.map((promotion) => (
                  <TableRow key={promotion.id}>
                    <TableCell>{promotion.employeNom}</TableCell>
                    <TableCell>{promotion.ancienPoste}</TableCell>
                    <TableCell>{promotion.nouveauPoste}</TableCell>
                    <TableCell>{promotion.dateEffet}</TableCell>
                    <TableCell>{promotion.augmentation}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          promotion.statut === 'Approuvé'
                            ? 'default'
                            : promotion.statut === 'En attente'
                            ? 'outline'
                            : 'destructive'
                        }
                      >
                        {promotion.statut}
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

      <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Nouvelle promotion</DialogTitle>
            <DialogDescription>
              Créez une nouvelle promotion pour un employé
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
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="date">Date d'effet</Label>
                <Input type="date" id="date" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="ancien">Ancien poste</Label>
                <Input id="ancien" placeholder="Poste actuel" />
              </div>
              <div>
                <Label htmlFor="nouveau">Nouveau poste</Label>
                <Input id="nouveau" placeholder="Nouveau poste" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="augmentation">Augmentation (%)</Label>
                <Input
                  id="augmentation"
                  type="number"
                  placeholder="Ex: 15"
                />
              </div>
              <div>
                <Label htmlFor="raison">Raison</Label>
                <Input id="raison" placeholder="Raison de la promotion" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenAddDialog(false)}>
              Annuler
            </Button>
            <Button type="submit">Créer la promotion</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}