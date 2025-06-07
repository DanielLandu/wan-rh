import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Plus, TrendingUp, TrendingDown, Target, BarChart3, LineChart, Activity } from 'lucide-react';

export default function Indicateurs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [openAddDialog, setOpenAddDialog] = useState(false);

  // Mock data
  const indicators = [
    {
      id: '1',
      nom: 'Taux de satisfaction client',
      description: 'Pourcentage de clients satisfaits',
      categorie: 'Commercial',
      valeurCible: 90,
      valeurActuelle: 87,
      unite: '%',
      tendance: 'stable',
      frequence: 'Mensuel'
    },
    {
      id: '2',
      nom: 'Temps de résolution incidents',
      description: 'Temps moyen de résolution des incidents techniques',
      categorie: 'Technique',
      valeurCible: 4,
      valeurActuelle: 3.2,
      unite: 'heures',
      tendance: 'amélioration',
      frequence: 'Hebdomadaire'
    },
    {
      id: '3',
      nom: 'Taux d\'absentéisme',
      description: 'Pourcentage d\'absences non planifiées',
      categorie: 'RH',
      valeurCible: 5,
      valeurActuelle: 7.2,
      unite: '%',
      tendance: 'dégradation',
      frequence: 'Mensuel'
    },
    {
      id: '4',
      nom: 'Chiffre d\'affaires mensuel',
      description: 'Revenus générés par mois',
      categorie: 'Finance',
      valeurCible: 500000,
      valeurActuelle: 520000,
      unite: '$',
      tendance: 'amélioration',
      frequence: 'Mensuel'
    }
  ];

  const categories = ['Commercial', 'Technique', 'RH', 'Finance', 'Logistique'];
  const frequencies = ['Quotidien', 'Hebdomadaire', 'Mensuel', 'Trimestriel'];

  const filteredIndicators = indicators.filter(indicator => {
    const matchesSearch = indicator.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         indicator.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || indicator.categorie === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const getProgressValue = (indicator: any) => {
    if (indicator.unite === '%' || indicator.categorie === 'RH') {
      return indicator.valeurCible > 0 ? (indicator.valeurActuelle / indicator.valeurCible) * 100 : 0;
    }
    return indicator.valeurCible > 0 ? (indicator.valeurActuelle / indicator.valeurCible) * 100 : 0;
  };

  const getTrendIcon = (tendance: string) => {
    switch (tendance) {
      case 'amélioration':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'dégradation':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTrendColor = (tendance: string) => {
    switch (tendance) {
      case 'amélioration':
        return 'text-green-600';
      case 'dégradation':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const totalIndicators = indicators.length;
  const onTargetIndicators = indicators.filter(ind => getProgressValue(ind) >= 90).length;
  const improvingIndicators = indicators.filter(ind => ind.tendance === 'amélioration').length;

  return (
    <div className="space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Indicateurs de Performance</h2>
          <p className="text-muted-foreground">
            Suivez les KPI et métriques clés de l'organisation
          </p>
        </div>
        <Button onClick={() => setOpenAddDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nouvel indicateur
        </Button>
      </div>

      {/* Statistiques */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Indicateurs</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalIndicators}</div>
            <p className="text-xs text-muted-foreground">
              KPI suivis
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Objectifs Atteints</CardTitle>
            <Target className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{onTargetIndicators}</div>
            <p className="text-xs text-muted-foreground">
              {((onTargetIndicators / totalIndicators) * 100).toFixed(1)}% du total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Amélioration</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{improvingIndicators}</div>
            <p className="text-xs text-muted-foreground">
              Tendance positive
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Performance Globale</CardTitle>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {((onTargetIndicators / totalIndicators) * 100).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Objectifs atteints
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="liste" className="space-y-4">
        <TabsList>
          <TabsTrigger value="liste">Liste des Indicateurs</TabsTrigger>
          <TabsTrigger value="tableau">Tableau de Bord</TabsTrigger>
        </TabsList>

        <TabsContent value="liste" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Indicateurs de Performance</CardTitle>
              <CardDescription>
                Consultez et gérez tous les indicateurs de performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher un indicateur..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Select defaultValue={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes catégories</SelectItem>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Indicateur</TableHead>
                      <TableHead>Catégorie</TableHead>
                      <TableHead>Valeur Actuelle</TableHead>
                      <TableHead>Objectif</TableHead>
                      <TableHead>Performance</TableHead>
                      <TableHead>Tendance</TableHead>
                      <TableHead>Fréquence</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredIndicators.map((indicator) => (
                      <TableRow key={indicator.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{indicator.nom}</div>
                            <div className="text-sm text-muted-foreground">
                              {indicator.description}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{indicator.categorie}</Badge>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">
                            {indicator.valeurActuelle.toLocaleString()} {indicator.unite}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="text-muted-foreground">
                            {indicator.valeurCible.toLocaleString()} {indicator.unite}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>{getProgressValue(indicator).toFixed(1)}%</span>
                            </div>
                            <Progress 
                              value={getProgressValue(indicator)} 
                              className="w-[100px]"
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className={`flex items-center gap-2 ${getTrendColor(indicator.tendance)}`}>
                            {getTrendIcon(indicator.tendance)}
                            <span className="capitalize">{indicator.tendance}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{indicator.frequence}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tableau" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {indicators.map((indicator) => (
              <Card key={indicator.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{indicator.nom}</CardTitle>
                    {getTrendIcon(indicator.tendance)}
                  </div>
                  <CardDescription className="text-xs">
                    {indicator.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">
                        {indicator.valeurActuelle.toLocaleString()}
                      </span>
                      <Badge variant="outline">{indicator.unite}</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Objectif: {indicator.valeurCible.toLocaleString()}</span>
                        <span>{getProgressValue(indicator).toFixed(1)}%</span>
                      </div>
                      <Progress value={getProgressValue(indicator)} />
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{indicator.categorie}</span>
                      <span>{indicator.frequence}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Dialog Nouvel Indicateur */}
      <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Créer un nouvel indicateur</DialogTitle>
            <DialogDescription>
              Définissez un nouveau KPI à suivre
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="nom">Nom de l'indicateur</Label>
              <Input id="nom" placeholder="Ex: Taux de satisfaction client" />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input id="description" placeholder="Description de l'indicateur" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="categorie">Catégorie</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="frequence">Fréquence</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    {frequencies.map(frequency => (
                      <SelectItem key={frequency} value={frequency}>{frequency}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="valeurCible">Valeur cible</Label>
                <Input id="valeurCible" type="number" placeholder="100" />
              </div>
              <div>
                <Label htmlFor="valeurActuelle">Valeur actuelle</Label>
                <Input id="valeurActuelle" type="number" placeholder="85" />
              </div>
              <div>
                <Label htmlFor="unite">Unité</Label>
                <Input id="unite" placeholder="%" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenAddDialog(false)}>
              Annuler
            </Button>
            <Button type="submit">Créer l'indicateur</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}