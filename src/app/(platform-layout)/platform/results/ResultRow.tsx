"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TestTube2, GraduationCap, Clock, CheckCircle2, CalendarDays, Dot } from "lucide-react"
import type { TestResult } from "@/types"
import { useRouter } from "next/navigation"

interface ResultRowProps {
    result: TestResult
    onClick?: () => void
    hideIcon?: boolean
}

export const ResultRow = ({ result, onClick, hideIcon = false }: ResultRowProps) => {
    const router = useRouter()
    const isExam = result.type === "exam"
    const chipBg = isExam ? "bg-emerald-50" : "bg-violet-50"
    const chipText = isExam ? "text-emerald-700" : "text-violet-700"
    const chipIcon = isExam ? (
        <GraduationCap className="h-3.5 w-3.5" />
    ) : (
        <TestTube2 className="h-3.5 w-3.5" />
    )

    const getProgressColor = (score: number) => {
        if (score >= 80) return "#10b981"
        if (score >= 60) return "#f59e0b"
        return "#ef4444"
    }

    const getGrade = (percentage: number): string => {
        const grade = (2 + (percentage / 100) * 4).toFixed(2)
        return grade
    }

    // tiny reusable chip (replaces the big square icon + loud badge)
    const TypeChip = () => (
        <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${isExam ? "bg-emerald-100 text-emerald-800" : "bg-violet-100 text-violet-800"
                }`}
        >
            {isExam ? (
                <GraduationCap className="h-3.5 w-3.5" />
            ) : (
                <TestTube2 className="h-3.5 w-3.5" />
            )}
            {isExam ? "Матура" : "Тест"}
        </span>
    )

    const handleClick = () => {
        if (onClick) {
            onClick()
            return
        }
        router.push("/platform/exam/overview")
    }

    return (
        <Card
            className="hover:shadow-lg hover:scale-[1.02] transition-all duration-200 bg-white border border-gray-200 cursor-pointer py-4 lg:py-6"
            onClick={handleClick}
        >
            <CardContent className="p-3 sm:px-6 sm:py-4">
                {/* Mobile */}
                <div className="sm:hidden">
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2.5">
                                <TypeChip />
                                <h3 className="font-semibold text-gray-900 text-[15px] leading-5 truncate">
                                    {result.title}
                                </h3>
                            </div>

                            {/* Meta row */}
                            <div className="mt-1 flex items-center flex-wrap gap-x-2 gap-y-1 text-[12px] text-gray-600">
                                <span className="inline-flex items-center gap-1.5">
                                    <CalendarDays className="w-3.5 h-3.5 text-gray-500" />
                                    {result.date}
                                </span>

                                {result.duration && (
                                    <>
                                        <Dot className="w-4 h-4 -mx-1 text-gray-300" />
                                        <span className="inline-flex items-center gap-1.5">
                                            <Clock className="w-3.5 h-3.5" />
                                            <span className="text-gray-700">{result.duration}</span>
                                        </span>
                                    </>
                                )}

                                <>
                                    <Dot className="w-4 h-4 -mx-1 text-gray-300" />
                                    <span className="inline-flex items-center gap-1.5">
                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                        <span className="text-gray-700 font-medium">
                                            {result.correctAnswers}/{result.totalQuestions}
                                        </span>
                                    </span>
                                </>
                            </div>
                        </div>

                        {/* Progress ring */}
                        <div className="relative w-12 h-12 shrink-0">
                            <svg className="w-12 h-12" viewBox="0 0 36 36">
                                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e5e7eb" strokeWidth="2" />
                                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke={getProgressColor(result.percentage)} strokeWidth="2" strokeDasharray={`${result.percentage}, 100`} strokeLinecap="round" className="transition-all duration-500 origin-center" />
                            </svg>
                            <div className="absolute inset-0 grid place-items-center">
                                <span className="text-xs font-semibold text-gray-900">{getGrade(result.percentage)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Desktop */}
                <div className="hidden sm:flex sm:items-center justify-between gap-6">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1.5">
                            <TypeChip />
                            <h3 className="font-semibold text-gray-900 text-[17px] leading-6 truncate">
                                {result.title}
                            </h3>
                        </div>

                        <div className="flex items-center flex-wrap gap-x-1 gap-y-1 text-sm text-gray-600">
                            <span className="inline-flex items-center gap-1.5">
                                <CalendarDays className="w-4 h-4 text-gray-500" />
                                {result.date}
                            </span>

                            {result.duration && (
                                <>
                                    <Dot className="w-5 h-5 -mx-1 text-gray-300" />
                                    <span className="inline-flex items-center gap-1.5">
                                        <Clock className="w-4 h-4" />
                                        <span className="text-gray-700">{result.duration}</span>
                                    </span>
                                </>
                            )}

                            <>
                                <Dot className="w-5 h-5 -mx-1 text-gray-300" />
                                <span className="inline-flex items-center gap-1.5">
                                    <CheckCircle2 className="w-4 h-4" />
                                    <span className="text-gray-700 font-medium">
                                        {result.correctAnswers}/{result.totalQuestions}
                                    </span>
                                </span>
                            </>
                        </div>
                    </div>

                    {/* Right: progress ring unchanged */}
                    <div className="relative w-16 h-16 shrink-0">
                        <svg className="w-16 h-16" viewBox="0 0 36 36">
                            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e5e7eb" strokeWidth="2" />
                            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke={getProgressColor(result.percentage)} strokeWidth="2" strokeDasharray={`${result.percentage}, 100`} strokeLinecap="round" className="transition-all duration-500 origin-center" />
                        </svg>
                        <div className="absolute inset-0 grid place-items-center">
                            <span className="text-[15px] font-semibold text-gray-900">{getGrade(result.percentage)}</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
