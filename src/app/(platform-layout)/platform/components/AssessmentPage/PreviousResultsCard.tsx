import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Trophy, Sparkles } from 'lucide-react';
import PreviousResult from './PreviousResult';

const PreviousResults = ({ previousResults }: {
    previousResults: {
        id: number;
        date: string;
        score: number;
        totalQuestions: number;
        correctAnswers: number;
        timeSpent: string;
    }[]
}) => {


    return (
        <div className="lg:col-span-1">
            <Card className="h-full shadow-sm border border-gray-200 bg-white">
                <CardContent className="p-6 h-full flex flex-col">
                    <div className="flex items-center gap-2 mb-5">
                        <Trophy className="w-5 h-5 text-amber-500" />
                        <h2 className="text-xl font-medium text-gray-900">Предни Резултати</h2>
                    </div>

                    {previousResults.length > 0 ? (
                        <div className="space-y-3 flex-1">
                            {previousResults.map((exam) => (
                                <PreviousResult key={exam.id} exam={exam} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-center py-6">
                            <div className="mb-4">
                                <div className="inline-flex p-3 rounded-full bg-amber-50 mb-3">
                                    <Sparkles className="w-8 h-8 text-amber-500" />
                                </div>
                                <h3 className="text-xl font-medium text-gray-900 mb-2">Първият ти изпит</h3>
                                <p className="text-gray-600 text-base mb-4">
                                    Направи първия си пробен изпит и започни да следваш прогреса си
                                </p>
                            </div>

                            <div className="space-y-3 w-full">
                                <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                                    <div className="flex items-center gap-2 mb-1">
                                        <TrendingUp className="w-4 h-4 text-amber-500" />
                                        <span className="text-base font-medium text-gray-700">Следвай прогреса</span>
                                    </div>
                                    <p className="text-sm text-gray-500">
                                        Виждай как се подобряваш с всеки изпит
                                    </p>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Trophy className="w-4 h-4 text-amber-500" />
                                        <span className="text-base font-medium text-gray-700">Постигай цели</span>
                                    </div>
                                    <p className="text-sm text-gray-500">
                                        Стигай до 100% и стани майстор на математиката
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

export default PreviousResults;