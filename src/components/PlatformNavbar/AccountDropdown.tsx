import Link from "next/link"
import Image from "next/image"
import { User, ChevronDown, BarChart3, Star, Settings, CreditCard, LogOut } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { userData } from "./mock-data"
import { useState } from "react"

export function AccountDropdown() {
    const [isOpen, setIsOpen] = useState(false)

    const xpProgress = (userData.currentXP / (userData.currentXP + userData.xpToNextLevel)) * 100

    return (
        <DropdownMenu onOpenChange={(open) => setIsOpen(open)}>
            <DropdownMenuTrigger className="hidden md:flex items-center gap-2 p-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors backdrop-blur-sm cursor-pointer">
                <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                    <User className="w-5 h-5 text-white" />
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 p-0 bg-white border border-[#755bc5]/20 shadow-xl" align="end">
                {/* User Profile Header */}
                <div className="p-4 bg-gradient-to-r from-[#f0eeff] to-white border-b border-gray-100">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="relative">
                            <div className="w-16 h-16 rounded-full border-3 border-white overflow-hidden bg-gray-100 shadow-md">
                                <Image
                                    src={userData.avatar || "/placeholder.svg?height=64&width=64"}
                                    alt={userData.name}
                                    className="w-full h-full object-cover"
                                    width={64}
                                    height={64}
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
                                    <span className="text-sm font-medium text-gray-600">{userData.currentXP.toLocaleString()} XP</span>
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
                        <LogOut className="w-5 h-5 text-red-600" />
                        <span className="font-medium text-red-600">Изход</span>
                    </DropdownMenuItem>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
