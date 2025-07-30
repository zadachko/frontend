"use client"
import { Flame, Star, Check } from "lucide-react"

const Sidebar = () => {
    // Mock user data
    const userData = {
        name: "Антон Янков",
        level: 111,
        currentXP: 46214,
        xpToNextLevel: 8795,
        streak: 7,
        avatar: "https://media.lordicon.com/icons/wired/flat/44-avatar-user-in-circle.gif",
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
        <div className="hidden md:flex flex-col h-screen w-80 bg-[#6F58C9] text-white">
            {/* User Profile Section */}
            <div className="p-8 pt-16 flex-1 flex flex-col justify-start">
                {/* Avatar with Level Badge */}
                <div className="relative mb-6 flex justify-center">
                    <div className="relative">
                        <div className="w-64 h-64 rounded-full border-4 border-white/20 overflow-hidden bg-gray-200">
                            <img
                                src={userData.avatar || "/placeholder.svg"}
                                alt={userData.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* Level Badge */}
                        <div className="absolute -top-4 -right-4 w-20 h-20 bg-slate-700 rounded-full flex items-center justify-center border-4 border-white">
                            <span className="text-xl font-bold text-white">{userData.level}</span>
                        </div>
                        {/* Progress Ring */}
                        <svg className="absolute inset-0 w-64 h-64 -rotate-90" viewBox="0 0 36 36">
                            <path
                                d="M18 2.0845
                                a 15.9155 15.9155 0 0 1 0 31.831
                                a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="rgba(255,255,255,0.2)"
                                strokeWidth="2"
                            />
                            <path
                                d="M18 2.0845
                                a 15.9155 15.9155 0 0 1 0 31.831
                                a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="#10b981"
                                strokeWidth="2"
                                strokeDasharray={`${xpProgress}, 100`}
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>
                </div>

                {/* User Name */}
                <h2 className="text-2xl font-bold text-center mb-4">{userData.name}</h2>

                {/* Level and XP Info */}
                <div className="flex items-center justify-center gap-3 mb-3">
                    <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-full">
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        <span className="text-sm font-medium">Ниво {userData.level}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-full">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm font-medium">{userData.currentXP.toLocaleString()} XP</span>
                    </div>
                </div>

                {/* XP Progress */}
                <div className="text-center mb-6">
                    <p className="text-sm text-white/70 mb-1">
                        До ниво {userData.level + 1} остават: {userData.xpToNextLevel.toLocaleString()} XP
                    </p>
                </div>

                {/* Streak */}
                <div className="flex items-center justify-center gap-3 mb-8">
                    <Flame className="w-6 h-6 text-orange-400" />
                    <span className="text-lg font-medium">{userData.streak} day streak</span>
                </div>

                {/* Daily Missions */}
                <div className="bg-white/10 rounded-lg p-4">
                    <h3 className="text-lg font-medium mb-4 text-center">Дневни мисии</h3>
                    <div className="space-y-3">
                        {dailyMissions.map((mission) => (
                            <div
                                key={mission.id}
                                className={`rounded-lg p-3 border-2 ${mission.completed ? "bg-green-500/20 border-green-400/50" : "bg-white/10 border-white/20"
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className={`w-6 h-6 rounded-full flex items-center justify-center ${mission.completed ? "bg-green-500" : "bg-white/20"
                                            }`}
                                    >
                                        {mission.completed ? (
                                            <Check className="w-4 h-4 text-white" />
                                        ) : (
                                            <span className="text-xs font-bold text-white">{mission.progress}</span>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-white">{mission.title}</p>
                                        {!mission.completed && (
                                            <p className="text-xs text-white/70">
                                                {mission.progress}/{mission.total}
                                            </p>
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
