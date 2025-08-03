import { Calculator, Ruler, Hash, BarChart3, FileText, Sigma } from "lucide-react"
import type { UserData, StreakData, ProblemCategory, DailyMission, Notification } from "./navbar-types"

export const userData: UserData = {
    name: "Антон Янков",
    email: "anton@example.com",
    level: 111,
    currentXP: 46214,
    xpToNextLevel: 8795,
    avatar: "/avatar.png",
}

export const streakData: StreakData = {
    current: 8,
    longest: 15,
    thisWeek: [true, true, false, true, true, true, true], // Mon-Sun
    thisMonth: 22, // days active this month
    total: 156, // total days active
}

export const problemCategories: ProblemCategory[] = [
    {
        name: "Алгебра",
        icon: Calculator,
        problems: 324,
        bgColor: "bg-purple-100",
        iconColor: "text-purple-600",
        href: "/platform/categories/algebra",
    },
    {
        name: "Геометрия",
        icon: Ruler,
        problems: 267,
        bgColor: "bg-blue-100",
        iconColor: "text-blue-600",
        href: "/platform/categories/geometry",
    },
    {
        name: "Дроби",
        icon: Hash,
        problems: 198,
        bgColor: "bg-green-100",
        iconColor: "text-green-600",
        href: "/platform/categories/fractions",
    },
    {
        name: "Статистика",
        icon: BarChart3,
        problems: 145,
        bgColor: "bg-orange-100",
        iconColor: "text-orange-600",
        href: "/platform/categories/statistics",
    },
    {
        name: "Текстови задачи",
        icon: FileText,
        problems: 289,
        bgColor: "bg-pink-100",
        iconColor: "text-pink-600",
        href: "/platform/categories/word-problems",
    },
    {
        name: "Пре-алгебра",
        icon: Sigma,
        problems: 176,
        bgColor: "bg-teal-100",
        iconColor: "text-teal-600",
        href: "/platform/categories/pre-algebra",
    },
]

export const dailyMissions: DailyMission[] = [
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

export const mockNotifications: Notification[] = [
    {
        id: 1,
        title: "Нов тест е достъпен",
        description: "Алгебра - Квадратни уравнения",
        time: "Преди 2 часа",
        type: "info",
        color: "bg-[#755bc5]",
    },
    {
        id: 2,
        title: "Постижение отключено!",
        description: "Решихте 50 задачи по геометрия",
        time: "Преди 1 ден",
        type: "success",
        color: "bg-green-500",
    },
    {
        id: 3,
        title: "Седмичен отчет",
        description: "Вашият прогрес за тази седмица",
        time: "Преди 3 дни",
        type: "warning",
        color: "bg-yellow-500",
    },
]

export const weekDays = ["П", "В", "С", "Ч", "П", "С", "Н"]
