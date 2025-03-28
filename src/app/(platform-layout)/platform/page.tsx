import React from 'react';
import {
    BookOpen,
    CheckCircle2,
    Clock,
    Target,
    TrendingUp,
    ArrowRight,
    Brain,
    Timer
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
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
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
            </div>
        </div>
    )
}

export default Page;