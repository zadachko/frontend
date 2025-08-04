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
                className="!max-w-2xl !w-[90vw] !max-h-[90vh] !p-0 !overflow-hidden !border-0 !shadow-xl !top-[50%] !left-[50%] !translate-x-[-50%] !translate-y-[-50%] !rounded-lg !bg-white"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b bg-gray-50">
                    <div className="flex items-center gap-3">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                        <div>
                            <DialogTitle asChild>
                                <h1 className="text-xl font-bold text-gray-900">Решение</h1>
                            </DialogTitle>
                            <p className="text-sm text-gray-600">Ето пълното решение на задачата</p>
                        </div>
                    </div>
                    <DialogClose asChild>
                        <button className="p-2 hover:bg-gray-200 rounded-lg transition">
                            <X className="w-5 h-5 text-gray-600" />
                        </button>
                    </DialogClose>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                    {solution ? (
                        <div className="space-y-6">
                            {/* Correct Answer Section */}
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                                <div>
                                    <div className="font-semibold text-gray-900 mb-2">Верен отговор:</div>
                                    <div className="text-3xl font-bold text-green-700">
                                        {correctAnswer ? renderWithMath(correctAnswer, "text-xl") : "—"}
                                    </div>
                                </div>
                            </div>

                            {/* Step-by-Step Solution (first) */}
                            <div>
                                <div className="prose prose-lg max-w-none">
                                    <div className="text-gray-800 leading-relaxed space-y-3">
                                        {renderWithMath(solution, 'text-lg')}
                                    </div>
                                </div>
                            </div>

                            {/* Step-by-Step Solution (second, duplicate) */}
                            <div>
                                <div className="prose prose-lg max-w-none">
                                    <div className="text-gray-800 leading-relaxed space-y-3">
                                        {renderWithMath(solution, 'text-lg')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-700 mb-2">
                                Solution not available yet
                            </h3>
                            <p className="text-gray-500">
                                The solution will be added soon
                            </p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex justify-end p-6 border-t border-gray-200">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-medium"
                    >
                        Close
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default QuestionSolutionModal; 