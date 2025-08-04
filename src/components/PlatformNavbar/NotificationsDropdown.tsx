import Link from "next/link"
import { Bell } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { mockNotifications } from "./mock-data"

interface NotificationsDropdownProps {
    notificationCount: number
}

export function NotificationsDropdown({ notificationCount }: NotificationsDropdownProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="hidden md:block relative p-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors backdrop-blur-sm cursor-pointer">
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
                    {mockNotifications.map((notification) => (
                        <div key={notification.id} className="p-4 hover:bg-[#f0eeff]/30 border-b border-gray-50 transition-colors">
                            <div className="flex items-start gap-3">
                                <div className={`w-2 h-2 ${notification.color} rounded-full mt-2 flex-shrink-0`}></div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                                    <p className="text-xs text-gray-500 mt-1">{notification.description}</p>
                                    <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                                </div>
                            </div>
                        </div>
                    ))}
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
    )
}
