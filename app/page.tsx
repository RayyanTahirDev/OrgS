import { OrganizationalChart } from '@/components/OrganizationalChart';
import { organizationData } from '@/lib/mock-data';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <OrganizationalChart data={organizationData} />
      </div>
    </main>
  );
}