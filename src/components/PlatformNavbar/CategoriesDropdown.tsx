import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { problemCategories } from "./mock-data"
import { useState } from "react"

// 3x3 Grid of Dots Icon Component
function GridIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle cx="6" cy="6" r="2" fill="currentColor" />
            <circle cx="12" cy="6" r="2" fill="currentColor" />
            <circle cx="18" cy="6" r="2" fill="currentColor" />
            <circle cx="6" cy="12" r="2" fill="currentColor" />
            <circle cx="12" cy="12" r="2" fill="currentColor" />
            <circle cx="18" cy="12" r="2" fill="currentColor" />
            <circle cx="6" cy="18" r="2" fill="currentColor" />
            <circle cx="12" cy="18" r="2" fill="currentColor" />
            <circle cx="18" cy="18" r="2" fill="currentColor" />
        </svg>
    )
}

export function CategoriesDropdown() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <DropdownMenu onOpenChange={(open) => setIsOpen(open)}>
            <DropdownMenuTrigger className="hidden md:flex items-center gap-2 px-3 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors backdrop-blur-sm cursor-pointer">
                <GridIcon className="w-7 h-7" />
                <span className="font-medium">Категории</span>
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
    )
}
