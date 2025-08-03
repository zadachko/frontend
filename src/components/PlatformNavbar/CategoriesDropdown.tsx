import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { problemCategories } from "./mock-data"

export function CategoriesDropdown() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="hidden md:flex items-center gap-2 px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors backdrop-blur-sm cursor-pointer">
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
    )
}
