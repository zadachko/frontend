import type React from "react"
import type { Metadata } from "next"
import "../globals.css"
import PlatformNavbar from "@/components/PlatformNavbar/PlatformNavbar"

export const metadata: Metadata = {
  title: "Zadachko.com",
  description: "Подготви се за НВО 7. клас по математика ",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col h-screen">
          <PlatformNavbar />
          <div className="flex flex-1 overflow-auto">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
