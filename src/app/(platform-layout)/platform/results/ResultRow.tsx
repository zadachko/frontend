import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TestTube, GraduationCap, Clock, CheckCircle, Calendar, Eye } from "lucide-react"
import type { TestResult } from "./test-result"

interface ResultRowProps {
    result: TestResult
}

export const ResultRow = ({ result }: ResultRowProps) => {
    const isExam = result.type === "exam"
    const iconBg = isExam ? "bg-emerald-100" : "bg-purple-100"
    const iconColor = isExam ? "text-emerald-600" : "text-purple-600"

    const getSmoothColor = (percentage: number): string => {
        const clamped = Math.max(0, Math.min(percentage, 100))
        let hue: number

        if (clamped <= 50) {
            hue = (clamped / 50) * 60
        } else if (clamped <= 85) {
            hue = 60 + ((clamped - 50) / 35) * 25
        } else {
            hue = 85 + ((clamped - 85) / 15) * 35
        }

        return `hsl(${hue}, 100%, 45%)`
    }

    const getGrade = (percentage: number): string => {
        const grade = (2 + (percentage / 100) * 4).toFixed(2)
        return grade
    }

    return (
        <Card className="hover:shadow-md transition-all duration-200 bg-white border border-gray-200">
            <CardContent className="px-4 sm:px-6 py-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    {/* Left Side */}
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                        <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${iconBg}`}>
                            {isExam ? (
                                <GraduationCap className={`w-5 h-5 ${iconColor}`} />
                            ) : (
                                <TestTube className={`w-5 h-5 ${iconColor}`} />
                            )}
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <Badge variant="secondary" className={`${iconBg} ${iconColor} text-xs`}>
                                    {isExam ? "Матура" : "Тест"}
                                </Badge>
                                <h3 className="font-semibold text-gray-900 truncate">{result.title}</h3>
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
                    <div className="flex flex-col items-end justify-center gap-2 sm:w-36 w-full">
                        <div className="w-full">
                            <div className="text-right text-lg font-bold text-gray-800">
                                {result.percentage}% <span className="text-[0.9375rem] font-normal text-gray-600">({getGrade(result.percentage)})</span>
                            </div>
                            <div className="w-full h-2 rounded bg-gray-200 mt-1 overflow-hidden">
                                <div
                                    className="h-full transition-all duration-300"
                                    style={{
                                        width: `${result.percentage}%`,
                                        backgroundColor: getSmoothColor(result.percentage),
                                    }}
                                />
                            </div>
                        </div>
                        <Button size="sm" className="bg-[#6F58C9] hover:bg-[#5A4BA3] text-white w-full sm:w-auto">
                            <Eye className="w-4 h-4 sm:mr-1" />
                            <span className="hidden sm:inline">Виж</span>
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
