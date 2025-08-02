import { Card, CardContent } from '@/components/ui/card';
import React, { useState } from 'react';
import 'katex/dist/katex.min.css';
import QuestionBadge from './QuestionBadge';
import QuestionStatement from './QuestionStatement';
import OpenAnswer from './OpenAnswer';
import type { DiagramData } from 'geometry-diagram-renderer';
import MultipleChoiceAnswer from './MultipleChoiceAnswer';
import { Badge } from '@/components/ui/badge';
import QuestionFullScreenModal from './QuestionFullScreenModal';

type QuestionProps = {
    question: {
        id: number;
        statement: string;
        type: 'text' | 'multiple';
        options?: string[];
        diagramData?: DiagramData;
    };
    answers: {
        [key: number]: string;
    };
    handleAnswerChange: (questionId: number, value: string) => void;
    // New props for review mode
    isReviewMode?: boolean;
    correctAnswer?: string;
    userAnswer?: string;
    // New prop for solution
    solution?: string;
};

const Question = ({
    question,
    answers,
    handleAnswerChange,
    isReviewMode = false,
    correctAnswer,
    userAnswer,
    solution,
}: QuestionProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    let isCorrect = false;
    if (userAnswer && correctAnswer) isCorrect = userAnswer === correctAnswer;

    const handleCircleClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Card
                key={question.id}
                className="bg-white border-0 shadow-md transition-all duration-300 relative"
            >
                {/* Result Badge for Review Mode */}
                {isReviewMode && (
                    <div className="absolute top-4 right-4 z-10">
                        <Badge
                            variant={isCorrect ? "default" : "destructive"}
                            className={isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                        >
                            {isCorrect ? "Правилно" : "Грешно"}
                        </Badge>
                    </div>
                )}

                <CardContent className="p-8">
                    {/* First row: number + statement */}
                    <div className="flex items-start gap-4 mb-4">
                        <QuestionBadge
                            questionNumber={question.id}
                            onCircleClick={handleCircleClick}
                        />
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
                </CardContent>
            </Card>

            {/* Full Screen Modal */}
            <QuestionFullScreenModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                question={question}
                solution={solution}
                answers={answers}
                handleAnswerChange={handleAnswerChange}
                isReviewMode={isReviewMode}
                correctAnswer={correctAnswer}
                userAnswer={userAnswer}
            />
        </>
    );
};

export default Question;
