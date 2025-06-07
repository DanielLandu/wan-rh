import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Search, Calendar as CalendarIcon, Clock, UserCheck, UserX, Download, Filter } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function Presence() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Mock data
  const attendanceData = [
    {
      id: '1',
      employe: {
        nom: 'Jean Dupont',
        matricule: 'EMP001',
        departement: 'Commercial',
        photo: '/placeholder-user.jpg'
      },
      date: '2025-01-08',
      heureArrivee: '08:15',
      heureDepart: '17:30',
      heuresTravaillees: '8h 45min',
      statut: 'Présent',
      retard: '15min'
    },
    {
      id: '2',
      employe: {
        nom: 'Marie Martin',
        matricule: 'EMP002',
        departement: 'Finance',
        photo: null
      },
      date: '2025-01-08',
      heureArrivee: '08:00',
      heureDepart: '17:00',
      heuresTravaillees: '8h 30min',
      statut: 'Présent',
      retard: null
    },
    {
      id: '3',
      employe: {
        nom: 'Pierre Leroy',
        matricule: 'EMP003',
        departement: 'Technique',
        photo: null
      },
      date: '2025-01-08',
      heureArrivee: null,
      heureDepart: null,
      heuresTravaillees: '0h',
      statut: 'Absent',
      retard: null
    },
    {
      id: '4',
      employe: {
        nom: 'Sophie Bernard',
        matricule: 'EMP004',
        departement: 'RH',
        photo: '/placeholder-user.jpg'
      },
      date: '2025-01-08',
      heureArrivee: '09:00',
      heureDepart: '18:00',
      heuresTravaillees: '8h 30min',
      statut: 'Présent',
      retard: '1h'
    }
  ];

  const filteredData = attendanceData.filter(record => {
    const matchesSearch = record.employe.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         record.employe.matricule.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || record.statut === statusFilter;
    const matchesDepartment = departmentFilter === 'all' || record.employe.departement === departmentFilter;
    
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const presentCount = attendanceData.filter(record => record.statut === 'Présent').length;
  const absentCount = attendanceData.filter(record => record.statut === 'Absent').length;
  const lateCount = attendanceData.filter(record => record.retard && record.retard !== null).length;
  const totalHours = attendanceData.reduce((sum, record) => {
    const hours = parseFloat(record.heuresTravaillees.replace('h', '.').replace('min', ''));
    return sum + (isNaN(hours) ? 0 : hours);
  }, 0);

  return (
    <div className="space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gestion des Présences</h2>
          <p className="text-muted-foreground">
            Suivez et gérez les présences quotidiennes des employés
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
          <Button>
            <Clock className="mr-2 h-4 w-4" />
            Pointer
          </Button>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Présents</CardTitle>
            <UserCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{presentCount}</div>
            <p className="text-xs text-muted-foreground">
              {((presentCount / attendanceData.length) * 100).toFixed(1)}% du personnel
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Absents</CardTitle>
            <UserX className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{absentCount}</div>
            <p className="text-xs text-muted-foreground">
              {((absentCount / attendanceData.length) * 100).toFixed(1)}% du personnel
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Retards</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{lateCount}</div>
            <p className="text-xs text-muted-foreground">
              Employés en retard
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Heures Totales</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalHours.toFixed(1)}h</div>
            <p className="text-xs text-muted-foreground">
              Aujourd'hui
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Présences du jour</CardTitle>
          <CardDescription>
            Suivi des présences pour le {format(selectedDate, 'dd MMMM yyyy', { locale: fr })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un employé..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[200px] justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(selectedDate, 'dd/MM/yyyy')}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <Select defaultValue={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="Présent">Présent</SelectItem>
                  <SelectItem value="Absent">Absent</SelectItem>
                  <SelectItem value="Retard">Retard</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Département" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les départements</SelectItem>
                  <SelectItem value="Commercial">Commercial</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Technique">Technique</SelectItem>
                  <SelectItem value="RH">RH</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employé</TableHead>
                  <TableHead>Arrivée</TableHead>
                  <TableHead>Départ</TableHead>
                  <TableHead>Heures travaillées</TableHead>
                  <TableHead>Retard</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={record.employe.photo || undefined} alt={record.employe.nom} />
                          <AvatarFallback>
                            {record.employe.nom.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{record.employe.nom}</div>
                          <div className="text-sm text-muted-foreground">
                            {record.employe.matricule} • {record.employe.departement}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={record.retard ? 'text-orange-600 font-medium' : ''}>
                        {record.heureArrivee || '-'}
                      </span>
                    </TableCell>
                    <TableCell>{record.heureDepart || '-'}</TableCell>
                    <TableCell>{record.heuresTravaillees}</TableCell>
                    <TableCell>
                      {record.retard ? (
                        <Badge variant="destructive" className="text-xs">
                          {record.retard}
                        </Badge>
                      ) : (
                        '-'
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          record.statut === 'Présent' ? 'default' : 
                          record.statut === 'Absent' ? 'destructive' : 
                          'outline'
                        }
                      >
                        {record.statut}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Modifier
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}