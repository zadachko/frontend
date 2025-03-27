import { Button } from "@/components/ui/button";
import { UserPlus, ListTodo, Brain, LineChart, CheckCircle2 } from "lucide-react";

export default function Home() {
    return (
        <main className="min-h-screen">
            <div className="container mx-auto px-4 py-20">
                <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 py-16">
                    {/* Left content */}
                    <div className="flex-1 text-center lg:text-left">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                            Подготви се за НВО по математика с увереност
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
                            Нашата платформа предлага персонализирани задачи и стъпка по стъпка решения,
                            които ще ти помогнат да разбереш и овладяеш математиката.
                        </p>
                        {/* <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-colors duration-200">
                            Регистрирай се безплатно
                        </button> */}
                        <Button className="text-xl py-5 px-10 ">
                            Регистрирай се безплатно
                        </Button>
                    </div>

                    {/* Right content - Illustration */}
                    <div className="flex-1 flex justify-center lg:justify-end">
                        <img
                            src="/hero-img.svg"
                            alt="Ученик решава математически задачи"
                            className="w-screen"
                        />
                    </div>
                </div>

                {/* How it works section */}
                <div className="mt-32">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
                        Как работи платформата
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="flex flex-col items-center text-center p-6 bg-[#6F58C9]/5 rounded-lg">
                            <div className="w-16 h-16 bg-[#6F58C9]/10 rounded-full flex items-center justify-center mb-4">
                                <UserPlus className="w-8 h-8 text-[#6F58C9]" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Регистрираш се</h3>
                            <p className="text-gray-600">Създаваш своя акаунт за няколко секунди</p>
                        </div>

                        <div className="flex flex-col items-center text-center p-6 bg-[#6F58C9]/5 rounded-lg">
                            <div className="w-16 h-16 bg-[#6F58C9]/10 rounded-full flex items-center justify-center mb-4">
                                <ListTodo className="w-8 h-8 text-[#6F58C9]" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Избираш категория</h3>
                            <p className="text-gray-600">Избираш тема, която искаш да разгледаш</p>
                        </div>

                        <div className="flex flex-col items-center text-center p-6 bg-[#6F58C9]/5 rounded-lg">
                            <div className="w-16 h-16 bg-[#6F58C9]/10 rounded-full flex items-center justify-center mb-4">
                                <Brain className="w-8 h-8 text-[#6F58C9]" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Решаваш задачи</h3>
                            <p className="text-gray-600">Практикуваш с разнообразни задачи</p>
                        </div>

                        <div className="flex flex-col items-center text-center p-6 bg-[#6F58C9]/5 rounded-lg">
                            <div className="w-16 h-16 bg-[#6F58C9]/10 rounded-full flex items-center justify-center mb-4">
                                <LineChart className="w-8 h-8 text-[#6F58C9]" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Следиш напредъка си</h3>
                            <p className="text-gray-600">Виждаш своя прогрес и подобрения</p>
                        </div>
                    </div>
                </div>

                {/* Benefits section */}
                <div className="mt-32">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
                        Защо да избера тази платформа
                    </h2>
                    <div className="max-w-3xl mx-auto space-y-6">
                        <div className="flex items-start gap-4 p-6 bg-[#6F58C9]/5 rounded-lg">
                            <CheckCircle2 className="w-6 h-6 text-[#6F58C9] mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Автоматична проверка на отговорите</h3>
                                <p className="text-gray-600">Получаваш незабавна обратна връзка за своите решения</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-6 bg-[#6F58C9]/5 rounded-lg">
                            <CheckCircle2 className="w-6 h-6 text-[#6F58C9] mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Ясен прогрес</h3>
                                <p className="text-gray-600">Следиш своето развитие и подобрения в реално време</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-6 bg-[#6F58C9]/5 rounded-lg">
                            <CheckCircle2 className="w-6 h-6 text-[#6F58C9] mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Стотици задачи, подредени по теми</h3>
                                <p className="text-gray-600">Избираш точно темата, която искаш да разгледаш</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-6 bg-[#6F58C9]/5 rounded-lg">
                            <CheckCircle2 className="w-6 h-6 text-[#6F58C9] mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Напълно на български език</h3>
                                <p className="text-gray-600">Всичко е на твоя език, без преводи или объркване</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
