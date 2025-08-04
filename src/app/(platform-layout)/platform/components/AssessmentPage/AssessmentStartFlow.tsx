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
    colors?: {
        buttonGradient: string;
        buttonHoverGradient: string;
        iconBg: string;
        iconColor: string;
    };
}

const AssessmentStartFlow = ({
    isDialogOpen,
    setIsDialogOpen,
    handleStartExam,
    handleConfirmExam,
    colors = {
        buttonGradient: "from-emerald-500 to-teal-600",
        buttonHoverGradient: "hover:from-emerald-600 hover:to-teal-700",
        iconBg: "bg-amber-50",
        iconColor: "text-amber-600"
    }
}: AssessmentStartFlowProps) => {
    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button
                    size="lg"
                    className={`bg-gradient-to-r ${colors.buttonGradient} ${colors.buttonHoverGradient} text-white font-semibold px-8 py-3 h-12 text-lg transition-all duration-300 shadow-sm`}
                    onClick={handleStartExam}
                >
                    <Play className="w-4 h-4 mr-2" />
                    Започни Пробен Изпит
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <div className="flex items-center gap-3 mb-2">
                        <div className={`inline-flex p-2 rounded-full ${colors.iconBg}`}>
                            <AlertTriangle className={`w-5 h-5 ${colors.iconColor}`} />
                        </div>
                        <DialogTitle className="text-xl font-semibold text-gray-900">
                            Потвърди започване на изпита
                        </DialogTitle>
                    </div>
                    <div className="text-gray-600 text-base leading-relaxed">
                        <p className="mb-3">
                            Сигурни ли сте, че искате да започнете пробния изпит? След започване:
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>Ще имате 90 минути за 25 въпроса</li>
                            <li>Няма да можете да се връщате към предишни въпроси</li>
                            <li>Изпитът ще се подаде автоматично при изтичане на времето</li>
                        </ul>
                    </div>
                </DialogHeader>
                <DialogFooter className="flex gap-3 sm:justify-end">
                    <Button
                        variant="outline"
                        onClick={() => setIsDialogOpen(false)}
                        className="border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                        Отказ
                    </Button>
                    <Button
                        onClick={handleConfirmExam}
                        className={`bg-gradient-to-r ${colors.buttonGradient} ${colors.buttonHoverGradient} text-white`}
                    >
                        <Play className="w-4 h-4 mr-2" />
                        Започни Изпита
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default AssessmentStartFlow