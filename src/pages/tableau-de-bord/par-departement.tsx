import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, LineChart, PieChart } from '@/components/ui/chart';
import { Calendar, Clock, UserCheck, Users } from "lucide-react";

export default function TableauDeBordDepartement() {
  const [departement, setDepartement] = useState("operations");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Tableau de bord par département</h2>
        <div className="flex items-center gap-4">
          <Select defaultValue={departement} onValueChange={setDepartement}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sélectionner département" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="operations">Opérations</SelectItem>
              <SelectItem value="administration">Administration</SelectItem>
              <SelectItem value="technique">Technique</SelectItem>
              <SelectItem value="logistique">Logistique</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
            </SelectContent>
          </Select>
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
            <div className="text-2xl font-bold">78</div>
            <p className="text-xs text-muted-foreground">
              +2 ce mois
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Présence Aujourd'hui
            </CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">
              72 employés présents
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
            <div className="text-2xl font-bold">624</div>
            <p className="text-xs text-muted-foreground">
              Cette semaine
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Jours de Congés
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              Pris ce mois
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="personnel" className="space-y-4">
        <TabsList>
          <TabsTrigger value="personnel">Personnel</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="budget">Budget</TabsTrigger>
        </TabsList>
        <TabsContent value="personnel" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Évolution des Effectifs</CardTitle>
                <CardDescription>
                  Nombre d'employés sur les 6 derniers mois
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <LineChart 
                  data={[
                    { name: 'Déc', value: 73 },
                    { name: 'Jan', value: 74 },
                    { name: 'Fév', value: 75 },
                    { name: 'Mar', value: 75 },
                    { name: 'Avr', value: 76 },
                    { name: 'Mai', value: 78 },
                  ]}
                  categories={['value']}
                  index="name"
                  colors={['chart-2']}
                  valueFormatter={(value) => `${value}`}
                  showLegend={false}
                  showXAxis
                  showYAxis
                  showGridLines
                />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Répartition par Poste</CardTitle>
                <CardDescription>
                  Distribution des employés par poste
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PieChart 
                  data={[
                    { name: 'Superviseurs', value: 8 },
                    { name: 'Opérateurs', value: 42 },
                    { name: 'Techniciens', value: 18 },
                    { name: 'Assistants', value: 10 },
                  ]}
                  category="value"
                  index="name"
                  valueFormatter={(value) => `${value}`}
                  colors={['chart-1', 'chart-2', 'chart-3', 'chart-4']}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance des Équipes</CardTitle>
              <CardDescription>
                Scores moyens de performance par équipe
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <BarChart 
                data={[
                  { equipe: 'Équipe A', score: 87 },
                  { equipe: 'Équipe B', score: 92 },
                  { equipe: 'Équipe C', score: 84 },
                  { equipe: 'Équipe D', score: 88 },
                ]}
                categories={['score']}
                index="equipe"
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
        <TabsContent value="budget" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Budget du Département</CardTitle>
              <CardDescription>
                Répartition du budget par catégorie
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <PieChart 
                    data={[
                      { name: 'Salaires', value: 64 },
                      { name: 'Équipement', value: 18 },
                      { name: 'Formation', value: 8 },
                      { name: 'Divers', value: 10 },
                    ]}
                    category="value"
                    index="name"
                    valueFormatter={(value) => `${value}%`}
                    colors={['chart-1', 'chart-2', 'chart-3', 'chart-4']}
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-4 w-4 rounded-full bg-[hsl(var(--chart-1))]" />
                        <span className="ml-2 text-sm font-medium">Salaires</span>
                      </div>
                      <span className="text-sm">$183,500</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-4 w-4 rounded-full bg-[hsl(var(--chart-2))]" />
                        <span className="ml-2 text-sm font-medium">Équipement</span>
                      </div>
                      <span className="text-sm">$51,600</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-4 w-4 rounded-full bg-[hsl(var(--chart-3))]" />
                        <span className="ml-2 text-sm font-medium">Formation</span>
                      </div>
                      <span className="text-sm">$22,900</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-4 w-4 rounded-full bg-[hsl(var(--chart-4))]" />
                        <span className="ml-2 text-sm font-medium">Divers</span>
                      </div>
                      <span className="text-sm">$28,700</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}