"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Employee } from '@/lib/types';
import { organizationData } from '@/lib/mock-data';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Mail, User, UserCircle, UserCog } from 'lucide-react';

export default function EmployeeDetails({ id }: { id: string }) {
  const router = useRouter();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [manager, setManager] = useState<Employee | null>(null);
  const [directReports, setDirectReports] = useState<Employee[]>([]);

  // Function to find an employee by ID and also their manager
  const findEmployeeAndManager = (
    data: Employee,
    id: string,
    parent: Employee | null = null
  ): { employee: Employee | null; manager: Employee | null } => {
    if (data.id === id) {
      return { employee: data, manager: parent };
    }

    if (data.children) {
      for (const child of data.children) {
        const result = findEmployeeAndManager(child, id, data);
        if (result.employee) {
          return result;
        }
      }
    }

    return { employee: null, manager: null };
  };

  // Function to find direct reports
  const findDirectReports = (data: Employee, id: string): Employee[] => {
    if (data.id === id && data.children) {
      return data.children;
    }

    if (data.children) {
      for (const child of data.children) {
        const reports = findDirectReports(child, id);
        if (reports.length > 0) {
          return reports;
        }
      }
    }

    return [];
  };

  useEffect(() => {
    if (id) {
      const { employee: foundEmployee, manager: foundManager } = findEmployeeAndManager(
        organizationData,
        id
      );
      const reports = findDirectReports(organizationData, id);

      setEmployee(foundEmployee);
      setManager(foundManager);
      setDirectReports(reports);
    }
  }, [id]);

  // Get initials for avatar fallback
  const getInitials = (name: string = '') => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };

  if (!employee) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Employee not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        className="mb-8 flex items-center gap-2"
        onClick={() => router.push('/')}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Organization Chart
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main employee info */}
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={employee.imageUrl} />
              <AvatarFallback className="text-lg">
                {getInitials(employee.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{employee.name}</CardTitle>
              <p className="text-lg font-medium mt-1">{employee.position}</p>
              <p className="text-sm text-muted-foreground">{employee.department}</p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a href={`mailto:${employee.email}`} className="text-sm hover:underline">
                  {employee.email}
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Manager info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <UserCog className="h-5 w-5" />
              Reports To
            </CardTitle>
          </CardHeader>
          <CardContent>
            {manager ? (
              <div 
                className="flex items-center gap-3 p-3 hover:bg-muted rounded-md transition-colors cursor-pointer"
                onClick={() => router.push(`/employee/${manager.id}`)}
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={manager.imageUrl} />
                  <AvatarFallback>{getInitials(manager.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{manager.name}</p>
                  <p className="text-sm text-muted-foreground">{manager.position}</p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No manager (Top level)</p>
            )}
          </CardContent>
        </Card>

        {/* Direct reports */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <User className="h-5 w-5" />
              Direct Reports ({directReports.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {directReports.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {directReports.map(report => (
                  <div 
                    key={report.id}
                    className="flex items-center gap-3 p-3 hover:bg-muted rounded-md transition-colors cursor-pointer"
                    onClick={() => router.push(`/employee/${report.id}`)}
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={report.imageUrl} />
                      <AvatarFallback>{getInitials(report.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{report.name}</p>
                      <p className="text-sm text-muted-foreground">{report.position}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No direct reports</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}