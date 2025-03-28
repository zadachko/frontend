import React from 'react'
import {
    Search,
    Filter,
    BookOpen,
    Clock,
    Target,
    ChevronRight,
    Star,
    Brain,
    Calculator
} from 'lucide-react'

const Page = () => {
    const categories = [
        { name: 'Алгебра', icon: Calculator, count: 156 },
        { name: 'Геометрия', icon: Brain, count: 98 },
        { name: 'Тригонометрия', icon: Star, count: 75 },
        { name: 'Функции', icon: Target, count: 64 },
        { name: 'Уравнения', icon: BookOpen, count: 89 },
        { name: 'Неравенства', icon: Clock, count: 45 },
    ]

    const problems = [
        {
            id: 1,
            title: 'Квадратни уравнения',
            category: 'Алгебра',
            difficulty: 'Лесно',
            time: '5-10 мин',
            solved: 2345,
            rating: 4.8
        },
        {
            id: 2,
            title: 'Правоъгълен триъгълник',
            category: 'Геометрия',
            difficulty: 'Средно',
            time: '10-15 мин',
            solved: 1890,
            rating: 4.6
        },
        {
            id: 3,
            title: 'Синус и косинус',
            category: 'Тригонометрия',
            difficulty: 'Трудно',
            time: '15-20 мин',
            solved: 1567,
            rating: 4.9
        },
        {
            id: 4,
            title: 'Линейни функции',
            category: 'Функции',
            difficulty: 'Лесно',
            time: '5-10 мин',
            solved: 3123,
            rating: 4.7
        },
        {
            id: 5,
            title: 'Системи уравнения',
            category: 'Уравнения',
            difficulty: 'Средно',
            time: '10-15 мин',
            solved: 1987,
            rating: 4.5
        },
        {
            id: 6,
            title: 'Квадратни неравенства',
            category: 'Неравенства',
            difficulty: 'Трудно',
            time: '15-20 мин',
            solved: 1456,
            rating: 4.8
        }
    ]

    return (
        <div className="p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Задачи</h1>
                <p className="text-gray-600 mt-2">Изберете категория и започнете да решавате задачи</p>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Търсене на задачи..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6F58C9]/20 focus:border-[#6F58C9]"
                    />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <Filter className="w-5 h-5 text-gray-600" />
                    <span>Филтри</span>
                </button>
            </div>

            {/* Categories */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                {categories.map((category) => (
                    <button
                        key={category.name}
                        className="flex flex-col items-center p-4 bg-white rounded-lg border border-gray-100 hover:border-[#6F58C9] transition-colors group"
                    >
                        <div className="p-2 bg-[#6F58C9]/10 rounded-lg mb-2 group-hover:bg-[#6F58C9]/20 transition-colors">
                            <category.icon className="w-6 h-6 text-[#6F58C9]" />
                        </div>
                        <span className="font-medium text-gray-900">{category.name}</span>
                        <span className="text-sm text-gray-500">{category.count} задачи</span>
                    </button>
                ))}
            </div>

            {/* Problems Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {problems.map((problem) => (
                    <div
                        key={problem.id}
                        className="bg-white p-6 rounded-lg border border-gray-100 hover:border-[#6F58C9] transition-colors cursor-pointer"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-1">{problem.title}</h3>
                                <span className="text-sm text-gray-500">{problem.category}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                <span className="text-sm font-medium">{problem.rating}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 mb-4">
                            <span className={`text-sm px-2 py-1 rounded-full ${problem.difficulty === 'Лесно' ? 'bg-green-100 text-green-800' :
                                problem.difficulty === 'Средно' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-red-100 text-red-800'
                                }`}>
                                {problem.difficulty}
                            </span>
                            <span className="text-sm text-gray-500">{problem.time}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                            <span>{problem.solved} решени</span>
                            <ChevronRight className="w-4 h-4" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Page