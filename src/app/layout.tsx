'use client';

import Lenis from 'lenis';

import { Montserrat } from 'next/font/google';
import { useEffect, useState } from 'react';

const montserrat = Montserrat({ subsets: ['latin'] });

import '@/shared/styles/globals.scss';
import Footer from '@/widgets/footer/footer';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [dimension, setDimension] = useState<any>(null);

  useEffect(() => {
    const lenis = new Lenis();

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', resize);
    resize();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);
  return (
    <html lang="ru">
      <body className={montserrat.className}>
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
