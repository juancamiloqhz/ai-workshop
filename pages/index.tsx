import Head from 'next/head'
import Link from 'next/link'
import { NextPage } from 'next'
import Page from '@/components/shared/Layouts/Page'
import Image from 'next/image'
import { useSession, signIn } from 'next-auth/react'

const Home: NextPage = () => {
  const { data: session, status } = useSession()
  return (
    <Page>
      <Head>
        <title>AI Workshop</title>
        <link rel="icon" href="/dog.png" />
      </Head>
      <div className="flex flex-col">
        <Link href="/name-my-pet">Name my pet</Link>
        <Link href="/twitter-bio">Generate Twitter Bio</Link>
        <Link href="/chat">Chat</Link>
      </div>
      <div className="h-[250px] flex flex-col items-center space-y-6 max-w-[670px] mx-auto -mt-8">
        <div className="max-w-xl text-gray-300 text-center">
          Sign in below with Google to create a free account and redesign your
          room today. You will be able to do 3 redesigns per day for free.
        </div>
        <button
          onClick={() => signIn('google')}
          className="bg-gray-200 text-black font-semibold py-3 px-6 rounded-2xl flex items-center space-x-2"
        >
          <Image src="/google.png" width={20} height={20} alt="google's logo" />
          <span>Sign in with Google</span>
        </button>
      </div>
      <p>{status}</p>
      {session && <pre>{JSON.stringify(session, null, 2)}</pre>}
    </Page>
  )
}

export default Home
