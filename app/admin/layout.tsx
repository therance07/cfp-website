import '@/app/globals.css';
import type { Metadata } from 'next';
import { Montserrat, Nunito_Sans, Barlow_Condensed } from 'next/font/google';
import AdminShell from '@/components/admin/AdminShell';

const montserrat     = Montserrat({ subsets: ['latin'], variable: '--font-montserrat', weight: ['400','600','700','800','900'], display: 'swap' });
const nunitoSans     = Nunito_Sans({ subsets: ['latin'], variable: '--font-nunito', weight: ['300','400','600','700'], display: 'swap' });
const barlowCondensed = Barlow_Condensed({ subsets: ['latin'], variable: '--font-barlow', weight: ['400','500','600','700'], display: 'swap' });

export const metadata: Metadata = {
  title: { default: 'Admin — Congo Food Process', template: '%s | CFP Admin' },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${montserrat.variable} ${nunitoSans.variable} ${barlowCondensed.variable}`}
    >
      <body className="font-body antialiased bg-[var(--color-gray-light)]">
        <AdminShell>{children}</AdminShell>
      </body>
    </html>
  );
}
