import { ImageResponse } from 'next/og';
import dbConnect from '@/lib/db';
import Category from '@/models/Category';

export const runtime = 'nodejs';

export const alt = 'TechDaily Category';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let categoryName = slug.charAt(0).toUpperCase() + slug.slice(1).replace('-', ' ');

  try {
    await dbConnect();
    const category = (await Category.findOne({ slug }).lean()) as { name: string } | null;
    if (category?.name) {
      categoryName = category.name;
    }
  } catch (error) {
    console.error('Failed to fetch category for og-image:', error);
  }

  return new ImageResponse(
    <div
      style={{
        background: '#09090b',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '80px 120px',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '40px' }}>
        <div
          style={{
            width: '48px',
            height: '48px',
            border: '6px solid #e11d48',
            borderRadius: '8px',
            boxShadow: '0 4px 20px rgba(225, 29, 72, 0.4)',
          }}
        />
        <h2
          style={{
            fontSize: '48px',
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '-1px',
            color: '#ffffff',
            margin: 0,
            lineHeight: 1,
          }}
        >
          TechDaily
        </h2>
      </div>

      <h1
        style={{
          fontSize: '84px',
          fontWeight: 700,
          color: '#f4f4f5',
          lineHeight: 1.1,
          marginBottom: '32px',
          letterSpacing: '-2px',
        }}
      >
        {categoryName}
      </h1>

      <p
        style={{
          fontSize: '36px',
          fontWeight: 400,
          color: '#a1a1aa',
          lineHeight: 1.4,
          maxWidth: '900px',
          margin: 0,
        }}
      >
        Latest reports and authority on {categoryName} innovation and policy.
      </p>

      <div style={{ display: 'flex', marginTop: 'auto', paddingTop: '40px' }}>
        <p
          style={{
            fontSize: '24px',
            fontWeight: 700,
            color: '#e11d48',
            textTransform: 'uppercase',
            letterSpacing: '4px',
            margin: 0,
          }}
        >
          techdaily-devrgd.vercel.app/categories/{slug}
        </p>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
