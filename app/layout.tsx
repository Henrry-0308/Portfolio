import type React from "react"
import "./globals.css"
import { Inter, JetBrains_Mono } from "next/font/google"
import Header from "@/components/header/Header"
import Footer from "@/components/footer/Footer"

import HeroData from "@/data/HeroData.json"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
})

export const metadata = {
  title: `${HeroData.name} | ${HeroData.description[0]}`,
  description: `${HeroData.description[0]}, ${HeroData.description[1]}, and ${HeroData.description[2]}`,
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}



import './globals.css'