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
        <link rel="icon" href="/Tinkering.ico" sizes="any" />
      </head>
      <body className="font-body font-bold antialiased">{children}</body>
    </html>
  );
}
