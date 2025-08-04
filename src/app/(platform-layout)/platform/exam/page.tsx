"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Clock, FileText, AlertCircle, CheckCircle, Play, Target } from "lucide-react";
import ExamRule from "./components/examRule";
import { useState } from "react";
import PreviousResultsCard from "../components/AssessmentPage/PreviousResultsCard";
import AssessmentStartFlow from "../components/AssessmentPage/AssessmentStartFlow";

const Page = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Green color scheme for exam page
    const greenColors = {
        buttonGradient: "from-emerald-500 to-teal-600",
        buttonHoverGradient: "hover:from-emerald-600 hover:to-teal-700",
        iconBg: "bg-amber-50",
        iconColor: "text-amber-600"
    };

    const examRules = [
        {
            icon: Clock,
            text: "90 минути време с видим таймер",
        },
        {
            icon: FileText,
            text: "25 въпроса с избираем отговор покриващи всички теми",
        },
        {
            icon: AlertCircle,
            text: "Няма връщане назад - отговорите са финални след подаване",
        },
        {
            icon: CheckCircle,
            text: "Автоматично подаване при изтичане на времето",
        },
    ];

    // Mock previous exam results
    const previousResults = [
        {
            id: 1,
            date: "15.12.2024",
            score: 85,
            totalQuestions: 25,
            correctAnswers: 21,
            timeSpent: "75 мин",
        },
        {
            id: 2,
            date: "08.12.2024",
            score: 72,
            totalQuestions: 25,
            correctAnswers: 18,
            timeSpent: "82 мин",
        },
        {
            id: 3,
            date: "01.12.2024",
            score: 68,
            totalQuestions: 25,
            correctAnswers: 17,
            timeSpent: "88 мин",
        }
    ];

    const handleStartExam = () => {
        setIsDialogOpen(true);
    };

    const handleConfirmExam = () => {
        setIsDialogOpen(false);
        // Navigate to the exam page
        window.location.href = "/platform/exam/live";
    };

    return (

        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 mx-auto">
            <div className="w-full max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Exam Card */}
                    <div className="lg:col-span-2">
                        <Card className="group hover:shadow-lg transition-all duration-300 bg-white border border-gray-200 shadow-sm h-full">
                            <CardContent className="p-8 text-center h-full flex flex-col justify-center">
                                <div className="mb-6">
                                    <div className="inline-flex p-3 rounded-full bg-emerald-50 mb-4 group-hover:scale-105 transition-transform duration-300">
                                        <Play className="w-8 h-8 text-emerald-600" />
                                    </div>
                                    <h1 className="text-3xl font-semibold text-gray-900 mb-3">Пробен Изпит</h1>
                                    <p className="text-gray-600 text-lg mb-6">Тествай знанията си по математика за 7-ми клас</p>
                                </div>

                                {/* Rules */}
                                <div className="bg-gray-50 rounded-lg p-5 mb-6 border border-gray-100">
                                    <h2 className="text-xl font-medium text-gray-900 mb-4 flex items-center justify-center gap-2">
                                        <Target className="w-5 h-5 text-emerald-600" />
                                        Правила на Изпита
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
                                        {examRules.map((rule, index) => (
                                            <ExamRule key={index} rule={rule} index={index} />
                                        ))}
                                    </div>
                                </div>

                                <AssessmentStartFlow
                                    isDialogOpen={isDialogOpen}
                                    setIsDialogOpen={setIsDialogOpen}
                                    handleStartExam={handleStartExam}
                                    handleConfirmExam={handleConfirmExam}
                                    colors={greenColors}
                                />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Previous Results Sidebar */}
                    <PreviousResultsCard
                        previousResults={previousResults}
                        colors={{
                            buttonGradient: "from-emerald-500 to-teal-600",
                            buttonHoverGradient: "hover:from-emerald-600 hover:to-teal-700"
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default Page;