import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Get In Touch',
  description:
    'Have a tip, a question, or a business inquiry? Our team is ready to listen. Reach out to the TechDaily editorial board.',
  openGraph: {
    title: 'Contact | TechDaily',
    description: 'Connect with the digital authority on AI, policy, and innovation.',
    url: 'https://techdaily-devrgd.vercel.app/contact',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact | TechDaily',
    description: 'Connect with the digital authority on AI, policy, and innovation.',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
