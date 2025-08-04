import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import React from 'react'

interface AssessmentSubmitDialogProps {
    showSubmitDialog: boolean;
    setShowSubmitDialog: (show: boolean) => void;
    questionsAnswered: number;
    totalQuestions: number;
    cancelSubmit: () => void;
    confirmSubmit: () => void;
    colors: {
        primary: string;
        primaryHover: string;
    };
}

const AssessmentSubmitDialog = ({
    showSubmitDialog,
    setShowSubmitDialog,
    questionsAnswered,
    totalQuestions,
    cancelSubmit,
    confirmSubmit,
    colors
}: AssessmentSubmitDialogProps) => {
    return (
        <Dialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Потвърди изпращане на изпита</DialogTitle>
                    <DialogDescription>
                        Сигурни ли сте, че искате да изпратите изпита? Това действие не може да бъде отменено.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <p className="text-sm text-gray-600">
                        Отговорени въпроси: <span className={`font-semibold text-${colors.primary}`}>{questionsAnswered}</span> / <span className="font-semibold">{totalQuestions}</span>
                    </p>
                </div>
                <DialogFooter className="flex gap-2">
                    <Button variant="outline" onClick={cancelSubmit}>
                        Отказ
                    </Button>
                    <Button onClick={confirmSubmit} className={`bg-${colors.primary} hover:bg-${colors.primaryHover}`}>
                        Изпрати изпита
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default AssessmentSubmitDialog;