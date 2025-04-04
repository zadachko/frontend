import React from 'react'
import Link from 'next/link'
import {
    Mail,
    Lock,
    Eye,
    ArrowRight
} from 'lucide-react'

const Page = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900">Добре дошли</h1>
                    <p className="mt-2 text-gray-600">Влезте в своя акаунт, за да продължите</p>
                </div>

                {/* Login Form */}
                <form className="mt-8 space-y-6">
                    <div className="space-y-4">
                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Имейл
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6F58C9]/20 focus:border-[#6F58C9] sm:text-sm"
                                    placeholder="name@example.com"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Парола
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6F58C9]/20 focus:border-[#6F58C9] sm:text-sm"
                                    placeholder="••••••••"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    <button type="button" className="text-gray-400 hover:text-gray-500">
                                        <Eye className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="relative flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 text-[#6F58C9] focus:ring-[#6F58C9] border-gray-300 rounded cursor-pointer transition-colors hover:border-[#6F58C9]"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 cursor-pointer select-none hover:text-[#6F58C9] transition-colors">
                                        Запомни ме
                                    </label>
                                </div>
                            </div>
                            <Link href="/forgot-password" className="text-sm text-[#6F58C9] hover:text-[#6F58C9]/80">
                                Забравена парола?
                            </Link>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#6F58C9] hover:bg-[#6F58C9]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6F58C9] transition-colors"
                    >
                        <span>Вход</span>
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </form>

                {/* Sign Up Link */}
                <div className="text-center text-sm">
                    <span className="text-gray-600">Нямате акаунт?</span>
                    <Link href="/register" className="ml-1 text-[#6F58C9] hover:text-[#6F58C9]/80 font-medium">
                        Регистрирайте се
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Page