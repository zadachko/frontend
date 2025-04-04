import React from 'react'
import {
    Search,
    Filter,
    ChevronRight,
    Star,
    ChevronLeft,
    Calculator
} from 'lucide-react'
import Link from 'next/link'

type Props = {
    params: Promise<{ categoryId: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const Page = async ({ params }: Props) => {
    const { categoryId } = await params
    // This would come from your API/database
    const category = {
        id: categoryId,
        name: 'Алгебра',
        icon: Calculator,
        description: 'Решаване на алгебрични задачи и уравнения',
        totalProblems: 156,
        averageDifficulty: 3.5,
        topics: [
            'Квадратни уравнения',
            'Линейни уравнения',
            'Системи уравнения',
            'Полиноми',
            'Рационални изрази'
        ]
    }

    const problems = [
        {
            id: 1,
            title: 'Квадратни уравнения',
            description: 'Решете квадратното уравнение: x² + 5x + 6 = 0',
            difficulty: 'Лесно',
            time: '5-10 мин',
            solved: 2345,
            rating: 4.8,
            topic: 'Квадратни уравнения'
        },
        {
            id: 2,
            title: 'Линейни уравнения',
            description: 'Решете линейното уравнение: 2x + 3 = 7',
            difficulty: 'Лесно',
            time: '3-5 мин',
            solved: 3123,
            rating: 4.6,
            topic: 'Линейни уравнения'
        },
        {
            id: 3,
            title: 'Системи уравнения',
            description: 'Решете системата: {2x + y = 5, x - y = 1}',
            difficulty: 'Средно',
            time: '10-15 мин',
            solved: 1890,
            rating: 4.7,
            topic: 'Системи уравнения'
        },
        {
            id: 4,
            title: 'Полиноми',
            description: 'Разложете полинома: x³ - 8',
            difficulty: 'Трудно',
            time: '15-20 мин',
            solved: 1456,
            rating: 4.9,
            topic: 'Полиноми'
        },
        {
            id: 5,
            title: 'Рационални изрази',
            description: 'Опростете израза: (x² - 4)/(x + 2)',
            difficulty: 'Средно',
            time: '8-12 мин',
            solved: 1678,
            rating: 4.5,
            topic: 'Рационални изрази'
        }
    ]

    return (
        <div className="p-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                <Link href="/platform/categories" className="hover:text-[#6F58C9]">
                    Задачи
                </Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-gray-900 font-medium">{category.name}</span>
            </div>

            {/* Category Header */}
            <div className="bg-white p-6 rounded-lg border border-gray-100 mb-8">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-[#6F58C9]/10 rounded-lg">
                        <category.icon className="w-8 h-8 text-[#6F58C9]" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">{category.name}</h1>
                        <p className="text-gray-600 mb-4">{category.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>{category.totalProblems} задачи</span>
                            <span>•</span>
                            <span>Средна трудност: {category.averageDifficulty}/5</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Topics */}
            <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Теми</h2>
                <div className="flex flex-wrap gap-2">
                    {category.topics.map((topic) => (
                        <button
                            key={topic}
                            className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:border-[#6F58C9] hover:text-[#6F58C9] transition-colors"
                        >
                            {topic}
                        </button>
                    ))}
                </div>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Търсене в категорията..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6F58C9]/20 focus:border-[#6F58C9]"
                    />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <Filter className="w-5 h-5 text-gray-600" />
                    <span>Филтри</span>
                </button>
            </div>

            {/* Problems List */}
            <div className="space-y-4">
                {problems.map((problem) => (
                    <div
                        key={problem.id}
                        className="bg-white p-6 rounded-lg border border-gray-100 hover:border-[#6F58C9] transition-colors cursor-pointer"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-1">{problem.title}</h3>
                                <p className="text-gray-600 text-sm mb-2">{problem.description}</p>
                                <span className="text-sm text-[#6F58C9]">{problem.topic}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                <span className="text-sm font-medium">{problem.rating}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className={`text-sm px-2 py-1 rounded-full ${problem.difficulty === 'Лесно' ? 'bg-green-100 text-green-800' :
                                problem.difficulty === 'Средно' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-red-100 text-red-800'
                                }`}>
                                {problem.difficulty}
                            </span>
                            <span className="text-sm text-gray-500">{problem.time}</span>
                            <span className="text-sm text-gray-500">{problem.solved} решени</span>
                            <ChevronRight className="w-4 h-4 ml-auto text-gray-400" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-8">
                <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-[#6F58C9] transition-colors">
                    <ChevronLeft className="w-4 h-4" />
                    <span>Предишна страница</span>
                </button>
                <div className="flex items-center gap-2">
                    <button className="px-4 py-2 bg-[#6F58C9] text-white rounded-lg">1</button>
                    <button className="px-4 py-2 text-gray-600 hover:text-[#6F58C9]">2</button>
                    <button className="px-4 py-2 text-gray-600 hover:text-[#6F58C9]">3</button>
                    <span className="text-gray-400">...</span>
                    <button className="px-4 py-2 text-gray-600 hover:text-[#6F58C9]">12</button>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-[#6F58C9] transition-colors">
                    <span>Следваща страница</span>
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    )
}

export default Page