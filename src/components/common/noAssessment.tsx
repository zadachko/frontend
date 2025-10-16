'use client';
import { GraduationCap } from "lucide-react";

const NoAssessment = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center w-screen">
            <div className="text-center">
                <GraduationCap className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">Изпит не е намерен</h1>
                <p className="text-gray-600 mb-6">
                    Не можем да намерим изпита, който търсите. Моля, проверете връзката или се върнете към списъка с
                    изпити.
                </p>
                <button
                    onClick={() => window.history.back()}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Назад
                </button>
            </div>
        </div>
    );
};
export default NoAssessment;