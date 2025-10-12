"use client"

import { useState } from "react";
import { BarChart3 } from "lucide-react";
import Sidebar from "@/components/Sidebar/Sidebar";
import { StatsCards } from "@/features/results/StatsCards";
import { ResultsTabs } from "@/features/results/ResultsTabs";

import type { TestResult } from "@/types"

const Page = () => {
    const [activeTab, setActiveTab] = useState("all")

    // Mock data for results
    const results: TestResult[] = [
        {
            id: "5",
            type: "exam",
            title: "Пробен изпит №3",
            date: "08.12.2024",
            correctAnswers: 13,
            totalQuestions: 25,
            percentage: 90,
            duration: "85 мин",
        },
        {
            id: "4",
            type: "test",
            title: "Алгебра — Квадратни уравнения",
            date: "05.12.2024",
            correctAnswers: 7,
            totalQuestions: 18,
            percentage: 80,
        },
        {
            id: "3",
            type: "exam",
            title: "Пробен изпит №2",
            date: "15.12.2024",
            correctAnswers: 25,
            totalQuestions: 25,
            percentage: 72,
            duration: "82 мин",
        },
        {
            id: "2",
            type: "exam",
            title: "Пробен изпит №1",
            date: "08.12.2024",
            correctAnswers: 13,
            totalQuestions: 25,
            percentage: 52,
            duration: "85 мин",
        },
        {
            id: "1",
            type: "test",
            title: "Дроби и десетични числа",
            date: "01.12.2024",
            correctAnswers: 3,
            totalQuestions: 22,
            percentage: 28,
        },
    ]

    return (
        <div className="flex flex-1 h-full w-full overflow-hidden">
            <div className="hidden md:block h-full w-64 lg:w-72 xl:w-80 flex-shrink-0">
                <Sidebar />
            </div>

            <div className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6 lg:p-8">
                <div className="max-w-5xl mx-auto space-y-6">
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
                    {results.length > 0 && <StatsCards results={results} />}

                    {/* Results Tabs */}
                    <ResultsTabs results={results} activeTab={activeTab} onTabChange={setActiveTab} />
                </div>
            </div>
        </div>
    )
}

export default Page
