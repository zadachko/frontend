import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { QuestionsNavigatorGrid } from '../../shared/components/QuestionsNavigatorGrid';
import { colors } from '../../../../app/(platform-layout)/platform/exam/colors.config';
import { Clock } from '../../shared/components/Clock';

interface AssessmentSidebarProps {
    // layout/behavior
    isMobile: boolean;
    isSmallMobile: boolean;
    showMobileNav: boolean;
    setShowMobileNav: (show: boolean) => void;
    handleSidebarScroll: (e: React.WheelEvent<HTMLDivElement>) => void;

    // timer
    // timeLeft: number;
    // formatTime: (ms: number) => string;

    // navigator
    answers: Record<number, string>;
    totalQuestions: number;
    getQuestionStatus: (questionNum: number) => string;
    currentQuestion: number;

    // actions
    setShowSubmitDialog: (show: boolean) => void;

    // theming (pass full Tailwind classes)
    setCurrentQuestion: (questionNum: number) => void;
    colors: typeof colors;
}

export default function AssessmentSidebar({
    isMobile,
    isSmallMobile,
    showMobileNav,
    setShowMobileNav,
    handleSidebarScroll,
    // timeLeft,
    // formatTime,
    answers,
    totalQuestions,
    getQuestionStatus,
    currentQuestion,
    setShowSubmitDialog,
    setCurrentQuestion,
    colors,
}: AssessmentSidebarProps) {
    const handleSubmitExam = () => {
        setShowSubmitDialog(true);
    };

    return (
        <div
            className={`${isMobile
                ? `w-full fixed -mt-[7px] top-16 right-0 z-40 ${isSmallMobile ? 'w-full' : 'w-80'
                } bg-white border-l border-gray-200 transform transition-transform duration-300 ease-in-out ${showMobileNav ? 'translate-x-0' : 'translate-x-full'
                } flex flex-col h-[calc(100vh-64px)]`
                : 'w-80 bg-white border-l border-gray-200 flex flex-col h-100vh'
                }`}
            onWheel={handleSidebarScroll}
        >
            {/* Timer - Desktop only */}
            {!isMobile && (
                <div className="p-6 border-b border-gray-200">
                    <Card
                        className={`bg-gradient-to-r ${colors.timer.gradientFrom} ${colors.timer.gradientTo} border-0 shadow-md`}
                    >
                        <CardContent className="p-0 text-center">
                            <div className="flex items-center justify-center gap-2 text-white">
                                <Clock mobile={isMobile} />
                            </div>
                            <p className={`${colors.timer.subTextClass} text-sm mt-1`}>Оставащо време</p>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Question Navigator */}
            <div className={`${isMobile ? 'flex-1 overflow-y-auto' : 'flex-1'}`}>
                <QuestionsNavigatorGrid
                    answers={answers}
                    totalQuestions={totalQuestions}
                    getQuestionStatus={getQuestionStatus}
                    currentQuestion={currentQuestion}
                    setShowMobileNav={setShowMobileNav}
                    navigatorColors={colors.navigator}
                    isMobile={isMobile}
                    isSmallMobile={isSmallMobile}
                    setCurrentQuestion={setCurrentQuestion}
                />
            </div>

            {/* Submit Button - Desktop only */}
            {!isMobile && (
                <div className="p-6 border-t border-gray-200">
                    <Button
                        className={`w-full bg-gradient-to-br ${colors.button.gradientFrom} ${colors.button.gradientTo} text-white font-semibold text-lg py-3 h-12`}
                        onClick={handleSubmitExam}
                    >
                        Изпрати
                    </Button>
                </div>
            )}
        </div>
    );
}
