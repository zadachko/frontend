'use client';

import React from 'react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavbarMenu = ({ menuText, slug }: { menuText: string, slug: string }) => {
    const pathname = usePathname();
    const isActive = pathname === `/${slug}`;

    return (
        <li>
            <Link href={`/${slug}`}>
                <div className={`text-white text-lg hover:text-gray-200 transition-colors duration-200 relative group ${isActive ? 'font-semibold' : ''}`}>
                    {menuText}
                    <span className={`absolute bottom-0 left-0 h-0.5 bg-white transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'} rounded-2xl`}></span>
                </div>
            </Link>
        </li>
    )
}

export default NavbarMenu;