import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Check } from 'lucide-react'
import React from 'react'

type QuestionProps = {
    question: {
        id: number;
        statement: string;
        type: "text" | "multiple";
        options?: string[];
    }
    answers: {
        [key: number]: string;
    }
    handleAnswerChange: (questionId: number, value: string) => void;
}
const Question = ({ question, answers, handleAnswerChange }: QuestionProps) => {
    return (
        <Card key={question.id} className="bg-white border-0 shadow-md transition-all duration-300">
            <CardContent className="p-8">
                {/* First row: number + statement */}
                <div className="flex items-center gap-4 mb-4">
                    <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm bg-gray-100 text-gray-600">
                            {question.id}
                        </div>
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 leading-relaxed">
                        {question.statement}
                    </h3>
                </div>

                {/* Second row: answer inputs aligned with statement */}
                <div className="ml-[54px]"> {/* 40px (circle) + 16px (gap) */}
                    {question.type === "text" ? (
                        <div className="max-w-md">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Твоят отговор:</label>
                            <Input
                                value={answers[question.id] || ""}
                                onChange={(e) => handleAnswerChange(question.id, e.target.value)}

                                className="text-sm p-4 h-8 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                            />
                        </div>
                    ) : (
                        <div className="space-y-3">
                            <label className="block text-sm font-medium text-gray-700 mb-3">Изберете своя отговор:</label>
                            {question.options?.map((option: string, index: number) => {
                                const optionLetter = String.fromCharCode(97 + index);
                                const isSelected = answers[question.id] === optionLetter;
                                return (
                                    <button
                                        key={index}
                                        onClick={() => handleAnswerChange(question.id, optionLetter)}
                                        className={`w-full text-left p-3 rounded-lg border-2 transition-all duration-200 cursor-pointer ${isSelected
                                            ? "border-emerald-500  text-emerald-900"
                                            : "border-gray-200 bg-white  hover:bg-gray-100/70"
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${isSelected ? "border-emerald-500 bg-emerald-500" : "border-gray-300"
                                                    }`}
                                            >
                                                {isSelected && <Check className="w-4 h-4 text-white" />}
                                            </div>
                                            <span className="font-medium text-gray-700">{optionLetter})</span>
                                            <span className="text-gray-900">{option}</span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>

    )
}

export default Question;