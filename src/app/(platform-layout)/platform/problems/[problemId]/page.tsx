import React from 'react'
import {
    ChevronRight,
    Star,
    Clock,
    Target,
    Send,
    CheckCircle2,
    XCircle,
    Lightbulb,
    History
} from 'lucide-react'
import Link from 'next/link'

type Props = {
    params: Promise<{ problemId: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const Page = async ({ params }: Props) => {
    const { problemId } = await params
    // This would come from your API/database
    const problem = {
        id: problemId,
        title: 'Квадратни уравнения',
        description: 'Решете квадратното уравнение: x² + 5x + 6 = 0',
        category: 'Алгебра',
        topic: 'Квадратни уравнения',
        difficulty: 'Лесно',
        time: '5-10 мин',
        solved: 2345,
        rating: 4.8,
        steps: [
            'Запишете уравнението в стандартна форма: ax² + bx + c = 0',
            'Определете коефициентите: a = 1, b = 5, c = 6',
            'Използвайте формулата за дискриминанта: D = b² - 4ac',
            'Изчислете корените: x₁,₂ = (-b ± √D) / (2a)'
        ],
        hints: [
            'Помислете за разлагане на множители',
            'Можете да използвате формулата за дискриминанта',
            'Проверете дали отговорът ви удовлетворява уравнението'
        ],
        solution: 'x₁ = -2, x₂ = -3',
        explanation: 'Уравнението x² + 5x + 6 = 0 има два корена: x₁ = -2 и x₂ = -3. Това може да се провери чрез заместване на стойностите в уравнението.',
        relatedProblems: [
            {
                id: 2,
                title: 'Линейни уравнения',
                difficulty: 'Лесно',
                solved: 3123
            },
            {
                id: 3,
                title: 'Системи уравнения',
                difficulty: 'Средно',
                solved: 1890
            }
        ]
    }

    return (
        <div className="p-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                <Link href="/platform/categories" className="hover:text-[#6F58C9]">
                    Задачи
                </Link>
                <ChevronRight className="w-4 h-4" />
                <Link href={`/platform/categories/${problem.category}`} className="hover:text-[#6F58C9]">
                    {problem.category}
                </Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-gray-900 font-medium">{problem.title}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Problem Header */}
                    <div className="bg-white p-6 rounded-lg border border-gray-100">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 mb-2">{problem.title}</h1>
                                <p className="text-gray-600 mb-4">{problem.description}</p>
                                <div className="flex items-center gap-4">
                                    <span className="text-sm text-[#6F58C9]">{problem.topic}</span>
                                    <span className={`text-sm px-2 py-1 rounded-full ${problem.difficulty === 'Лесно' ? 'bg-green-100 text-green-800' :
                                        problem.difficulty === 'Средно' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-red-100 text-red-800'
                                        }`}>
                                        {problem.difficulty}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                <span className="text-sm font-medium">{problem.rating}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>{problem.time}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Target className="w-4 h-4" />
                                <span>{problem.solved} решени</span>
                            </div>
                        </div>
                    </div>

                    {/* Solution Area */}
                    <div className="bg-white p-6 rounded-lg border border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Вашето решение</h2>
                        <div className="space-y-4">
                            <textarea
                                placeholder="Въведете вашето решение тук..."
                                className="w-full h-32 p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6F58C9]/20 focus:border-[#6F58C9] resize-none"
                            />
                            <div className="flex justify-end">
                                <button className="flex items-center gap-2 px-6 py-2 bg-[#6F58C9] text-white rounded-lg hover:bg-[#6F58C9]/90 transition-colors">
                                    <Send className="w-4 h-4" />
                                    <span>Провери решение</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Steps */}
                    <div className="bg-white p-6 rounded-lg border border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Стъпки за решаване</h2>
                        <div className="space-y-3">
                            {problem.steps.map((step, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-[#6F58C9]/10 flex items-center justify-center text-[#6F58C9] text-sm font-medium">
                                        {index + 1}
                                    </div>
                                    <p className="text-gray-600">{step}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                    {/* Hints */}
                    <div className="bg-white p-6 rounded-lg border border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Lightbulb className="w-5 h-5 text-yellow-500" />
                            <span>Подсказки</span>
                        </h2>
                        <div className="space-y-3">
                            {problem.hints.map((hint, index) => (
                                <div key={index} className="p-3 bg-yellow-50 rounded-lg">
                                    <p className="text-sm text-gray-700">{hint}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Related Problems */}
                    <div className="bg-white p-6 rounded-lg border border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Свързани задачи</h2>
                        <div className="space-y-3">
                            {problem.relatedProblems.map((related) => (
                                <Link
                                    key={related.id}
                                    href={`/platform/problem/${related.id}`}
                                    className="block p-3 border border-gray-100 rounded-lg hover:border-[#6F58C9] transition-colors"
                                >
                                    <div className="flex items-center justify-between mb-1">
                                        <h3 className="font-medium text-gray-900">{related.title}</h3>
                                        <span className={`text-xs px-2 py-1 rounded-full ${related.difficulty === 'Лесно' ? 'bg-green-100 text-green-800' :
                                            related.difficulty === 'Средно' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                            {related.difficulty}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500">{related.solved} решени</p>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Solution History */}
                    <div className="bg-white p-6 rounded-lg border border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <History className="w-5 h-5 text-[#6F58C9]" />
                            <span>История на решенията</span>
                        </h2>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                                <span className="text-gray-600">Успешно решено на 15.03.2024</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <XCircle className="w-4 h-4 text-red-500" />
                                <span className="text-gray-600">Неуспешен опит на 14.03.2024</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page