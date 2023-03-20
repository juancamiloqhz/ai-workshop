import Head from 'next/head'
import Link from 'next/link'
import { NextPage } from 'next'
import Page from '@/components/shared/Layouts/Page'

const Home: NextPage = () => {
  return (
    <Page>
      <Head>
        <title>AI Workshop</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <Link href="/name-my-pet">Name my pet</Link>
      <Link href="/twitter-bio">Generate Twitter Bio</Link>
      <Link href="/chat">Chat</Link>
    </Page>
  )
}

export default Home
