'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
    Home,
    BookOpen,
    BarChart2,
    Settings,
    UserCircle,
    LogOut
} from 'lucide-react'

const Sidebar = () => {
    const pathname = usePathname()

    const navigation = [
        { name: 'Начало', href: '/dashboard', icon: Home },
        { name: 'Задачи', href: '/tasks', icon: BookOpen },
        { name: 'Статистика', href: '/stats', icon: BarChart2 },
        { name: 'Настройки', href: '/settings', icon: Settings },
    ]

    return (
        <div className="flex flex-col h-screen w-64 bg-[#6F58C9] text-white">
            {/* Logo Section */}
            <div className="p-6 border-b border-white/10">
                <h1 className="text-2xl font-bold">Задачко</h1>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 p-4 space-y-2">
                {navigation.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 ${isActive
                                ? 'bg-white/10 text-white'
                                : 'text-white/70 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            <span>{item.name}</span>
                        </Link>
                    )
                })}
            </nav>

            {/* Account Section */}
            <div className="p-4 border-t border-white/10">
                <div className="flex items-center gap-3 px-4 py-2">
                    <UserCircle className="w-8 h-8" />
                    <div className="flex-1">
                        <p className="text-sm font-medium">Иван Иванов</p>
                        <p className="text-xs text-white/70">ivan@example.com</p>
                    </div>
                </div>
                <Button
                    variant="ghost"
                    className="w-full mt-2 text-white hover:bg-white/10 hover:text-white"
                >
                    <LogOut className="w-4 h-4 mr-2" />
                    Изход
                </Button>
            </div>
        </div>
    )
}

export default Sidebar