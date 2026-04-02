import { ImageResponse } from 'next/og';
import dbConnect from '@/lib/db';
import Article from '@/models/Article';

export const runtime = 'nodejs';

export const alt = 'TechDaily Article Image';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let imageUrl = '';

  try {
    await dbConnect();
    const article = (await Article.findOne({ slug }).lean()) as { image: string } | null;
    if (article && article.image) {
      imageUrl = article.image.startsWith('http')
        ? article.image
        : `https://techdaily-devrgd.vercel.app${article.image}`;
    }
  } catch (error) {
    console.error('Failed to fetch article for og-image:', error);
  }

  if (!imageUrl) {
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
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Ccircle cx='2' cy='2' r='1.5' fill='rgba(255, 255, 255, 0.07)'/%3E%3C/svg%3E\")",
          }}
        />
        <h2 style={{ fontSize: '64px', fontWeight: 900, color: '#ffffff', textTransform: 'uppercase' }}>
          TechDaily | Premium Technology News
        </h2>
      </div>,
      { ...size },
    );
  }

  return new ImageResponse(
    <div style={{ display: 'flex', width: '100%', height: '100%', background: '#101822' }}>
      <img
        src={imageUrl}
        alt={alt}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
    </div>,
    {
      ...size,
    },
  );
}
