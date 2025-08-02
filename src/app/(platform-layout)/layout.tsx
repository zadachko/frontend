import type React from "react"
import type { Metadata } from "next"
import "../globals.css"
import Sidebar from "@/components/Sidebar/Sidebar"
import PlatformNavbar from "@/components/PlatformNavbar/PlatformNavbar"

export const metadata: Metadata = {
  title: "Zadachko.com",
  description: "Подготви се за НВО 7. клас по математика ",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col h-screen">
          <PlatformNavbar />
          <div className="flex flex-1 overflow-hidden">
            <div className="h-full sticky top-0">
              <Sidebar />
            </div>
            <main className="flex-1 overflow-y-auto">{children}</main>
          </div>
        </div>
      </body>
    </html>
  )
}
