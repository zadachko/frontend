import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Zadachko.com',
    description: 'Подготви се за НВО 7. клас по математика',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="bg">
            <body className={inter.className}>
                {children}
            </body>
        </html>
    );
}
