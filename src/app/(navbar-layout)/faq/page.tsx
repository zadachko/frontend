'use client';

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";

interface FAQItemProps {
    question: string;
    answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-200 py-4">
            <button
                className="flex w-full justify-between items-center text-left"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3 className="text-lg font-medium text-gray-900">{question}</h3>
                <span className="ml-6 flex-shrink-0">
                    {isOpen ? (
                        <ChevronUp className="h-5 w-5 text-[#6F58C9]" />
                    ) : (
                        <ChevronDown className="h-5 w-5 text-[#6F58C9]" />
                    )}
                </span>
            </button>
            {isOpen && (
                <div className="mt-3">
                    <p className="text-gray-600">{answer}</p>
                </div>
            )}
        </div>
    );
};

export default function FAQ() {
    const generalFAQs = [
        {
            question: "Какво представлява Задачко?",
            answer: "Задачко е онлайн платформа за подготовка за НВО по математика, която предлага интерактивни задачи, подробни обяснения и персонализирано проследяване на напредъка."
        },
        {
            question: "За кои класове е подходяща платформата?",
            answer: "Платформата е насочена основно към ученици от 7 клас, подготвящи се за НВО по математика, но имаме материали и за ученици от 5-ти и 6-ти клас, които искат да започнат подготовката си по-рано."
        },
        {
            question: "Необходимо ли е да се регистрирам, за да използвам Задачко?",
            answer: "Да, необходима е регистрация, за да можем да запазваме твоя напредък, да проследяваме кои задачи си решил и да ти предлагаме персонализирани препоръки. Регистрацията е безплатна и отнема само няколко секунди."
        },
        {
            question: "Има ли мобилно приложение на Задачко?",
            answer: "В момента Задачко е достъпен само като уеб платформа, но е напълно оптимизиран за използване и на мобилни устройства. Работим по създаването на мобилно приложение, което ще бъде пуснато скоро."
        }
    ];

    const contentFAQs = [
        {
            question: "Какви видове задачи мога да намеря в Задачко?",
            answer: "В Задачко ще намериш разнообразни видове задачи, подобни на тези в НВО изпита: задачи с избираем отговор, задачи с кратък свободен отговор, както и задачи с разширен свободен отговор. Задачите обхващат всички теми от учебната програма по математика."
        },
        {
            question: "Как са структурирани задачите?",
            answer: "Задачите са организирани по теми и подтеми, следвайки учебната програма. Всяка тема включва теоретична част, примерни решени задачи и множество упражнения с различни нива на трудност."
        },
        {
            question: "Има ли обяснения към задачите?",
            answer: "Да, за всяка задача предлагаме подробно обяснение на решението, което показва стъпка по стъпка как да се стигне до верния отговор. Можеш да видиш обяснението след като отговориш на задачата или ако избереш да видиш решението."
        },
        {
            question: "Колко често се добавят нови задачи?",
            answer: "Редовно добавяме нови задачи към платформата. Всеки месец добавяме минимум 50 нови задачи, като преди изпитния период увеличаваме този брой."
        }
    ];

    const subscriptionFAQs = [
        {
            question: "Колко струва абонаментът за Задачко?",
            answer: "Задачко предлага както безплатна, така и премиум версия. Безплатната версия включва достъп до ограничен брой задачи, докато премиум абонаментът предоставя пълен достъп до всички материали. Цените започват от 9.99 лв. на месец, а имаме и годишен план с отстъпка."
        },
        {
            question: "Как мога да се абонирам за премиум план?",
            answer: "След регистрация, можеш да избереш план от страницата 'Абонаменти' и да следваш инструкциите за плащане. Поддържаме различни методи за плащане, включително кредитна/дебитна карта и банков превод."
        },
        {
            question: "Мога ли да отменя абонамента си?",
            answer: "Да, можеш да отмениш абонамента си по всяко време от настройките на твоя профил. Ще имаш достъп до премиум функциите до края на текущия платен период."
        },
        {
            question: "Има ли отстъпки за ученици или учители?",
            answer: "Да, предлагаме специални образователни отстъпки за училища и учители. Също така имаме семейни планове, ако повече от един ученик от семейството използва платформата. За повече информация, моля свържете се с нас на имейл contact@zadachko.bg."
        }
    ];

    const techSupportFAQs = [
        {
            question: "Какво да направя, ако имам проблем с платформата?",
            answer: "Ако срещнеш технически проблем, първо опитай да опресниш страницата или да се излогнеш и влезеш отново. Ако проблемът продължава, моля свържи се с нашия екип за поддръжка чрез формата за контакт или на имейл support@zadachko.bg."
        },
        {
            question: "На какви устройства мога да използвам Задачко?",
            answer: "Задачко работи на всички съвременни устройства - компютри, лаптопи, таблети и смартфони. Поддържаме последните версии на всички популярни браузъри като Chrome, Firefox, Safari и Edge."
        },
        {
            question: "Мога ли да използвам Задачко офлайн?",
            answer: "В момента Задачко изисква интернет връзка, за да функционира пълноценно. Работим по функционалност за офлайн достъп до някои материали, която планираме да пуснем в бъдеще."
        },
        {
            question: "Как мога да променя паролата или имейла си?",
            answer: "Можеш да управляваш настройките на акаунта си от секцията 'Профил'. Там ще намериш опции за промяна на имейл, парола и други лични данни."
        }
    ];

    return (
        <main className="min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
                {/* Hero section */}
                <div className="flex flex-col items-center text-center mb-16">
                    <div className="w-16 h-16 bg-[#6F58C9]/10 rounded-full flex items-center justify-center mb-4">
                        <HelpCircle className="w-8 h-8 text-[#6F58C9]" />
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
                        Често задавани въпроси
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl">
                        Намери отговори на най-често задаваните въпроси за нашата платформа
                    </p>
                </div>

                {/* Search bar */}
                <div className="max-w-2xl mx-auto mb-12">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Търси въпрос..."
                            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-[#6F58C9] focus:border-[#6F58C9]"
                        />
                        <Button
                            className="absolute right-2 top-2 px-4"
                        >
                            Търси
                        </Button>
                    </div>
                </div>

                {/* FAQ Categories */}
                <div className="grid grid-cols-1 gap-8 md:gap-12 mb-20">
                    {/* General FAQ */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b border-[#6F58C9]/20 pb-2">
                            Общи въпроси
                        </h2>
                        <div className="space-y-1">
                            {generalFAQs.map((faq, index) => (
                                <FAQItem key={index} question={faq.question} answer={faq.answer} />
                            ))}
                        </div>
                    </div>

                    {/* Content FAQ */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b border-[#6F58C9]/20 pb-2">
                            Въпроси за съдържанието
                        </h2>
                        <div className="space-y-1">
                            {contentFAQs.map((faq, index) => (
                                <FAQItem key={index} question={faq.question} answer={faq.answer} />
                            ))}
                        </div>
                    </div>

                    {/* Subscription FAQ */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b border-[#6F58C9]/20 pb-2">
                            Въпроси за абонаменти
                        </h2>
                        <div className="space-y-1">
                            {subscriptionFAQs.map((faq, index) => (
                                <FAQItem key={index} question={faq.question} answer={faq.answer} />
                            ))}
                        </div>
                    </div>

                    {/* Tech Support FAQ */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b border-[#6F58C9]/20 pb-2">
                            Техническа поддръжка
                        </h2>
                        <div className="space-y-1">
                            {techSupportFAQs.map((faq, index) => (
                                <FAQItem key={index} question={faq.question} answer={faq.answer} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Contact section */}
                <div className="bg-[#6F58C9]/5 p-6 sm:p-8 rounded-lg text-center">
                    <h2 className="text-xl sm:text-2xl font-bold mb-4">
                        Не намери отговор на твоя въпрос?
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Свържи се с нас и нашият екип ще ти отговори възможно най-скоро
                    </p>
                    <Button className="px-6 py-3">
                        Свържи се с нас
                    </Button>
                </div>
            </div>
        </main>
    );
} 