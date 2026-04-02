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
        background: 'linear-gradient(to bottom right, #1e293b, #101822)',
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
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\'%3E%3Ccircle cx=\'2\' cy=\'2\' r=\'1.5\' fill=\'rgba(255, 255, 255, 0.07)\'/%3E%3C/svg%3E")',
        }}
      />
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '40px' }}>
        <div
          style={{
            width: '48px',
            height: '48px',
            border: '6px solid #0f58bd',
            borderRadius: '8px',
            boxShadow: '0 4px 20px rgba(15, 88, 189, 0.4)',
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
          color: '#f6f7f8',
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
          color: '#94a3b8',
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
            color: '#0f58bd',
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
