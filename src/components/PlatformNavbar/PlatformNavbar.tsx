"use client"

import { Logo } from "./Logo";
import { CategoriesDropdown } from "./CategoriesDropdown";
import { MobileCategories } from "./MobileCategories";
import { StreakDropdown } from "./StreakDropdown";
import { MobileStreak } from "./MobileStreak";
import { NotificationsDropdown } from "./NotificationsDropdown";
import { MobileNotifications } from "./MobileNotifications";
import { AccountDropdown } from "./AccountDropdown";
import { MobileAccount } from "./MobileAccount";
import type { MobileMenuType } from "./navbar-types";
import { useState } from "react";
import { usePathname } from "next/navigation";

export function PlatformNavbar() {
    const [notificationCount] = useState(3) // Mock notification count
    const [openMobileMenu, setOpenMobileMenu] = useState<MobileMenuType>(null)
    const pathname = usePathname()

    const isAssessmentLivePage = pathname.includes('live') || pathname.includes('overview')

    if (isAssessmentLivePage) {
        return null
    }

    return (
        <nav className="bg-gradient-to-r from-[#755bc5] to-[#8b6fd1] border-b border-[#6b4fb8] px-4 sm:px-6 md:pl-0 py-3 sm:py-4 shadow-lg">
            <div className="flex items-center justify-between">
                {/* Left side - Logo and Desktop Navigation */}
                <div className="flex items-center gap-4 sm:gap-8">
                    <MobileCategories openMobileMenu={openMobileMenu} setOpenMobileMenu={setOpenMobileMenu} />
                    <Logo />
                    <CategoriesDropdown />
                </div>

                {/* Right side - Streak, Notifications and Account */}
                <div className="flex items-center gap-2 sm:gap-4">
                    <StreakDropdown />
                    <MobileStreak openMobileMenu={openMobileMenu} setOpenMobileMenu={setOpenMobileMenu} />

                    <NotificationsDropdown notificationCount={notificationCount} />
                    <MobileNotifications
                        notificationCount={notificationCount}
                        openMobileMenu={openMobileMenu}
                        setOpenMobileMenu={setOpenMobileMenu}
                    />

                    <AccountDropdown />
                    <MobileAccount openMobileMenu={openMobileMenu} setOpenMobileMenu={setOpenMobileMenu} />
                </div>
            </div>
        </nav>
    )
}

export default PlatformNavbar
