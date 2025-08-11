"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"
import "katex/dist/katex.min.css"
import QuestionStatement from "./QuestionStatement"
import OpenAnswer from "./OpenAnswer"
import type { DiagramData } from "geometry-diagram-renderer"
import MultipleChoiceAnswer from "./MultipleChoiceAnswer"
import { Badge } from "@/components/ui/badge"
import QuestionSolutionModal, { type SolutionStep } from "./QuestionSolutionModal"
import type { StepAction } from "geometry-diagram-renderer"
import { BookOpen, Eye } from "lucide-react"
import QuestionBadge from "./QuestionBadge"

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
    showRobotBadge = true,
}: QuestionProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false)

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

                <CardContent className="px-8 py-4">
                    {/* Header row with question number, statement and points */}
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-4">
                            {showRobotBadge && (
                                <QuestionBadge
                                    questionNumber={question.id}
                                    onCircleClick={handleCircleClick}
                                />
                            )}

                            <QuestionStatement
                                statement={question.statement}
                                diagramData={question.diagramData}
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



                    {/* Answer inputs aligned with statement */}
                    <div className="ml-14">
                        {question.type === "text" ? (
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

            {/* Question Solution Modal */}
            <QuestionSolutionModal
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
