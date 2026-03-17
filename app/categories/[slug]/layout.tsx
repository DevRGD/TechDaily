import { Metadata } from 'next';
import dbConnect from '@/lib/db';
import Category from '@/models/Category';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  await dbConnect();
  
  const category = (await Category.findOne({ slug }).lean()) as { name: string } | null;
  const title = category?.name || slug.charAt(0).toUpperCase() + slug.slice(1).replace('-', ' ');
  
  return {
    title: title,
    description: `A comprehensive deep-dive into the technical architecture, regulatory shifts, and human impact within the ${title} landscape.`,
    openGraph: {
      title: `${title} | TechDaily`,
      description: `Latest reports and authority on ${title} innovation and policy.`,
      url: `https://techdaily.com/categories/${slug}`,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: `${title} | TechDaily`,
      description: `Latest reports and authority on ${title} innovation and policy.`,
    }
  };
}

export default async function CategoryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
