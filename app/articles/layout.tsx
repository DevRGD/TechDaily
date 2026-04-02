import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Latest Technical Reports',
  description:
    'Our continuous dispatch from the frontiers of technology, policy, and human progress. Updated every hour by our global editorial board.',
  openGraph: {
    title: 'Live Technical Feed | TechDaily',
    description: 'Real time authority on AI, innovation, and digital policy.',
    url: 'https://techdaily-devrgd.vercel.app/articles',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Live Technical Feed | TechDaily',
    description: 'Real time authority on AI, innovation, and digital policy.',
  },
};

export default function ArticlesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
