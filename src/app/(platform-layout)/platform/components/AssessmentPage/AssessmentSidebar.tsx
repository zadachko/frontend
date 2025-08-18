import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { QuestionsNavigatorGrid } from "../QuestionsNavigatorGrid/QuestionsNavigatorGrid";

type NavigatorColors = {
    primary: string;
    primaryLight: string;
    primaryHover: string;
    answeredBg: string;
    answeredBorder: string;
    answeredText: string;
    answeredHover: string;
};

interface AssessmentSidebarProps {
    // layout/behavior
    isMobile: boolean;
    isSmallMobile: boolean;
    showMobileNav: boolean;
    handleSidebarScroll: (e: React.WheelEvent<HTMLDivElement>) => void;

    // timer
    timeLeft: number;
    formatTime: (ms: number) => string;

    // navigator
    answers: Record<number, string>;
    totalQuestions: number;
    getQuestionStatus: (questionNum: number) => string;
    currentQuestion: number;
    goToQuestion: (index: number) => void;
    scrollToQuestion: (questionNum: number) => void;

    // actions
    handleSubmitExam: () => void;

    // theming (pass full Tailwind classes)
    timerGradientFrom: string; // e.g. "from-emerald-500" or "from-[#6F58C9]"
    timerGradientTo: string;   // e.g. "to-teal-600" or "to-[#5A4BA3]"
    timerSubTextClass: string; // e.g. "text-emerald-100" or "text-purple-100"
    buttonGradientFrom: string;
    buttonGradientTo: string;
    navigatorColors: NavigatorColors;
}

export default function AssessmentSidebar({
    isMobile,
    isSmallMobile,
    showMobileNav,
    handleSidebarScroll,
    timeLeft,
    formatTime,
    answers,
    totalQuestions,
    getQuestionStatus,
    currentQuestion,
    goToQuestion,
    scrollToQuestion,
    handleSubmitExam,
    timerGradientFrom,
    timerGradientTo,
    timerSubTextClass,
    buttonGradientFrom,
    buttonGradientTo,
    navigatorColors,
}: AssessmentSidebarProps) {
    return (
        <div
            className={`${isMobile
                ? `w-full fixed -mt-[7px] top-16 right-0 z-40 ${isSmallMobile ? "w-full" : "w-80"
                } bg-white border-l border-gray-200 transform transition-transform duration-300 ease-in-out ${showMobileNav ? "translate-x-0" : "translate-x-full"
                } flex flex-col h-[calc(100vh-64px)]`
                : "w-80 bg-white border-l border-gray-200 flex flex-col h-100vh"
                }`}
            onWheel={handleSidebarScroll}
        >
            {/* Timer - Desktop only */}
            {!isMobile && (
                <div className="p-6 border-b border-gray-200">
                    <Card className={`bg-gradient-to-r ${timerGradientFrom} ${timerGradientTo} border-0 shadow-md`}>
                        <CardContent className="p-0 text-center">
                            <div className="flex items-center justify-center gap-2 text-white">
                                <Clock className="w-5 h-5" />
                                <span className="font-mono text-2xl font-bold">
                                    {formatTime(timeLeft)}
                                </span>
                            </div>
                            <p className={`${timerSubTextClass} text-sm mt-1`}>Оставащо време</p>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Question Navigator */}
            <div className={`${isMobile ? "flex-1 overflow-y-auto" : "flex-1"}`}>
                <QuestionsNavigatorGrid
                    answers={answers}
                    totalQuestions={totalQuestions}
                    getQuestionStatus={getQuestionStatus}
                    currentQuestion={currentQuestion}
                    goToQuestion={goToQuestion}
                    scrollToQuestion={scrollToQuestion}
                    colors={navigatorColors}
                    isMobile={isMobile}
                    isSmallMobile={isSmallMobile}
                />
            </div>

            {/* Submit Button - Desktop only */}
            {!isMobile && (
                <div className="p-6 border-t border-gray-200">
                    <Button
                        className={`w-full bg-gradient-to-br ${buttonGradientFrom} ${buttonGradientTo} text-white font-semibold text-lg py-3 h-12`}
                        onClick={handleSubmitExam}
                    >
                        Изпрати
                    </Button>
                </div>
            )}
        </div>
    );
}