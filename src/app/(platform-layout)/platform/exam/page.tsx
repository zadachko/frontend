import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, FileText, AlertCircle, CheckCircle, Play, Trophy, Calendar, Target } from "lucide-react";

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

    const getProgressColor = (score: number) => {
        if (score >= 80) return "#fbbf24"; // amber
        if (score >= 60) return "#f59e0b"; // yellow
        return "#ef4444"; // red
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-6xl">
                {/* <div className="mb-6">
                    <Link href="/">
                        <Button variant="outline" size="sm" className="border-gray-300 bg-transparent hover:bg-gray-100 transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Назад към Таблото
                        </Button>
                    </Link>
                </div> */}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Exam Card */}
                    <div className="lg:col-span-2">
                        <Card className="group hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-emerald-500 to-teal-600 border-0 shadow-lg">
                            <CardContent className="p-12 text-center text-white">
                                <div className="mb-8">
                                    <div className="inline-flex p-4 rounded-full bg-white/20 mb-6 group-hover:scale-110 transition-transform duration-300">
                                        <Play className="w-12 h-12" />
                                    </div>
                                    <h1 className="text-3xl font-bold mb-4">Пробен Изпит</h1>
                                    <p className="text-white/90 text-lg mb-8">Тествай знанията си по математика за 7-ми клас</p>
                                </div>

                                {/* Rules */}
                                <div className="bg-white/10 rounded-lg p-6 mb-8 backdrop-blur-sm">
                                    <h2 className="text-xl font-semibold mb-4 text-white flex items-center justify-center gap-2">
                                        <Target className="w-5 h-5" />
                                        Правила на Изпита
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                                        {examRules.map((rule, index) => (
                                            <div key={index} className="flex items-start gap-3 group/rule hover:bg-white/5 p-2 rounded transition-colors">
                                                <div className="p-2 rounded-lg bg-white/20 flex-shrink-0 mt-0.5 group-hover/rule:bg-white/30 transition-colors">
                                                    <rule.icon className="w-5 h-5 text-white" />
                                                </div>
                                                <span className="text-white/90 text-sm leading-relaxed">{rule.text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Start Button */}
                                <Button
                                    size="lg"
                                    className="bg-white text-emerald-600 hover:bg-gray-100 font-semibold px-12 py-4 h-14 text-lg transition-all duration-300 hover:scale-105 shadow-lg"
                                >
                                    <Play className="w-5 h-5 mr-3" />
                                    Започни Пробен Изпит
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Previous Results Sidebar */}
                    <div className="lg:col-span-1">
                        <Card className="h-fit shadow-lg border-0 bg-gradient-to-br from-emerald-500 to-teal-600">
                            <CardContent className="p-6 text-white">
                                <div className="flex items-center gap-2 mb-6">
                                    <Trophy className="w-6 h-6 text-amber-300" />
                                    <h2 className="text-xl font-semibold text-white">Предни Резултати</h2>
                                </div>

                                {previousExams.length > 0 ? (
                                    <div className="space-y-4">
                                        {previousExams.map((exam) => (
                                            <div key={exam.id} className="p-4 bg-white/10 rounded-lg hover:bg-white/15 transition-colors backdrop-blur-sm">
                                                <div className="flex items-center justify-between mb-3">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="w-4 h-4 text-white/70" />
                                                        <span className="text-md text-white/80">{exam.date}</span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <div className="flex-1">
                                                        <div className="text-md text-white/80 mb-1">
                                                            {exam.correctAnswers}/{exam.totalQuestions} правилни
                                                        </div>
                                                        <div className="text-sm text-white/60">
                                                            {exam.timeSpent}
                                                        </div>
                                                    </div>

                                                    {/* Circular Progress */}
                                                    <div className="relative w-16 h-16 flex items-center justify-center">
                                                        <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                                                            {/* Background circle */}
                                                            <path
                                                                d="M18 2.0845
                                                                    a 15.9155 15.9155 0 0 1 0 31.831
                                                                    a 15.9155 15.9155 0 0 1 0 -31.831"
                                                                fill="none"
                                                                stroke="rgba(255,255,255,0.2)"
                                                                strokeWidth="2"
                                                            />
                                                            {/* Progress circle */}
                                                            <path
                                                                d="M18 2.0845
                                                                    a 15.9155 15.9155 0 0 1 0 31.831
                                                                    a 15.9155 15.9155 0 0 1 0 -31.831"
                                                                fill="none"
                                                                stroke={getProgressColor(exam.score)}
                                                                strokeWidth="2"
                                                                strokeDasharray={`${exam.score}, 100`}
                                                                strokeLinecap="round"
                                                                className="transition-all duration-500"
                                                            />
                                                        </svg>
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <span className="text-lg font-bold text-white">
                                                                {exam.score}%
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-white/70">
                                        <FileText className="w-12 h-12 mx-auto mb-4 text-white/30" />
                                        <p className="text-sm">Все още нямате резултати</p>
                                        <p className="text-xs text-white/50 mt-1">Направете първия си изпит</p>
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