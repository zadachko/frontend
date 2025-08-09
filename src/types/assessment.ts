import { SolutionStep } from "@/app/(platform-layout)/platform/components/Question/QuestionSolutionModal"
import type { DiagramData } from "geometry-diagram-renderer"

export interface TestResult {
    id: string
    type: "test" | "exam"
    title: string
    date: string
    correctAnswers: number
    totalQuestions: number
    percentage: number
    duration?: string
    category?: string
}

export interface Question {
    id: number
    statement: string
    type: "text" | "multiple"
    options?: string[]
    diagramData?: DiagramData
    correctAnswer?: string
    userAnswer?: string
    isCorrect?: boolean
    points?: number
    solution?: string
    solutionSteps?: SolutionStep[] // ✅ new optional multi-step field
}

