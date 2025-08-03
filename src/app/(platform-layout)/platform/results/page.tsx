"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { TestTube, GraduationCap, Clock, CheckCircle, Calendar, BarChart3, Eye, Trophy, Target } from "lucide-react"
import { useState } from "react"
import Sidebar from "@/components/Sidebar/Sidebar"

interface TestResult {
    id: string
    type: "test" | "exam"
    title: string
    date: string
    correctAnswers: number
    totalQuestions: number
    percentage: number
    duration?: string
}

const Page = () => {
    const [activeTab, setActiveTab] = useState("all")

    // Mock data for results
    const results: TestResult[] = [
        // {
        //     id: "1",
        //     type: "test",
        //     title: "Геометрия — Триъгълници",
        //     date: "12.12.2024",
        //     correctAnswers: 16,
        //     totalQuestions: 20,
        //     percentage: 100,
        // },
        {
            id: "2",
            type: "exam",
            title: "Пробен изпит №2",
            date: "08.12.2024",
            correctAnswers: 13,
            totalQuestions: 25,
            percentage: 90,
            duration: "85 мин",
        },
        // {
        //     id: "3",
        //     type: "test",
        //     title: "Алгебра — Квадратни уравнения",
        //     date: "05.12.2024",
        //     correctAnswers: 7,
        //     totalQuestions: 18,
        //     percentage: 80,
        // },
        {
            id: "4",
            type: "exam",
            title: "Пробен изпит №3",
            date: "15.12.2024",
            correctAnswers: 25,
            totalQuestions: 25,
            percentage: 72,
            duration: "82 мин",
        },
        // {
        //     id: "5",
        //     type: "test",
        //     title: "Геометрия — Триъгълници",
        //     date: "12.12.2024",
        //     correctAnswers: 16,
        //     totalQuestions: 20,
        //     percentage: 62,
        // },
        {
            id: "6",
            type: "exam",
            title: "Пробен изпит №2",
            date: "08.12.2024",
            correctAnswers: 13,
            totalQuestions: 25,
            percentage: 52,
            duration: "85 мин",
        },
        // {
        //     id: "7",
        //     type: "test",
        //     title: "Алгебра — Квадратни уравнения",
        //     date: "05.12.2024",
        //     correctAnswers: 7,
        //     totalQuestions: 18,
        //     percentage: 39,
        // },
        {
            id: "8",
            type: "test",
            title: "Дроби и десетични числа",
            date: "01.12.2024",
            correctAnswers: 3,
            totalQuestions: 22,
            percentage: 28,
        },
        // {
        //     id: "9",
        //     type: "exam",
        //     title: "Пробен изпит №1",
        //     date: "28.11.2024",
        //     correctAnswers: 5,
        //     totalQuestions: 25,
        //     percentage: 14,
        //     duration: "88 мин",
        // },
    ]


    const filteredResults = results.filter((result) => {
        if (activeTab === "all") return true
        if (activeTab === "tests") return result.type === "test"
        if (activeTab === "exams") return result.type === "exam"
        return true
    })

    const ResultRow = ({ result }: { result: TestResult }) => {
        const isExam = result.type === "exam";
        const iconBg = isExam ? "bg-emerald-100" : "bg-purple-100";
        const iconColor = isExam ? "text-emerald-600" : "text-purple-600";

        const getSmoothColor = (percentage: number): string => {
            const clamped = Math.max(0, Math.min(percentage, 100));
            let hue: number;

            if (clamped <= 50) {
                // Red to Yellow: hue 0 → 60
                hue = (clamped / 50) * 60;
            } else if (clamped <= 85) {
                // Yellow to Yellow-Green: hue 60 → 85 (slight hue shift)
                hue = 60 + ((clamped - 50) / 35) * 25;
            } else {
                // Yellow-Green to Green: hue 85 → 120 (stronger hue shift)
                hue = 85 + ((clamped - 85) / 15) * 35;
            }

            return `hsl(${hue}, 100%, 45%)`; // Slightly darker green tone
        };



        return (
            <Card className="hover:shadow-md transition-all duration-200 bg-white border border-gray-200">
                <CardContent className="px-4 sm:px-6 py-4">
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
                                        <Calendar className="w-3 h-3" />
                                        <span>{result.date}</span>
                                    </div>
                                    {result.duration && (
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            <span>{result.duration}</span>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-1">
                                        <CheckCircle className="w-3 h-3" />
                                        <span>
                                            {result.correctAnswers}/{result.totalQuestions}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side */}
                        <div className="flex flex-col items-end justify-center gap-2 sm:w-36 w-full">
                            <div className="w-full">
                                <div className="text-right text-lg font-bold text-gray-800">{result.percentage}%</div>
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
                            <Button
                                size="sm"
                                className="bg-[#6F58C9] hover:bg-[#5A4BA3] text-white w-full sm:w-auto"
                            >
                                <Eye className="w-4 h-4 sm:mr-1" />
                                <span className="hidden sm:inline">Виж</span>
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        )
    }

    const EmptyState = ({ type }: { type: string }) => (
        <div className="text-center py-16">
            <div className="mb-6">
                <div className="inline-flex p-4 rounded-full bg-gray-100 mb-4">
                    {type === "tests" ? (
                        <TestTube className="w-12 h-12 text-gray-400" />
                    ) : type === "exams" ? (
                        <GraduationCap className="w-12 h-12 text-gray-400" />
                    ) : (
                        <BarChart3 className="w-12 h-12 text-gray-400" />
                    )}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {type === "tests"
                        ? "Все още нямаш решени тестове"
                        : type === "exams"
                            ? "Все още нямаш решени матури"
                            : "Все още нямаш решени тестове или матури"}
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    {type === "tests"
                        ? "Започни да решаваш тестове по различни теми, за да видиш резултатите си тук."
                        : type === "exams"
                            ? "Направи първия си пробен изпит, за да започнеш да следваш прогреса си."
                            : "Започни своето обучение, като създадеш първия си тест или направиш пробна матура."}
                </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                {type !== "exams" && (
                    <Button className="bg-[#6F58C9] hover:bg-[#5A4BA3] text-white">
                        <TestTube className="w-4 h-4 mr-2" />
                        Започни тест
                    </Button>
                )}
                {type !== "tests" && (
                    <Button
                        variant="outline"
                        className="border-[#6F58C9] text-[#6F58C9] hover:bg-[#6F58C9] hover:text-white bg-transparent"
                    >
                        <GraduationCap className="w-4 h-4 mr-2" />
                        Направи пробна матура
                    </Button>
                )}
            </div>
        </div>
    )

    const StatsCards = () => {
        const avgScore = Math.round(results.reduce((sum, r) => sum + r.percentage, 0) / results.length)
        const bestScore = Math.max(...results.map((r) => r.percentage))
        const totalTests = results.filter((r) => r.type === "test").length
        const totalExams = results.filter((r) => r.type === "exam").length

        const cardData = [
            { label: "Най-добър резултат", value: `${bestScore}%`, icon: Trophy, color: "bg-blue-100", iconColor: "text-blue-600" },
            { label: "Среден резултат", value: `${avgScore}%`, icon: Target, color: "bg-amber-100", iconColor: "text-amber-600" },
            { label: "Решени тестове", value: totalTests, icon: TestTube, color: "bg-purple-100", iconColor: "text-purple-600" },
            { label: "Решени матури", value: totalExams, icon: GraduationCap, color: "bg-emerald-100", iconColor: "text-emerald-600" },
        ]

        return (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
                {cardData.map((card, index) => (
                    <Card
                        key={index}
                        className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 px-3 py-3"
                    >
                        <CardContent className="flex flex-col items-center justify-center gap-2 p-0">
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center ${card.color}`}>
                                <card.icon className={`w-4 h-4 ${card.iconColor}`} />
                            </div>
                            <div className="text-lg font-bold text-gray-900 leading-tight">{card.value}</div>
                            <div className="text-xs text-center text-gray-500 leading-tight">{card.label}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        )
    }


    return (
        <div className="flex flex-1 h-full w-full overflow-hidden">
            <div className="hidden md:block h-full w-80 flex-shrink-0">
                <Sidebar />
            </div>

            <div className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6 lg:p-8">
                <div className="max-w-6xl mx-auto space-y-6">
                    {/* Header */}
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3 justify-center md:justify-start">
                            <BarChart3 className="w-8 h-8 text-[#6F58C9]" />
                            Предни резултати
                        </h1>
                        <p className="text-gray-600 text-lg max-w-3xl">
                            Виж всичките си резултати от тестове и пробни матури, следи напредъка си и открий своите силни и слаби
                            страни.
                        </p>
                    </div>

                    {/* Stats Cards */}
                    {results.length > 0 && <StatsCards />}

                    {/* Tabs */}
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid w-full grid-cols-3 max-w-md">
                            <TabsTrigger value="all" className="flex items-center gap-2">
                                <BarChart3 className="w-4 h-4" />
                                Всички ({results.length})
                            </TabsTrigger>
                            <TabsTrigger value="tests" className="flex items-center gap-2">
                                <TestTube className="w-4 h-4" />
                                Тестове ({results.filter((r) => r.type === "test").length})
                            </TabsTrigger>
                            <TabsTrigger value="exams" className="flex items-center gap-2">
                                <GraduationCap className="w-4 h-4" />
                                Матури ({results.filter((r) => r.type === "exam").length})
                            </TabsTrigger>
                        </TabsList>

                        {/* Results Content */}
                        <div className="mt-6">
                            <TabsContent value="all" className="mt-0">
                                {filteredResults.length > 0 ? (
                                    <div className="space-y-3">
                                        {filteredResults.map((result) => (
                                            <ResultRow key={result.id} result={result} />
                                        ))}
                                    </div>
                                ) : (
                                    <EmptyState type="all" />
                                )}
                            </TabsContent>

                            <TabsContent value="tests" className="mt-0">
                                {filteredResults.length > 0 ? (
                                    <div className="space-y-3">
                                        {filteredResults.map((result) => (
                                            <ResultRow key={result.id} result={result} />
                                        ))}
                                    </div>
                                ) : (
                                    <EmptyState type="tests" />
                                )}
                            </TabsContent>

                            <TabsContent value="exams" className="mt-0">
                                {filteredResults.length > 0 ? (
                                    <div className="space-y-3">
                                        {filteredResults.map((result) => (
                                            <ResultRow key={result.id} result={result} />
                                        ))}
                                    </div>
                                ) : (
                                    <EmptyState type="exams" />
                                )}
                            </TabsContent>
                        </div>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

export default Page
