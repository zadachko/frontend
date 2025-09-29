import type React from "react"
import PlatformNavbar from "@/components/PlatformNavbar/PlatformNavbar"
import { ProtectedRoute } from "@/components/ProtectedRoute"

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <PlatformNavbar />
      <div className="flex flex-1 overflow-auto">
        <ProtectedRoute>
          {children}
        </ProtectedRoute>
      </div>
    </div>
  );
}
