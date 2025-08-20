"use client"
import { Star, Check, Target, BarChart3 } from "lucide-react"
import Image from "next/image"

const Sidebar = () => {
    // Mock user data
    const userData = {
        name: "Антон Янков",
        level: 111,
        currentXP: 46214,
        xpToNextLevel: 8795,
        avatar: "/avatar.png",
    }

    // Mock daily missions
    const dailyMissions = [
        {
            id: 1,
            title: "Реши 5 задачи по математика",
            completed: true,
            progress: 5,
            total: 5,
        },
        {
            id: 2,
            title: "Постигни 80% точност",
            completed: false,
            progress: 65,
            total: 80,
        },
    ]

    const xpProgress = (userData.currentXP / (userData.currentXP + userData.xpToNextLevel)) * 100

    return (
        <div className="hidden md:flex flex-col h-screen w-64 lg:w-72 xl:w-80 bg-gradient-to-b from-[#f0eeff] to-white border-r border-[#755bc5]/20 shadow-lg">
            {/* User Profile Section */}
            <div className="p-4 md:p-5 lg:p-6 pt-6 lg:pt-8 flex-1 flex flex-col">
                {/* Avatar with Level Badge and Progress Ring */}
                <div className="relative mb-6 flex justify-center">
                    <div className="relative">
                        <div className="w-24 md:w-28 lg:w-32 h-24 md:h-28 lg:h-32 rounded-full border-4 border-white overflow-hidden bg-gray-100 shadow-lg">
                            <Image
                                src={userData.avatar || "/placeholder.svg?height=128&width=128"}
                                alt={userData.name}
                                className="w-full h-full object-cover"
                                width={128}
                                height={128}
                            />
                        </div>
                        {/* Level Badge */}
                        <div className="absolute -top-2 md:-top-3 -right-2 md:-right-3 w-10 md:w-12 h-10 md:h-12 bg-[#755bc5] rounded-full flex items-center justify-center border-3 border-white shadow-lg">
                            <span className="text-sm md:text-base lg:text-lg font-bold text-white">{userData.level}</span>
                        </div>
                        {/* Progress Ring */}
                        <svg className="absolute inset-0 w-24 md:w-28 lg:w-32 h-24 md:h-28 lg:h-32 -rotate-90" viewBox="0 0 36 36">
                            <path
                                d="M18 2.0845
                                a 15.9155 15.9155 0 0 1 0 31.831
                                a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="rgba(117,91,197,0.2)"
                                strokeWidth="2"
                            />
                            <path
                                d="M18 2.0845
                                a 15.9155 15.9155 0 0 1 0 31.831
                                a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="#755bc5"
                                strokeWidth="2"
                                strokeDasharray={`${xpProgress}, 100`}
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>
                </div>

                {/* User Name */}
                <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-center mb-4 lg:mb-6 text-gray-800">
                    {userData.name}
                </h2>

                {/* Level and XP Info - Cleaned up without progress bar */}
                <div className="bg-white rounded-xl p-3 md:p-4 xl:p-5 mb-4 lg:mb-6 shadow-md border border-[#755bc5]/10">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1 xl:gap-2">
                            <BarChart3 className="w-5 h-5 text-[#755bc5]" />
                            <span className="text-sm md:text-sm lg:text-base font-semibold text-gray-700">Ниво {userData.level}</span>
                        </div>
                        <div className="flex items-center gap-1 xl:gap-2">
                            <Star className="w-5 h-5 text-yellow-500" />
                            <span className="text-sm md:text-sm lg:text-base font-semibold text-gray-700">
                                {userData.currentXP.toLocaleString("en-US")} XP
                            </span>
                        </div>
                    </div>

                    <div className="text-center">
                        <p className="text-sm text-gray-600 bg-gray-50 rounded-lg py-2 px-3">
                            До ниво {userData.level + 1}:{" "}
                            <span className="font-semibold text-[#755bc5]">{userData.xpToNextLevel.toLocaleString("en-US")} XP</span>
                        </p>
                    </div>
                </div>

                {/* Daily Missions */}
                <div className="bg-white rounded-xl p-3 md:p-4 lg:p-5 shadow-md border border-[#755bc5]/10">
                    <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-center text-gray-800 flex items-center justify-center gap-2">
                        <Target className="w-5 h-5 text-[#755bc5]" />
                        Дневни мисии
                    </h3>
                    <div className="space-y-3">
                        {dailyMissions.map((mission) => (
                            <div
                                key={mission.id}
                                className={`rounded-lg p-4 border-2 transition-all duration-200 ${mission.completed
                                    ? "bg-gradient-to-r from-gray-50 to-gray-100 border-gray-300 shadow-sm"
                                    : "bg-gray-50 border-gray-200 hover:border-[#755bc5]/30 hover:shadow-sm"
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 ${mission.completed ? "bg-gray-500 shadow-md" : "bg-[#755bc5] shadow-md"
                                            }`}
                                    >
                                        {mission.completed ? (
                                            <Check className="w-5 h-5 text-white" />
                                        ) : (
                                            <span className="text-sm font-bold text-white">{mission.progress}</span>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <p
                                            className={`text-sm font-medium mb-1 ${mission.completed
                                                    ? "text-gray-400 line-through"
                                                    : "text-gray-800"
                                                }`}
                                        >
                                            {mission.title}
                                        </p>
                                        {!mission.completed && (
                                            <div className="mt-2">
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="text-xs text-gray-500">Прогрес</span>
                                                    <span className="text-xs font-medium text-gray-600">
                                                        {mission.progress}/{mission.total}
                                                    </span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className="bg-gradient-to-r from-[#755bc5] to-[#8b6fd1] h-2 rounded-full transition-all duration-300"
                                                        style={{ width: `${(mission.progress / mission.total) * 100}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
