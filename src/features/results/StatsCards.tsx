import { Card, CardContent } from "@/components/ui/card"
import { Trophy, Target, TestTube, GraduationCap } from "lucide-react"
import type { TestResult } from "@/types"

interface StatsCardsProps {
    results: TestResult[]
}

export const StatsCards = ({ results }: StatsCardsProps) => {
    const avgScore = Math.round(results.reduce((sum, r) => sum + r.percentage, 0) / results.length)
    const bestScore = Math.max(...results.map((r) => r.percentage))
    const totalTests = results.filter((r) => r.type === "test").length
    const totalExams = results.filter((r) => r.type === "exam").length

    const cardData = [
        {
            label: "Най-добър резултат",
            value: `${bestScore}%`,
            icon: Trophy,
            color: "bg-blue-100",
            iconColor: "text-blue-600",
        },
        {
            label: "Среден резултат",
            value: `${avgScore}%`,
            icon: Target,
            color: "bg-amber-100",
            iconColor: "text-amber-600",
        },
        {
            label: "Решени тестове",
            value: totalTests,
            icon: TestTube,
            color: "bg-purple-100",
            iconColor: "text-purple-600",
        },
        {
            label: "Решени матури",
            value: totalExams,
            icon: GraduationCap,
            color: "bg-emerald-100",
            iconColor: "text-emerald-600",
        },
    ]

    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
            {cardData.map((card, index) => (
                <Card
                    key={index}
                    className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 px-3 py-3"
                >
                    <CardContent className="flex flex-col items-center justify-center gap-2 p-0">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${card.color}`}>
                            <card.icon className={`w-6 h-6 ${card.iconColor}`} />
                        </div>
                        <div className="text-lg font-bold text-gray-900 leading-tight">{card.value}</div>
                        <div className="text-sm text-center text-gray-500 leading-tight">{card.label}</div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
