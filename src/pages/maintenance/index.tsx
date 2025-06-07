import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, Wrench, Package, History, Calendar, AlertTriangle, CheckCircle } from 'lucide-react';

export default function Maintenance() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openAddInterventionDialog, setOpenAddInterventionDialog] = useState(false);
  const [openAddEquipmentDialog, setOpenAddEquipmentDialog] = useState(false);

  // Mock data
  const interventions = [
    {
      id: '1',
      equipement: 'Générateur Principal',
      type: 'Maintenance préventive',
      date: '2025-01-15',
      technicien: 'Pierre Leroy',
      statut: 'Terminé',
      description: 'Changement d\'huile et vérification générale',
      duree: '3h'
    },
    {
      id: '2',
      equipement: 'Climatisation Bureau',
      type: 'Réparation',
      date: '2025-01-10',
      technicien: 'Marie Martin',
      statut: 'En cours',
      description: 'Remplacement du compresseur',
      duree: '5h'
    }
  ];

  const equipments = [
    {
      id: '1',
      nom: 'Générateur Principal',
      numeroSerie: 'GEN-2023-001',
      statut: 'Opérationnel',
      dateAcquisition: '2023-03-15',
      prochaineMaintenance: '2025-04-15',
      valeur: 25000
    },
    {
      id: '2',
      nom: 'Climatisation Bureau',
      numeroSerie: 'CLIM-2022-005',
      statut: 'En maintenance',
      dateAcquisition: '2022-08-20',
      prochaineMaintenance: '2025-02-01',
      valeur: 8500
    }
  ];

  const maintenanceHistory = [
    {
      id: '1',
      equipement: 'Générateur Principal',
      intervention: 'Maintenance préventive',
      date: '2025-01-15',
      technicien: 'Pierre Leroy',
      cout: 450,
      notes: 'Maintenance réalisée selon planning'
    },
    {
      id: '2',
      equipement: 'Imprimante Réseau',
      intervention: 'Réparation',
      date: '2025-01-08',
      technicien: 'Thomas Bernard',
      cout: 120,
      notes: 'Remplacement cartouche et nettoyage'
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const totalEquipments = equipments.length;
  const operationalEquipments = equipments.filter(eq => eq.statut === 'Opérationnel').length;
  const maintenanceEquipments = equipments.filter(eq => eq.statut === 'En maintenance').length;
  const totalMaintenanceCost = maintenanceHistory.reduce((sum, hist) => sum + hist.cout, 0);

  return (
    <div className="space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gestion de la Maintenance</h2>
          <p className="text-muted-foreground">
            Gérez les équipements, interventions et historique de maintenance
          </p>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Équipements</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEquipments}</div>
            <p className="text-xs text-muted-foreground">
              Inventaire complet
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Opérationnels</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{operationalEquipments}</div>
            <p className="text-xs text-muted-foreground">
              {((operationalEquipments / totalEquipments) * 100).toFixed(1)}% du parc
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Maintenance</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{maintenanceEquipments}</div>
            <p className="text-xs text-muted-foreground">
              Interventions en cours
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Coût Maintenance</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalMaintenanceCost)}</div>
            <p className="text-xs text-muted-foreground">
              Ce mois
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="interventions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="interventions">Interventions</TabsTrigger>
          <TabsTrigger value="equipements">Équipements</TabsTrigger>
          <TabsTrigger value="historique">Historique</TabsTrigger>
        </TabsList>

        <TabsContent value="interventions" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Interventions de Maintenance</CardTitle>
                  <CardDescription>
                    Planifiez et suivez les interventions de maintenance
                  </CardDescription>
                </div>
                <Button onClick={() => setOpenAddInterventionDialog(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Nouvelle intervention
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher..."
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
                      <TableHead>Équipement</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Technicien</TableHead>
                      <TableHead>Durée</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {interventions.map((intervention) => (
                      <TableRow key={intervention.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Wrench className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{intervention.equipement}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{intervention.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{intervention.date}</span>
                          </div>
                        </TableCell>
                        <TableCell>{intervention.technicien}</TableCell>
                        <TableCell>{intervention.duree}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              intervention.statut === 'Terminé' ? 'default' : 
                              intervention.statut === 'En cours' ? 'outline' : 
                              'destructive'
                            }
                          >
                            {intervention.statut}
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
        </TabsContent>

        <TabsContent value="equipements" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Inventaire des Équipements</CardTitle>
                  <CardDescription>
                    Gérez l'inventaire et le statut des équipements
                  </CardDescription>
                </div>
                <Button onClick={() => setOpenAddEquipmentDialog(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Nouvel équipement
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Équipement</TableHead>
                      <TableHead>N° Série</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Date d'acquisition</TableHead>
                      <TableHead>Prochaine maintenance</TableHead>
                      <TableHead>Valeur</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {equipments.map((equipment) => (
                      <TableRow key={equipment.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Package className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{equipment.nom}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="font-mono">
                            {equipment.numeroSerie}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              equipment.statut === 'Opérationnel' ? 'default' : 
                              equipment.statut === 'En maintenance' ? 'outline' : 
                              'destructive'
                            }
                          >
                            {equipment.statut}
                          </Badge>
                        </TableCell>
                        <TableCell>{equipment.dateAcquisition}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{equipment.prochaineMaintenance}</span>
                          </div>
                        </TableCell>
                        <TableCell>{formatCurrency(equipment.valeur)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="historique" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Historique de Maintenance</CardTitle>
              <CardDescription>
                Consultez l'historique complet des interventions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Équipement</TableHead>
                      <TableHead>Intervention</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Technicien</TableHead>
                      <TableHead>Coût</TableHead>
                      <TableHead>Notes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {maintenanceHistory.map((history) => (
                      <TableRow key={history.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <History className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{history.equipement}</span>
                          </div>
                        </TableCell>
                        <TableCell>{history.intervention}</TableCell>
                        <TableCell>{history.date}</TableCell>
                        <TableCell>{history.technicien}</TableCell>
                        <TableCell>{formatCurrency(history.cout)}</TableCell>
                        <TableCell>
                          <div className="max-w-[200px] truncate" title={history.notes}>
                            {history.notes}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialogs */}
      <Dialog open={openAddInterventionDialog} onOpenChange={setOpenAddInterventionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nouvelle intervention</DialogTitle>
            <DialogDescription>
              Planifiez une nouvelle intervention de maintenance
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="equipement">Équipement</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Générateur Principal</SelectItem>
                    <SelectItem value="2">Climatisation Bureau</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="type">Type d'intervention</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="preventive">Maintenance préventive</SelectItem>
                    <SelectItem value="corrective">Maintenance corrective</SelectItem>
                    <SelectItem value="reparation">Réparation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">Date prévue</Label>
                <Input id="date" type="date" />
              </div>
              <div>
                <Label htmlFor="technicien">Technicien</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Pierre Leroy</SelectItem>
                    <SelectItem value="2">Marie Martin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Décrivez l'intervention" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenAddInterventionDialog(false)}>
              Annuler
            </Button>
            <Button>Planifier</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={openAddEquipmentDialog} onOpenChange={setOpenAddEquipmentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nouvel équipement</DialogTitle>
            <DialogDescription>
              Ajoutez un nouvel équipement à l'inventaire
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nom">Nom de l'équipement</Label>
                <Input id="nom" placeholder="Ex: Générateur" />
              </div>
              <div>
                <Label htmlFor="serie">Numéro de série</Label>
                <Input id="serie" placeholder="Ex: GEN-2025-001" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="acquisition">Date d'acquisition</Label>
                <Input id="acquisition" type="date" />
              </div>
              <div>
                <Label htmlFor="valeur">Valeur d'acquisition</Label>
                <Input id="valeur" type="number" placeholder="25000" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenAddEquipmentDialog(false)}>
              Annuler
            </Button>
            <Button>Ajouter</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}