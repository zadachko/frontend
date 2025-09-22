"use client"

import Link from "next/link"
import { Bell } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { mockNotifications } from "./mock-data"
import type { MobileMenuType } from "./navbar-types"

interface MobileNotificationsProps {
    notificationCount: number
    openMobileMenu: MobileMenuType
    setOpenMobileMenu: (menu: MobileMenuType) => void
}

export function MobileNotifications({
    notificationCount,
    openMobileMenu,
    setOpenMobileMenu,
}: MobileNotificationsProps) {
    return (
        <div className="relative md:hidden">
            <button
                onClick={() => setOpenMobileMenu(openMobileMenu === "notifications" ? null : "notifications")}
                className="relative p-1.5 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors backdrop-blur-sm"
            >
                <Bell className="w-5 h-5" />
                {notificationCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 w-4 h-4 p-0 flex items-center justify-center bg-red-500 text-white text-xs border-2 border-white">
                        {notificationCount}
                    </Badge>
                )}
            </button>

            {openMobileMenu === "notifications" && (
                <>
                    <div className="pointer-events-none absolute -bottom-4 sm:-bottom-3 left-1/2 -translate-x-1/2 z-50 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-white"></div>

                    <div className="fixed top-[64px] bottom-0 left-0 right-0 z-40 bg-white overflow-y-auto shadow-2xl border-t border-gray-200 animate-slide-in">
                        <div className="flex-1 overflow-y-auto">
                            {mockNotifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className="p-6 hover:bg-[#f0eeff]/30 border-b border-gray-100 transition-colors"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`w-3 h-3 ${notification.color} rounded-full mt-2 flex-shrink-0`}></div>
                                        <div>
                                            <p className="text-lg font-medium text-gray-900">{notification.title}</p>
                                            <p className="text-sm text-gray-500 mt-2">{notification.description}</p>
                                            <p className="text-sm text-gray-400 mt-1">{notification.time}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-6 border-t border-gray-100 bg-gradient-to-r from-[#f0eeff] to-white">
                            <Link
                                href="/platform/notifications"
                                className="block text-center text-lg text-[#755bc5] hover:text-[#6b4fb8] font-medium transition-colors p-4 rounded-lg border border-[#755bc5]/20"
                                onClick={() => setOpenMobileMenu(null)}
                            >
                                Виж всички известия
                            </Link>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
