"use client"

import { useState } from "react"
import Link from "next/link"
import { Grid3X3, Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { AnimatePresence, motion } from "framer-motion"

const navItems = [
    { name: "Начало", href: "/" },
    { name: "За нас", href: "/about" },
    { name: "Функции", href: "/features" },
    { name: "Цени", href: "/pricing" },
    { name: "Контакти", href: "/contact" },
]

const Navbar = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [activeLink, setActiveLink] = useState<string | null>(null);


    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white">
            <div className="flex justify-center">
                <div className="container flex h-16 items-center justify-between px-4 md:px-6">
                    <div className="flex items-center gap-2">
                        <Link href="/" className="text-xl font-semibold text-primary">
                            Zadachko
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

                    {/* Mobile Menu */}
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[250px] sm:w-[300px]">
                            <div className="flex flex-col gap-6 py-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Grid3X3 className="h-5 w-5 text-primary" />
                                        <span className="text-lg font-semibold text-primary">Задачко</span>
                                    </div>
                                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                                        <X className="h-5 w-5" />
                                        <span className="sr-only">Close menu</span>
                                    </Button>
                                </div>
                                <nav className="flex flex-col gap-4">
                                    {navItems.map((link, index) => (
                                        <motion.div
                                            key={link.href}
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 + 0.2 }}
                                            onHoverStart={() => setActiveLink(link.href)}
                                            onHoverEnd={() => setActiveLink(null)}
                                            className="relative"
                                        >
                                            <Link href={link.href} className="text-sm font-medium transition-colors hover:text-primary-500 py-1 px-1">
                                                {link.name}
                                            </Link>
                                            <AnimatePresence>
                                                {activeLink === link.href && (
                                                    <motion.div
                                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500 rounded-full"
                                                        initial={{ scaleX: 0, opacity: 0 }}
                                                        animate={{ scaleX: 1, opacity: 1 }}
                                                        exit={{ scaleX: 0, opacity: 0 }}
                                                        transition={{ duration: 0.2 }}
                                                    />
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    ))}
                                </nav>
                                <div className="flex flex-col gap-2 mt-4">
                                    <Button variant="secondary" className="w-full bg-primary text-primary-foreground hover:bg-primary/80">
                                        Вход
                                    </Button>
                                    <Button className="w-full bg-primary hover:bg-primary/80">Регистрация</Button>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}

export default Navbar
