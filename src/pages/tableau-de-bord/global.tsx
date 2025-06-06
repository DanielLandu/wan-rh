import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart, PieChart } from '@/components/ui/chart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, Clock, DollarSign, User, Users } from "lucide-react";

export default function TableauDeBordGlobal() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Tableau de bord</h2>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <CalendarIcon className="h-4 w-4" />
            <span>Mai 2025</span>
          </div>
        </div>
      </div>

      {/* Statistiques rapides */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Employés
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">243</div>
            <p className="text-xs text-muted-foreground">
              +4 ce mois
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Présence Aujourd'hui
            </CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground">
              231 employés présents
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Heures Travaillées
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,892</div>
            <p className="text-xs text-muted-foreground">
              Cette semaine
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Budget Mensuel
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$102,500</div>
            <p className="text-xs text-text-muted-foreground">
              +5% par rapport au mois dernier
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="presence" className="space-y-4">
        <TabsList>
          <TabsTrigger value="presence">Présence</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="finances">Finances</TabsTrigger>
        </TabsList>
        <TabsContent value="presence" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Tendance de Présence</CardTitle>
                <CardDescription>
                  Taux de présence mensuel
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <LineChart 
                  data={[
                    { name: 'Jan', value: 91 },
                    { name: 'Fév', value: 89 },
                    { name: 'Mar', value: 92 },
                    { name: 'Avr', value: 95 },
                    { name: 'Mai', value: 94 },
                  ]}
                  categories={['value']}
                  index="name"
                  colors={['chart-1']}
                  valueFormatter={(value) => `${value}%`}
                  showLegend={false}
                  showXAxis
                  showYAxis
                  showGridLines
                />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Présence par Département</CardTitle>
                <CardDescription>
                  Pour le mois en cours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PieChart 
                  data={[
                    { name: 'Administration', value: 97 },
                    { name: 'Opérations', value: 90 },
                    { name: 'Technique', value: 92 },
                    { name: 'Logistique', value: 94 },
                  ]}
                  category="value"
                  index="name"
                  valueFormatter={(value) => `${value}%`}
                  colors={['chart-1', 'chart-2', 'chart-3', 'chart-4']}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance des Départements</CardTitle>
              <CardDescription>
                Classement basé sur les évaluations trimestrielles
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <BarChart 
                data={[
                  { department: 'Administration', score: 87 },
                  { department: 'Opérations', score: 92 },
                  { department: 'Technique', score: 95 },
                  { department: 'Logistique', score: 88 },
                  { department: 'Finance', score: 90 },
                ]}
                categories={['score']}
                index="department"
                colors={['chart-2']}
                valueFormatter={(value) => `${value}%`}
                showLegend={false}
                showXAxis
                showYAxis
                showGridLines
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="finances" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Aperçu Financier</CardTitle>
              <CardDescription>
                Résumé de la situation financière mensuelle
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <LineChart 
                data={[
                  { mois: 'Jan', budget: 100000, depenses: 85000 },
                  { mois: 'Fév', budget: 105000, depenses: 92000 },
                  { mois: 'Mar', budget: 100000, depenses: 88000 },
                  { mois: 'Avr', budget: 108000, depenses: 95000 },
                  { mois: 'Mai', budget: 102500, depenses: 89000 },
                ]}
                categories={['budget', 'depenses']}
                index="mois"
                colors={['chart-1', 'chart-3']}
                valueFormatter={(value) => `$${value.toLocaleString()}`}
                showXAxis
                showYAxis
                showGridLines
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}