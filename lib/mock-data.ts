import { Employee } from './types';

export const organizationData: Employee = {
  id: '1',
  name: 'John Doe',
  position: 'CEO',
  department: 'Executive',
  email: 'john.doe@company.com',
  imageUrl: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  expanded: true,
  children: [
    {
      id: '2',
      name: 'Sarah Johnson',
      position: 'HR Director',
      department: 'Human Resources',
      email: 'sarah.johnson@company.com',
      imageUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      expanded: false,
      children: [
        {
          id: '6',
          name: 'Mike Wilson',
          position: 'HR Manager',
          department: 'Human Resources',
          email: 'mike.wilson@company.com',
          imageUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          expanded: false,
          children: [
            {
              id: '9',
              name: 'Emma Davis',
              position: 'HR Specialist',
              department: 'Human Resources',
              email: 'emma.davis@company.com',
              imageUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            }
          ]
        }
      ]
    },
    {
      id: '3',
      name: 'Robert Smith',
      position: 'Head of Engineering',
      department: 'Engineering',
      email: 'robert.smith@company.com',
      imageUrl: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      expanded: false,
      children: [
        {
          id: '7',
          name: 'Jennifer Lee',
          position: 'Team Lead - Frontend',
          department: 'Engineering',
          email: 'jennifer.lee@company.com',
          imageUrl: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          expanded: false,
          children: [
            {
              id: '10',
              name: 'Alex Turner',
              position: 'Frontend Developer',
              department: 'Engineering',
              email: 'alex.turner@company.com',
              imageUrl: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            }
          ]
        }
      ]
    },
    {
      id: '4',
      name: 'Emily Brown',
      position: 'Head of Marketing',
      department: 'Marketing',
      email: 'emily.brown@company.com',
      imageUrl: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      expanded: false,
      children: [
        {
          id: '8',
          name: 'David Garcia',
          position: 'Team Lead - Content',
          department: 'Marketing',
          email: 'david.garcia@company.com',
          imageUrl: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          expanded: false,
          children: [
            {
              id: '11',
              name: 'Sophia Martinez',
              position: 'Content Creator',
              department: 'Marketing',
              email: 'sophia.martinez@company.com',
              imageUrl: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            }
          ]
        }
      ]
    },
    {
      id: '5',
      name: 'Michael Johnson',
      position: 'Head of Finance',
      department: 'Finance',
      email: 'michael.johnson@company.com',
      imageUrl: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      expanded: false,
      children: []
    },
  ]
};