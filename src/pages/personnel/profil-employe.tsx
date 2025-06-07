import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar, Mail, MapPin, Phone, User, Briefcase, Clock, Award } from 'lucide-react';

export default function ProfilEmploye() {
  const [isEditing, setIsEditing] = useState(false);

  // Mock data
  const employee = {
    id: '1',
    nom: 'Jean Dupont',
    email: 'jean.dupont@wanec.com',
    telephone: '+243 123 456 789',
    poste: 'Directeur Commercial',
    departement: 'Commercial',
    matricule: 'EMP001',
    dateEmbauche: '15/03/2020',
    statut: 'Actif',
    adresse: '123 Avenue de la Paix, Kinshasa',
    dateNaissance: '15/08/1985',
    contactUrgence: 'Marie Dupont - +243 987 654 321',
    bio: 'Directeur commercial expérimenté avec plus de 10 ans d\'expérience dans le développement commercial et la gestion d\'équipe.',
    competences: ['Leadership', 'Négociation', 'Gestion d\'équipe', 'Développement commercial'],
    formations: [
      { titre: 'MBA en Management', institution: 'Université de Kinshasa', annee: '2015' },
      { titre: 'Formation Leadership', institution: 'WANEC Academy', annee: '2022' }
    ],
    evaluations: [
      { periode: 'Q1 2025', score: 92, commentaire: 'Excellent performance' },
      { periode: 'Q4 2024', score: 88, commentaire: 'Très bon travail' }
    ]
  };

  return (
    <div className="space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Profil Employé</h2>
          <p className="text-muted-foreground">
            Consultez et modifiez les informations détaillées de l'employé
          </p>
        </div>
        <Button 
          onClick={() => setIsEditing(!isEditing)}
          variant={isEditing ? "outline" : "default"}
        >
          {isEditing ? "Annuler" : "Modifier"}
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Sidebar avec photo et infos de base */}
        <Card className="md:col-span-1">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-32 w-32">
                <AvatarImage src="/placeholder-user.jpg" alt={employee.nom} />
                <AvatarFallback className="text-2xl">
                  {employee.nom.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold">{employee.nom}</h3>
                <p className="text-muted-foreground">{employee.poste}</p>
                <Badge variant="default">{employee.statut}</Badge>
              </div>

              <Separator />

              <div className="w-full space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>{employee.matricule}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <span>{employee.departement}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Embauché le {employee.dateEmbauche}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contenu principal avec onglets */}
        <div className="md:col-span-2">
          <Tabs defaultValue="general" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="general">Général</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
              <TabsTrigger value="competences">Compétences</TabsTrigger>
              <TabsTrigger value="evaluations">Évaluations</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Informations Générales</CardTitle>
                  <CardDescription>
                    Informations personnelles et professionnelles
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="nom">Nom complet</Label>
                      <Input 
                        id="nom" 
                        value={employee.nom} 
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="matricule">Matricule</Label>
                      <Input 
                        id="matricule" 
                        value={employee.matricule} 
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="poste">Poste</Label>
                      <Input 
                        id="poste" 
                        value={employee.poste} 
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="departement">Département</Label>
                      <Input 
                        id="departement" 
                        value={employee.departement} 
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="dateNaissance">Date de naissance</Label>
                      <Input 
                        id="dateNaissance" 
                        value={employee.dateNaissance} 
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="dateEmbauche">Date d'embauche</Label>
                      <Input 
                        id="dateEmbauche" 
                        value={employee.dateEmbauche} 
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="bio">Biographie</Label>
                    <Textarea 
                      id="bio" 
                      value={employee.bio} 
                      disabled={!isEditing}
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contact" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Informations de Contact</CardTitle>
                  <CardDescription>
                    Coordonnées et contact d'urgence
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="email" 
                          value={employee.email} 
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="telephone">Téléphone</Label>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="telephone" 
                          value={employee.telephone} 
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="adresse">Adresse</Label>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="adresse" 
                        value={employee.adresse} 
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="contactUrgence">Contact d'urgence</Label>
                    <Input 
                      id="contactUrgence" 
                      value={employee.contactUrgence} 
                      disabled={!isEditing}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="competences" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Compétences et Formations</CardTitle>
                  <CardDescription>
                    Compétences professionnelles et formations suivies
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="text-base font-medium">Compétences</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {employee.competences.map((competence, index) => (
                        <Badge key={index} variant="secondary">
                          {competence}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <Label className="text-base font-medium">Formations</Label>
                    <div className="space-y-3 mt-2">
                      {employee.formations.map((formation, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                          <Award className="h-5 w-5 text-primary" />
                          <div className="flex-1">
                            <p className="font-medium">{formation.titre}</p>
                            <p className="text-sm text-muted-foreground">
                              {formation.institution} - {formation.annee}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="evaluations" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Historique des Évaluations</CardTitle>
                  <CardDescription>
                    Performances et évaluations récentes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {employee.evaluations.map((evaluation, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{evaluation.periode}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-primary">
                              {evaluation.score}%
                            </span>
                            <Badge variant="default">Excellent</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {evaluation.commentaire}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {isEditing && (
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Annuler
              </Button>
              <Button onClick={() => setIsEditing(false)}>
                Sauvegarder
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}