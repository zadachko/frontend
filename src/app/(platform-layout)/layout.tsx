import type React from 'react';
import PlatformNavbar from '@/components/PlatformNavbar/PlatformNavbar';
import Providers from '@/app/providers';
export default function PlatformLayout({ children }: { children: React.ReactNode }) {
    return (
        <Providers>
            <div className="flex flex-col h-screen">
                <PlatformNavbar />
                <div className="flex flex-1 overflow-auto">{children}</div>
            </div>
        </Providers>
    );
}
