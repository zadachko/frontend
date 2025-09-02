'use client';

import React, { useCallback, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

// ⬇️ Adjust these imports to whatever your Codegen output file is
// If you rename the operation to `Login`, replace with: `useLoginMutation`
import { useMutationMutation } from '@/gql/operations';

type FormState = {
    email: string;
    password: string;
    remember: boolean;
};

const Page: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState<FormState>({
        email: '',
        password: '',
        remember: true,
    });
    const [formError, setFormError] = useState<string | null>(null);

    const redirectTo = useMemo(
        () => searchParams.get('redirect') || '/',
        [searchParams]
    );

    const [login, { loading }] = useMutationMutation();

    const onChange =
        (key: keyof FormState) =>
            (e: React.ChangeEvent<HTMLInputElement>) => {
                const value =
                    key === 'remember' ? (e.target as HTMLInputElement).checked : e.target.value;
                setForm((s) => ({ ...s, [key]: value as string }));
            };

    const handleSubmit = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setFormError(null);

            const email = form.email.trim();
            const password = form.password;

            // tiny client-side guardrails
            if (!email || !password) {
                setFormError('Моля, въведете имейл и парола.');
                return;
            }

            try {
                const { data } = await login({
                    variables: {
                        input: { email, password },
                    },
                });

                const accessToken = data?.login?.accessToken ?? '';
                const refreshToken = data?.login?.refreshToken ?? '';

                if (!accessToken || !refreshToken) {
                    setFormError('Невалиден отговор от сървъра. Опитайте отново.');
                    return;
                }

                // Store tokens (client-side). For production, prefer setting HttpOnly cookies server-side.
                if (form.remember) {
                    localStorage.setItem('accessToken', accessToken);
                    localStorage.setItem('refreshToken', refreshToken);
                    sessionStorage.removeItem('accessToken');
                    sessionStorage.removeItem('refreshToken');
                } else {
                    sessionStorage.setItem('accessToken', accessToken);
                    sessionStorage.setItem('refreshToken', refreshToken);
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                }

                router.push(redirectTo);
            } catch (err: unknown) {
                // ApolloError has `message`
                const getErrorMessage = (error: unknown): string => {
                    if (error && typeof error === 'object' && 'graphQLErrors' in error) {
                        const apolloError = error as { graphQLErrors?: Array<{ message?: string }> };
                        return apolloError.graphQLErrors?.[0]?.message || 'GraphQL error';
                    }
                    if (error instanceof Error) {
                        return error.message;
                    }
                    return 'Възникна грешка при вход. Опитайте отново.';
                };

                const message = getErrorMessage(err);
                setFormError(message);
            }
        },
        [form, login, redirectTo, router]
    );

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900">Добре дошли</h1>
                    <p className="mt-2 text-gray-600">Влезте в своя акаунт, за да продължите</p>
                </div>

                {/* Login Form */}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
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
                                    value={form.email}
                                    onChange={onChange('email')}
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
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    required
                                    value={form.password}
                                    onChange={onChange('password')}
                                    className="appearance-none block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6F58C9]/20 focus:border-[#6F58C9] sm:text-sm"
                                    placeholder="••••••••"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((s) => !s)}
                                        aria-label={showPassword ? 'Скрий паролата' : 'Покажи паролата'}
                                        className="text-gray-400 hover:text-gray-500"
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
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
                                        checked={form.remember}
                                        onChange={onChange('remember')}
                                        className="h-4 w-4 text-[#6F58C9] focus:ring-[#6F58C9] border-gray-300 rounded cursor-pointer transition-colors hover:border-[#6F58C9]"
                                    />
                                    <label
                                        htmlFor="remember-me"
                                        className="ml-2 block text-sm text-gray-700 cursor-pointer select-none hover:text-[#6F58C9] transition-colors"
                                    >
                                        Запомни ме
                                    </label>
                                </div>
                            </div>
                            <Link href="/forgot-password" className="text-sm text-[#6F58C9] hover:text-[#6F58C9]/80">
                                Забравена парола?
                            </Link>
                        </div>

                        {/* Error */}
                        {formError && (
                            <div
                                role="alert"
                                className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
                            >
                                {formError}
                            </div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#6F58C9] hover:bg-[#6F58C9]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6F58C9] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        <span>{loading ? 'Влизане…' : 'Вход'}</span>
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
    );
};

export default Page;
