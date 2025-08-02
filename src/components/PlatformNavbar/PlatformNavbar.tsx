"use client"

import { useState } from "react"
import Link from "next/link"
import {
    Bell,
    User,
    ChevronDown,
    Calculator,
    Ruler,
    Hash,
    BarChart3,
    FileText,
    Sigma,
    Flame,
    Calendar,
    Trophy,
    Target,
    Settings,
    CreditCard,
    LogOut,
    Star,
    Check,
    Home,
    BookOpen,
    Award,
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

const PlatformNavbar = () => {
    const [notificationCount] = useState(3) // Mock notification count
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [mobileStreakOpen, setMobileStreakOpen] = useState(false)
    const [mobileNotificationsOpen, setMobileNotificationsOpen] = useState(false)
    const [mobileAccountOpen, setMobileAccountOpen] = useState(false)
    const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false)

    // Mock user data - same as sidebar
    const userData = {
        name: "Антон Янков",
        email: "anton@example.com",
        level: 111,
        currentXP: 46214,
        xpToNextLevel: 8795,
        avatar: "/avatar.png",
    }

    // Mock streak data
    const streakData = {
        current: 8,
        longest: 15,
        thisWeek: [true, true, false, true, true, true, true], // Mon-Sun
        thisMonth: 22, // days active this month
        total: 156, // total days active
    }

    // Mock daily missions
    const dailyMissions = [
        {
            id: 1,
            title: "Реши 5 задачи по математика",
            completed: true,
            progress: 5,
            total: 5,
        },
        {
            id: 2,
            title: "Постигни 80% точност",
            completed: false,
            progress: 65,
            total: 80,
        },
    ]

    const problemCategories = [
        {
            name: "Алгебра",
            icon: Calculator,
            problems: 324,
            bgColor: "bg-purple-100",
            iconColor: "text-purple-600",
            href: "/platform/categories/algebra",
        },
        {
            name: "Геометрия",
            icon: Ruler,
            problems: 267,
            bgColor: "bg-blue-100",
            iconColor: "text-blue-600",
            href: "/platform/categories/geometry",
        },
        {
            name: "Дроби",
            icon: Hash,
            problems: 198,
            bgColor: "bg-green-100",
            iconColor: "text-green-600",
            href: "/platform/categories/fractions",
        },
        {
            name: "Статистика",
            icon: BarChart3,
            problems: 145,
            bgColor: "bg-orange-100",
            iconColor: "text-orange-600",
            href: "/platform/categories/statistics",
        },
        {
            name: "Текстови задачи",
            icon: FileText,
            problems: 289,
            bgColor: "bg-pink-100",
            iconColor: "text-pink-600",
            href: "/platform/categories/word-problems",
        },
        {
            name: "Пре-алгебра",
            icon: Sigma,
            problems: 176,
            bgColor: "bg-teal-100",
            iconColor: "text-teal-600",
            href: "/platform/categories/pre-algebra",
        },
    ]

    const weekDays = ["П", "В", "С", "Ч", "П", "С", "Н"]
    const xpProgress = (userData.currentXP / (userData.currentXP + userData.xpToNextLevel)) * 100

    const mainNavItems = [
        {
            name: "Начало",
            href: "/platform",
            icon: Home,
        },
        {
            name: "Категории",
            href: "/platform/categories",
            icon: BookOpen,
        },
        {
            name: "Изпит",
            href: "/platform/exam",
            icon: Award,
        },
    ]

    return (
        <nav className="bg-gradient-to-r from-[#755bc5] to-[#8b6fd1] border-b border-[#6b4fb8] px-4 sm:px-6 py-3 sm:py-4 shadow-lg">
            <div className="flex items-center justify-between">
                {/* Left side - Logo and Desktop Navigation */}
                <div className="flex items-center gap-4 sm:gap-8">
                    {/* Logo */}
                    <Link
                        href="/platform"
                        className="text-xl sm:text-2xl font-bold text-white hover:text-[#f0eeff] transition-colors"
                    >
                        Задачко
                    </Link>

                    {/* Desktop Categories Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger className="hidden md:flex items-center gap-2 px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors backdrop-blur-sm">
                            <span className="font-medium">Категории</span>
                            <ChevronDown className="w-4 h-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-80 p-2 bg-white border border-[#755bc5]/20 shadow-xl" align="start">
                            <div className="grid grid-cols-1 gap-1">
                                {problemCategories.map((category) => (
                                    <DropdownMenuItem key={category.name} asChild>
                                        <Link
                                            href={category.href}
                                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#f0eeff] cursor-pointer transition-colors"
                                        >
                                            <div className={`p-2 rounded-lg ${category.bgColor}`}>
                                                <category.icon className={`w-5 h-5 ${category.iconColor}`} />
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-medium text-gray-900">{category.name}</div>
                                                <div className="text-sm text-gray-500">{category.problems} задачи</div>
                                            </div>
                                        </Link>
                                    </DropdownMenuItem>
                                ))}
                            </div>
                            <div className="border-t border-[#755bc5]/20 mt-2 pt-2">
                                <DropdownMenuItem asChild>
                                    <Link
                                        href="/platform/categories"
                                        className="flex items-center justify-center p-2 text-[#755bc5] hover:bg-[#f0eeff] rounded-lg font-medium cursor-pointer transition-colors"
                                    >
                                        Виж всички категории
                                    </Link>
                                </DropdownMenuItem>
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Mobile Categories Button */}
                    <Dialog open={mobileCategoriesOpen} onOpenChange={setMobileCategoriesOpen}>
                        <DialogTrigger className="md:hidden flex items-center gap-2 px-3 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors backdrop-blur-sm">
                            <span className="font-medium text-sm">Категории</span>
                            <ChevronDown className="w-4 h-4" />
                        </DialogTrigger>
                        <DialogContent className="w-full h-full max-w-none max-h-none m-0 p-0 bg-white">
                            <DialogHeader className="p-4 bg-gradient-to-r from-[#755bc5] to-[#8b6fd1] text-white">
                                <DialogTitle className="text-white text-left">Категории</DialogTitle>
                            </DialogHeader>
                            <div className="flex-1 overflow-y-auto p-4">
                                <div className="space-y-2">
                                    {problemCategories.map((category) => (
                                        <Link
                                            key={category.name}
                                            href={category.href}
                                            className="flex items-center gap-3 p-4 rounded-lg hover:bg-[#f0eeff] transition-colors border border-gray-100"
                                            onClick={() => setMobileCategoriesOpen(false)}
                                        >
                                            <div className={`p-3 rounded-lg ${category.bgColor}`}>
                                                <category.icon className={`w-6 h-6 ${category.iconColor}`} />
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-medium text-lg text-gray-900">{category.name}</div>
                                                <div className="text-sm text-gray-500">{category.problems} задачи</div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                                <div className="mt-6 pt-4 border-t border-gray-200">
                                    <Link
                                        href="/platform/categories"
                                        className="block text-center p-4 text-[#755bc5] hover:bg-[#f0eeff] rounded-lg font-medium transition-colors border border-[#755bc5]/20"
                                        onClick={() => setMobileCategoriesOpen(false)}
                                    >
                                        Виж всички категории
                                    </Link>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Right side - Streak, Notifications and Account */}
                <div className="flex items-center gap-2 sm:gap-4">
                    {/* Desktop Streak */}
                    <DropdownMenu>
                        <DropdownMenuTrigger className="hidden md:flex items-center gap-2 px-3 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors backdrop-blur-sm">
                            <Flame className="w-5 h-5 text-orange-300" />
                            <span className="font-medium">{streakData.current}</span>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-80 p-0 bg-white border border-[#755bc5]/20 shadow-xl" align="end">
                            <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-[#f0eeff] to-white">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 bg-orange-100 rounded-lg">
                                        <Flame className="w-6 h-6 text-orange-500" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Текуща серия</h3>
                                        <p className="text-2xl font-bold text-orange-500">{streakData.current} дни</p>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600">Продължавай да решаваш задачи всеки ден!</p>
                            </div>

                            {/* This Week */}
                            <div className="p-4 border-b border-gray-100">
                                <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-[#755bc5]" />
                                    Тази седмица
                                </h4>
                                <div className="flex gap-2">
                                    {weekDays.map((day, index) => (
                                        <div key={index} className="flex flex-col items-center gap-1">
                                            <div
                                                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${streakData.thisWeek[index] ? "bg-[#755bc5] text-white shadow-md" : "bg-gray-100 text-gray-400"
                                                    }`}
                                            >
                                                {day}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="p-4">
                                <div className="grid grid-cols-3 gap-4 text-center">
                                    <div className="p-3 rounded-lg bg-[#f0eeff]/50">
                                        <div className="flex items-center justify-center gap-1 mb-1">
                                            <Trophy className="w-4 h-4 text-yellow-500" />
                                        </div>
                                        <p className="text-lg font-bold text-gray-900">{streakData.longest}</p>
                                        <p className="text-xs text-gray-500">Най-дълга серия</p>
                                    </div>
                                    <div className="p-3 rounded-lg bg-[#f0eeff]/50">
                                        <div className="flex items-center justify-center gap-1 mb-1">
                                            <Calendar className="w-4 h-4 text-[#755bc5]" />
                                        </div>
                                        <p className="text-lg font-bold text-gray-900">{streakData.thisMonth}</p>
                                        <p className="text-xs text-gray-500">Дни този месец</p>
                                    </div>
                                    <div className="p-3 rounded-lg bg-[#f0eeff]/50">
                                        <div className="flex items-center justify-center gap-1 mb-1">
                                            <Target className="w-4 h-4 text-green-500" />
                                        </div>
                                        <p className="text-lg font-bold text-gray-900">{streakData.total}</p>
                                        <p className="text-xs text-gray-500">Общо дни</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 bg-gradient-to-r from-[#f0eeff] to-white border-t border-gray-100">
                                <p className="text-sm text-center text-gray-600">
                                    <span className="font-medium text-[#755bc5]">Съвет:</span> Решавай поне една задача всеки ден за да
                                    запазиш серията си!
                                </p>
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Mobile Streak Button */}
                    <Dialog open={mobileStreakOpen} onOpenChange={setMobileStreakOpen}>
                        <DialogTrigger className="md:hidden flex items-center gap-1 px-2 py-1 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors backdrop-blur-sm">
                            <Flame className="w-4 h-4 text-orange-300" />
                            <span className="font-medium text-sm">{streakData.current}</span>
                        </DialogTrigger>
                        <DialogContent className="w-full h-full max-w-none max-h-none m-0 p-0 bg-white">
                            <DialogHeader className="p-4 bg-gradient-to-r from-[#f0eeff] to-white border-b border-gray-100">
                                <DialogTitle className="text-gray-900 text-left">Текуща серия</DialogTitle>
                            </DialogHeader>
                            <div className="flex-1 overflow-y-auto p-4">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="p-4 bg-orange-100 rounded-xl">
                                        <Flame className="w-8 h-8 text-orange-500" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-2xl text-gray-900">Текуща серия</h3>
                                        <p className="text-4xl font-bold text-orange-500">{streakData.current} дни</p>
                                    </div>
                                </div>
                                <p className="text-lg text-gray-600 mb-8">Продължавай да решаваш задачи всеки ден!</p>

                                {/* This Week */}
                                <div className="mb-8">
                                    <h4 className="font-bold text-xl text-gray-900 mb-4 flex items-center gap-2">
                                        <Calendar className="w-5 h-5 text-[#755bc5]" />
                                        Тази седмица
                                    </h4>
                                    <div className="flex gap-3 justify-center">
                                        {weekDays.map((day, index) => (
                                            <div key={index} className="flex flex-col items-center gap-2">
                                                <div
                                                    className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium ${streakData.thisWeek[index]
                                                        ? "bg-[#755bc5] text-white shadow-lg"
                                                        : "bg-gray-100 text-gray-400"
                                                        }`}
                                                >
                                                    {day}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="p-6 rounded-xl bg-[#f0eeff]/50 text-center">
                                        <div className="flex items-center justify-center gap-2 mb-2">
                                            <Trophy className="w-6 h-6 text-yellow-500" />
                                        </div>
                                        <p className="text-3xl font-bold text-gray-900">{streakData.longest}</p>
                                        <p className="text-lg text-gray-500">Най-дълга серия</p>
                                    </div>
                                    <div className="p-6 rounded-xl bg-[#f0eeff]/50 text-center">
                                        <div className="flex items-center justify-center gap-2 mb-2">
                                            <Calendar className="w-6 h-6 text-[#755bc5]" />
                                        </div>
                                        <p className="text-3xl font-bold text-gray-900">{streakData.thisMonth}</p>
                                        <p className="text-lg text-gray-500">Дни този месец</p>
                                    </div>
                                    <div className="p-6 rounded-xl bg-[#f0eeff]/50 text-center">
                                        <div className="flex items-center justify-center gap-2 mb-2">
                                            <Target className="w-6 h-6 text-green-500" />
                                        </div>
                                        <p className="text-3xl font-bold text-gray-900">{streakData.total}</p>
                                        <p className="text-lg text-gray-500">Общо дни</p>
                                    </div>
                                </div>

                                <div className="mt-8 p-6 bg-gradient-to-r from-[#f0eeff] to-white border border-[#755bc5]/20 rounded-xl">
                                    <p className="text-lg text-center text-gray-600">
                                        <span className="font-bold text-[#755bc5]">Съвет:</span> Решавай поне една задача всеки ден за да
                                        запазиш серията си!
                                    </p>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>

                    {/* Desktop Notifications */}
                    <DropdownMenu>
                        <DropdownMenuTrigger className="hidden md:block relative p-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors backdrop-blur-sm">
                            <Bell className="w-6 h-6" />
                            {notificationCount > 0 && (
                                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white text-xs border-2 border-white">
                                    {notificationCount}
                                </Badge>
                            )}
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-80 p-0 bg-white border border-[#755bc5]/20 shadow-xl" align="end">
                            <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-[#f0eeff] to-white">
                                <h3 className="font-semibold text-gray-900">Известия</h3>
                            </div>
                            <div className="max-h-96 overflow-y-auto">
                                {/* Mock notifications */}
                                <div className="p-4 hover:bg-[#f0eeff]/30 border-b border-gray-50 transition-colors">
                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-[#755bc5] rounded-full mt-2 flex-shrink-0"></div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Нов тест е достъпен</p>
                                            <p className="text-xs text-gray-500 mt-1">Алгебра - Квадратни уравнения</p>
                                            <p className="text-xs text-gray-400 mt-1">Преди 2 часа</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 hover:bg-[#f0eeff]/30 border-b border-gray-50 transition-colors">
                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Постижение отключено!</p>
                                            <p className="text-xs text-gray-500 mt-1">Решихте 50 задачи по геометрия</p>
                                            <p className="text-xs text-gray-400 mt-1">Преди 1 ден</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 hover:bg-[#f0eeff]/30 transition-colors">
                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Седмичен отчет</p>
                                            <p className="text-xs text-gray-500 mt-1">Вашият прогрес за тази седмица</p>
                                            <p className="text-xs text-gray-400 mt-1">Преди 3 дни</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 border-t border-gray-100 bg-gradient-to-r from-[#f0eeff] to-white">
                                <Link
                                    href="/platform/notifications"
                                    className="block text-center text-sm text-[#755bc5] hover:text-[#6b4fb8] font-medium transition-colors"
                                >
                                    Виж всички известия
                                </Link>
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Mobile Notifications */}
                    <Dialog open={mobileNotificationsOpen} onOpenChange={setMobileNotificationsOpen}>
                        <DialogTrigger className="md:hidden relative p-1.5 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors backdrop-blur-sm">
                            <Bell className="w-5 h-5" />
                            {notificationCount > 0 && (
                                <Badge className="absolute -top-1 -right-1 w-4 h-4 p-0 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white text-xs border-2 border-white">
                                    {notificationCount}
                                </Badge>
                            )}
                        </DialogTrigger>
                        <DialogContent className="w-full h-full max-w-none max-h-none m-0 p-0 bg-white">
                            <DialogHeader className="p-4 bg-gradient-to-r from-[#f0eeff] to-white border-b border-gray-100">
                                <DialogTitle className="text-gray-900 text-left">Известия</DialogTitle>
                            </DialogHeader>
                            <div className="flex-1 overflow-y-auto">
                                {/* Mock notifications */}
                                <div className="p-6 hover:bg-[#f0eeff]/30 border-b border-gray-100 transition-colors">
                                    <div className="flex items-start gap-4">
                                        <div className="w-3 h-3 bg-[#755bc5] rounded-full mt-2 flex-shrink-0"></div>
                                        <div>
                                            <p className="text-lg font-medium text-gray-900">Нов тест е достъпен</p>
                                            <p className="text-sm text-gray-500 mt-2">Алгебра - Квадратни уравнения</p>
                                            <p className="text-sm text-gray-400 mt-1">Преди 2 часа</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 hover:bg-[#f0eeff]/30 border-b border-gray-100 transition-colors">
                                    <div className="flex items-start gap-4">
                                        <div className="w-3 h-3 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                        <div>
                                            <p className="text-lg font-medium text-gray-900">Постижение отключено!</p>
                                            <p className="text-sm text-gray-500 mt-2">Решихте 50 задачи по геометрия</p>
                                            <p className="text-sm text-gray-400 mt-1">Преди 1 ден</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 hover:bg-[#f0eeff]/30 border-b border-gray-100 transition-colors">
                                    <div className="flex items-start gap-4">
                                        <div className="w-3 h-3 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                                        <div>
                                            <p className="text-lg font-medium text-gray-900">Седмичен отчет</p>
                                            <p className="text-sm text-gray-500 mt-2">Вашият прогрес за тази седмица</p>
                                            <p className="text-sm text-gray-400 mt-1">Преди 3 дни</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 border-t border-gray-100 bg-gradient-to-r from-[#f0eeff] to-white">
                                <Link
                                    href="/platform/notifications"
                                    className="block text-center text-lg text-[#755bc5] hover:text-[#6b4fb8] font-medium transition-colors p-4 rounded-lg border border-[#755bc5]/20"
                                    onClick={() => setMobileNotificationsOpen(false)}
                                >
                                    Виж всички известия
                                </Link>
                            </div>
                        </DialogContent>
                    </Dialog>

                    {/* Desktop Account Menu */}
                    <DropdownMenu>
                        <DropdownMenuTrigger className="hidden md:flex items-center gap-2 p-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors backdrop-blur-sm">
                            <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                                <User className="w-5 h-5 text-white" />
                            </div>
                            <ChevronDown className="w-4 h-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-80 bg-white border border-[#755bc5]/20 shadow-xl" align="end">
                            {/* User Profile Header - styled like the image */}
                            <div className="p-4 bg-gradient-to-r from-[#f0eeff] to-white border-b border-gray-100">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="relative">
                                        <div className="w-16 h-16 rounded-full border-3 border-white overflow-hidden bg-gray-100 shadow-md">
                                            <img
                                                src={userData.avatar || "/placeholder.svg?height=64&width=64"}
                                                alt={userData.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="absolute -top-1 -right-1 w-8 h-8 bg-[#755bc5] rounded-full flex items-center justify-center border-2 border-white shadow-md">
                                            <span className="text-xs font-bold text-white">{userData.level}</span>
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-lg text-gray-900">{userData.name}</h3>
                                        <div className="flex items-center gap-4 mt-1">
                                            <div className="flex items-center gap-1">
                                                <BarChart3 className="w-4 h-4 text-[#755bc5]" />
                                                <span className="text-sm font-medium text-gray-600">Ниво {userData.level}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Star className="w-4 h-4 text-yellow-500" />
                                                <span className="text-sm font-medium text-gray-600">
                                                    {userData.currentXP.toLocaleString()} XP
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* XP Progress Bar */}
                                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                                    <div
                                        className="bg-gradient-to-r from-[#755bc5] to-[#8b6fd1] h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${xpProgress}%` }}
                                    ></div>
                                </div>
                                <p className="text-xs text-gray-500 text-center">
                                    До ниво {userData.level + 1}: {userData.xpToNextLevel.toLocaleString()} XP
                                </p>
                            </div>

                            {/* Menu Items */}
                            <div className="p-2">
                                <DropdownMenuItem asChild>
                                    <Link
                                        href="/platform/profile"
                                        className="flex items-center gap-3 p-3 cursor-pointer hover:bg-[#f0eeff]/50 transition-colors rounded-lg"
                                    >
                                        <User className="w-5 h-5 text-[#755bc5]" />
                                        <span className="font-medium">Профил</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link
                                        href="/platform/settings"
                                        className="flex items-center gap-3 p-3 cursor-pointer hover:bg-[#f0eeff]/50 transition-colors rounded-lg"
                                    >
                                        <Settings className="w-5 h-5 text-[#755bc5]" />
                                        <span className="font-medium">Настройки</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link
                                        href="/platform/subscription"
                                        className="flex items-center gap-3 p-3 cursor-pointer hover:bg-[#f0eeff]/50 transition-colors rounded-lg"
                                    >
                                        <CreditCard className="w-5 h-5 text-[#755bc5]" />
                                        <span className="font-medium">Абонамент</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="my-2" />
                                <DropdownMenuItem className="flex items-center gap-3 p-3 text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer transition-colors rounded-lg">
                                    <LogOut className="w-5 h-5" />
                                    <span className="font-medium">Изход</span>
                                </DropdownMenuItem>
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Mobile Account Menu */}
                    <Dialog open={mobileAccountOpen} onOpenChange={setMobileAccountOpen}>
                        <DialogTrigger className="md:hidden flex items-center gap-1 p-1.5 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors backdrop-blur-sm">
                            <div className="w-7 h-7 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                                <User className="w-4 h-4 text-white" />
                            </div>
                        </DialogTrigger>
                        <DialogContent className="w-full h-full max-w-none max-h-none m-0 p-0 bg-white">
                            <DialogHeader className="p-4 bg-gradient-to-r from-[#f0eeff] to-white border-b border-gray-100">
                                <DialogTitle className="text-gray-900 text-left">Профил</DialogTitle>
                            </DialogHeader>
                            <div className="flex-1 overflow-y-auto">
                                {/* User Profile Header - Mobile Version */}
                                <div className="p-6 bg-gradient-to-r from-[#f0eeff] to-white">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="relative">
                                            <div className="w-20 h-20 rounded-full border-4 border-white overflow-hidden bg-gray-100 shadow-lg">
                                                <img
                                                    src={userData.avatar || "/placeholder.svg?height=80&width=80"}
                                                    alt={userData.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="absolute -top-1 -right-1 w-10 h-10 bg-[#755bc5] rounded-full flex items-center justify-center border-3 border-white shadow-lg">
                                                <span className="text-sm font-bold text-white">{userData.level}</span>
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-2xl text-gray-900">{userData.name}</h3>
                                            <p className="text-lg text-gray-500 mt-1">{userData.email}</p>
                                            <div className="flex items-center gap-6 mt-3">
                                                <div className="flex items-center gap-2">
                                                    <BarChart3 className="w-5 h-5 text-[#755bc5]" />
                                                    <span className="text-lg font-medium text-gray-600">Ниво {userData.level}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Star className="w-5 h-5 text-yellow-500" />
                                                    <span className="text-lg font-medium text-gray-600">
                                                        {userData.currentXP.toLocaleString()} XP
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* XP Progress Bar */}
                                    <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                                        <div
                                            className="bg-gradient-to-r from-[#755bc5] to-[#8b6fd1] h-3 rounded-full transition-all duration-300"
                                            style={{ width: `${xpProgress}%` }}
                                        ></div>
                                    </div>
                                    <p className="text-sm text-gray-500 text-center">
                                        До ниво {userData.level + 1}: {userData.xpToNextLevel.toLocaleString()} XP
                                    </p>
                                </div>

                                {/* Stats for mobile */}
                                <div className="p-6 border-b border-gray-100">
                                    <div className="grid grid-cols-3 gap-4 mb-6">
                                        <div className="text-center p-4 bg-[#f0eeff]/30 rounded-xl">
                                            <Trophy className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                                            <p className="text-xl font-bold text-gray-800">{streakData.longest}</p>
                                            <p className="text-sm text-gray-500">Най-дълга серия</p>
                                        </div>
                                        <div className="text-center p-4 bg-[#f0eeff]/30 rounded-xl">
                                            <Calendar className="w-6 h-6 text-[#755bc5] mx-auto mb-2" />
                                            <p className="text-xl font-bold text-gray-800">{streakData.thisMonth}</p>
                                            <p className="text-sm text-gray-500">Дни този месец</p>
                                        </div>
                                        <div className="text-center p-4 bg-[#f0eeff]/30 rounded-xl">
                                            <Target className="w-6 h-6 text-green-500 mx-auto mb-2" />
                                            <p className="text-xl font-bold text-gray-800">{streakData.total}</p>
                                            <p className="text-sm text-gray-500">Общо дни</p>
                                        </div>
                                    </div>

                                    {/* Daily Missions for mobile */}
                                    <div className="space-y-3">
                                        <h4 className="font-bold text-lg text-gray-900 mb-4">Дневни мисии</h4>
                                        {dailyMissions.map((mission) => (
                                            <div
                                                key={mission.id}
                                                className={`rounded-xl p-4 border-2 transition-all duration-200 ${mission.completed ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className={`w-8 h-8 rounded-full flex items-center justify-center ${mission.completed ? "bg-green-500" : "bg-[#755bc5]"
                                                            }`}
                                                    >
                                                        {mission.completed ? (
                                                            <Check className="w-5 h-5 text-white" />
                                                        ) : (
                                                            <span className="text-sm font-bold text-white">{mission.progress}</span>
                                                        )}
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-lg font-medium text-gray-800">{mission.title}</p>
                                                        {!mission.completed && (
                                                            <p className="text-sm text-gray-500 mt-1">
                                                                {mission.progress}/{mission.total}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Menu Items */}
                                <div className="p-6 space-y-3">
                                    <Link
                                        href="/platform/profile"
                                        className="flex items-center gap-4 p-4 cursor-pointer hover:bg-[#f0eeff]/50 transition-colors rounded-xl border border-gray-100"
                                        onClick={() => setMobileAccountOpen(false)}
                                    >
                                        <User className="w-6 h-6 text-[#755bc5]" />
                                        <span className="font-medium text-lg">Профил</span>
                                    </Link>
                                    <Link
                                        href="/platform/settings"
                                        className="flex items-center gap-4 p-4 cursor-pointer hover:bg-[#f0eeff]/50 transition-colors rounded-xl border border-gray-100"
                                        onClick={() => setMobileAccountOpen(false)}
                                    >
                                        <Settings className="w-6 h-6 text-[#755bc5]" />
                                        <span className="font-medium text-lg">Настройки</span>
                                    </Link>
                                    <Link
                                        href="/platform/subscription"
                                        className="flex items-center gap-4 p-4 cursor-pointer hover:bg-[#f0eeff]/50 transition-colors rounded-xl border border-gray-100"
                                        onClick={() => setMobileAccountOpen(false)}
                                    >
                                        <CreditCard className="w-6 h-6 text-[#755bc5]" />
                                        <span className="font-medium text-lg">Абонамент</span>
                                    </Link>
                                    <button className="flex items-center gap-4 p-4 text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer transition-colors rounded-xl border border-red-200 w-full text-left">
                                        <LogOut className="w-6 h-6" />
                                        <span className="font-medium text-lg">Изход</span>
                                    </button>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </nav>
    )
}

export default PlatformNavbar
