import type { ComponentType } from 'react'

export interface ProblemCategory {
    name: string
    icon: ComponentType<{ className?: string }>
    problems: number
    bgColor: string
    iconColor: string
    href: string
}

export interface Category {
    name: string
    problems: number
    completed: number
    bgColor: string
    iconColor?: string
    icon?: ComponentType<{ className?: string }>
}

export interface WeakTopic {
    name: string
    score: number
    lastAttempt: string
} 