import React, { useEffect } from 'react';
import { Dialog, DialogClose, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { X, CheckCircle } from 'lucide-react';
import type { DiagramData } from 'geometry-diagram-renderer';
import { renderWithMath } from '../../common/utilities/renderWithMath';

type QuestionSolutionModalProps = {
    isOpen: boolean;
    onClose: () => void;
    question: {
        id: number;
        statement: string;
        type: 'text' | 'multiple';
        options?: string[];
        diagramData?: DiagramData;
    };
    solution?: string;
    answers?: { [key: number]: string };
    handleAnswerChange?: (questionId: number, value: string) => void;
    isReviewMode?: boolean;
    correctAnswer?: string;
    userAnswer?: string;
    isMobile?: boolean;
    isSmallMobile?: boolean;
};

const QuestionSolutionModal = ({
    isOpen,
    onClose,
    question,
    solution,
    answers = {},
    handleAnswerChange = () => { },
    isReviewMode = false,
    correctAnswer,
    userAnswer,
    isMobile = false,
    isSmallMobile = false,
}: QuestionSolutionModalProps) => {

    // Handle ESC key press
    useEffect(() => {
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscKey);
        }

        return () => {
            document.removeEventListener('keydown', handleEscKey);
        };
    }, [isOpen, onClose]);

    let isCorrect = false;
    if (userAnswer && correctAnswer) isCorrect = userAnswer === correctAnswer;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent
                onOpenAutoFocus={(e) => e.preventDefault()}
                showCloseButton={false}
                className={`${isSmallMobile ? '!max-w-[98vw] !w-[98vw] !max-h-[98vh]' : isMobile ? '!max-w-[95vw] !w-[95vw] !max-h-[95vh]' : '!max-w-2xl !w-[90vw] !max-h-[90vh]'} !p-0 !overflow-hidden !border-0 !shadow-xl !top-[50%] !left-[50%] !translate-x-[-50%] !translate-y-[-50%] !rounded-lg !bg-white`}
            >
                {/* Header */}
                <div className={`flex items-center justify-between ${isSmallMobile ? 'p-3' : isMobile ? 'p-4' : 'p-6'} border-b bg-gray-50`}>
                    <div className="flex items-center gap-3">
                        <CheckCircle className={`${isSmallMobile ? 'w-4 h-4' : isMobile ? 'w-5 h-5' : 'w-6 h-6'} text-green-600`} />
                        <div>
                            <DialogTitle asChild>
                                <h1 className={`${isSmallMobile ? 'text-base' : isMobile ? 'text-lg' : 'text-xl'} font-bold text-gray-900`}>Решение</h1>
                            </DialogTitle>
                            <p className={`${isSmallMobile ? 'text-xs' : isMobile ? 'text-xs' : 'text-sm'} text-gray-600`}>Ето пълното решение на задачата</p>
                        </div>
                    </div>
                    <DialogClose asChild>
                        <button className="p-2 hover:bg-gray-200 rounded-lg transition">
                            <X className={`${isSmallMobile ? 'w-3 h-3' : isMobile ? 'w-4 h-4' : 'w-5 h-5'} text-gray-600`} />
                        </button>
                    </DialogClose>
                </div>

                {/* Content */}
                <div className={`${isSmallMobile ? 'p-3' : isMobile ? 'p-4' : 'p-6'} overflow-y-auto ${isSmallMobile ? 'max-h-[calc(98vh-100px)]' : isMobile ? 'max-h-[calc(95vh-120px)]' : 'max-h-[calc(90vh-140px)]'}`}>
                    {solution ? (
                        <div className="space-y-6">
                            {/* Correct Answer Section */}
                            <div className={`bg-green-50 border border-green-200 rounded-lg ${isSmallMobile ? 'p-2' : isMobile ? 'p-3' : 'p-4'} flex items-start gap-3`}>
                                <CheckCircle className={`${isSmallMobile ? 'w-3 h-3' : isMobile ? 'w-4 h-4' : 'w-5 h-5'} text-green-600 mt-1`} />
                                <div>
                                    <div className={`${isSmallMobile ? 'text-xs' : isMobile ? 'text-sm' : 'text-base'} font-semibold text-gray-900 mb-2`}>Верен отговор:</div>
                                    <div className={`${isSmallMobile ? 'text-xl' : isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-green-700`}>
                                        {correctAnswer ? renderWithMath(correctAnswer, isSmallMobile ? "text-sm" : isMobile ? "text-lg" : "text-xl") : "—"}
                                    </div>
                                </div>
                            </div>

                            {/* Step-by-Step Solution (first) */}
                            <div>
                                <div className="prose prose-lg max-w-none">
                                    <div className={`text-gray-800 leading-relaxed space-y-3 ${isSmallMobile ? 'text-xs' : isMobile ? 'text-sm' : 'text-lg'}`}>
                                        {renderWithMath(solution, isSmallMobile ? 'text-xs' : isMobile ? 'text-sm' : 'text-lg')}
                                    </div>
                                </div>
                            </div>

                            {/* Step-by-Step Solution (second, duplicate) */}
                            <div>
                                <div className="prose prose-lg max-w-none">
                                    <div className={`text-gray-800 leading-relaxed space-y-3 ${isSmallMobile ? 'text-xs' : isMobile ? 'text-sm' : 'text-lg'}`}>
                                        {renderWithMath(solution, isSmallMobile ? 'text-xs' : isMobile ? 'text-sm' : 'text-lg')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className={`${isSmallMobile ? 'w-10 h-10' : isMobile ? 'w-12 h-12' : 'w-16 h-16'} bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                                <CheckCircle className={`${isSmallMobile ? 'w-5 h-5' : isMobile ? 'w-6 h-6' : 'w-8 h-8'} text-gray-400`} />
                            </div>
                            <h3 className={`${isSmallMobile ? 'text-sm' : isMobile ? 'text-base' : 'text-lg'} font-semibold text-gray-700 mb-2`}>
                                Solution not available yet
                            </h3>
                            <p className={`${isSmallMobile ? 'text-xs' : isMobile ? 'text-sm' : 'text-base'} text-gray-500`}>
                                The solution will be added soon
                            </p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className={`flex justify-end ${isSmallMobile ? 'p-3' : isMobile ? 'p-4' : 'p-6'} border-t border-gray-200`}>
                    <button
                        onClick={onClose}
                        className={`${isSmallMobile ? 'px-3 py-1 text-xs' : isMobile ? 'px-4 py-2 text-sm' : 'px-6 py-2'} bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-medium`}
                    >
                        Close
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default QuestionSolutionModal; 