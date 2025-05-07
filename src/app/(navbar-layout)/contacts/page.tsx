'use client';

import React from "react";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Clock, Send, Facebook, Instagram, Youtube } from "lucide-react";

export default function Contacts() {
    return (
        <main className="min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
                {/* Hero section */}
                <div className="flex flex-col items-center text-center mb-16">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
                        Свържете се с нас
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl">
                        Имате въпрос или предложение? Нашият екип е тук, за да ви помогне.
                    </p>
                </div>

                {/* Contact Info and Form */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    {/* Contact Information */}
                    <div>
                        <h2 className="text-2xl font-bold mb-6">Информация за контакт</h2>
                        <div className="space-y-6">
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <div className="w-10 h-10 bg-[#6F58C9]/10 rounded-full flex items-center justify-center">
                                        <Mail className="w-5 h-5 text-[#6F58C9]" />
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-medium text-gray-900">Имейл</h3>
                                    <p className="mt-1 text-gray-600">
                                        <a href="mailto:info@zadachko.bg" className="hover:text-[#6F58C9]">
                                            info@zadachko.bg
                                        </a>
                                    </p>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Отговаряме до 24 часа в работни дни
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <div className="w-10 h-10 bg-[#6F58C9]/10 rounded-full flex items-center justify-center">
                                        <Phone className="w-5 h-5 text-[#6F58C9]" />
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-medium text-gray-900">Телефон</h3>
                                    <p className="mt-1 text-gray-600">
                                        <a href="tel:+35929876543" className="hover:text-[#6F58C9]">
                                            +359 2 987 6543
                                        </a>
                                    </p>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Понеделник - Петък, 9:00 - 18:00
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <div className="w-10 h-10 bg-[#6F58C9]/10 rounded-full flex items-center justify-center">
                                        <MapPin className="w-5 h-5 text-[#6F58C9]" />
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-medium text-gray-900">Адрес</h3>
                                    <p className="mt-1 text-gray-600">
                                        ул. Иван Вазов 25, ет. 3<br />
                                        София 1000, България
                                    </p>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Посещения само с предварителна уговорка
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <div className="w-10 h-10 bg-[#6F58C9]/10 rounded-full flex items-center justify-center">
                                        <Clock className="w-5 h-5 text-[#6F58C9]" />
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-medium text-gray-900">Работно време</h3>
                                    <p className="mt-1 text-gray-600">
                                        Понеделник - Петък: 9:00 - 18:00<br />
                                        Събота - Неделя: Затворено
                                    </p>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Онлайн поддръжка е налична 24/7
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="mt-10">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Последвайте ни</h3>
                            <div className="flex space-x-4">
                                <a href="#" className="w-10 h-10 bg-[#6F58C9]/10 rounded-full flex items-center justify-center hover:bg-[#6F58C9]/20">
                                    <Facebook className="w-5 h-5 text-[#6F58C9]" />
                                </a>
                                <a href="#" className="w-10 h-10 bg-[#6F58C9]/10 rounded-full flex items-center justify-center hover:bg-[#6F58C9]/20">
                                    <Instagram className="w-5 h-5 text-[#6F58C9]" />
                                </a>
                                <a href="#" className="w-10 h-10 bg-[#6F58C9]/10 rounded-full flex items-center justify-center hover:bg-[#6F58C9]/20">
                                    <Youtube className="w-5 h-5 text-[#6F58C9]" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm border border-gray-100">
                        <h2 className="text-2xl font-bold mb-6">Изпратете ни съобщение</h2>
                        <form>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-1">
                                        Име
                                    </label>
                                    <input
                                        type="text"
                                        id="first-name"
                                        name="first-name"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#6F58C9] focus:border-[#6F58C9]"
                                        placeholder="Вашето име"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-1">
                                        Фамилия
                                    </label>
                                    <input
                                        type="text"
                                        id="last-name"
                                        name="last-name"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#6F58C9] focus:border-[#6F58C9]"
                                        placeholder="Вашата фамилия"
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Имейл адрес
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#6F58C9] focus:border-[#6F58C9]"
                                    placeholder="вашият@имейл.com"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                    Телефон (по желание)
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#6F58C9] focus:border-[#6F58C9]"
                                    placeholder="+359 888 888 888"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                                    Тема
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#6F58C9] focus:border-[#6F58C9]"
                                    placeholder="Тема на съобщението"
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                    Съобщение
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={5}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#6F58C9] focus:border-[#6F58C9]"
                                    placeholder="Опишете вашето запитване тук..."
                                ></textarea>
                            </div>
                            <Button className="w-full sm:w-auto">
                                Изпрати съобщение
                                <Send className="ml-2 h-4 w-4" />
                            </Button>
                        </form>
                    </div>
                </div>

                {/* Map Section */}
                <div className="mb-16">
                    <h2 className="text-2xl font-bold mb-6">Къде да ни намерите</h2>
                    <div className="h-96 bg-gray-200 rounded-lg overflow-hidden">
                        {/* Placeholder for map - in a real implementation, you'd use a Map component here */}
                        <div className="w-full h-full flex items-center justify-center bg-[#6F58C9]/5">
                            <MapPin className="h-16 w-16 text-[#6F58C9]/30" />
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mb-16">
                    <h2 className="text-2xl font-bold text-center mb-8">Често задавани въпроси</h2>
                    <div className="max-w-3xl mx-auto divide-y divide-gray-200">
                        <div className="py-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                Колко бързо отговаряте на запитвания?
                            </h3>
                            <p className="text-gray-600">
                                Стремим се да отговорим на всички имейли в рамките на 24 часа в работни дни. За спешни въпроси,
                                моля свържете се с нас по телефона.
                            </p>
                        </div>
                        <div className="py-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                Мога ли да получа техническа поддръжка през уикенда?
                            </h3>
                            <p className="text-gray-600">
                                Да, нашата система за техническа поддръжка е достъпна 24/7. За неспешни въпроси изпратени през
                                уикенда, ще получите отговор в понеделник.
                            </p>
                        </div>
                        <div className="py-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                Как да се свържа за въпроси относно абонаментите?
                            </h3>
                            <p className="text-gray-600">
                                За въпроси относно абонаментите и плащанията, моля изпратете имейл до billing@zadachko.bg
                                или използвайте формата за контакт, като посочите &ldquo;Абонамент&rdquo; в темата.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Newsletter Section */}
                <div className="bg-[#6F58C9]/5 p-6 sm:p-8 rounded-lg text-center">
                    <h2 className="text-xl sm:text-2xl font-bold mb-3">
                        Абонирайте се за нашия бюлетин
                    </h2>
                    <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                        Получавайте актуални новини, съвети за подготовка и информация за промоции директно в имейла си
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Вашият имейл адрес"
                            className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#6F58C9] focus:border-[#6F58C9]"
                        />
                        <Button className="whitespace-nowrap">
                            Абонирай се
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    );
} 