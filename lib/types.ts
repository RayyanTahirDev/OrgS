export interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  email: string;
  imageUrl?: string;
  children?: Employee[];
  expanded?: boolean;
}