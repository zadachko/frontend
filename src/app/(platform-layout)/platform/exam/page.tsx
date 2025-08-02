"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Clock, FileText, AlertCircle, CheckCircle, Play, Trophy, Target, Sparkles, TrendingUp, AlertTriangle } from "lucide-react";
import ExamRule from "./components/examRule";
import PreviousExamResult from "./components/previousExamResult";
import { useState } from "react";

const Page = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

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
    const previousExams = [
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
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
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

                                {/* Start Button with Dialog */}
                                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                    <DialogTrigger asChild>
                                        <Button
                                            size="lg"
                                            className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold px-8 py-3 h-12 text-lg transition-all duration-300 shadow-sm"
                                            onClick={handleStartExam}
                                        >
                                            <Play className="w-4 h-4 mr-2" />
                                            Започни Пробен Изпит
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-md">
                                        <DialogHeader>
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="inline-flex p-2 rounded-full bg-amber-50">
                                                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                                                </div>
                                                <DialogTitle className="text-xl font-semibold text-gray-900">
                                                    Потвърди започване на изпита
                                                </DialogTitle>
                                            </div>
                                            <div className="text-gray-600 text-base leading-relaxed">
                                                <p className="mb-3">
                                                    Сигурни ли сте, че искате да започнете пробния изпит? След започване:
                                                </p>
                                                <ul className="list-disc list-inside space-y-1 text-sm">
                                                    <li>Ще имате 90 минути за 25 въпроса</li>
                                                    <li>Няма да можете да се връщате към предишни въпроси</li>
                                                    <li>Изпитът ще се подаде автоматично при изтичане на времето</li>
                                                </ul>
                                            </div>
                                        </DialogHeader>
                                        <DialogFooter className="flex gap-3 sm:justify-end">
                                            <Button
                                                variant="outline"
                                                onClick={() => setIsDialogOpen(false)}
                                                className="border-gray-300 text-gray-700 hover:bg-gray-50"
                                            >
                                                Отказ
                                            </Button>
                                            <Button
                                                onClick={handleConfirmExam}
                                                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white"
                                            >
                                                <Play className="w-4 h-4 mr-2" />
                                                Започни Изпита
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Previous Results Sidebar */}
                    <div className="lg:col-span-1">
                        <Card className="h-full shadow-sm border border-gray-200 bg-white">
                            <CardContent className="p-6 h-full flex flex-col">
                                <div className="flex items-center gap-2 mb-5">
                                    <Trophy className="w-5 h-5 text-amber-500" />
                                    <h2 className="text-xl font-medium text-gray-900">Предни Резултати</h2>
                                </div>

                                {previousExams.length > 0 ? (
                                    <div className="space-y-3 flex-1">
                                        {previousExams.map((exam) => (
                                            <PreviousExamResult key={exam.id} exam={exam} />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex-1 flex flex-col items-center justify-center text-center py-6">
                                        <div className="mb-4">
                                            <div className="inline-flex p-3 rounded-full bg-amber-50 mb-3">
                                                <Sparkles className="w-8 h-8 text-amber-500" />
                                            </div>
                                            <h3 className="text-xl font-medium text-gray-900 mb-2">Първият ти изпит</h3>
                                            <p className="text-gray-600 text-base mb-4">
                                                Направи първия си пробен изпит и започни да следваш прогреса си
                                            </p>
                                        </div>

                                        <div className="space-y-3 w-full">
                                            <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <TrendingUp className="w-4 h-4 text-amber-500" />
                                                    <span className="text-base font-medium text-gray-700">Следвай прогреса</span>
                                                </div>
                                                <p className="text-sm text-gray-500">
                                                    Виждай как се подобряваш с всеки изпит
                                                </p>
                                            </div>

                                            <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <Trophy className="w-4 h-4 text-amber-500" />
                                                    <span className="text-base font-medium text-gray-700">Постигай цели</span>
                                                </div>
                                                <p className="text-sm text-gray-500">
                                                    Стигай до 100% и стани майстор на математиката
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page;