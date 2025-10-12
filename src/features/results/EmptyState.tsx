import { Button } from "@/components/ui/button"
import { TestTube, GraduationCap, BarChart3 } from "lucide-react"

interface EmptyStateProps {
    type: string
}

export const EmptyState = ({ type }: EmptyStateProps) => (
    <div className="text-center py-16">
        <div className="mb-6">
            <div className="inline-flex p-4 rounded-full bg-gray-100 mb-4">
                {type === "tests" ? (
                    <TestTube className="w-12 h-12 text-gray-400" />
                ) : type === "exams" ? (
                    <GraduationCap className="w-12 h-12 text-gray-400" />
                ) : (
                    <BarChart3 className="w-12 h-12 text-gray-400" />
                )}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {type === "tests"
                    ? "Все още нямаш решени тестове"
                    : type === "exams"
                        ? "Все още нямаш решени матури"
                        : "Все още нямаш решени тестове или матури"}
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
                {type === "tests"
                    ? "Започни да решаваш тестове по различни теми, за да видиш резултатите си тук."
                    : type === "exams"
                        ? "Направи първия си пробен изпит, за да започнеш да следваш прогреса си."
                        : "Започни своето обучение, като създадеш първия си тест или направиш пробна матура."}
            </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {type !== "exams" && (
                <Button className="bg-[#6F58C9] hover:bg-[#5A4BA3] text-white">
                    <TestTube className="w-4 h-4 mr-2" />
                    Започни тест
                </Button>
            )}
            {type !== "tests" && (
                <Button
                    variant="outline"
                    className="border-[#6F58C9] text-[#6F58C9] hover:bg-[#6F58C9] hover:text-white cursor-pointer bg-transparent"
                >
                    <GraduationCap className="w-4 h-4 mr-2" />
                    Направи пробна матура
                </Button>
            )}
        </div>
    </div>
)
