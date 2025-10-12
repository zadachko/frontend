import React from 'react'

const AssessmentLoading = ({ text }: { text: string }) => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center w-screen">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
                <p className="text-gray-600">{text}</p>
            </div>
        </div>
    )
}

export default AssessmentLoading;