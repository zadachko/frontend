'use client';

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, X, PieChart } from "lucide-react";

const PricingToggle = ({ isAnnual, setIsAnnual }: { isAnnual: boolean; setIsAnnual: (value: boolean) => void }) => {
    return (
        <div className="flex items-center justify-center mb-8">
            <span className={`mr-3 text-base ${!isAnnual ? "font-semibold text-gray-900" : "text-gray-500"}`}>
                Месечно
            </span>
            <button
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#6F58C9] focus:ring-offset-2 ${isAnnual ? "bg-[#6F58C9]" : "bg-gray-300"
                    }`}
                onClick={() => setIsAnnual(!isAnnual)}
            >
                <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isAnnual ? "translate-x-6" : "translate-x-1"
                        }`}
                />
            </button>
            <span className={`ml-3 text-base ${isAnnual ? "font-semibold text-gray-900" : "text-gray-500"}`}>
                Годишно <span className="text-sm font-semibold text-[#6F58C9]">(-20%)</span>
            </span>
        </div>
    );
};

export default function Subscriptions() {
    const [isAnnual, setIsAnnual] = useState(true);

    // Pricing data for the plans
    const plans = [
        {
            name: "Безплатен",
            description: "Основни функционалности за начално запознаване с платформата",
            monthlyPrice: 0,
            yearlyPrice: 0,
            features: [
                { title: "Достъп до основни задачи", included: true },
                { title: "Задачи с избираем отговор", included: true },
                { title: "Проследяване на напредъка", included: true },
                { title: "Всички обучителни теми", included: false },
                { title: "Задачи със свободен отговор", included: false },
                { title: "Пробни изпити", included: false },
                { title: "Обяснения към всички задачи", included: false },
                { title: "Персонализирани препоръки", included: false },
                { title: "Приоритетна поддръжка", included: false }
            ],
            ctaText: "Започни безплатно",
            popular: false
        },
        {
            name: "Премиум",
            description: "Най-популярният избор за сериозна подготовка за НВО",
            monthlyPrice: 19.99,
            yearlyPrice: 15.99,
            features: [
                { title: "Достъп до основни задачи", included: true },
                { title: "Задачи с избираем отговор", included: true },
                { title: "Проследяване на напредъка", included: true },
                { title: "Всички обучителни теми", included: true },
                { title: "Задачи със свободен отговор", included: true },
                { title: "Пробни изпити", included: true },
                { title: "Обяснения към всички задачи", included: true },
                { title: "Персонализирани препоръки", included: false },
                { title: "Приоритетна поддръжка", included: false }
            ],
            ctaText: "Избери премиум",
            popular: true
        },
        {
            name: "Премиум+",
            description: "Пълен достъп до всички функции и приоритетна поддръжка",
            monthlyPrice: 29.99,
            yearlyPrice: 23.99,
            features: [
                { title: "Достъп до основни задачи", included: true },
                { title: "Задачи с избираем отговор", included: true },
                { title: "Проследяване на напредъка", included: true },
                { title: "Всички обучителни теми", included: true },
                { title: "Задачи със свободен отговор", included: true },
                { title: "Пробни изпити", included: true },
                { title: "Обяснения към всички задачи", included: true },
                { title: "Персонализирани препоръки", included: true },
                { title: "Приоритетна поддръжка", included: true }
            ],
            ctaText: "Избери премиум+",
            popular: false
        }
    ];

    // Calculate the yearly price based on monthly
    const getYearlyTotal = (monthlyPrice: number) => {
        return (monthlyPrice * 12 * 0.8).toFixed(2);
    };

    return (
        <main className="min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
                {/* Hero section */}
                <div className="text-center mb-16">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
                        Абонаментни планове
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                        Избери най-подходящия план за твоята подготовка за НВО по математика
                    </p>
                    <PricingToggle isAnnual={isAnnual} setIsAnnual={setIsAnnual} />
                </div>

                {/* Pricing Plans */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`relative rounded-lg shadow-sm border ${plan.popular ? "border-[#6F58C9]" : "border-gray-200"
                                } overflow-hidden bg-white`}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 inset-x-0 bg-[#6F58C9] text-white text-xs font-medium py-1 text-center">
                                    Най-популярен избор
                                </div>
                            )}
                            <div className="p-6 pt-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                                <p className="text-gray-500 h-12">{plan.description}</p>
                                <div className="mt-4 mb-8">
                                    <div className="flex items-baseline">
                                        <span className="text-4xl font-bold text-gray-900">
                                            {isAnnual ? plan.yearlyPrice : plan.monthlyPrice}
                                        </span>
                                        <span className="text-lg text-gray-500 ml-1">лв.</span>
                                        <span className="text-gray-500 ml-2">/ месец</span>
                                    </div>
                                    {plan.monthlyPrice > 0 && isAnnual && (
                                        <p className="text-sm text-gray-500 mt-1">
                                            Общо {getYearlyTotal(plan.monthlyPrice)} лв. за 12 месеца
                                        </p>
                                    )}
                                </div>
                                <Button
                                    className={`w-full ${plan.popular ? "bg-[#6F58C9] hover:bg-[#6F58C9]/90" : ""
                                        }`}
                                >
                                    {plan.ctaText}
                                </Button>
                            </div>
                            <div className="border-t border-gray-200 p-6">
                                <h4 className="text-base font-semibold text-gray-900 mb-4">Включено:</h4>
                                <ul className="space-y-3">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start">
                                            <span className="mr-2 rounded-full p-1 text-white">
                                                {feature.included ? (
                                                    <Check className="h-4 w-4 text-[#6F58C9]" />
                                                ) : (
                                                    <X className="h-4 w-4 text-gray-300" />
                                                )}
                                            </span>
                                            <span
                                                className={`text-sm ${feature.included ? "text-gray-700" : "text-gray-400"
                                                    }`}
                                            >
                                                {feature.title}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Feature Comparison */}
                <div className="mb-16">
                    <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">
                        Сравнение на плановете
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr>
                                    <th
                                        scope="col"
                                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                    >
                                        Функционалност
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                                    >
                                        Безплатен
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                                    >
                                        Премиум
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                                    >
                                        Премиум+
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                <tr>
                                    <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                        Брой задачи
                                    </td>
                                    <td className="px-3 py-4 text-sm text-center text-gray-500">100+</td>
                                    <td className="px-3 py-4 text-sm text-center text-gray-500">1000+</td>
                                    <td className="px-3 py-4 text-sm text-center text-gray-500">1500+</td>
                                </tr>
                                <tr>
                                    <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                        Брой теми
                                    </td>
                                    <td className="px-3 py-4 text-sm text-center text-gray-500">5</td>
                                    <td className="px-3 py-4 text-sm text-center text-gray-500">20</td>
                                    <td className="px-3 py-4 text-sm text-center text-gray-500">30</td>
                                </tr>
                                <tr>
                                    <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                        Пробни изпити
                                    </td>
                                    <td className="px-3 py-4 text-center">
                                        <X className="h-5 w-5 text-gray-300 mx-auto" />
                                    </td>
                                    <td className="px-3 py-4 text-center">
                                        <Check className="h-5 w-5 text-[#6F58C9] mx-auto" />
                                    </td>
                                    <td className="px-3 py-4 text-center">
                                        <Check className="h-5 w-5 text-[#6F58C9] mx-auto" />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                        Персонализирани препоръки
                                    </td>
                                    <td className="px-3 py-4 text-center">
                                        <X className="h-5 w-5 text-gray-300 mx-auto" />
                                    </td>
                                    <td className="px-3 py-4 text-center">
                                        <X className="h-5 w-5 text-gray-300 mx-auto" />
                                    </td>
                                    <td className="px-3 py-4 text-center">
                                        <Check className="h-5 w-5 text-[#6F58C9] mx-auto" />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                        Анализ на грешките
                                    </td>
                                    <td className="px-3 py-4 text-center">
                                        <X className="h-5 w-5 text-gray-300 mx-auto" />
                                    </td>
                                    <td className="px-3 py-4 text-center">
                                        <Check className="h-5 w-5 text-[#6F58C9] mx-auto" />
                                    </td>
                                    <td className="px-3 py-4 text-center">
                                        <Check className="h-5 w-5 text-[#6F58C9] mx-auto" />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                        Приоритетна поддръжка
                                    </td>
                                    <td className="px-3 py-4 text-center">
                                        <X className="h-5 w-5 text-gray-300 mx-auto" />
                                    </td>
                                    <td className="px-3 py-4 text-center">
                                        <X className="h-5 w-5 text-gray-300 mx-auto" />
                                    </td>
                                    <td className="px-3 py-4 text-center">
                                        <Check className="h-5 w-5 text-[#6F58C9] mx-auto" />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                        Отпечатване на материали
                                    </td>
                                    <td className="px-3 py-4 text-center">
                                        <X className="h-5 w-5 text-gray-300 mx-auto" />
                                    </td>
                                    <td className="px-3 py-4 text-center">
                                        <Check className="h-5 w-5 text-[#6F58C9] mx-auto" />
                                    </td>
                                    <td className="px-3 py-4 text-center">
                                        <Check className="h-5 w-5 text-[#6F58C9] mx-auto" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Usage Statistics */}
                <div className="bg-[#6F58C9]/5 rounded-lg p-8 mb-16">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                Защо да избереш премиум?
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Нашите статистики показват, че учениците с премиум абонамент имат значително по-висок успех на НВО изпита.
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-start">
                                    <Check className="h-5 w-5 text-[#6F58C9] mt-0.5 mr-2" />
                                    <span>
                                        <strong>85%</strong> от премиум потребителите получават оценка над 5.00 на НВО
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <Check className="h-5 w-5 text-[#6F58C9] mt-0.5 mr-2" />
                                    <span>
                                        Среден резултат на премиум потребителите: <strong>78/100</strong> точки
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <Check className="h-5 w-5 text-[#6F58C9] mt-0.5 mr-2" />
                                    <span>
                                        <strong>3x</strong> повече решени задачи в сравнение с безплатния план
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <Check className="h-5 w-5 text-[#6F58C9] mt-0.5 mr-2" />
                                    <span>
                                        <strong>Персонализирано</strong> обучение според индивидуалните нужди
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <div className="flex-1 flex justify-center">
                            <div className="w-64 h-64 bg-white rounded-full flex items-center justify-center">
                                <PieChart className="w-40 h-40 text-[#6F58C9]" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* FAQ */}
                <div className="mb-16">
                    <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
                        Често задавани въпроси
                    </h2>
                    <div className="max-w-3xl mx-auto divide-y divide-gray-200">
                        <div className="py-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                Как да избера най-подходящия план?
                            </h3>
                            <p className="text-gray-600">
                                Ако просто искаш да разгледаш платформата, започни с безплатния план. За сериозна подготовка,
                                Премиум планът е най-популярният избор. Ако желаеш пълно персонализиране и приоритетна поддръжка,
                                избери Премиум+.
                            </p>
                        </div>
                        <div className="py-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                Мога ли да променя плана си по-късно?
                            </h3>
                            <p className="text-gray-600">
                                Да, можеш да надградиш своя план по всяко време. При надграждане ще ти бъде начислена
                                само разликата в цената, пропорционално на оставащото време от текущия ти абонамент.
                            </p>
                        </div>
                        <div className="py-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                Има ли отстъпки за училища или групи?
                            </h3>
                            <p className="text-gray-600">
                                Да, предлагаме специални отстъпки за училища и групи от повече от 10 ученика. За повече информация,
                                моля свържете се с нас на имейл schools@zadachko.bg.
                            </p>
                        </div>
                        <div className="py-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                Какви методи на плащане приемате?
                            </h3>
                            <p className="text-gray-600">
                                Поддържаме плащане с всички основни кредитни и дебитни карти, както и банков превод.
                                Всички плащания са защитени и криптирани.
                            </p>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                        Готови ли сте да започнете успешната си подготовка?
                    </h2>
                    <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
                        Присъединете се към хилядите ученици, които вече подобриха резултатите си по математика с Задачко
                    </p>
                    <Button size="lg" className="px-8 py-6 text-lg">
                        Регистрирай се сега
                    </Button>
                    <p className="mt-4 text-sm text-gray-500">
                        Без обвързващи договори. Отмени по всяко време.
                    </p>
                </div>
            </div>
        </main>
    );
} 