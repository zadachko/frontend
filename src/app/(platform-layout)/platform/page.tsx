import React from 'react';
import {
    BookOpen,
    CheckCircle2,
    Clock,
    Target,
    TrendingUp,
    ArrowRight,
    Brain,
    Timer,
    Calendar,
    Award,
    Star,
    AlertCircle
} from 'lucide-react'

const Page = () => {
    return (
        <div className="p-8">
            {/* Welcome Section */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Добре дошли, Иван!</h1>
                <p className="text-gray-600 mt-2">Ето какво се случва с твоята подготовка днес</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-[#6F58C9]/10 rounded-lg">
                            <BookOpen className="w-6 h-6 text-[#6F58C9]" />
                        </div>
                        <span className="text-sm text-gray-500">Днес</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-1">12</h3>
                    <p className="text-gray-600">Решени задачи</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-[#6F58C9]/10 rounded-lg">
                            <CheckCircle2 className="w-6 h-6 text-[#6F58C9]" />
                        </div>
                        <span className="text-sm text-gray-500">Този месец</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-1">85%</h3>
                    <p className="text-gray-600">Точност</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-[#6F58C9]/10 rounded-lg">
                            <Clock className="w-6 h-6 text-[#6F58C9]" />
                        </div>
                        <span className="text-sm text-gray-500">Общо</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-1">2.5ч</h3>
                    <p className="text-gray-600">Време за обучение</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-[#6F58C9]/10 rounded-lg">
                            <Target className="w-6 h-6 text-[#6F58C9]" />
                        </div>
                        <span className="text-sm text-gray-500">Цел</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-1">75%</h3>
                    <p className="text-gray-600">Достигната цел</p>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h2 className="text-xl font-semibold mb-4">Последна активност</h2>
                        <div className="space-y-4">
                            {[1, 2, 3].map((item) => (
                                <div key={item} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                    <div className="p-2 bg-[#6F58C9]/10 rounded-lg">
                                        <Brain className="w-5 h-5 text-[#6F58C9]" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium">Решена задача: Алгебра</p>
                                        <p className="text-sm text-gray-500">Преди 2 часа</p>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-gray-400" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Study Recommendations */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h2 className="text-xl font-semibold mb-4">Препоръки за обучение</h2>
                        <div className="space-y-4">
                            <div className="p-4 bg-[#6F58C9]/5 rounded-lg">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-[#6F58C9]/10 rounded-lg">
                                        <Star className="w-5 h-5 text-[#6F58C9]" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-900">Квадратни уравнения</h3>
                                        <p className="text-sm text-gray-600 mt-1">Трябва да подобриш решаването на квадратни уравнения. Опитай тези задачи:</p>
                                        <div className="mt-3 flex gap-2">
                                            <button className="text-sm px-3 py-1 bg-[#6F58C9] text-white rounded-lg hover:bg-[#6F58C9]/90 transition-colors">
                                                Започни
                                            </button>
                                            <button className="text-sm px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                                Виж повече
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 bg-[#6F58C9]/5 rounded-lg">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-[#6F58C9]/10 rounded-lg">
                                        <AlertCircle className="w-5 h-5 text-[#6F58C9]" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-900">Геометрични фигури</h3>
                                        <p className="text-sm text-gray-600 mt-1">Практикувай повече задачи с геометрични фигури за по-добри резултати.</p>
                                        <div className="mt-3 flex gap-2">
                                            <button className="text-sm px-3 py-1 bg-[#6F58C9] text-white rounded-lg hover:bg-[#6F58C9]/90 transition-colors">
                                                Започни
                                            </button>
                                            <button className="text-sm px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                                Виж повече
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                    {/* Quick Actions */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h2 className="text-xl font-semibold mb-4">Бързи действия</h2>
                        <div className="space-y-3">
                            <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left">
                                <div className="p-2 bg-[#6F58C9]/10 rounded-lg">
                                    <Timer className="w-5 h-5 text-[#6F58C9]" />
                                </div>
                                <span>Начало на тест</span>
                            </button>
                            <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left">
                                <div className="p-2 bg-[#6F58C9]/10 rounded-lg">
                                    <TrendingUp className="w-5 h-5 text-[#6F58C9]" />
                                </div>
                                <span>Преглед на статистика</span>
                            </button>
                            <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left">
                                <div className="p-2 bg-[#6F58C9]/10 rounded-lg">
                                    <BookOpen className="w-5 h-5 text-[#6F58C9]" />
                                </div>
                                <span>Продължи обучението</span>
                            </button>
                        </div>
                    </div>

                    {/* Upcoming Tests */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-[#6F58C9]" />
                            <span>Предстоящи тестове</span>
                        </h2>
                        <div className="space-y-4">
                            <div className="p-3 border border-gray-100 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-medium">Алгебра</h3>
                                    <span className="text-sm text-gray-500">20.03.2024</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Clock className="w-4 h-4" />
                                    <span>45 мин</span>
                                </div>
                            </div>
                            <div className="p-3 border border-gray-100 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-medium">Геометрия</h3>
                                    <span className="text-sm text-gray-500">22.03.2024</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Clock className="w-4 h-4" />
                                    <span>60 мин</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Achievements */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <Award className="w-5 h-5 text-[#6F58C9]" />
                            <span>Постижения</span>
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-yellow-100 rounded-lg">
                                    <Star className="w-5 h-5 text-yellow-500" />
                                </div>
                                <div>
                                    <h3 className="font-medium">100 решени задачи</h3>
                                    <p className="text-sm text-gray-500">Достигнато на 15.03.2024</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-green-100 rounded-lg">
                                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                                </div>
                                <div>
                                    <h3 className="font-medium">90% точност</h3>
                                    <p className="text-sm text-gray-500">Достигнато на 10.03.2024</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page;