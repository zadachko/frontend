import { SolutionStep } from '@/features/question/solution/components/QuestionSolutionModal';
import type { DiagramData, StepAction } from 'geometry-diagram-renderer';

export interface TestResult {
    id: string;
    type: string; // "test" | "exam"
    title: string;
    date: string;
    correctAnswers: number;
    totalQuestions: number;
    percentage: number;
    duration?: string;
    category?: string;
}

export interface Question {
    position: number;
    statement: string;
    type: 'text' | 'multiple';
    options?: string[];
    diagramData?: DiagramData;
    diagramSteps?: StepAction[][];
    correctAnswer?: string;
    userAnswer?: string;
    points?: number;
    solutionSteps?: SolutionStep[];
}
