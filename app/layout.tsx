import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Congo Food Process',
  description: 'Transformation agroalimentaire au Congo — arachides, snacks, beurre d\'arachide',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
