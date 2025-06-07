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
import { Search, Plus, ChefHat, Package, Users, DollarSign, Calendar } from 'lucide-react';

export default function Cuisine() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openAddRationDialog, setOpenAddRationDialog] = useState(false);
  const [openAddInventoryDialog, setOpenAddInventoryDialog] = useState(false);
  const [openAddSupplierDialog, setOpenAddSupplierDialog] = useState(false);

  // Mock data
  const rations = [
    {
      id: '1',
      date: '2025-01-08',
      typeRepas: 'Déjeuner',
      nombrePersonnes: 45,
      menu: ['Riz', 'Poulet', 'Légumes', 'Fruits'],
      coutTotal: 180
    },
    {
      id: '2',
      date: '2025-01-08',
      typeRepas: 'Dîner',
      nombrePersonnes: 38,
      menu: ['Pâtes', 'Poisson', 'Salade', 'Pain'],
      coutTotal: 152
    }
  ];

  const inventory = [
    {
      id: '1',
      article: 'Riz (sac 25kg)',
      quantite: 15,
      unite: 'sacs',
      stockMinimum: 5,
      prixUnitaire: 25,
      fournisseur: 'Agro Supply'
    },
    {
      id: '2',
      article: 'Huile de cuisson (5L)',
      quantite: 8,
      unite: 'bidons',
      stockMinimum: 3,
      prixUnitaire: 12,
      fournisseur: 'Food Distributors'
    }
  ];

  const suppliers = [
    {
      id: '1',
      nom: 'Agro Supply',
      contact: 'Jean Mukendi',
      telephone: '+243 123 456 789',
      email: 'contact@agrosupply.cd',
      produits: ['Riz', 'Légumes', 'Fruits'],
      evaluation: 4.5
    },
    {
      id: '2',
      nom: 'Food Distributors',
      contact: 'Marie Kabila',
      telephone: '+243 987 654 321',
      email: 'info@fooddist.cd',
      produits: ['Huile', 'Condiments', 'Conserves'],
      evaluation: 4.2
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const totalRations = rations.length;
  const totalPersonnesServies = rations.reduce((sum, ration) => sum + ration.nombrePersonnes, 0);
  const coutTotalJour = rations.reduce((sum, ration) => sum + ration.coutTotal, 0);
  const articlesEnStock = inventory.length;

  return (
    <div className="space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gestion de la Cuisine</h2>
          <p className="text-muted-foreground">
            Gérez les rations, l'inventaire et les fournisseurs alimentaires
          </p>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Repas Servis</CardTitle>
            <ChefHat className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{totalRations}</div>
            <p className="text-xs text-muted-foreground">
              Aujourd'hui
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Personnes Servies</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{totalPersonnesServies}</div>
            <p className="text-xs text-muted-foreground">
              Total du jour
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Coût Journalier</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(coutTotalJour)}</div>
            <p className="text-xs text-muted-foreground">
              Dépenses alimentaires
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Articles en Stock</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{articlesEnStock}</div>
            <p className="text-xs text-muted-foreground">
              Inventaire actuel
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="rations" className="space-y-4">
        <TabsList>
          <TabsTrigger value="rations">Rations</TabsTrigger>
          <TabsTrigger value="inventaire">Inventaire</TabsTrigger>
          <TabsTrigger value="fournisseurs">Fournisseurs</TabsTrigger>
        </TabsList>

        <TabsContent value="rations" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Gestion des Rations</CardTitle>
                  <CardDescription>
                    Planifiez et suivez les repas servis quotidiennement
                  </CardDescription>
                </div>
                <Button onClick={() => setOpenAddRationDialog(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Nouvelle ration
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
                      <TableHead>Date</TableHead>
                      <TableHead>Type de repas</TableHead>
                      <TableHead>Personnes servies</TableHead>
                      <TableHead>Menu</TableHead>
                      <TableHead>Coût total</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rations.map((ration) => (
                      <TableRow key={ration.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{ration.date}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{ration.typeRepas}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{ration.nombrePersonnes}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {ration.menu.slice(0, 2).map((item, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {item}
                              </Badge>
                            ))}
                            {ration.menu.length > 2 && (
                              <Badge variant="secondary" className="text-xs">
                                +{ration.menu.length - 2}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{formatCurrency(ration.coutTotal)}</TableCell>
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

        <TabsContent value="inventaire" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Inventaire Alimentaire</CardTitle>
                  <CardDescription>
                    Gérez le stock des produits alimentaires
                  </CardDescription>
                </div>
                <Button onClick={() => setOpenAddInventoryDialog(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Nouvel article
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Article</TableHead>
                      <TableHead>Quantité</TableHead>
                      <TableHead>Stock minimum</TableHead>
                      <TableHead>Prix unitaire</TableHead>
                      <TableHead>Fournisseur</TableHead>
                      <TableHead>Statut</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inventory.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Package className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{item.article}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">{item.quantite} {item.unite}</span>
                        </TableCell>
                        <TableCell>
                          <span className="text-muted-foreground">{item.stockMinimum} {item.unite}</span>
                        </TableCell>
                        <TableCell>{formatCurrency(item.prixUnitaire)}</TableCell>
                        <TableCell>{item.fournisseur}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              item.quantite > item.stockMinimum ? 'default' : 
                              item.quantite === item.stockMinimum ? 'outline' : 
                              'destructive'
                            }
                          >
                            {item.quantite > item.stockMinimum ? 'En stock' : 
                             item.quantite === item.stockMinimum ? 'Stock bas' : 
                             'Rupture'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fournisseurs" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Fournisseurs Alimentaires</CardTitle>
                  <CardDescription>
                    Gérez vos partenaires fournisseurs
                  </CardDescription>
                </div>
                <Button onClick={() => setOpenAddSupplierDialog(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Nouveau fournisseur
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fournisseur</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Téléphone</TableHead>
                      <TableHead>Produits</TableHead>
                      <TableHead>Évaluation</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {suppliers.map((supplier) => (
                      <TableRow key={supplier.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{supplier.nom}</div>
                            <div className="text-sm text-muted-foreground">{supplier.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>{supplier.contact}</TableCell>
                        <TableCell>{supplier.telephone}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {supplier.produits.slice(0, 2).map((produit, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {produit}
                              </Badge>
                            ))}
                            {supplier.produits.length > 2 && (
                              <Badge variant="secondary" className="text-xs">
                                +{supplier.produits.length - 2}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <span className="font-medium">{supplier.evaluation}</span>
                            <span className="text-yellow-500">★</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            Contacter
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
      </Tabs>

      {/* Dialogs */}
      <Dialog open={openAddRationDialog} onOpenChange={setOpenAddRationDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nouvelle ration</DialogTitle>
            <DialogDescription>
              Enregistrez un nouveau repas servi
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">Date</Label>
                <Input id="date" type="date" />
              </div>
              <div>
                <Label htmlFor="type">Type de repas</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="petit-dejeuner">Petit-déjeuner</SelectItem>
                    <SelectItem value="dejeuner">Déjeuner</SelectItem>
                    <SelectItem value="diner">Dîner</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="personnes">Nombre de personnes</Label>
                <Input id="personnes" type="number" placeholder="45" />
              </div>
              <div>
                <Label htmlFor="cout">Coût total</Label>
                <Input id="cout" type="number" placeholder="180" />
              </div>
            </div>
            <div>
              <Label htmlFor="menu">Menu (séparé par des virgules)</Label>
              <Input id="menu" placeholder="Riz, Poulet, Légumes, Fruits" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenAddRationDialog(false)}>
              Annuler
            </Button>
            <Button>Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={openAddInventoryDialog} onOpenChange={setOpenAddInventoryDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nouvel article</DialogTitle>
            <DialogDescription>
              Ajoutez un nouvel article à l'inventaire
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="article">Nom de l'article</Label>
              <Input id="article" placeholder="Ex: Riz (sac 25kg)" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="quantite">Quantité</Label>
                <Input id="quantite" type="number" placeholder="15" />
              </div>
              <div>
                <Label htmlFor="unite">Unité</Label>
                <Input id="unite" placeholder="sacs" />
              </div>
              <div>
                <Label htmlFor="minimum">Stock minimum</Label>
                <Input id="minimum" type="number" placeholder="5" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="prix">Prix unitaire</Label>
                <Input id="prix" type="number" placeholder="25" />
              </div>
              <div>
                <Label htmlFor="fournisseur">Fournisseur</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Agro Supply</SelectItem>
                    <SelectItem value="2">Food Distributors</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenAddInventoryDialog(false)}>
              Annuler
            </Button>
            <Button>Ajouter</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={openAddSupplierDialog} onOpenChange={setOpenAddSupplierDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nouveau fournisseur</DialogTitle>
            <DialogDescription>
              Ajoutez un nouveau fournisseur alimentaire
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="nom">Nom du fournisseur</Label>
              <Input id="nom" placeholder="Ex: Agro Supply" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contact">Personne de contact</Label>
                <Input id="contact" placeholder="Jean Mukendi" />
              </div>
              <div>
                <Label htmlFor="tel">Téléphone</Label>
                <Input id="tel" placeholder="+243 123 456 789" />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="contact@agrosupply.cd" />
            </div>
            <div>
              <Label htmlFor="produits">Produits (séparés par des virgules)</Label>
              <Input id="produits" placeholder="Riz, Légumes, Fruits" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenAddSupplierDialog(false)}>
              Annuler
            </Button>
            <Button>Ajouter</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}