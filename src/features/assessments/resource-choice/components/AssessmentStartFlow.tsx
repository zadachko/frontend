import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertTriangle, Play } from 'lucide-react';

/** This component handles the start flow of the exam - button and dialog with confirmation
 * @param isDialogOpen - boolean to open the dialog
 * @param setIsDialogOpen - function to set the dialog open state
 * @param handleStartExam - function to handle the start exam
 * @param handleConfirmExam - function to handle the confirm exam
 * @param colors - object containing color classes for button gradients and icon colors
 */

interface AssessmentStartFlowProps {
    isDialogOpen: boolean;
    setIsDialogOpen: (isOpen: boolean) => void;
    handleStartExam: () => void;
    handleConfirmExam: () => void;
    colors: {
        buttonGradient: string;
        buttonHoverGradient: string;
        iconBg: string;
        iconColor: string;
    };
    loading: boolean;
}

const AssessmentStartFlow = ({
    isDialogOpen,
    setIsDialogOpen,
    handleStartExam,
    handleConfirmExam,
    colors,
    loading,
}: AssessmentStartFlowProps) => {
    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button
                    size="lg"
                    className={`bg-gradient-to-r ${colors.buttonGradient} ${colors.buttonHoverGradient} text-white font-semibold px-4 sm:px-6 lg:px-8 py-2 sm:py-3 h-10 sm:h-12 text-sm sm:text-base lg:text-lg transition-all duration-300 shadow-sm w-full sm:w-auto`}
                    onClick={handleStartExam}
                    disabled={loading}
                >
                    <Play className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    Започни Пробен Изпит
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md mx-4">
                <DialogHeader>
                    <div className="flex items-center gap-2 sm:gap-3 mb-2">
                        <div className={`inline-flex p-1.5 sm:p-2 rounded-full ${colors.iconBg}`}>
                            <AlertTriangle className={`w-4 h-4 sm:w-5 sm:h-5 ${colors.iconColor}`} />
                        </div>
                        <DialogTitle className="text-lg sm:text-xl font-semibold text-gray-900">
                            Потвърди започване на изпита
                        </DialogTitle>
                    </div>
                    <div className="text-gray-600 text-sm sm:text-base leading-relaxed">
                        <p className="mb-2 sm:mb-3">
                            Сигурни ли сте, че искате да започнете пробния изпит? След започване:
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm">
                            <li>Ще имате 90 минути за 25 въпроса</li>
                            <li>Няма да можете да се връщате към предишни въпроси</li>
                            <li>Изпитът ще се подаде автоматично при изтичане на времето</li>
                        </ul>
                    </div>
                </DialogHeader>
                <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-3 sm:justify-end">
                    <Button
                        variant="outline"
                        onClick={() => setIsDialogOpen(false)}
                        className="border-gray-300 text-gray-700 hover:bg-gray-50 w-full sm:w-auto"
                    >
                        Отказ
                    </Button>
                    <Button
                        onClick={handleConfirmExam}
                        className={`bg-gradient-to-r ${colors.buttonGradient} ${colors.buttonHoverGradient} text-white w-full sm:w-auto`}
                    >
                        <Play className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        {loading ? 'Зареждане на изпита...' : 'Започни Изпита'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AssessmentStartFlow;
