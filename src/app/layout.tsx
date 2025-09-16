import { GoogleAnalytics } from '@next/third-parties/google'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import Footer from '@/components/footer'
import Header from '@/components/header'
import Aurora from '@/components/reactbits/Aurora'
import Particles from '@/components/reactbits/Particles'

import { Providers } from './providers'
import '@/app/globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const BackgroundEffects = () => (
  <>
    <div className="fixed inset-0">
      <Aurora
        colorStops={['#4C00FF', '#97FFF4', '#FF3D9A']}
        blend={3.3}
        amplitude={0.3}
        speed={1.3}
      />
    </div>
    <div className="fixed inset-0">
      <Particles
        particleColors={['#ffffff', '#ffffff']}
        particleCount={400}
        particleSpread={10}
        speed={0.05}
        particleBaseSize={100}
        moveParticlesOnHover={false}
        alphaParticles={false}
        disableRotation={false}
      />
    </div>
  </>
)

export const metadata: Metadata = {
  title: 'Values',
  icons: 'https://notes-wudi.pages.dev/images/logo.png',
  description: 'A simple tool to compare the value of cryptocurrencies, fiat currencies, and products.',
  keywords: [
    'cryptocurrency',
    'fiat currency',
    'product value',
    'currency converter',
    'crypto rates',
    'fiat rates',
    'product comparison',
    'exchange rates',
    'financial tool',
    'investment analysis',
  ],
  referrer: 'no-referrer-when-downgrade',
  authors: [{ name: 'wudi' }],
  robots: { index: true, follow: true },
  metadataBase: new URL('https://values.pages.dev/'),
  alternates: {
    canonical: '/'
  },
  openGraph: {
    title: 'Values',
    description: 'A simple tool to compare the value of cryptocurrencies, fiat currencies, and products.',
    url: '/',
    siteName: 'Values',
    images: [
      {
        url: 'https://cdn.jsdelivr.net/gh/cdLab996/picture-lib/wudi/value-vision/index.png'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Values',
    description: 'A simple tool to compare the value of cryptocurrencies, fiat currencies, and products.',
    images: ['https://cdn.jsdelivr.net/gh/cdLab996/picture-lib/wudi/value-vision/index.png'],
    site: '@wuchendi96',
    creator: '@wuchendi96'
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <BackgroundEffects />
          <main className="flex flex-col min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white">
            <Header />
            <div className="container mx-auto px-4 py-12 flex flex-col items-center flex-1">
              {children}
            </div>
            <Footer />
          </main>
        </Providers>
      </body>
      <GoogleAnalytics gaId="G-FPHG7CDDVQ" />
    </html>
  )
}
