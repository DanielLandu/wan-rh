import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, LineChart, PieChart } from '@/components/ui/chart';
import { Calendar, Download, TrendingUp, TrendingDown, DollarSign, Receipt, AlertCircle } from 'lucide-react';

export default function RapportMensuel() {
  const [selectedMonth, setSelectedMonth] = useState('2025-01');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  // Mock data
  const monthlyData = {
    totalDepenses: 68500,
    budgetAlloue: 75000,
    economie: 6500,
    nombreFactures: 24,
    factunesEnRetard: 3,
    principauxFournisseurs: [
      { nom: 'TechCorp Solutions', montant: 15000, pourcentage: 21.9 },
      { nom: 'Office Furniture Ltd', montant: 8500, pourcentage: 12.4 },
      { nom: 'Energy Solutions', montant: 7200, pourcentage: 10.5 },
      { nom: 'Auto Services SARL', montant: 6800, pourcentage: 9.9 }
    ],
    depensesParCategorie: [
      { categorie: 'Équipements', montant: 23500, pourcentage: 34.3 },
      { categorie: 'Services', montant: 18200, pourcentage: 26.6 },
      { categorie: 'Fournitures', montant: 12800, pourcentage: 18.7 },
      { categorie: 'Maintenance', montant: 8900, pourcentage: 13.0 },
      { categorie: 'Autres', montant: 5100, pourcentage: 7.4 }
    ],
    evolutionMensuelle: [
      { mois: 'Sep', depenses: 62000, budget: 70000 },
      { mois: 'Oct', depenses: 58000, budget: 70000 },
      { mois: 'Nov', depenses: 65000, budget: 72000 },
      { mois: 'Déc', depenses: 71000, budget: 75000 },
      { mois: 'Jan', depenses: 68500, budget: 75000 }
    ],
    depensesParDepartement: [
      { departement: 'Technique', montant: 28500 },
      { departement: 'Administration', montant: 18200 },
      { departement: 'Logistique', montant: 12800 },
      { departement: 'Commercial', montant: 6000 },
      { departement: 'Finance', montant: 3000 }
    ]
  };

  const departments = ['Technique', 'Administration', 'Logistique', 'Commercial', 'Finance'];
  const months = [
    { value: '2025-01', label: 'Janvier 2025' },
    { value: '2024-12', label: 'Décembre 2024' },
    { value: '2024-11', label: 'Novembre 2024' },
    { value: '2024-10', label: 'Octobre 2024' }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getVariationColor = (current: number, budget: number) => {
    const variation = ((current - budget) / budget) * 100;
    return variation > 0 ? 'text-red-600' : 'text-green-600';
  };

  const getVariationIcon = (current: number, budget: number) => {
    const variation = ((current - budget) / budget) * 100;
    return variation > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />;
  };

  return (
    <div className="space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Rapport Mensuel des Dépenses</h2>
          <p className="text-muted-foreground">
            Analyse détaillée des dépenses et du budget mensuel
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exporter PDF
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exporter Excel
          </Button>
        </div>
      </div>

      {/* Filtres */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sélectionner le mois" />
                </SelectTrigger>
                <SelectContent>
                  {months.map(month => (
                    <SelectItem key={month.value} value={month.value}>
                      {month.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
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
        </CardContent>
      </Card>

      {/* Résumé Exécutif */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Dépenses</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(monthlyData.totalDepenses)}</div>
            <div className={`flex items-center gap-1 text-xs ${getVariationColor(monthlyData.totalDepenses, monthlyData.budgetAlloue)}`}>
              {getVariationIcon(monthlyData.totalDepenses, monthlyData.budgetAlloue)}
              <span>vs budget</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget Alloué</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(monthlyData.budgetAlloue)}</div>
            <p className="text-xs text-muted-foreground">
              {((monthlyData.totalDepenses / monthlyData.budgetAlloue) * 100).toFixed(1)}% utilisé
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Économie</CardTitle>
            <TrendingDown className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(monthlyData.economie)}</div>
            <p className="text-xs text-muted-foreground">
              {((monthlyData.economie / monthlyData.budgetAlloue) * 100).toFixed(1)}% du budget
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Factures</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{monthlyData.nombreFactures}</div>
            <p className="text-xs text-muted-foreground">
              Traitées ce mois
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Retard</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{monthlyData.factunesEnRetard}</div>
            <p className="text-xs text-muted-foreground">
              Factures échues
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="evolution" className="space-y-4">
        <TabsList>
          <TabsTrigger value="evolution">Évolution</TabsTrigger>
          <TabsTrigger value="categories">Catégories</TabsTrigger>
          <TabsTrigger value="departements">Départements</TabsTrigger>
          <TabsTrigger value="fournisseurs">Fournisseurs</TabsTrigger>
        </TabsList>

        <TabsContent value="evolution" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Évolution des Dépenses</CardTitle>
              <CardDescription>
                Comparaison dépenses vs budget sur les 5 derniers mois
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LineChart 
                data={monthlyData.evolutionMensuelle}
                categories={['depenses', 'budget']}
                index="mois"
                colors={['chart-1', 'chart-2']}
                valueFormatter={(value) => formatCurrency(value)}
                showXAxis
                showYAxis
                showGridLines
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Répartition par Catégorie</CardTitle>
                <CardDescription>
                  Distribution des dépenses par type
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PieChart 
                  data={monthlyData.depensesParCategorie}
                  category="montant"
                  index="categorie"
                  valueFormatter={(value) => formatCurrency(value)}
                  colors={['chart-1', 'chart-2', 'chart-3', 'chart-4', 'chart-5']}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Détail par Catégorie</CardTitle>
                <CardDescription>
                  Montants et pourcentages détaillés
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyData.depensesParCategorie.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`h-3 w-3 rounded-full bg-[hsl(var(--chart-${index + 1}))]`} />
                        <span className="font-medium">{item.categorie}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{formatCurrency(item.montant)}</div>
                        <div className="text-sm text-muted-foreground">{item.pourcentage}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="departements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Dépenses par Département</CardTitle>
              <CardDescription>
                Répartition des dépenses par département
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart 
                data={monthlyData.depensesParDepartement}
                categories={['montant']}
                index="departement"
                colors={['chart-2']}
                valueFormatter={(value) => formatCurrency(value)}
                showLegend={false}
                showXAxis
                showYAxis
                showGridLines
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fournisseurs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Principaux Fournisseurs</CardTitle>
              <CardDescription>
                Top fournisseurs par volume de dépenses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyData.principauxFournisseurs.map((fournisseur, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">{fournisseur.nom}</div>
                      <div className="text-sm text-muted-foreground">
                        {fournisseur.pourcentage}% du total
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">{formatCurrency(fournisseur.montant)}</div>
                      <Badge variant="outline">#{index + 1}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}