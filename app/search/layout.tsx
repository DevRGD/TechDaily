import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Search Reports',
  description: 'Search our technical reports and archival data.',
};

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
