import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, FileText, AlertCircle, CheckCircle, Play, Trophy, Target, Sparkles, TrendingUp } from "lucide-react";
import ExamRule from "./components/examRule";
import PreviousExamResult from "./components/previousExamResult";
import Link from "next/link";

const page = () => {
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

                                {/* Start Button */}
                                <Link href="/platform/exam/live">
                                    <Button
                                        asChild
                                        size="lg"
                                        className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold px-8 py-3 h-12 text-lg transition-all duration-300 shadow-sm"
                                    >
                                        <span>
                                            <Play className="w-4 h-4 mr-2" />
                                            Започни Пробен Изпит
                                        </span>
                                    </Button>
                                </Link>
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

export default page;