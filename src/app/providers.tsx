"use client";
import { ReactNode } from "react";
import { ApolloNextAppProvider } from "@apollo/client-integration-nextjs";
import { makeClient } from "@/lib/apollo";
import { AuthProvider } from "@/contexts/AuthContext";

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <ApolloNextAppProvider makeClient={() => makeClient()}>
            <AuthProvider>
                {children}
            </AuthProvider>
        </ApolloNextAppProvider>
    );
}
