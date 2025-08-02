import React, { useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import QuestionBadge from './QuestionBadge';
import QuestionStatement from './QuestionStatement';
import OpenAnswer from './OpenAnswer';
import MultipleChoiceAnswer from './MultipleChoiceAnswer';
import type { DiagramData } from 'geometry-diagram-renderer';
import { renderWithMath } from '../../common/utilities/renderWithMath';

type QuestionFullScreenModalProps = {
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

const QuestionFullScreenModal = ({
    isOpen,
    onClose,
    question,
    solution,
    answers = {},
    handleAnswerChange = () => { },
    isReviewMode = false,
    correctAnswer,
    userAnswer,
}: QuestionFullScreenModalProps) => {

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
            <DialogContent className="!max-w-none !w-[80vw] !h-[80vh] !p-0 !overflow-hidden !border-0 !shadow-none !top-[50%] !left-[50%] !translate-x-[-50%] !translate-y-[-50%] !rounded-lg">
                <div className="flex h-full">
                    {/* Left side - Question (exactly like normal view) */}
                    <div className="flex-1 p-8 border-r border-gray-200 overflow-y-auto bg-gray-50">
                        <div className="max-w-4xl mx-auto">
                            <div className="bg-white border-0 shadow-md rounded-lg">
                                <div className="p-8">
                                    {/* First row: number + statement */}
                                    <div className="flex items-start gap-4 mb-4">
                                        <QuestionBadge questionNumber={question.id} />
                                        <QuestionStatement statement={question.statement} diagramData={question.diagramData} />
                                    </div>

                                    {/* Second row: answer inputs aligned with statement */}
                                    <div className="ml-[54px]">
                                        {question.type === 'text' ? (
                                            <OpenAnswer
                                                answers={answers}
                                                handleAnswerChange={handleAnswerChange}
                                                questionNumber={question.id}
                                                isReviewMode={isReviewMode}
                                                correctAnswer={correctAnswer}
                                                userAnswer={userAnswer}
                                            />
                                        ) : (
                                            <MultipleChoiceAnswer
                                                question={{ ...question, options: question.options! }}
                                                answers={answers}
                                                handleAnswerChange={handleAnswerChange}
                                                isReviewMode={isReviewMode}
                                                isCorrect={isCorrect}
                                                correctAnswer={correctAnswer}
                                                userAnswer={userAnswer}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right side - Solution */}
                    <div className="flex-1 p-8 bg-white overflow-y-auto">
                        <div className="max-w-4xl mx-auto">
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                    Решение
                                </h2>
                                <div className="w-12 h-1 bg-green-500 rounded"></div>
                            </div>

                            <div className="prose prose-lg max-w-none">
                                {solution ? (
                                    <div className="text-gray-700 leading-relaxed">
                                        {renderWithMath(solution, 'text-lg')}
                                    </div>
                                ) : (
                                    <div className="text-gray-500 italic">
                                        Решението все още не е налично.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default QuestionFullScreenModal; 