import { Flame, Calendar, Trophy, Target } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { streakData, weekDays } from "./mock-data"

export function StreakDropdown() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="hidden md:flex items-center gap-2 px-3 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors backdrop-blur-sm cursor-pointer">
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
                        <span className="font-medium text-[#755bc5]">Съвет:</span> Решавай поне една задача всеки ден за да запазиш
                        серията си!
                    </p>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
