import React from 'react'
import { renderWithMath } from '../../../common/utilities/renderWithMath';

const QuestionAnwers = ({
    questionType,
    userAnswer,
    correctAnswer,
    options,
    optionLetters,
}: {
    questionType: "text" | "multiple",
    userAnswer: string,
    correctAnswer: string,
    options: string[],
    optionLetters: string[]
}) => {
    if (!questionType) return null

    const hasBoth = !!userAnswer && !!correctAnswer

    // Map a provided answer (option text OR letter) to its canonical letter
    const getIndexForAnswer = (answer?: string): number | null => {
        if (!answer) return null
        const idxFromOption = options?.indexOf(answer)
        if (typeof idxFromOption === "number" && idxFromOption >= 0) return idxFromOption
        const normalized = answer
            .replace(/\)\s*$/, "")
            .trim()
            .toLowerCase()
        const idxFromLetter = optionLetters.findIndex((l) => l === normalized)
        if (idxFromLetter >= 0) return idxFromLetter
        return null
    }

    const userIndex = questionType === "multiple" ? getIndexForAnswer(userAnswer) : null
    const correctIndex = questionType === "multiple" ? getIndexForAnswer(correctAnswer) : null
    const userLetter = userIndex != null ? optionLetters[userIndex] : null
    const correctLetter = correctIndex != null ? optionLetters[correctIndex] : null
    const userOptionText = userIndex != null ? options[userIndex] : null
    const correctOptionText = correctIndex != null ? options[correctIndex] : null

    const isCorrect =
        hasBoth &&
        (questionType === "multiple"
            ? userIndex != null && correctIndex != null && userIndex === correctIndex
            : userAnswer === correctAnswer)

    const renderUserAnswer = () => {
        if (questionType === "multiple") {
            if (userIndex == null) return "Без отговор"
            return (
                <>
                    {`${userLetter}) `}
                    {userOptionText ? renderWithMath(userOptionText, "text-sm md:text-[16px]") : null}
                </>
            )
        }
        return userAnswer ? renderWithMath(userAnswer, "text-sm md:text-[16px]") : "Без отговор"
    }

    const renderCorrectAnswer = () => {
        if (questionType === "multiple") {
            if (correctIndex == null) return null
            return (
                <>
                    {`${correctLetter}) `}
                    {correctOptionText ? renderWithMath(correctOptionText, "text-sm md:text-[16px]") : null}
                </>
            )
        }
        return correctAnswer ? renderWithMath(correctAnswer, "text-sm md:text-[16px]") : null
    }

    return (
        <div className={`gap-3 mb-4 ${hasBoth && !isCorrect ? "flex flex-row" : ""}`}>
            <div
                className={[
                    "p-1 md:p-3 rounded border flex items-center justify-center",
                    hasBoth && !isCorrect ? "w-1/2" : "w-full",
                    isCorrect
                        ? "bg-green-50 border-green-200"
                        : hasBoth && !isCorrect
                            ? "bg-red-50 border-red-200"
                            : "bg-gray-50 border-gray-200",
                ].join(" ")}
            >
                <span className="text-xs md:text-sm text-gray-600 mr-1">Вашият отговор:</span>
                <span
                    className={[
                        "text-xs md:text-sm font-medium",
                        isCorrect ? "text-green-800" : hasBoth && !isCorrect ? "text-red-800" : "text-gray-800",
                    ].join(" ")}
                >
                    {renderUserAnswer()}
                </span>
            </div>

            {hasBoth && !isCorrect && (
                <div className="p-2 md:p-3 rounded border bg-green-50 border-green-200 w-1/2 flex justify-center">
                    <span className="text-xs md:text-sm text-gray-600">Правилен отговор: </span>
                    <span className="text-xs md:text-sm font-medium text-green-800">{renderCorrectAnswer()}</span>
                </div>
            )}
        </div>
    )
}

export default QuestionAnwers;