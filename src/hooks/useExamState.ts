import { useState, useCallback, useMemo, Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/navigation';

export interface ExamState {
    timeLeft: number;
    answers: { [key: number]: string };
    currentQuestion: number;
    showSubmitDialog: boolean;
    showMobileNav: boolean;
    isExamStarted: boolean;
}

export interface ExamActions {
    setTimeLeft: Dispatch<SetStateAction<number>>;
    handleAnswerChange: (questionId: number, value: string) => void;
    goToQuestion: (questionId: number) => void;
    scrollToQuestion: (questionId: number) => void;
    getQuestionStatus: (questionId: number) => string;
    handleSubmitExam: () => void;
    confirmSubmit: () => void;
    cancelSubmit: () => void;
    toggleMobileNav: () => void;
    setShowMobileNav: (show: boolean) => void;
    setShowSubmitDialog: (show: boolean) => void;
}

export const useExamState = (
    totalQuestions: number,
    examDurationMinutes: number = 90,
    redirectPath: string = '/platform/exam/overview'
) => {
    const router = useRouter();

    // State
    const [timeLeft, setTimeLeft] = useState(examDurationMinutes * 60);
    const [answers, setAnswers] = useState<{ [key: number]: string }>({});
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [showSubmitDialog, setShowSubmitDialog] = useState(false);
    const [showMobileNav, setShowMobileNav] = useState(false);
    const [isExamStarted, setIsExamStarted] = useState(false);

    // Computed values
    const questionsAnswered = useMemo(() => Object.keys(answers).length, [answers]);
    const progressPercentage = useMemo(() =>
        totalQuestions > 0 ? (questionsAnswered / totalQuestions) * 100 : 0,
        [questionsAnswered, totalQuestions]
    );

    // Actions
    const handleAnswerChange = useCallback((questionId: number, value: string) => {
        setAnswers((prev) => ({
            ...prev,
            [questionId]: value,
        }));
    }, []);

    const goToQuestion = useCallback((questionId: number) => {
        setCurrentQuestion(questionId);
    }, []);

    const scrollToQuestion = useCallback((questionId: number) => {
        const questionElement = document.getElementById(`question-${questionId}`);
        if (questionElement) {
            questionElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }, []);

    const getQuestionStatus = useCallback((questionId: number) => {
        if (answers[questionId]) return "answered";
        return "unanswered";
    }, [answers]);

    const handleSubmitExam = useCallback(() => {
        setShowSubmitDialog(true);
    }, []);

    const confirmSubmit = useCallback(() => {
        setShowSubmitDialog(false);
        router.push(redirectPath);
    }, [router, redirectPath]);

    const cancelSubmit = useCallback(() => {
        setShowSubmitDialog(false);
    }, []);

    const toggleMobileNav = useCallback(() => {
        setShowMobileNav(!showMobileNav);
    }, [showMobileNav]);

    const startExam = useCallback(() => {
        setIsExamStarted(true);
    }, []);

    const state: ExamState = {
        timeLeft,
        answers,
        currentQuestion,
        showSubmitDialog,
        showMobileNav,
        isExamStarted,
    };

    const actions: ExamActions = {
        setTimeLeft,
        handleAnswerChange,
        goToQuestion,
        scrollToQuestion,
        getQuestionStatus,
        handleSubmitExam,
        confirmSubmit,
        cancelSubmit,
        toggleMobileNav,
        setShowMobileNav,
        setShowSubmitDialog,
    };

    return {
        state,
        actions,
        questionsAnswered,
        progressPercentage,
        startExam,
    };
};
