import React from 'react';
import Link from 'next/link';

const NavbarMobileMenuLink = ({ name, href }: { name: string; href: string }) => {
    return (
        <Link className="py-5" href={href}>
            {name}
        </Link>
    );
};

export default NavbarMobileMenuLink;
