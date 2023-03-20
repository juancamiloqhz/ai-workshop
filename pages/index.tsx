import Link from 'next/link'
import { NextPage } from 'next'
import Layout from '@/shared/layout'
import { motion } from 'framer-motion'
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/lib/constants'
import Balancer from 'react-wrap-balancer'

const Home: NextPage = () => {
  return (
    <Layout>
      <motion.div
        className="max-w-2xl px-5 xl:px-0"
        initial="hidden"
        whileInView="show"
        animate="show"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        <motion.h1
          className="bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent drop-shadow-sm md:text-7xl md:leading-[5rem]"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <Balancer>Collection of AI Examples</Balancer>
        </motion.h1>
        <motion.p
          className="mt-6 text-center text-gray-500 md:text-xl"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <Balancer>
            This is a collection of AI examples that I have created using
            different AI libraries.
          </Balancer>
        </motion.p>
        <div className="flex flex-col">
          <Link href="/name-my-pet">Name my pet</Link>
          <Link href="/twitter-bio">Generate Twitter Bio</Link>
          <Link href="/chat">Chat</Link>
        </div>
      </motion.div>
    </Layout>
  )
}

export default Home
