"use client"

import Link from "next/link"
import { ChevronDown, LayoutGrid, X } from "lucide-react"
import { problemCategories } from "./mock-data"
import type { MobileMenuType } from "./navbar-types"

interface MobileCategoriesProps {
    openMobileMenu: MobileMenuType
    setOpenMobileMenu: (menu: MobileMenuType) => void
}

export function MobileCategories({ openMobileMenu, setOpenMobileMenu }: MobileCategoriesProps) {
    return (
        <div className="relative md:hidden">
            <button
                onClick={() =>
                    setOpenMobileMenu(openMobileMenu === "categories" ? null : "categories")
                }
                className="relative w-7 h-7 flex items-center justify-center group focus:outline-none"
                aria-label={openMobileMenu === "categories" ? "Close menu" : "Open menu"}
            >
                <span className="sr-only">{openMobileMenu === "categories" ? "Close menu" : "Open menu"}</span>

                {/* Top bar */}
                <span
                    className={`absolute w-7 h-0.5 bg-white rounded transition-all duration-300 ease-in-out
      ${openMobileMenu === "categories" ? 'rotate-45 translate-y-0' : '-translate-y-[8px]'}`}
                />

                {/* Middle bar */}
                <span
                    className={`absolute w-7 h-0.5 bg-white rounded transition-all duration-300 ease-in-out
      ${openMobileMenu === "categories" ? 'opacity-0' : 'opacity-100'}`}
                />

                {/* Bottom bar */}
                <span
                    className={`absolute w-7 h-0.5 bg-white rounded transition-all duration-300 ease-in-out
      ${openMobileMenu === "categories" ? '-rotate-45 translate-y-0' : 'translate-y-[8px]'}`}
                />
            </button>

            {openMobileMenu === "categories" && (
                <div className="fixed top-[64px] bottom-0 left-0 right-0 z-40 bg-white overflow-y-auto shadow-2xl border-t border-gray-200 animate-slide-in">
                    <div className="flex-1 overflow-y-auto p-4">
                        <div className="space-y-2">
                            {problemCategories.map((category) => (
                                <Link
                                    key={category.name}
                                    href={category.href}
                                    className="flex items-center gap-3 p-4 rounded-lg hover:bg-[#f0eeff] transition-colors border border-gray-100"
                                    onClick={() => setOpenMobileMenu(null)}
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
                                onClick={() => setOpenMobileMenu(null)}
                            >
                                Виж всички категории
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
