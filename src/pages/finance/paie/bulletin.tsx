import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar, Download, Eye, FileText, Search, User } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Employee {
  id: string;
  first_name: string;
  last_name: string;
  position: string;
  department_id: number;
}

interface PayrollSlip {
  id: string;
  employee_id: string;
  period_start: string;
  period_end: string;
  gross_salary: number;
  net_salary: number;
  deductions: number;
  bonuses: number;
  created_at: string;
  employee?: Employee;
}

export default function Bulletin() {
  const [payrollSlips, setPayrollSlips] = useState<PayrollSlip[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<string>('');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch employees
      const { data: employeesData, error: employeesError } = await supabase
        .from('employees')
        .select('id, first_name, last_name, position, department_id')
        .order('last_name');

      if (employeesError) throw employeesError;
      setEmployees(employeesData || []);

      // Fetch payroll slips with employee data
      const { data: payrollData, error: payrollError } = await supabase
        .from('payroll_slips')
        .select(`
          *,
          employee:employees(id, first_name, last_name, position, department_id)
        `)
        .order('created_at', { ascending: false });

      if (payrollError) throw payrollError;
      setPayrollSlips(payrollData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPayrollSlips = payrollSlips.filter(slip => {
    const matchesSearch = searchTerm === '' || 
      (slip.employee?.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
       slip.employee?.last_name?.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesEmployee = selectedEmployee === '' || slip.employee_id === selectedEmployee;
    
    const matchesPeriod = selectedPeriod === '' || 
      new Date(slip.period_start).getMonth() === parseInt(selectedPeriod);

    return matchesSearch && matchesEmployee && matchesPeriod;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const getMonthName = (monthIndex: number) => {
    const months = [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];
    return months[monthIndex];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bulletins de Paie</h1>
          <p className="text-muted-foreground">
            Gérez et consultez les bulletins de paie des employés
          </p>
        </div>
        <Button>
          <FileText className="mr-2 h-4 w-4" />
          Nouveau Bulletin
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filtres</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search">Rechercher un employé</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Nom ou prénom..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Employé</Label>
              <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                <SelectTrigger>
                  <SelectValue placeholder="Tous les employés" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Tous les employés</SelectItem>
                  {employees.map((employee) => (
                    <SelectItem key={employee.id} value={employee.id}>
                      {employee.first_name} {employee.last_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Période</Label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger>
                  <SelectValue placeholder="Toutes les périodes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Toutes les périodes</SelectItem>
                  {Array.from({ length: 12 }, (_, i) => (
                    <SelectItem key={i} value={i.toString()}>
                      {getMonthName(i)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payroll Slips Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Bulletins de Paie
          </CardTitle>
          <CardDescription>
            {filteredPayrollSlips.length} bulletin(s) trouvé(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employé</TableHead>
                  <TableHead>Période</TableHead>
                  <TableHead>Salaire Brut</TableHead>
                  <TableHead>Déductions</TableHead>
                  <TableHead>Primes</TableHead>
                  <TableHead>Salaire Net</TableHead>
                  <TableHead>Date de Création</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayrollSlips.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      <div className="flex flex-col items-center gap-2">
                        <FileText className="h-8 w-8 text-muted-foreground" />
                        <p className="text-muted-foreground">Aucun bulletin de paie trouvé</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPayrollSlips.map((slip) => (
                    <TableRow key={slip.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="font-medium">
                              {slip.employee?.first_name} {slip.employee?.last_name}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {slip.employee?.position}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="font-medium">
                              {formatDate(slip.period_start)} - {formatDate(slip.period_end)}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {getMonthName(new Date(slip.period_start).getMonth())} {new Date(slip.period_start).getFullYear()}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-mono">
                          {formatCurrency(slip.gross_salary || 0)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="destructive" className="font-mono">
                          -{formatCurrency(slip.deductions || 0)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="default" className="font-mono">
                          +{formatCurrency(slip.bonuses || 0)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="font-mono font-bold">
                          {formatCurrency(slip.net_salary || 0)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {formatDate(slip.created_at)}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bulletins</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredPayrollSlips.length}</div>
            <p className="text-xs text-muted-foreground">
              Bulletins générés
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Salaire Brut Total</CardTitle>
            <Badge variant="outline" className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(
                filteredPayrollSlips.reduce((sum, slip) => sum + (slip.gross_salary || 0), 0)
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Montant total brut
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Déductions Totales</CardTitle>
            <Badge variant="destructive" className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(
                filteredPayrollSlips.reduce((sum, slip) => sum + (slip.deductions || 0), 0)
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Montant total des déductions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Salaire Net Total</CardTitle>
            <Badge variant="secondary" className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(
                filteredPayrollSlips.reduce((sum, slip) => sum + (slip.net_salary || 0), 0)
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Montant total net
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}