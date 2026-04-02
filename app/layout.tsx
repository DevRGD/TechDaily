import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Newsreader } from 'next/font/google';
import './globals.css';
import ThemeProvider from '@/components/providers/ThemeProvider';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { Analytics } from '@vercel/analytics/next';

const sans = Plus_Jakarta_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
});

const serif = Newsreader({
  variable: '--font-serif',
  subsets: ['latin'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: {
    default: 'TechDaily | Premium Technology News',
    template: '%s | TechDaily',
  },
  description: 'Reporting for the digital age. Authority on AI, policy, and innovation.',
  keywords: ['tech news', 'AI', 'innovation', 'policy', 'startups'],
  authors: [{ name: 'DevRGD' }],
  metadataBase: new URL('https://techdaily-devrgd.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://techdaily-devrgd.vercel.app',
    siteName: 'TechDaily',
    title: 'TechDaily | Premium Technology News',
    description: 'Reporting for the digital age. Authority on AI, policy, and innovation.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TechDaily | Premium Technology News',
    description: 'Reporting for the digital age. Authority on AI, policy, and innovation.',
    creator: '@techdaily',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
        />
      </head>
      <body className={`${sans.variable} ${serif.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Navbar />
          {children}
          <Footer />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
