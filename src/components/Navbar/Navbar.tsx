'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import NavbarMenu from './NavbarMenu';
import { UserCircle, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(prev => !prev);
    };

    return (
        <div className='flex items-center w-screen h-16 fixed top-0 left-0 right-0 z-50 bg-[#6F58C9]/100 backdrop-blur-sm border-b border-[#6F58C9]/20'>
            <div className='flex items-center px-4 md:px-10 justify-between w-full'>
                <div className='flex'>
                    <h1 className='text-white text-2xl font-bold'>Задачко</h1>
                </div>

                {/* Desktop Navigation */}
                <div className='hidden md:block'>
                    <ul className='flex gap-8'>
                        <NavbarMenu menuText="Начало" slug="" />
                        <NavbarMenu menuText="За нас" slug="about" />
                        <NavbarMenu menuText="FAQ" slug="faq" />
                        <NavbarMenu menuText="Новини" slug="news" />
                        <NavbarMenu menuText="Абонаменти" slug="subscriptions" />
                        <NavbarMenu menuText="Контакти" slug="contacts" />
                    </ul>
                </div>

                {/* Desktop Account Button */}
                <div className='hidden md:block'>
                    <Button variant="secondary">
                        <UserCircle className="mr-2" />
                        Акаунт
                    </Button>
                </div>

                {/* Mobile Menu and Account Buttons */}
                <div className='md:hidden flex items-center gap-1'>
                    <Button variant="ghost" className="text-white p-2">
                        <UserCircle size={20} />
                    </Button>
                    <Button
                        variant="ghost"
                        className="text-white p-2"
                        onClick={toggleMobileMenu}
                    >
                        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className='md:hidden absolute top-16 left-0 right-0 bg-[#6F58C9] border-b border-[#6F58C9]/20 shadow-lg'
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ul className='flex flex-col pt-4'>
                            <div className='px-4 py-3 border-b border-white/10'>
                                <NavbarMenu menuText="Начало" slug="" />
                            </div>
                            <div className='px-4 py-3 border-b border-white/10'>
                                <NavbarMenu menuText="За нас" slug="about" />
                            </div>
                            <div className='px-4 py-3 border-b border-white/10'>
                                <NavbarMenu menuText="FAQ" slug="faq" />
                            </div>
                            <div className='px-4 py-3 border-b border-white/10'>
                                <NavbarMenu menuText="Новини" slug="news" />
                            </div>
                            <div className='px-4 py-3 border-b border-white/10'>
                                <NavbarMenu menuText="Абонаменти" slug="subscriptions" />
                            </div>
                            <div className='px-4 py-3'>
                                <NavbarMenu menuText="Контакти" slug="contacts" />
                            </div>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Navbar;