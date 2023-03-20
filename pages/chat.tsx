import { NextPage } from 'next'
import Page from '@/components/shared/Layouts/Page'
import Text from '@/components/shared/Text'
import Chat from '@/components/chat/Chat'

const ChatPage: NextPage = () => {
  return (
    <Page className="flex flex-col gap-12" title="Chat">
      <section className="flex flex-col gap-6">
        <Text variant="h1">OpenAI GPT-3 text model usage example</Text>
        <Text className="text-zinc-600">
          In this example, a simple chat bot is implemented using Next.js, API
          Routes, and OpenAI API.
        </Text>
      </section>

      <section className="flex flex-col gap-3">
        <Text variant="h2">AI Chat Bot:</Text>
        <div className="">
          <Chat />
        </div>
      </section>
    </Page>
  )
}

export default ChatPage
