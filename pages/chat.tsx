import { NextPage } from "next";

import Chat from "@/components/chat/Chat";
import Text from "@/components/shared/Text";
import Layout from "@/components/shared/layout";

const ChatPage: NextPage = () => {
  return (
    <Layout>
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
    </Layout>
  );
};

export default ChatPage;
