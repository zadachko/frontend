import React from 'react';
import { Button } from '@/components/ui/button';
import NavbarMenu from './NavbarMenu';
import { UserCircle } from 'lucide-react';

const Navbar = () => {
    return (
        <div className='flex items-center w-screen h-16 fixed top-0 left-0 right-0 z-50 bg-[#6F58C9]/100 backdrop-blur-sm border-b border-[#6F58C9]/20'>
            <div className='flex items-center px-10 justify-between w-full'>
                <div className='flex'>
                    <h1 className='text-white text-2xl font-bold'>Задачко</h1>
                </div>
                <div>
                    <ul className='flex gap-8'>
                        <NavbarMenu menuText="Начало" slug="" />
                        <NavbarMenu menuText="За нас" slug="about" />
                        <NavbarMenu menuText="FAQ" slug="faq" />
                        <NavbarMenu menuText="Новини" slug="news" />
                        <NavbarMenu menuText="Абонаменти" slug="subscriptions" />
                        <NavbarMenu menuText="Контакти" slug="contacts" />
                    </ul>
                </div>
                <div>
                    <Button variant="secondary">
                        <UserCircle />
                        Акаунт
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Navbar;