"use client";

import { Card, CardContent } from "@/components/ui/card";
import { TestTube } from "lucide-react";
import { useState } from "react";
import PreviousResultsCard from "../components/AssessmentPage/PreviousResultsCard";
import AssessmentStartFlow from "../components/AssessmentPage/AssessmentStartFlow";

const Page = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Purple color scheme matching the main platform page
    const purpleColors = {
        buttonGradient: "from-[#6F58C9] to-[#5A4BA3]",
        buttonHoverGradient: "hover:from-[#5A4BA3] hover:to-[#6F58C9]",
        iconBg: "bg-amber-50",
        iconColor: "text-amber-600"
    };

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

        <div className="min-h-screen bg-gray-50 w-screen flex items-center justify-center p-4 mx-auto">
            <div className="w-full max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Exam Card */}
                    <div className="lg:col-span-2">
                        <Card className="group hover:shadow-lg transition-all duration-300 bg-white border border-gray-200 shadow-sm h-full">
                            <CardContent className="p-8 text-center h-full flex flex-col justify-center">
                                <div className="mb-6">
                                    <div className="inline-flex p-3 rounded-full bg-[#6F58C9]/10 mb-4 group-hover:scale-105 transition-transform duration-300">
                                        <TestTube className="w-8 h-8 text-[#6F58C9]" />
                                    </div>
                                    <h1 className="text-3xl font-semibold text-gray-900 mb-3">Пробен Изпит</h1>
                                    <p className="text-gray-600 text-lg mb-6">Тествай знанията си по математика за 7-ми клас</p>
                                </div>

                                <AssessmentStartFlow
                                    isDialogOpen={isDialogOpen}
                                    setIsDialogOpen={setIsDialogOpen}
                                    handleStartExam={handleStartExam}
                                    handleConfirmExam={handleConfirmExam}
                                    colors={purpleColors}
                                />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Previous Results Sidebar */}
                    <PreviousResultsCard previousResults={previousResults} />
                </div>
            </div>
        </div>
    )
}

export default Page;