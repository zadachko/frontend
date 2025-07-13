import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BookOpen, TestTube, GraduationCap, Clock, TrendingUp, ChevronRight, Play, Target } from "lucide-react"
import RecentResource from "./components/RecentResource"
// ...imports stay the same

const page = () => {
    const recentActivities = [
        {
            id: 1,
            type: "test",
            title: "Тест: Геометрия — Триъгълници",
            status: "Недовършен",
            statusType: "warning",
            date: "Преди 2 дни",
            action: "Продължи",
        },
        {
            id: 2,
            type: "task",
            title: "Алгебра — Практика №12",
            status: "Завършен: 85%",
            statusType: "success",
            date: "Преди 1 седмица",
            action: "Виж резултата",
        },
        {
            id: 3,
            type: "test",
            title: "Тест: Дроби и десетични числа",
            status: "Завършен: 60%",
            statusType: "partial",
            date: "Преди 3 дни",
            action: "Виж резултата",
        },
    ]

    const weakTopics = [
        {
            name: "Квадратни уравнения",
            score: 40,
            lastAttempt: "Преди 5 дни",
        },
        {
            name: "Теория на вероятностите",
            score: 55,
            lastAttempt: "Преди 1 седмица",
        },
        {
            name: "Геометрични доказателства",
            score: 35,
            lastAttempt: "Преди 3 дни",
        },
    ]

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* Recent Activity Section */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                        <Clock className="w-6 h-6 text-[#6F58C9]" />
                        Последни задачи и тестове
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {recentActivities.map((activity) => (
                            <RecentResource key={activity.id} activity={activity} />
                        ))}
                    </div>
                </section>

                {/* Create New Test & Exam Simulation Sections */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Create New Test Section */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                            <TestTube className="w-6 h-6 text-[#6F58C9]" />
                            Създай нов тест
                        </h2>
                        <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-[#6F58C9] to-[#5A4BA3] border-0 cursor-pointer">
                            <CardContent className="p-8 text-center text-white">
                                <div className="mb-4">
                                    <div className="inline-flex p-4 rounded-full bg-white/20 mb-4">
                                        <TestTube className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">Създай свой тест</h3>
                                    <p className="text-white/90 mb-6">Избери тема и ниво на трудност</p>
                                </div>
                                <Button size="lg" className="bg-white text-[#6F58C9] hover:bg-gray-100 font-semibold px-8 py-3 h-12">
                                    Започни
                                    <ChevronRight className="w-4 h-4 ml-2" />
                                </Button>
                            </CardContent>
                        </Card>
                    </section>

                    {/* Exam Simulation Section */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                            <GraduationCap className="w-6 h-6 text-[#6F58C9]" />
                            Пробна матура
                        </h2>
                        <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-emerald-500 to-teal-600 border-0 cursor-pointer">
                            <CardContent className="p-8 text-center text-white">
                                <div className="mb-4">
                                    <div className="inline-flex p-4 rounded-full bg-white/20 mb-4">
                                        <GraduationCap className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">Симулация на матура</h3>
                                    <p className="text-white/90 mb-6">Реши тест като на истинския изпит</p>
                                </div>
                                <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 font-semibold px-8 py-3 h-12">
                                    <Play className="w-4 h-4 mr-2" />
                                    Стартирай симулация
                                </Button>
                            </CardContent>
                        </Card>
                    </section>
                </div>

                {/* Weak Topics Practice Section */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                        <Target className="w-6 h-6 text-[#6F58C9]" />
                        Практика по слаби теми
                    </h2>
                    <Card className="bg-white border-0 shadow-md">
                        <CardContent className="p-6">
                            <div className="space-y-4">
                                {weakTopics.map((topic, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                                    >
                                        <div className="flex-1">
                                            <h3 className="font-medium text-gray-900 mb-1">{topic.name}</h3>
                                            <div className="flex items-center gap-3">
                                                <span className="text-sm text-gray-600">Успех: {topic.score}%</span>
                                                <Progress value={topic.score} className="w-24 h-2" />
                                            </div>
                                            <span className="text-xs text-gray-500">Последен опит: {topic.lastAttempt}</span>
                                        </div>
                                        <Button size="sm" className="bg-[#6F58C9] hover:bg-[#5A4BA3] text-white ml-4">
                                            Упражнявай
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* All Tasks Overview Section */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                        <BookOpen className="w-6 h-6 text-[#6F58C9]" />
                        Всички задачи
                    </h2>
                    <Card className="bg-white border-0 shadow-md hover:shadow-lg transition-shadow">
                        <CardContent className="p-8 text-center">
                            <div className="mb-6">
                                <div className="inline-flex p-4 rounded-full bg-[#6F58C9]/10 mb-4">
                                    <TrendingUp className="w-8 h-8 text-[#6F58C9]" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Библиотека с всички задачи</h3>
                                <p className="text-gray-600 mb-4">Решени: 432 от 1987 задачи</p>
                                <Progress value={21.7} className="w-full max-w-md mx-auto h-3 mb-4" />
                                <p className="text-sm text-gray-500">21.7% завършени</p>
                            </div>
                            <Button size="lg" className="bg-[#6F58C9] hover:bg-[#5A4BA3] text-white font-semibold px-8 py-3 h-12">
                                Прегледай всички задачи
                                <ChevronRight className="w-4 h-4 ml-2" />
                            </Button>
                        </CardContent>
                    </Card>
                </section>
            </div>
        </div>
    )
}

export default page
