import { Employee } from '@/lib/types';
import { organizationData } from '@/lib/mock-data';
import EmployeeDetails from '@/components/EmployeeDetails';

// Generate static params for all possible employee IDs
export async function generateStaticParams() {
  const getAllEmployeeIds = (employee: Employee): string[] => {
    let ids = [employee.id];
    if (employee.children) {
      employee.children.forEach(child => {
        ids = [...ids, ...getAllEmployeeIds(child)];
      });
    }
    return ids;
  };

  const ids = getAllEmployeeIds(organizationData);
  return ids.map(id => ({ id }));
}

export default function EmployeePage({ params }: { params: { id: string } }) {
  return <EmployeeDetails id={params.id} />;
}