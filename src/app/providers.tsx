"use client";
import { ReactNode } from "react";
import { ApolloNextAppProvider } from "@apollo/client-integration-nextjs";
import { makeClient } from "@/lib/apollo";
import { AuthProvider } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function Providers({ children }: { children: ReactNode }) {
    const router = useRouter();
    return (
        <ApolloNextAppProvider
            makeClient={() =>
                makeClient(
                    undefined,
                    (path: string) => router.replace(path)
                )
            }
        >
            <AuthProvider>
                {children}
            </AuthProvider>
        </ApolloNextAppProvider>
    );
}
