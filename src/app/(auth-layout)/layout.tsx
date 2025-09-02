import type React from "react"
import type { Metadata } from "next"
import "../globals.css"
import Providers from "@/app/providers"
export const metadata: Metadata = {
  title: "Zadachko.com",
  description: "Подготви се за НВО 7. клас по математика ",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html >
  );
}
