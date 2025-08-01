import { Input } from '@/components/ui/input';
import React from 'react'

type OpenAnswerProps = {
    answers: {
        [key: number]: string;
    };
    handleAnswerChange: (questionId: number, value: string) => void;
    questionNumber: number;
}
const OpenAnswer = ({ answers, handleAnswerChange, questionNumber }: OpenAnswerProps) => {
    return (
        <div className="max-w-md">
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Твоят отговор:
            </label>
            <Input
                value={answers[questionNumber] || ''}
                onChange={e =>
                    handleAnswerChange(
                        questionNumber,
                        e.target.value
                    )
                }
                className="text-sm p-4 h-8 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            />
        </div>
    )
}

export default OpenAnswer