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
