import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, TestTube, GraduationCap, Clock, ChevronRight, Play, Target, Calculator, Ruler, Hash, BarChart3, FileText, Sigma } from "lucide-react";
import RecentResourceCard from "./components/RecentResourceCard";
import WeakTopicCard from "./components/WeakTopicCard";
import ProblemsCategory from "./components/ProblemsCategory";
import WeakTopicMissingCard from "./components/WeakTopicMissingCard";
import Link from "next/link";
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
    const problemCategories = [
        {
            name: "Алгебра",
            icon: Calculator,
            problems: 324,
            completed: 89,
            bgColor: "bg-purple-100",
            iconColor: "text-purple-600",
        },
        {
            name: "Геометрия",
            icon: Ruler,
            problems: 267,
            completed: 156,
            bgColor: "bg-blue-100",
            iconColor: "text-blue-600",
        },
        {
            name: "Дроби",
            icon: Hash,
            problems: 198,
            completed: 87,
            bgColor: "bg-green-100",
            iconColor: "text-green-600",
        },
        {
            name: "Статистика",
            icon: BarChart3,
            problems: 145,
            completed: 34,
            bgColor: "bg-orange-100",
            iconColor: "text-orange-600",
        },
        {
            name: "Текстови задачи",
            icon: FileText,
            problems: 289,
            completed: 112,
            bgColor: "bg-pink-100",
            iconColor: "text-pink-600",
        },
        {
            name: "Пре-алгебра",
            icon: Sigma,
            problems: 176,
            completed: 98,
            bgColor: "bg-teal-100",
            iconColor: "text-teal-600",
        },
    ];
    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Recent Activity Section */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                        <Clock className="w-6 h-6 text-[#6F58C9]" />
                        Последни задачи и тестове
                    </h2>
                    {recentActivities.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {recentActivities.map((activity) => (
                                <RecentResourceCard key={activity.id} activity={activity} />
                            ))}
                        </div>
                    ) : (
                        <Card className="bg-white border-0 shadow-md">
                            <CardContent className="p-12 text-center">
                                <div className="mb-6">
                                    <div className="inline-flex p-4 rounded-full bg-gray-100 mb-4">
                                        <Clock className="w-12 h-12 text-gray-400" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Нямате скорошни задачи и тестове</h3>
                                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                                        Нямате скорошни задачи или тестове. Започнете своето обучение, като създадете първия си тест
                                        или разгледайте категориите съз задачите по-долу!
                                    </p>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                    <Button className="bg-[#6F58C9] hover:bg-[#5A4BA3] text-white">
                                        <TestTube className="w-4 h-4 mr-2" />
                                        Започни първия си тест
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="border-[#6F58C9] text-[#6F58C9] hover:bg-[#6F58C9] hover:text-white bg-transparent"
                                    >
                                        <BookOpen className="w-4 h-4 mr-2" />
                                        Разгледай категориите със задачи
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}

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
                                <Link href="/platform/exam">
                                    <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 font-semibold px-8 py-3 h-12">
                                        <Play className="w-4 h-4 mr-2" />
                                        Стартирай симулация
                                    </Button>
                                </Link>
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
                                {weakTopics.length > 0 ?
                                    (
                                        weakTopics.map((topic, index) => (
                                            <WeakTopicCard key={index} topic={topic} index={index} />
                                        ))
                                    ) : (
                                        <WeakTopicMissingCard />
                                    )}
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* All Tasks Overview Section */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                        <BookOpen className="w-6 h-6 text-[#6F58C9]" />
                        Категории задачи
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {problemCategories.map((category, index) => (
                            <ProblemsCategory key={index} category={category} index={index} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}

export default page;