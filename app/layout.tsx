import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ASCII Medical Visualizer',
  description: 'A full-screen ASCII particle visualizer for medical office',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
