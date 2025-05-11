"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogTitle } from './ui/dialog';
import { X } from 'lucide-react';
import { Employee } from '@/lib/types';

interface CreateChartProps {
  onChartCreated?: (chart: Employee) => void;
}

export function CreateChart({ onChartCreated }: CreateChartProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState<Omit<Employee, 'id' | 'children'>>({
    name: '',
    position: '',
    department: '',
    email: '',
    imageUrl: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newChart: Employee = {
      id: Math.random().toString(36).substring(2, 11),
      ...newEmployee,
      children: [],
      expanded: true,
    };

    localStorage.setItem('organizationChart', JSON.stringify(newChart));
    if (onChartCreated) {
      onChartCreated(newChart);
    }
    setIsOpen(false);
  };

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setIsOpen(true)}
        className="ml-4"
      >
        Create New Chart
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogTitle>Create New Organization Chart</DialogTitle>
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">CEO Name</Label>
                <Input
                  id="name"
                  value={newEmployee.name}
                  onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  value={newEmployee.position}
                  onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  value={newEmployee.department}
                  onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newEmployee.email}
                  onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="imageUrl">Profile Image URL</Label>
                <Input
                  id="imageUrl"
                  type="url"
                  value={newEmployee.imageUrl}
                  onChange={(e) => setNewEmployee({ ...newEmployee, imageUrl: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className="flex justify-end gap-4 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create Chart</Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}