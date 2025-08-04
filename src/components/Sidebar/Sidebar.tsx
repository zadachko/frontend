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
        <div className="hidden md:flex flex-col h-screen w-80 bg-gradient-to-b from-[#f0eeff] to-white border-r border-[#755bc5]/20 shadow-lg">
            {/* User Profile Section */}
            <div className="p-6 pt-8 flex-1 flex flex-col">
                {/* Avatar with Level Badge - Styled like the image */}
                <div className="relative mb-6 flex justify-center">
                    <div className="relative">
                        <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-gray-100 shadow-lg">
                            <Image
                                src={userData.avatar || "/placeholder.svg?height=128&width=128"}
                                alt={userData.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* Level Badge - positioned like in the image */}
                        <div className="absolute -top-3 -right-3 w-12 h-12 bg-[#755bc5] rounded-full flex items-center justify-center border-3 border-white shadow-lg">
                            <span className="text-lg font-bold text-white">{userData.level}</span>
                        </div>
                        {/* Progress Ring */}
                        <svg className="absolute inset-0 w-32 h-32 -rotate-90" viewBox="0 0 36 36">
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

                {/* User Name - styled like the image */}
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">{userData.name}</h2>

                {/* Level and XP Info - styled like the image */}
                <div className="bg-white rounded-xl p-4 mb-6 shadow-md border border-[#755bc5]/10">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <BarChart3 className="w-5 h-5 text-[#755bc5]" />
                            <span className="text-[1.03125rem] font-semibold text-gray-700">Ниво {userData.level}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Star className="w-5 h-5 text-yellow-500" />
                            <span className="text-[1.03125rem] font-semibold text-gray-700">{userData.currentXP.toLocaleString('en-US')} XP</span>
                        </div>
                    </div>

                    {/* XP Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                        <div
                            className="bg-gradient-to-r from-[#755bc5] to-[#8b6fd1] h-3 rounded-full transition-all duration-300"
                            style={{ width: `${xpProgress}%` }}
                        ></div>
                    </div>

                    <p className="text-sm text-gray-500 text-center">
                        До ниво {userData.level + 1}: {userData.xpToNextLevel.toLocaleString('en-US')} XP
                    </p>
                </div>

                {/* Stats Cards */}
                {/* <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="bg-white rounded-lg p-3 text-center shadow-md border border-[#755bc5]/10">
                        <Trophy className="w-6 h-6 text-yellow-500 mx-auto mb-1" />
                        <p className="text-lg font-bold text-gray-800">15</p>
                        <p className="text-xs text-gray-500">Най-дълга серия</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 text-center shadow-md border border-[#755bc5]/10">
                        <Calendar className="w-6 h-6 text-[#755bc5] mx-auto mb-1" />
                        <p className="text-lg font-bold text-gray-800">22</p>
                        <p className="text-xs text-gray-500">Дни този месец</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 text-center shadow-md border border-[#755bc5]/10">
                        <Target className="w-6 h-6 text-green-500 mx-auto mb-1" />
                        <p className="text-lg font-bold text-gray-800">156</p>
                        <p className="text-xs text-gray-500">Общо дни</p>
                    </div>
                </div> */}

                {/* Daily Missions */}
                <div className="bg-white rounded-xl p-4 shadow-md border border-[#755bc5]/10">
                    <h3 className="text-[1.03125rem] font-semibold mb-4 text-center text-gray-800 flex items-center justify-center gap-2">
                        <Target className="w-5 h-5 text-[#755bc5]" />
                        Дневни мисии
                    </h3>
                    <div className="space-y-3">
                        {dailyMissions.map((mission) => (
                            <div
                                key={mission.id}
                                className={`rounded-lg p-3 border-2 transition-all duration-200 ${mission.completed
                                    ? "bg-gradient-to-r from-green-50 to-green-100 border-green-300 shadow-sm"
                                    : "bg-gray-50 border-gray-200 hover:border-[#755bc5]/30"
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${mission.completed ? "bg-green-500 shadow-md" : "bg-[#755bc5] shadow-md"
                                            }`}
                                    >
                                        {mission.completed ? (
                                            <Check className="w-5 h-5 text-white" />
                                        ) : (
                                            <span className="text-sm font-bold text-white">{mission.progress}</span>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-800">{mission.title}</p>
                                        {!mission.completed && (
                                            <div className="mt-1">
                                                <p className="text-xs text-gray-500 mb-1">
                                                    {mission.progress}/{mission.total}
                                                </p>
                                                <div className="w-full bg-gray-200 rounded-full h-1.5">
                                                    <div
                                                        className="bg-[#755bc5] h-1.5 rounded-full transition-all duration-300"
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
