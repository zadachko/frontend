'use client';

import React from "react";
import { Button } from "@/components/ui/button";
import { Users, BookOpen, GraduationCap, Trophy, CheckCircle2 } from "lucide-react";

export default function About() {
    return (
        <main className="min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
                {/* Hero section */}
                <div className="flex flex-col items-center text-center mb-16">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
                        За нас и нашата мисия
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl">
                        Задачко е създаден с цел да направи математиката достъпна и разбираема за всеки ученик,
                        подготвящ се за НВО по математика.
                    </p>
                </div>

                {/* Our Story section */}
                <div className="mb-20">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">
                        Нашата история
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div>
                            <p className="text-gray-600 mb-4">
                                Всичко започна преди 3 години, когато екип от преподаватели и разработчици реши да създаде
                                онлайн платформа, която наистина да помага на учениците да разберат математиката.
                            </p>
                            <p className="text-gray-600 mb-4">
                                Забелязахме, че много ученици изпитват трудности при подготовката за НВО изпита по математика.
                                Липсваше платформа, която да предлага персонализирана подготовка и ясни обяснения.
                            </p>
                            <p className="text-gray-600">
                                Така се роди Задачко - първата българска образователна платформа, която събира на едно място
                                най-важните теми и задачи за НВО по математика, поднесени по разбираем и интерактивен начин.
                            </p>
                        </div>
                        <div className="flex justify-center">
                            <div className="w-full max-w-md p-8 bg-[#6F58C9]/5 rounded-lg">
                                <h3 className="text-xl font-semibold mb-4 text-center">Ние вярваме, че...</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="text-[#6F58C9] h-5 w-5 mt-0.5 flex-shrink-0" />
                                        <span>Всеки ученик може да научи математика с правилния подход</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="text-[#6F58C9] h-5 w-5 mt-0.5 flex-shrink-0" />
                                        <span>Технологиите могат да направят ученето по-ефективно</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="text-[#6F58C9] h-5 w-5 mt-0.5 flex-shrink-0" />
                                        <span>Персонализираното обучение е бъдещето на образованието</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="text-[#6F58C9] h-5 w-5 mt-0.5 flex-shrink-0" />
                                        <span>Знанието трябва да бъде достъпно за всеки</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Team section */}
                <div className="mb-20">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">
                        Нашият екип
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        <div className="flex flex-col items-center text-center p-6 bg-[#6F58C9]/5 rounded-lg shadow-sm">
                            <div className="w-24 h-24 bg-[#6F58C9]/15 rounded-full flex items-center justify-center mb-4">
                                <Users className="w-12 h-12 text-[#6F58C9]" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Опитни преподаватели</h3>
                            <p className="text-gray-600">
                                Екип от преподаватели с дългогодишен опит в обучението по математика и подготовката за НВО
                            </p>
                        </div>

                        <div className="flex flex-col items-center text-center p-6 bg-[#6F58C9]/5 rounded-lg shadow-sm">
                            <div className="w-24 h-24 bg-[#6F58C9]/15 rounded-full flex items-center justify-center mb-4">
                                <BookOpen className="w-12 h-12 text-[#6F58C9]" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Методисти</h3>
                            <p className="text-gray-600">
                                Специалисти, които адаптират учебния материал според най-добрите образователни практики
                            </p>
                        </div>

                        <div className="flex flex-col items-center text-center p-6 bg-[#6F58C9]/5 rounded-lg shadow-sm">
                            <div className="w-24 h-24 bg-[#6F58C9]/15 rounded-full flex items-center justify-center mb-4">
                                <GraduationCap className="w-12 h-12 text-[#6F58C9]" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Разработчици</h3>
                            <p className="text-gray-600">
                                Талантливи технологични експерти, създаващи интуитивна и ефективна учебна платформа
                            </p>
                        </div>
                    </div>
                </div>

                {/* Our mission section */}
                <div className="mb-20">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8">
                        Нашата мисия
                    </h2>
                    <div className="bg-[#6F58C9]/5 p-8 rounded-lg">
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <div className="flex-shrink-0">
                                <div className="w-24 h-24 bg-[#6F58C9]/15 rounded-full flex items-center justify-center">
                                    <Trophy className="w-12 h-12 text-[#6F58C9]" />
                                </div>
                            </div>
                            <div>
                                <p className="text-lg text-gray-700 mb-4">
                                    Нашата мисия е да помогнем на всеки ученик да постигне успех на НВО изпита по математика чрез:
                                </p>
                                <ul className="space-y-2 text-gray-600">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="text-[#6F58C9] h-5 w-5 mt-0.5 flex-shrink-0" />
                                        <span>Предоставяне на качествени, ясни и разбираеми обяснения на математическите концепции</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="text-[#6F58C9] h-5 w-5 mt-0.5 flex-shrink-0" />
                                        <span>Осигуряване на разнообразни практически задачи, подобни на тези в изпита</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="text-[#6F58C9] h-5 w-5 mt-0.5 flex-shrink-0" />
                                        <span>Следене на индивидуалния прогрес и адаптиране на обучението според нуждите</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="text-[#6F58C9] h-5 w-5 mt-0.5 flex-shrink-0" />
                                        <span>Изграждане на увереност и позитивно отношение към математиката</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA section */}
                <div className="text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                        Готови ли сте да започнете?
                    </h2>
                    <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
                        Присъединете се към хилядите ученици, които вече успешно се подготвят с Задачко
                    </p>
                    <Button className="text-lg py-4 px-8">
                        Регистрирай се безплатно
                    </Button>
                </div>
            </div>
        </main>
    );
} 