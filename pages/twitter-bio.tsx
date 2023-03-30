import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";

import Text from "@/components/shared/Text";
import { Github } from "@/components/shared/icons";
import Layout from "@/components/shared/layout";
import DropDown, { VibeType } from "@/components/twitter-bio/DropDown";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const TwitterBio: NextPage = () => {
  const [loading, setLoading] = React.useState(false);
  const [bio, setBio] = React.useState("");
  const [vibe, setVibe] = React.useState<VibeType>("Professional");
  const [generatedBios, setGeneratedBios] = React.useState<String>("");

  const bioRef = React.useRef<null | HTMLDivElement>(null);

  const scrollToBios = () => {
    if (bioRef.current !== null) {
      bioRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const prompt = `Generate 2 ${vibe} twitter biographies with no hashtags and clearly labeled "1." and "2.". ${
    vibe === "Funny"
      ? "Make sure there is a joke in there and it's a little ridiculous."
      : null
  }
      Make sure each generated biography is less than 160 characters, has short sentences that are found in Twitter bios, and base them on this context: ${bio}${
    bio.slice(-1) === "." ? "" : "."
  }`;

  const generateBio = async () => {
    if (bio.length === 0) return;
    setGeneratedBios("");
    setLoading(true);
    const response = await fetch("/api/twitter-bio/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setGeneratedBios((prev) => prev + chunkValue);
    }
    scrollToBios();
    setLoading(false);
  };

  return (
    <Layout>
      <Head>
        <title>Twitter Bio Generator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="mt-12 flex w-full flex-1 flex-col items-center justify-center px-4 text-center sm:mt-20">
        <a
          className="mb-5 flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-600 shadow-md transition-colors hover:bg-gray-100"
          href="https://github.com/juancamiloqhz/ai-workshop"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github />
          <p>Star on GitHub</p>
        </a>
        <Text variant="h1" className="max-w-[908px]">
          Generate your next Twitter bio using chatGPT
        </Text>
        <p className="mt-5 text-slate-500">47,118 bios generated so far.</p>
        <div className="w-full max-w-xl">
          <div className="mt-10 flex items-center space-x-3">
            <Image
              src="/1-black.png"
              width={30}
              height={30}
              alt="1 icon"
              className="mb-5 sm:mb-0"
            />
            <p className="text-left font-medium">
              Copy your current bio{" "}
              <span className="text-slate-500">
                (or write a few sentences about yourself)
              </span>
              .
            </p>
          </div>
          <Textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            className="my-5 w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
            placeholder={
              "e.g. Entrepreneur, software and mechanical engineer, and professional pyrotechnician. I'm like a firework, always exploding with new ideas."
            }
          />
          <div className="mb-5 flex items-center space-x-3">
            <Image src="/2-black.png" width={30} height={30} alt="1 icon" />
            <p className="text-left font-medium">Select your vibe.</p>
          </div>
          <div className="block">
            <DropDown vibe={vibe} setVibe={(newVibe) => setVibe(newVibe)} />
          </div>

          {!loading && (
            <Button onClick={generateBio} className="mt-8 w-full">
              Generate your bio &rarr;
            </Button>
          )}
          {loading && (
            <Button disabled className="mt-8 w-full">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            </Button>
          )}
        </div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
        <hr className="border-1 h-px bg-gray-700 dark:bg-gray-700" />
        <div className="my-10 space-y-10">
          {generatedBios && (
            <>
              <div>
                <h2
                  className="mx-auto text-3xl font-bold text-slate-900 sm:text-4xl"
                  ref={bioRef}
                >
                  Your generated bios
                </h2>
              </div>
              <div className="mx-auto flex max-w-xl flex-col items-center justify-center space-y-8">
                {generatedBios
                  .substring(generatedBios.indexOf("1") + 3)
                  .split("2.")
                  .map((generatedBio) => {
                    return (
                      <div
                        className="cursor-copy rounded-xl border bg-white p-4 shadow-md transition hover:bg-gray-100"
                        onClick={() => {
                          navigator.clipboard.writeText(generatedBio);
                          toast("Bio copied to clipboard", {
                            icon: "✂️",
                          });
                        }}
                        key={generatedBio}
                      >
                        <p>{generatedBio}</p>
                      </div>
                    );
                  })}
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default TwitterBio;
