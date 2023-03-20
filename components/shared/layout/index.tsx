import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import useScroll from '@/lib/hooks/use-scroll'
import Meta from './meta'
import { Github } from '@/shared/icons'
import { useSignInModal } from './sign-in-modal'
import { AnimatePresence, motion } from 'framer-motion'
import { FADE_IN_ANIMATION_SETTINGS } from '@/lib/constants'
import UserDropdown from './user-dropdown'

export default function Layout({
  meta,
  children,
}: {
  meta?: {
    title?: string
    description?: string
    image?: string
  }
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const { SignInModal, setShowSignInModal } = useSignInModal()
  const scrolled = useScroll(50)

  return (
    <>
      <Meta {...meta} />
      <SignInModal />
      <div className="fixed h-screen w-full bg-gradient-to-br from-emerald-100 via-blue-50 to-rose-100" />
      <header
        className={`fixed top-0 w-full ${
          scrolled
            ? 'border-b border-gray-200 bg-white/50 backdrop-blur-xl'
            : 'bg-white/0'
        } z-30 transition-all`}
      >
        <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between xl:mx-auto">
          <Link href="/" className="flex items-center font-display text-2xl">
            <Image
              src="/logo.png"
              alt="Logo image of a chat bubble"
              width="38"
              height="38"
              className="mr-2 rounded-sm"
            ></Image>
            <p>AI Workshop</p>
          </Link>
          <div>
            <AnimatePresence>
              {!session && status !== 'loading' ? (
                <motion.button
                  className="rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black"
                  onClick={() => setShowSignInModal(true)}
                  {...FADE_IN_ANIMATION_SETTINGS}
                >
                  Sign In
                </motion.button>
              ) : (
                <UserDropdown />
              )}
            </AnimatePresence>
          </div>
          {/* <div className="flex items-center space-x-4">
            <a
              href="https://vercel.com/templates/next.js/extrapolate"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                width="1155"
                height="1000"
                viewBox="0 0 1155 1000"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
              >
                <path d="M577.344 0L1154.69 1000H0L577.344 0Z" fill="black" />
              </svg>
            </a>
            <a
              href="https://github.com/juancamiloqhz/ai-workshop"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github />
            </a>
          </div> */}
        </div>
      </header>
      <div className="flex min-h-screen w-full flex-col items-center justify-center py-32 relative">
        {children}
      </div>
      <footer className="absolute w-full border-t border-gray-200 bg-white py-5 text-center">
        <p className="text-gray-500">
          Powered by{' '}
          <a
            className="font-semibold text-gray-600 transition-colors hover:text-black"
            href="https://openai.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            OpenAI
          </a>
          ,{' '}
          <a
            className="font-semibold text-gray-600 transition-colors hover:text-black"
            href="https://replicate.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Replicate
          </a>{' '}
          and{' '}
          <a
            className="font-semibold text-gray-600 transition-colors hover:text-black"
            href="https://upstash.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Upstash
          </a>
          .
        </p>
      </footer>
    </>
  )
}
