"use client"

import { Flame, Calendar, Trophy, Target } from "lucide-react"
import { streakData, weekDays } from "./mock-data"
import type { MobileMenuType } from "./navbar-types"

interface MobileStreakProps {
    openMobileMenu: MobileMenuType
    setOpenMobileMenu: (menu: MobileMenuType) => void
}

export function MobileStreak({ openMobileMenu, setOpenMobileMenu }: MobileStreakProps) {
    return (
        <div className="relative md:hidden">
            <button
                onClick={() => setOpenMobileMenu(openMobileMenu === "streak" ? null : "streak")}
                className="flex items-center gap-1 px-2 py-1 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors backdrop-blur-sm"
            >
                <Flame className="w-4 h-4 text-orange-300" />
                <span className="font-medium text-sm">{streakData.current}</span>
            </button>

            {openMobileMenu === "streak" && (
                <>
                    <div className="pointer-events-none absolute -bottom-4.5 sm:-bottom-3.5 left-1/2 -translate-x-1/2 z-50 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-white"></div>

                    <div className="fixed top-[64px] bottom-0 left-0 right-0 z-40 bg-white overflow-y-auto shadow-2xl border-t border-gray-200 animate-slide-in">
                        <div className="flex-1 overflow-y-auto p-4">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-4 bg-orange-100 rounded-xl">
                                    <Flame className="w-8 h-8 text-orange-500" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl text-gray-900">Текуща серия</h3>
                                    <p className="text-2xl font-bold text-orange-500">{streakData.current} дни</p>
                                </div>
                            </div>
                            <p className="text-base text-gray-600 mb-8">Продължавай да решаваш задачи всеки ден!</p>

                            {/* This Week */}
                            <div className="mb-8">
                                <h4 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-[#755bc5]" />
                                    Тази седмица
                                </h4>
                                <div className="flex gap-3 justify-center">
                                    {weekDays.map((day, index) => (
                                        <div key={index} className="flex flex-col items-center gap-2">
                                            <div
                                                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${streakData.thisWeek[index] ? "bg-[#755bc5] text-white shadow-lg" : "bg-gray-100 text-gray-400"
                                                    }`}
                                            >
                                                {day}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-3">
                                <StatCard
                                    icon={<Trophy className="w-5 h-5 text-yellow-500" />}
                                    value={streakData.longest}
                                    label="Най-дълга серия"
                                />
                                <StatCard
                                    icon={<Calendar className="w-5 h-5 text-[#755bc5]" />}
                                    value={streakData.thisMonth}
                                    label="Дни този месец"
                                />
                                <StatCard
                                    icon={<Target className="w-5 h-5 text-green-500" />}
                                    value={streakData.total}
                                    label="Общо дни"
                                />
                            </div>


                            <div className="mt-8 p-6 bg-gradient-to-r from-[#f0eeff] to-white border border-[#755bc5]/20 rounded-xl">
                                <p className="text-lg text-center text-gray-600">
                                    <span className="font-bold text-[#755bc5]">Съвет:</span> Решавай поне една задача всеки ден за да
                                    запазиш серията си!
                                </p>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

type StatCardProps = {
    icon: React.ReactNode;
    value: number;
    label: string;
};

export function StatCard({ icon, value, label }: StatCardProps) {
    return (
        <div className="rounded-xl bg-[#f9f8ff] p-3 text-center flex flex-col items-center justify-center">
            <div className="mb-1">{icon}</div>
            <p className="text-xl font-bold text-gray-900">{value}</p>
            <p className="text-sm text-gray-500">{label}</p>
        </div>
    );
}
