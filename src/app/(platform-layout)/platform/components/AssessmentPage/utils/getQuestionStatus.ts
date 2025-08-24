import type { Question as QuestionType } from '@/types';

/**
 * Gets the status of a question.
 * @param questions - The questions.
 * @param questionNum - The question number.
 * @returns The status of the question.
 */
export const getQuestionStatusOverview = (
	questions: QuestionType[],
	questionNum: number
): 'unanswered' | 'correct' | 'incorrect' => {
	const question = questions.find(q => q.position === questionNum);
	if (!question || !question.userAnswer) return 'unanswered';

	const isCorrect = question.userAnswer === question.correctAnswer;
	return isCorrect ? 'correct' : 'incorrect';
};

/**
 * Gets the status of a question.
 * @param answers - The answers.
 * @param questionId - The question id.
 * @returns The status of the question.
 */
export const getQuestionStatusLive = (
	answers: { [key: number]: string },
	questionId: number
): 'unanswered' | 'answered' => {
	if (answers[questionId]) return 'answered';
	return 'unanswered';
};
