import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, Fuel, Car, User, Calendar } from 'lucide-react';

export default function Logistique() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openAddFuelDialog, setOpenAddFuelDialog] = useState(false);
  const [openAddVehicleDialog, setOpenAddVehicleDialog] = useState(false);
  const [openAddDriverDialog, setOpenAddDriverDialog] = useState(false);

  // Mock data
  const fuelData = [
    {
      id: '1',
      vehicule: 'Toyota Hilux - ABC-123',
      quantite: 45.5,
      date: '2025-01-08',
      cout: 68.25,
      kilometrage: 45230,
      chauffeur: 'Jean Dupont'
    },
    {
      id: '2',
      vehicule: 'Ford Transit - DEF-456',
      quantite: 38.2,
      date: '2025-01-07',
      cout: 57.30,
      kilometrage: 32150,
      chauffeur: 'Marie Martin'
    }
  ];

  const vehicles = [
    {
      id: '1',
      immatriculation: 'ABC-123',
      modele: 'Toyota Hilux',
      annee: 2022,
      statut: 'Disponible',
      kilometrage: 45230,
      prochainEntretien: '2025-02-15',
      chauffeurAssigne: 'Jean Dupont'
    },
    {
      id: '2',
      immatriculation: 'DEF-456',
      modele: 'Ford Transit',
      annee: 2021,
      statut: 'En mission',
      kilometrage: 32150,
      prochainEntretien: '2025-01-25',
      chauffeurAssigne: 'Marie Martin'
    }
  ];

  const drivers = [
    {
      id: '1',
      nom: 'Jean Dupont',
      permis: 'B, C',
      dateEmbauche: '2020-03-15',
      vehiculeAssigne: 'Toyota Hilux - ABC-123',
      statut: 'Actif',
      telephone: '+243 123 456 789'
    },
    {
      id: '2',
      nom: 'Marie Martin',
      permis: 'B',
      dateEmbauche: '2021-06-10',
      vehiculeAssigne: 'Ford Transit - DEF-456',
      statut: 'En mission',
      telephone: '+243 987 654 321'
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const totalFuelCost = fuelData.reduce((sum, fuel) => sum + fuel.cout, 0);
  const totalFuelQuantity = fuelData.reduce((sum, fuel) => sum + fuel.quantite, 0);
  const availableVehicles = vehicles.filter(v => v.statut === 'Disponible').length;
  const activeDrivers = drivers.filter(d => d.statut === 'Actif').length;

  return (
    <div className="space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gestion Logistique</h2>
          <p className="text-muted-foreground">
            Gérez le parc automobile, les chauffeurs et la consommation de carburant
          </p>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Véhicules Disponibles</CardTitle>
            <Car className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{availableVehicles}</div>
            <p className="text-xs text-muted-foreground">
              Sur {vehicles.length} véhicules
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chauffeurs Actifs</CardTitle>
            <User className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{activeDrivers}</div>
            <p className="text-xs text-muted-foreground">
              Chauffeurs disponibles
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Carburant (Mois)</CardTitle>
            <Fuel className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{totalFuelQuantity.toFixed(1)}L</div>
            <p className="text-xs text-muted-foreground">
              Consommation totale
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Coût Carburant</CardTitle>
            <Fuel className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalFuelCost)}</div>
            <p className="text-xs text-muted-foreground">
              Ce mois
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="carburant" className="space-y-4">
        <TabsList>
          <TabsTrigger value="carburant">Carburant</TabsTrigger>
          <TabsTrigger value="vehicules">Véhicules</TabsTrigger>
          <TabsTrigger value="chauffeurs">Chauffeurs</TabsTrigger>
        </TabsList>

        <TabsContent value="carburant" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Consommation de Carburant</CardTitle>
                  <CardDescription>
                    Suivi des pleins et de la consommation par véhicule
                  </CardDescription>
                </div>
                <Button onClick={() => setOpenAddFuelDialog(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Ajouter plein
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
                      <TableHead>Véhicule</TableHead>
                      <TableHead>Chauffeur</TableHead>
                      <TableHead>Quantité</TableHead>
                      <TableHead>Coût</TableHead>
                      <TableHead>Kilométrage</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {fuelData.map((fuel) => (
                      <TableRow key={fuel.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Car className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{fuel.vehicule}</span>
                          </div>
                        </TableCell>
                        <TableCell>{fuel.chauffeur}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{fuel.quantite}L</Badge>
                        </TableCell>
                        <TableCell>{formatCurrency(fuel.cout)}</TableCell>
                        <TableCell>{fuel.kilometrage.toLocaleString()} km</TableCell>
                        <TableCell>{fuel.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vehicules" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Parc Automobile</CardTitle>
                  <CardDescription>
                    Gestion des véhicules et de leur maintenance
                  </CardDescription>
                </div>
                <Button onClick={() => setOpenAddVehicleDialog(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Ajouter véhicule
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Immatriculation</TableHead>
                      <TableHead>Modèle</TableHead>
                      <TableHead>Année</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Kilométrage</TableHead>
                      <TableHead>Prochain Entretien</TableHead>
                      <TableHead>Chauffeur</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vehicles.map((vehicle) => (
                      <TableRow key={vehicle.id}>
                        <TableCell>
                          <Badge variant="outline" className="font-mono">
                            {vehicle.immatriculation}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">{vehicle.modele}</TableCell>
                        <TableCell>{vehicle.annee}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              vehicle.statut === 'Disponible' ? 'default' : 
                              vehicle.statut === 'En mission' ? 'outline' : 
                              'destructive'
                            }
                          >
                            {vehicle.statut}
                          </Badge>
                        </TableCell>
                        <TableCell>{vehicle.kilometrage.toLocaleString()} km</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{vehicle.prochainEntretien}</span>
                          </div>
                        </TableCell>
                        <TableCell>{vehicle.chauffeurAssigne}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chauffeurs" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Chauffeurs</CardTitle>
                  <CardDescription>
                    Gestion des chauffeurs et de leurs affectations
                  </CardDescription>
                </div>
                <Button onClick={() => setOpenAddDriverDialog(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Ajouter chauffeur
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom</TableHead>
                      <TableHead>Permis</TableHead>
                      <TableHead>Date d'embauche</TableHead>
                      <TableHead>Véhicule assigné</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Téléphone</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {drivers.map((driver) => (
                      <TableRow key={driver.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{driver.nom}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{driver.permis}</Badge>
                        </TableCell>
                        <TableCell>{driver.dateEmbauche}</TableCell>
                        <TableCell>{driver.vehiculeAssigne}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              driver.statut === 'Actif' ? 'default' : 
                              driver.statut === 'En mission' ? 'outline' : 
                              'destructive'
                            }
                          >
                            {driver.statut}
                          </Badge>
                        </TableCell>
                        <TableCell>{driver.telephone}</TableCell>
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
      <Dialog open={openAddFuelDialog} onOpenChange={setOpenAddFuelDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter un plein de carburant</DialogTitle>
            <DialogDescription>
              Enregistrez un nouveau plein de carburant
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="vehicule">Véhicule</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Toyota Hilux - ABC-123</SelectItem>
                    <SelectItem value="2">Ford Transit - DEF-456</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="quantite">Quantité (L)</Label>
                <Input id="quantite" type="number" placeholder="45.5" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cout">Coût</Label>
                <Input id="cout" type="number" placeholder="68.25" />
              </div>
              <div>
                <Label htmlFor="kilometrage">Kilométrage</Label>
                <Input id="kilometrage" type="number" placeholder="45230" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenAddFuelDialog(false)}>
              Annuler
            </Button>
            <Button>Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={openAddVehicleDialog} onOpenChange={setOpenAddVehicleDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter un véhicule</DialogTitle>
            <DialogDescription>
              Ajoutez un nouveau véhicule au parc automobile
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="immat">Immatriculation</Label>
                <Input id="immat" placeholder="ABC-123" />
              </div>
              <div>
                <Label htmlFor="modele">Modèle</Label>
                <Input id="modele" placeholder="Toyota Hilux" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="annee">Année</Label>
                <Input id="annee" type="number" placeholder="2022" />
              </div>
              <div>
                <Label htmlFor="km">Kilométrage</Label>
                <Input id="km" type="number" placeholder="45230" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenAddVehicleDialog(false)}>
              Annuler
            </Button>
            <Button>Ajouter</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={openAddDriverDialog} onOpenChange={setOpenAddDriverDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter un chauffeur</DialogTitle>
            <DialogDescription>
              Ajoutez un nouveau chauffeur à l'équipe
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="nom">Nom complet</Label>
              <Input id="nom" placeholder="Jean Dupont" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="permis">Permis</Label>
                <Input id="permis" placeholder="B, C" />
              </div>
              <div>
                <Label htmlFor="tel">Téléphone</Label>
                <Input id="tel" placeholder="+243 123 456 789" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenAddDriverDialog(false)}>
              Annuler
            </Button>
            <Button>Ajouter</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}