import React from 'react'

const AssessmentError = ({ error }: { error: Error }) => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center w-screen">
            <div className="text-center">
                <p className="text-red-600 mb-4">Грешка при зареждане на въпросите</p>
                <p className="text-gray-600">{error.message}</p>
            </div>
        </div>
    )
}

export default AssessmentError;