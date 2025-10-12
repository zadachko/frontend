import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Trophy, Sparkles, ArrowRight } from 'lucide-react';
import PreviousResult from './PreviousResult';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface PreviousResultsCardProps {
    previousResults: {
        id: number;
        date: string;
        score: number;
        totalQuestions: number;
        correctQuestions: number;
        timeSpent: string;
    }[];
    color: string; // Hex or CSS color string used for outline button, text, and arrow
}

const PreviousResultsCard = ({ previousResults, color }: PreviousResultsCardProps) => {


    return (
        <div className="xl:col-span-1">
            <Card className="h-full shadow-sm border border-gray-200 bg-white">
                <CardContent className="p-3 sm:p-4 lg:p-6 h-full flex flex-col">
                    <div className="flex items-center gap-2 mb-3 sm:mb-4 lg:mb-5">
                        <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
                        <h2 className="text-lg sm:text-xl font-medium text-gray-900">Преднишни Резултати</h2>
                    </div>

                    {previousResults.length > 0 ? (
                        <>
                            <div className="space-y-2 sm:space-y-3 flex-1">
                                {previousResults.map((result) => (
                                    <PreviousResult key={result.id} result={result} />
                                ))}
                            </div>

                            {/* View All Results Button */
                            }
                            <div className="mt-6 pt-4 border-t border-gray-100">
                                <Link href="/platform/results">
                                    <Button
                                        variant="secondary"
                                        className="w-full font-medium transition-all duration-200 shadow-sm hover:shadow-md p-4 border-1 bg-white"
                                        style={{
                                            borderColor: color,
                                            color: color,
                                        }}
                                    >
                                        Виж всички резултати
                                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
                                    </Button>
                                </Link>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-center py-4 sm:py-6">
                            <div className="mb-3 sm:mb-4">
                                <div className="inline-flex p-2 sm:p-3 rounded-full bg-amber-50 mb-2 sm:mb-3">
                                    <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-amber-500" />
                                </div>
                                <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-1 sm:mb-2">Първият ти изпит</h3>
                                <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4">
                                    Направи първия си пробен изпит и започни да следваш прогреса си
                                </p>
                            </div>

                            <div className="space-y-2 sm:space-y-3 w-full">
                                <div className="bg-gray-50 rounded-lg p-2 sm:p-3 border border-gray-100">
                                    <div className="flex items-center gap-2 mb-1">
                                        <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-amber-500" />
                                        <span className="text-sm sm:text-base font-medium text-gray-700">Следвай прогреса</span>
                                    </div>
                                    <p className="text-xs sm:text-sm text-gray-500">
                                        Виждай как се подобряваш с всеки изпит
                                    </p>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-2 sm:p-3 border border-gray-100">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Trophy className="w-3 h-3 sm:w-4 sm:h-4 text-amber-500" />
                                        <span className="text-sm sm:text-base font-medium text-gray-700">Постигай цели</span>
                                    </div>
                                    <p className="text-xs sm:text-sm text-gray-500">
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

export default PreviousResultsCard;