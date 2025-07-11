"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import NavbarMobileMenuLink from "./NavbarMobileMenuLink";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useIsMobile } from "@/hooks/isMobile";
import { Menu } from "lucide-react";

const navItems = [
    { name: "Начало", href: "/" },
    { name: "За нас", href: "/about" },
    { name: "Функции", href: "/features" },
    { name: "Цени", href: "/pricing" },
    { name: "Контакти", href: "/contact" },
]

const Navbar = () => {
    const pathname = usePathname();
    const [isNavbarOpen, setIsNavbarOpen] = useState<boolean>(false);
    const isMobile = useIsMobile();

    const handleHamburgerClick = () => {
        setIsNavbarOpen((prev) => !prev);
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white">
            <div className="flex justify-center">
                <div className="container flex h-16 items-center justify-between px-4 md:px-6">
                    <div className="flex items-center gap-2">
                        <Link href="/" className="text-2xl font-bold text-primary-500">
                            Задачко
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex md:gap-6">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "text-md font-medium transition-colors hover:text-primary",
                                    pathname === item.href ? "text-primary" : "text-gray-700",
                                )}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Auth Buttons */}
                    <div className="hidden md:flex md:items-center md:gap-2">
                        <Button variant="secondary" className="bg-primary text-primary-foreground hover:bg-primary/80">
                            Вход
                        </Button>
                        <Button className="bg-primary hover:bg-primary/80">Регистрация</Button>
                    </div>

                    {/* Mobile Menu Button - Always rendered but only visible on mobile */}
                    <div
                        onClick={handleHamburgerClick}
                        className={cn(
                            "md:hidden cursor-pointer",
                            !isMobile && "opacity-0 pointer-events-none"
                        )}
                    >
                        <Menu />
                    </div>
                </div>
            </div>

            {/* Mobile Menu - Always rendered but only visible on mobile */}
            <div className={cn(
                "md:hidden fixed w-screen bg-white overflow-hidden duration-300 px-5",
                isMobile && isNavbarOpen ? 'max-h-[800px]' : 'max-h-0',
                !isMobile && 'hidden'
            )}>
                <div className="flex flex-col">
                    {navItems.map((e, index) => (
                        <NavbarMobileMenuLink key={index} href={e.href} name={e.name} />
                    ))}
                </div>
            </div>
        </header>
    )
}

export default Navbar
