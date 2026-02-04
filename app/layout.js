import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'factory-blog',
  description: 'A minimal, Vercel-friendly Next.js blog.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main>
          <header>
            <h1>factory-blog</h1>
            <p>Minimal Next.js blog powered by Markdown.</p>
            <nav>
              <Link href="/">Home</Link>
              <Link href="/tags">Tags</Link>
            </nav>
          </header>
          {children}
          <footer>Built with Next.js App Router and Markdown posts.</footer>
        </main>
      </body>
    </html>
  );
}
