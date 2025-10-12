/**
 * Gets the status of a question.
 * @param answers - The answers.
 * @param questionId - The question id.
 * @returns The status of the question.
 */
export const getQuestionStatus = (
	answers: { [key: number]: string },
	questionId: number
): 'unanswered' | 'answered' => {
	if (answers[questionId]) return 'answered';
	return 'unanswered';
};
