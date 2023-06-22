import './globals.css'
import { Open_Sans } from 'next/font/google'

const open_sans = Open_Sans({ weight: ["300", "400", "500", "600", "700", "800"], style: "italic", display: "swap" })

export const metadata = {
  title: 'TAS Next',
  description: 'TAS NextJS API',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={open_sans.className}>{children}</body>
    </html>
  )
}
