'use client';

import React, { useState } from 'react';
import {
    User,
    Bell,
    Lock,
    Globe,
    Moon,
    Sun,
    Palette,
    Trash2,
    Save
} from 'lucide-react';

const Page = () => {
    const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'preferences' | 'security'>('profile');
    const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light');
    const [notifications, setNotifications] = useState({
        email: true,
        push: true,
        weeklyReport: true,
        newProblems: true,
        achievements: true
    });

    const tabs = [
        { id: 'profile', label: 'Профил', icon: User },
        { id: 'notifications', label: 'Известия', icon: Bell },
        { id: 'preferences', label: 'Предпочитания', icon: Palette },
        { id: 'security', label: 'Сигурност', icon: Lock }
    ];

    const toggleNotification = (key: keyof typeof notifications) => {
        setNotifications(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    return (
        <div className="p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Настройки</h1>
                <p className="text-gray-600 mt-2">Управлявайте вашия акаунт и предпочитания</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as typeof activeTab)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${activeTab === tab.id
                                ? 'bg-[#6F58C9] text-white'
                                : 'text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            <Icon className="w-5 h-5" />
                            <span>{tab.label}</span>
                        </button>
                    );
                })}
            </div>

            {/* Content */}
            <div className="bg-white rounded-lg border border-gray-100 p-6">
                {/* Profile Tab */}
                {activeTab === 'profile' && (
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-20 h-20 rounded-full bg-[#6F58C9]/10 flex items-center justify-center">
                                <User className="w-10 h-10 text-[#6F58C9]" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900">Иван Иванов</h2>
                                <p className="text-gray-500">ivan@example.com</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Име
                                </label>
                                <input
                                    type="text"
                                    defaultValue="Иван Иванов"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6F58C9]/20 focus:border-[#6F58C9]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Имейл
                                </label>
                                <input
                                    type="email"
                                    defaultValue="ivan@example.com"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6F58C9]/20 focus:border-[#6F58C9]"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button className="flex items-center gap-2 px-4 py-2 bg-[#6F58C9] text-white rounded-lg hover:bg-[#6F58C9]/90 transition-colors">
                                <Save className="w-4 h-4" />
                                <span>Запази промените</span>
                            </button>
                        </div>
                    </div>
                )}

                {/* Notifications Tab */}
                {activeTab === 'notifications' && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-gray-900">Настройки на известията</h2>
                        <div className="space-y-4">
                            {Object.entries(notifications).map(([key, value]) => (
                                <div key={key} className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-medium text-gray-900">
                                            {key === 'email' && 'Имейл известия'}
                                            {key === 'push' && 'Push известия'}
                                            {key === 'weeklyReport' && 'Седмичен отчет'}
                                            {key === 'newProblems' && 'Нови задачи'}
                                            {key === 'achievements' && 'Постижения'}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            {key === 'email' && 'Получаване на известия по имейл'}
                                            {key === 'push' && 'Получаване на push известия в браузъра'}
                                            {key === 'weeklyReport' && 'Получаване на седмичен отчет за прогрес'}
                                            {key === 'newProblems' && 'Известия за нови задачи в любими категории'}
                                            {key === 'achievements' && 'Известия за нови постижения'}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => toggleNotification(key as keyof typeof notifications)}
                                        className={`relative w-12 h-6 rounded-full transition-colors ${value ? 'bg-[#6F58C9]' : 'bg-gray-200'
                                            }`}
                                    >
                                        <div
                                            className={`absolute w-4 h-4 rounded-full bg-white transition-transform ${value ? 'translate-x-7' : 'translate-x-1'
                                                }`}
                                        />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Preferences Tab */}
                {activeTab === 'preferences' && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-gray-900">Предпочитания</h2>
                        <div className="space-y-6">
                            {/* Theme */}
                            <div>
                                <h3 className="font-medium text-gray-900 mb-4">Тема</h3>
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => setTheme('light')}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${theme === 'light'
                                            ? 'border-[#6F58C9] bg-[#6F58C9]/10 text-[#6F58C9]'
                                            : 'border-gray-200 hover:bg-gray-50'
                                            }`}
                                    >
                                        <Sun className="w-5 h-5" />
                                        <span>Светла</span>
                                    </button>
                                    <button
                                        onClick={() => setTheme('dark')}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${theme === 'dark'
                                            ? 'border-[#6F58C9] bg-[#6F58C9]/10 text-[#6F58C9]'
                                            : 'border-gray-200 hover:bg-gray-50'
                                            }`}
                                    >
                                        <Moon className="w-5 h-5" />
                                        <span>Тъмна</span>
                                    </button>
                                    <button
                                        onClick={() => setTheme('system')}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${theme === 'system'
                                            ? 'border-[#6F58C9] bg-[#6F58C9]/10 text-[#6F58C9]'
                                            : 'border-gray-200 hover:bg-gray-50'
                                            }`}
                                    >
                                        <Globe className="w-5 h-5" />
                                        <span>Системна</span>
                                    </button>
                                </div>
                            </div>

                            {/* Language */}
                            <div>
                                <h3 className="font-medium text-gray-900 mb-4">Език</h3>
                                <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6F58C9]/20 focus:border-[#6F58C9]">
                                    <option value="bg">Български</option>
                                    <option value="en">English</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}

                {/* Security Tab */}
                {activeTab === 'security' && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-gray-900">Сигурност</h2>
                        <div className="space-y-6">
                            {/* Change Password */}
                            <div>
                                <h3 className="font-medium text-gray-900 mb-4">Промяна на парола</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Текуща парола
                                        </label>
                                        <input
                                            type="password"
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6F58C9]/20 focus:border-[#6F58C9]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Нова парола
                                        </label>
                                        <input
                                            type="password"
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6F58C9]/20 focus:border-[#6F58C9]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Потвърди новата парола
                                        </label>
                                        <input
                                            type="password"
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6F58C9]/20 focus:border-[#6F58C9]"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Two-Factor Authentication */}
                            <div>
                                <h3 className="font-medium text-gray-900 mb-4">Двуфакторна автентикация</h3>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-600">Добавете допълнителен слой сигурност към вашия акаунт</p>
                                    </div>
                                    <button className="px-4 py-2 bg-[#6F58C9] text-white rounded-lg hover:bg-[#6F58C9]/90 transition-colors">
                                        Активирай
                                    </button>
                                </div>
                            </div>

                            {/* Delete Account */}
                            <div className="pt-6 border-t">
                                <h3 className="font-medium text-red-600 mb-4">Изтриване на акаунт</h3>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-600">Изтрийте вашия акаунт и всички свързани данни</p>
                                    </div>
                                    <button className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                        <Trash2 className="w-4 h-4" />
                                        <span>Изтрий акаунт</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Page;