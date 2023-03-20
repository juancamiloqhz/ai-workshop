import { Analytics } from '@vercel/analytics/react'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import '../styles/globals.css'
import { Provider as RWBProvider } from 'react-wrap-balancer'
import cx from 'clsx'
import localFont from '@next/font/local'
import { Inter } from '@next/font/google'

const clash = localFont({
  src: '../styles/ClashDisplay-Semibold.otf',
  variable: '--font-clash',
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <RWBProvider>
        <main className={cx(clash.variable, inter.variable)}>
          <Component {...pageProps} />
        </main>
      </RWBProvider>
      <Analytics />
    </SessionProvider>
  )
}

export default MyApp
