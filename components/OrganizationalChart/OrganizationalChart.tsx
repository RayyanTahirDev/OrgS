"use client";

import { useState, useEffect } from 'react';
import { Employee } from '@/lib/types';
import { EmployeeCard } from './EmployeeCard';
import { AddEmployeeModal } from './AddEmployeeModal';
import { Button } from '@/components/ui/button';
import { FolderTree, Users, RotateCcw } from 'lucide-react';
import { CreateChart } from '@/components/CreateChart';
import { ChatBot } from '@/components/ChatBot';
import { organizationData } from '@/lib/mock-data';

interface OrganizationalChartProps {
  data: Employee;
}

export function OrganizationalChart({ data }: OrganizationalChartProps) {
  const [orgData, setOrgData] = useState<Employee>(data);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedParentId, setSelectedParentId] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const savedChart = localStorage.getItem('organizationChart');
    if (savedChart) {
      setOrgData(JSON.parse(savedChart));
    }
  }, []);

  const generateId = () => {
    return Math.random().toString(36).substring(2, 11);
  };

  const handleToggleExpand = (employeeId: string) => {
    const updateEmployeeExpanded = (employee: Employee): Employee => {
      if (employee.id === employeeId) {
        return { ...employee, expanded: !employee.expanded };
      }

      if (employee.children) {
        return {
          ...employee,
          children: employee.children.map(updateEmployeeExpanded)
        };
      }

      return employee;
    };

    setOrgData(updateEmployeeExpanded(orgData));
  };

  const toggleCollapseAll = () => {
    const updateAllExpanded = (employee: Employee, expanded: boolean): Employee => {
      return {
        ...employee,
        expanded,
        children: employee.children 
          ? employee.children.map(child => updateAllExpanded(child, expanded))
          : []
      };
    };
    
    setIsCollapsed(!isCollapsed);
    setOrgData(updateAllExpanded(orgData, !isCollapsed));
  };

  const handleAddSubordinate = (employeeId: string) => {
    setSelectedParentId(employeeId);
    setModalOpen(true);
  };

  const handleAddEmployee = (parentId: string, newEmployee: Omit<Employee, 'id'>) => {
    const newEmployeeWithId: Employee = {
      ...newEmployee,
      id: generateId()
    };

    const updateEmployeeChildren = (employee: Employee): Employee => {
      if (employee.id === parentId) {
        const updatedChildren = employee.children ? [...employee.children, newEmployeeWithId] : [newEmployeeWithId];
        return { 
          ...employee, 
          children: updatedChildren,
          expanded: true,
        };
      }

      if (employee.children) {
        return {
          ...employee,
          children: employee.children.map(updateEmployeeChildren)
        };
      }

      return employee;
    };

    const updatedData = updateEmployeeChildren(orgData);
    setOrgData(updatedData);
    localStorage.setItem('organizationChart', JSON.stringify(updatedData));
  };

  const resetToDemo = () => {
    localStorage.removeItem('organizationChart');
    setOrgData(organizationData);
    setIsCollapsed(false);
  };

  const handleChartCreated = (newChart: Employee) => {
    setOrgData(newChart);
  };

  const renderOrganizationalChart = (employee: Employee, level = 0) => {
    return (
      <div 
        key={employee.id}
        className={`
          flex flex-col items-center 
          ${level > 0 ? 'mt-8 relative' : ''}
        `}
      >
        <EmployeeCard 
          employee={employee} 
          onToggleExpand={handleToggleExpand}
          onAddSubordinate={handleAddSubordinate}
          level={level}
        />
        
        {employee.children && employee.children.length > 0 && employee.expanded && (
          <div className="relative flex flex-col items-center">
            <div className="w-0.5 h-8 bg-border/70" />
            
            <div className={`
              flex flex-wrap justify-center gap-8 relative
              ${employee.children.length > 1 ? 'before:content-[""] before:absolute before:h-0.5 before:bg-border/70 before:top-0 before:left-[calc(50%-50%)] before:right-[calc(50%-50%)]' : ''}
            `}>
              {employee.children.map(child => (
                <div key={child.id} className="flex flex-col items-center">
                  <div className="w-0.5 h-5 bg-border/70" />
                  {renderOrganizationalChart(child, level + 1)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-[70%]">
      <div className="w-full max-w-7xl my-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Organizational Chart</h1>
        <div className="flex items-center gap-2">
          <Button 
            onClick={toggleCollapseAll}
            variant="outline"
            className="flex items-center gap-2"
          >
            {isCollapsed ? (
              <>
                <FolderTree className="h-4 w-4" /> 
                Expand All
              </>
            ) : (
              <>
                <Users className="h-4 w-4" /> 
                Collapse All
              </>
            )}
          </Button>
          <Button
            onClick={resetToDemo}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Reset to Demo
          </Button>
          <CreateChart onChartCreated={handleChartCreated} />
        </div>
      </div>
      
      <div className="w-full overflow-x-auto py-8 px-4">
        <div className="min-w-max flex justify-center">
          {renderOrganizationalChart(orgData)}
        </div>
      </div>
      
      <AddEmployeeModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onAddEmployee={handleAddEmployee}
        parentId={selectedParentId}
      />

      <ChatBot />
    </div>
  );
}