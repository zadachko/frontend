import React from 'react'

type ExamRuleProps = {
    rule: {
        icon: React.ElementType;
        text: string;
    };
    index: number;
}
const ExamRule = ({ rule, index }: ExamRuleProps) => {
    return (
        <div key={index} className="flex items-start gap-3 p-2 rounded transition-colors">
            <div className="p-1.5 rounded-md bg-emerald-100 flex-shrink-0 mt-0.5 transition-colors">
                <rule.icon className="w-4 h-4 text-emerald-600" />
            </div>
            <span className="text-gray-700 text-base leading-relaxed">{rule.text}</span>
        </div>
    )
}

export default ExamRule;