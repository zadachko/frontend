"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TestTube, GraduationCap, Clock, CheckCircle, Calendar } from "lucide-react"
import type { TestResult } from "@/types"

interface ResultRowProps {
    result: TestResult
    onClick?: () => void
    hideIcon?: boolean
}

export const ResultRow = ({ result, onClick, hideIcon = false }: ResultRowProps) => {
    const isExam = result.type === "exam"
    const iconBg = isExam ? "bg-emerald-100" : "bg-purple-100"
    const iconColor = isExam ? "text-emerald-600" : "text-purple-600"

    const getProgressColor = (score: number) => {
        if (score >= 80) return "#10b981"
        if (score >= 60) return "#f59e0b"
        return "#ef4444"
    }

    const getGrade = (percentage: number): string => {
        const grade = (2 + (percentage / 100) * 4).toFixed(2)
        return grade
    }

    return (
        <Card
            className="hover:shadow-lg hover:scale-[1.02] transition-all duration-200 bg-white border border-gray-200 cursor-pointer"
            onClick={onClick}
        >
            <CardContent className="p-3 sm:px-6 sm:py-4">
                {/* Mobile Layout */}
                <div className="sm:hidden">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                            {!hideIcon && (
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${iconBg}`}>
                                    {isExam ? (
                                        <GraduationCap className={`w-4 h-4 ${iconColor}`} />
                                    ) : (
                                        <TestTube className={`w-4 h-4 ${iconColor}`} />
                                    )}
                                </div>
                            )}
                            <Badge variant="secondary" className={`${iconBg} ${iconColor} text-xs`}>
                                {isExam ? "Матура" : "Тест"}
                            </Badge>
                        </div>
                        <h3 className="font-semibold text-gray-900 truncate text-sm">{result.title}</h3>

                        {/* Circular Progress - Smaller for mobile */}
                        <div className="relative w-12 h-12 flex items-center justify-center ml-2">
                            <svg className="w-12 h-12" viewBox="0 0 36 36">
                                <path
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    stroke="#e5e7eb"
                                    strokeWidth="2"
                                />
                                <path
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    stroke={getProgressColor(result.percentage)}
                                    strokeWidth="2"
                                    strokeDasharray={`${result.percentage}, 100`}
                                    strokeLinecap="round"
                                    className="transition-all duration-500 origin-center"
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-xs font-semibold text-gray-900">{getGrade(result.percentage)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-600">
                        <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-gray-500" />
                            <span>{result.date}</span>
                        </div>
                        {result.duration && (
                            <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3 text-blue-500" />
                                <span className="text-blue-700">{result.duration}</span>
                            </div>
                        )}
                        <div className="flex items-center gap-1">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            <span className="text-green-700 font-medium">
                                {result.correctAnswers}/{result.totalQuestions}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden sm:flex sm:items-center justify-between gap-4">
                    {/* Left Side */}
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                        <div className="flex flex-col gap-2 w-full">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                                {!hideIcon && (
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconBg}`}>
                                        {isExam ? (
                                            <GraduationCap className={`w-5 h-5 ${iconColor}`} />
                                        ) : (
                                            <TestTube className={`w-5 h-5 ${iconColor}`} />
                                        )}
                                    </div>
                                )}

                                <div className="flex-1 min-w-0 flex items-center gap-2">
                                    <Badge variant="secondary" className={`${iconBg} ${iconColor} text-xs flex-shrink-0`}>
                                        {isExam ? "Матура" : "Тест"}
                                    </Badge>
                                    <h3 className="font-semibold text-gray-900 truncate">{result.title}</h3>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4 text-gray-500" />
                                    <span>{result.date}</span>
                                </div>
                                {result.duration && (
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-4 h-4 text-blue-500" />
                                        <span className="text-blue-700">{result.duration}</span>
                                    </div>
                                )}
                                <div className="flex items-center gap-1">
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                    <span className="text-green-700 font-medium">
                                        {result.correctAnswers}/{result.totalQuestions}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="flex justify-center sm:justify-end">
                        <div className="relative w-16 h-16 flex items-center justify-center">
                            <svg className="w-16 h-16" viewBox="0 0 36 36">
                                <path
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    stroke="#e5e7eb"
                                    strokeWidth="2"
                                />
                                <path
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    stroke={getProgressColor(result.percentage)}
                                    strokeWidth="2"
                                    strokeDasharray={`${result.percentage}, 100`}
                                    strokeLinecap="round"
                                    className="transition-all duration-500 origin-center"
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-md font-semibold text-gray-900">{getGrade(result.percentage)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
