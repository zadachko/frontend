import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import React from 'react';

interface AssessmentSubmitDialogProps {
    showSubmitDialog: boolean;
    setShowSubmitDialog: (show: boolean) => void;
    questionsAnswered: number;
    totalQuestions: number;
    overviewRedirectUrl: string;
    colors: {
        primary: string;
        primaryHover: string;
    };
    isMobile?: boolean;
    isSmallMobile?: boolean;
}

const AssessmentSubmitDialog = ({
    showSubmitDialog,
    setShowSubmitDialog,
    questionsAnswered,
    totalQuestions,
    overviewRedirectUrl,
    colors,
    isMobile = false,
    isSmallMobile = false,
}: AssessmentSubmitDialogProps) => {
    const handleCancelSubmit = () => {
        setShowSubmitDialog(false);
    };

    const handleConfirmSubmit = () => {
        window.location.href = overviewRedirectUrl;
    };

    return (
        <Dialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
            <DialogContent
                className={`${isSmallMobile ? 'w-[98vw] max-w-none' : isMobile ? 'w-[95vw] max-w-none mx-4' : 'sm:max-w-md'}`}
            >
                <DialogHeader>
                    <DialogTitle className={`${isSmallMobile ? 'text-base' : isMobile ? 'text-lg' : ''}`}>
                        Потвърди изпращане на изпита
                    </DialogTitle>
                    <DialogDescription className={`${isSmallMobile ? 'text-xs' : isMobile ? 'text-sm' : ''}`}>
                        Сигурни ли сте, че искате да изпратите изпита? Това действие не може да бъде отменено.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <p className={`text-gray-600 ${isSmallMobile ? 'text-xs' : isMobile ? 'text-sm' : 'text-sm'}`}>
                        Отговорени въпроси:{' '}
                        <span className={`font-semibold text-${colors.primary}`}>{questionsAnswered}</span> /{' '}
                        <span className="font-semibold">{totalQuestions}</span>
                    </p>
                </div>
                <DialogFooter className={`flex gap-2 ${isMobile ? 'flex-col' : ''}`}>
                    <Button variant="outline" onClick={handleCancelSubmit} className={isMobile ? 'w-full' : ''}>
                        Отказ
                    </Button>
                    <Button
                        onClick={handleConfirmSubmit}
                        className={`${isMobile ? 'w-full' : ''} bg-${colors.primary} hover:bg-${colors.primaryHover}`}
                    >
                        Изпрати изпита
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AssessmentSubmitDialog;
