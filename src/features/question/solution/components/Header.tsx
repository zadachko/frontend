import React from 'react'

type HeaderProps = {
    stepCountLabel: string
}

const Header = ({ stepCountLabel }: HeaderProps) => {
    return (
        <div className="px-4 md:px-8 pt-4 md:pt-8 pb-3 md:pb-4 border-b bg-white flex-shrink-0">
            <div className="flex items-center justify-between">
                <h3 className="text-lg md:text-xl font-bold text-gray-900">Решение – стъпки</h3>
                <span className="text-xs md:text-sm text-gray-500">Стъпка {stepCountLabel}</span>
            </div>
        </div>
    )
}

export default Header;