import { Card, CardContent } from '@/components/ui/card';
import React from 'react';
import 'katex/dist/katex.min.css';
import QuestionBadge from './QuestionBadge';
import QuestionStatement from './QuestionStatement';
import OpenAnswer from './OpenAnswer';
import type { DiagramData } from 'geometry-diagram-renderer';
import MultipleChoiceAnswer from './MultipleChoiceAnswer';

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
};

const Question = ({ question, answers, handleAnswerChange }: QuestionProps) => {
    return (
        <Card
            key={question.id}
            className="bg-white border-0 shadow-md transition-all duration-300"
        >
            <CardContent className="p-8">
                {/* First row: number + statement */}
                <div className="flex items-start gap-4 mb-4">
                    <QuestionBadge questionNumber={question.id} />
                    <QuestionStatement statement={question.statement} diagramData={question.diagramData} />
                </div>

                {/* Second row: answer inputs aligned with statement */}
                <div className="ml-[54px]">
                    {question.type === 'text' ? (
                        <OpenAnswer answers={answers} handleAnswerChange={handleAnswerChange} questionNumber={question.id} />
                    ) : (
                        <MultipleChoiceAnswer question={{ ...question, options: question.options! }} answers={answers} handleAnswerChange={handleAnswerChange} />
                    )}
                </div>
            </CardContent>
        </Card >
    );
};

export default Question;
