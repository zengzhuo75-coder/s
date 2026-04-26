import type { Metadata } from 'next'
import { Noto_Serif_SC, Noto_Sans_SC } from 'next/font/google'
import './globals.css'
import { HeritageNavigationBar } from '@/components/HeritageNavigationBar'

const notoSerif = Noto_Serif_SC({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
})

const notoSans = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: '桥·水·城 | 杭州古桥多维可视化系统',
  description: '探索杭州千年古桥的历史、水系、地理与美学维度',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" className={`${notoSerif.variable} ${notoSans.variable}`}>
      <body className="antialiased">
        <HeritageNavigationBar />
        {children}
      </body>
    </html>
  )
}
