"use client";

import { useState } from 'react';
import { Employee } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronDown, ChevronUp, Plus, User } from 'lucide-react';

interface EmployeeCardProps {
  employee: Employee;
  onToggleExpand: (employeeId: string) => void;
  onAddSubordinate: (employeeId: string) => void;
  level: number;
}

export function EmployeeCard({ employee, onToggleExpand, onAddSubordinate, level }: EmployeeCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const hasChildren = employee.children && employee.children.length > 0;
  
  // Calculate width based on level
  const widthClass = level === 0 ? 'w-72' : 'w-64';
  
  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };

  return (
    <Card 
      className={`${widthClass} transition-all duration-300 ease-in-out transform ${isHovered ? 'scale-[1.02] shadow-md' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="py-4 pb-2">
        <Button 
          variant="ghost" 
          className="p-0 h-auto w-full flex justify-between items-center mb-2 text-left"
          onClick={() => window.location.href=`/employee/${employee.id}`} // Would link to profile page
        >
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={employee.imageUrl} />
              <AvatarFallback>{getInitials(employee.name)}</AvatarFallback>
            </Avatar>
            <CardTitle className="text-base font-medium">{employee.name}</CardTitle>
          </div>
          <User size={16} className="text-muted-foreground" />
        </Button>
      </CardHeader>
      <CardContent className="pt-0 pb-2">
        <div className="space-y-1">
          <p className="text-sm font-medium">{employee.position}</p>
          <p className="text-xs text-muted-foreground">{employee.department}</p>
          <p className="text-xs truncate">{employee.email}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-0 pb-3">
        {hasChildren ? (
          <Button 
            variant="outline" 
            size="sm"
            className="text-xs h-8"
            onClick={() => onToggleExpand(employee.id)}
          >
            {employee.expanded ? (
              <>
                <ChevronUp className="h-3.5 w-3.5 mr-1" />
                Collapse
              </>
            ) : (
              <>
                <ChevronDown className="h-3.5 w-3.5 mr-1" />
                Expand
              </>
            )}
          </Button>
        ) : (
          <Button 
            variant="outline" 
            size="sm"
            className="text-xs h-8 opacity-0"
            disabled
          >
            No Reports
          </Button>
        )}
        <Button
          variant="secondary"
          size="sm"
          className="text-xs h-8"
          onClick={() => onAddSubordinate(employee.id)}
        >
          <Plus className="h-3.5 w-3.5 mr-1" /> Add
        </Button>
      </CardFooter>
    </Card>
  );
}