import { Inter } from 'next/font/google';
import ThemeRegistry from '@/theme/ThemeRegistry';
import AppBar from '@/components/AppBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Next.js Template',
  description: 'A modern Next.js template with Material UI',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <link rel='icon' href='/favicon.ico' type='image/x-icon'/>
      </head>
      <body className={inter.className}>
        <ThemeRegistry>
          <AppBar />
          <main style={{ padding: '24px' }}>
            {children}
          </main>
        </ThemeRegistry>
      </body>
    </html>
  );
}
