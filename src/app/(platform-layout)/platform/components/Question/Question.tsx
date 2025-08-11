import { Card, CardContent } from '@/components/ui/card';
import React, { useState } from 'react';
import 'katex/dist/katex.min.css';
import QuestionBadge from './QuestionBadge';
import QuestionStatement from './QuestionStatement';
import OpenAnswer from './OpenAnswer';
import type { DiagramData } from 'geometry-diagram-renderer';
import MultipleChoiceAnswer from './MultipleChoiceAnswer';
import { Badge } from '@/components/ui/badge';
import QuestionSolutionModal, { SolutionStep } from './QuestionSolutionModal';
import { useIsMobile, useIsSmallMobile } from '@/hooks/isMobile';
import { StepAction } from '../../../../../../libs/geometry-diagram-renderer/dist';

type QuestionProps = {
    question: {
        id: number
        statement: string
        type: "text" | "multiple"
        options?: string[]
        diagramData?: DiagramData
        diagramSteps?: StepAction[][]
        points?: number
    }
    answers: {
        [key: number]: string
    }
    handleAnswerChange: (questionId: number, value: string) => void
    // New props for review mode
    isReviewMode?: boolean
    correctAnswer?: string
    userAnswer?: string
    // New prop for solution
    solution?: string | SolutionStep[]
    // Prop to control display of solution button
    showRobotBadge?: boolean
}

const Question = ({
    question,
    answers,
    handleAnswerChange,
    isReviewMode = false,
    correctAnswer,
    userAnswer,
    solution,
    showRobotBadge = false,
}: QuestionProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const isMobile = useIsMobile();
    const isSmallMobile = useIsSmallMobile();

    let isCorrect = false
    if (userAnswer && correctAnswer) isCorrect = userAnswer === correctAnswer

    const handleCircleClick = () => {
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
    }

    function splitToSteps(htmlOrText: string): SolutionStep[] {
        const cleaned = htmlOrText
            .replace(/<\/?p[^>]*>/g, "\n") // turn <p> into newlines
            .replace(/<\/?strong[^>]*>/g, "") // drop <strong>
            .replace(/<[^>]+>/g, "") // drop any other tags
            .trim()

        return cleaned
            .split(/\n+/) // split by blank lines / paragraph ends
            .map((s) => s.trim())
            .filter(Boolean)
            .map((content, i) => ({ id: i + 1, content }))
    }

    return (
        <>
            <Card key={question.id} className="bg-white border-0 shadow-md transition-all duration-300 relative">
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

                <CardContent className={`${isSmallMobile ? 'px-2 py-2' : isMobile ? 'px-4 py-3' : 'px-8 py-4'}`}>
                    {/* First row: number + statement + points */}
                    <div className={`flex items-start justify-between mb-4 ${isMobile ? 'gap-3 items-center' : ''}`}>
                        <div className="flex items-start gap-4">
                            <QuestionBadge
                                questionNumber={question.id}
                                onCircleClick={handleCircleClick}
                                isMobile={isMobile}
                                isSmallMobile={isSmallMobile}
                                showRobotBadge={showRobotBadge}
                            />
                            <QuestionStatement
                                statement={question.statement}
                                diagramData={question.diagramData}
                                isMobile={isMobile}
                                isSmallMobile={isSmallMobile}
                            />
                        </div>

                        {question.points && (
                            <Badge
                                variant="secondary"
                                className="bg-blue-100 text-blue-800 font-semibold"
                            >
                                {question.points}т.
                            </Badge>
                        )}
                    </div>

                    {/* Second row: answer inputs aligned with statement */}
                    <div className={`${isSmallMobile ? 'ml-0' : isMobile ? 'ml-0' : 'ml-[54px]'}`}>
                        {question.type === 'text' ? (
                            <OpenAnswer
                                answers={answers}
                                handleAnswerChange={handleAnswerChange}
                                questionNumber={question.id}
                                isReviewMode={isReviewMode}
                                correctAnswer={correctAnswer}
                                userAnswer={userAnswer}
                                isMobile={isMobile}
                                isSmallMobile={isSmallMobile}
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
                                isMobile={isMobile}
                                isSmallMobile={isSmallMobile}
                            />
                        )}
                    </div>
                </CardContent >
            </Card >

            {/* Question Solution Modal */}
            < QuestionSolutionModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                exercise={{
                    id: question.id,
                    text: question.statement,
                    imageSrc: question.diagramData ? undefined : undefined,
                }}
                steps={
                    Array.isArray(solution)
                        ? solution.map((s, i) => ({ id: s.id ?? i + 1, title: s.title, content: s.content }))
                        : typeof solution === "string" && solution.trim()
                            ? splitToSteps(solution)
                            : []
                }
                questionType={question.type}
                userAnswer={userAnswer}
                correctAnswer={correctAnswer}
                options={question.options}
                diagramData={question.diagramData}
                diagramSteps={question.diagramSteps}
            />
        </>
    )
}

export default Question
