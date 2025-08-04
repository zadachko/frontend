export interface UserData {
    name: string
    email: string
    level: number
    currentXP: number
    xpToNextLevel: number
    avatar: string
}

export interface StreakData {
    current: number
    longest: number
    thisWeek: boolean[]
    thisMonth: number
    total: number
}

export interface ProblemCategory {
    name: string
    icon: any
    problems: number
    bgColor: string
    iconColor: string
    href: string
}

export interface DailyMission {
    id: number
    title: string
    completed: boolean
    progress: number
    total: number
}

export interface Notification {
    id: number
    title: string
    description: string
    time: string
    type: "info" | "success" | "warning"
    color: string
}

export type MobileMenuType = null | "streak" | "notifications" | "account" | "categories"
