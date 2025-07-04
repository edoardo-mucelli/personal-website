import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Edoardo Mucelli',
  description: 'Personal website of Interaction designer Edoardo Mucelli',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/Tinkering.ico" sizes="any" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body font-light antialiased">{children}</body>
    </html>
  );
}
