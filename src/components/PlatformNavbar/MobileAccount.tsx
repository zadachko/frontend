"use client"

import Link from "next/link"
import { User, BarChart3, Star, Settings, CreditCard, LogOut } from "lucide-react"
import { userData } from "./mock-data"
import type { MobileMenuType } from "./navbar-types"
import Image from "next/image"

interface MobileAccountProps {
    openMobileMenu: MobileMenuType
    setOpenMobileMenu: (menu: MobileMenuType) => void
}

export function MobileAccount({ openMobileMenu, setOpenMobileMenu }: MobileAccountProps) {
    const xpProgress = (userData.currentXP / (userData.currentXP + userData.xpToNextLevel)) * 100

    return (
        <div className="relative md:hidden">
            <button
                onClick={() => setOpenMobileMenu(openMobileMenu === "account" ? null : "account")}
                className="flex items-center gap-1 p-1.5 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors backdrop-blur-sm"
            >
                <div className="w-7 h-7 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                    <User className="w-4 h-4 text-white" />
                </div>
            </button>

            {openMobileMenu === "account" && (
                <div className="fixed top-[64px] bottom-0 left-0 right-0 z-40 bg-white overflow-y-auto shadow-2xl border-t border-gray-200 animate-slide-in">
                    <div className="flex-1 overflow-y-auto">
                        {/* User Profile Header - Mobile Version */}
                        <div className="p-6 bg-gradient-to-r from-[#f0eeff] to-white">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="relative">
                                    <div className="w-20 h-20 rounded-full border-4 border-white overflow-hidden bg-gray-100 shadow-lg">
                                        <Image
                                            src={userData.avatar || "/placeholder.svg?height=80&width=80"}
                                            alt={userData.name}
                                            className="w-full h-full object-cover"
                                            width={80}
                                            height={80}
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

                        {/* Menu Items */}
                        <div className="p-6 space-y-3">
                            <Link
                                href="/platform/profile"
                                className="flex items-center gap-4 p-4 cursor-pointer hover:bg-[#f0eeff]/50 transition-colors rounded-xl border border-gray-100"
                                onClick={() => setOpenMobileMenu(null)}
                            >
                                <User className="w-6 h-6 text-[#755bc5]" />
                                <span className="font-medium text-lg">Профил</span>
                            </Link>
                            <Link
                                href="/platform/settings"
                                className="flex items-center gap-4 p-4 cursor-pointer hover:bg-[#f0eeff]/50 transition-colors rounded-xl border border-gray-100"
                                onClick={() => setOpenMobileMenu(null)}
                            >
                                <Settings className="w-6 h-6 text-[#755bc5]" />
                                <span className="font-medium text-lg">Настройки</span>
                            </Link>
                            <Link
                                href="/platform/subscription"
                                className="flex items-center gap-4 p-4 cursor-pointer hover:bg-[#f0eeff]/50 transition-colors rounded-xl border border-gray-100"
                                onClick={() => setOpenMobileMenu(null)}
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
                </div>
            )}
        </div>
    )
}
