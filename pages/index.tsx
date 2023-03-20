import Link from "next/link";
import { NextPage } from "next";
import Layout from "@/shared/layout";
import { motion } from "framer-motion";
import { FADE_DOWN_ANIMATION_VARIANTS } from "@/lib/constants";
import Balancer from "react-wrap-balancer";
import Card from "@/components/home/card";

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
      {/* here we are animating with Tailwind instead of Framer Motion because Framer Motion messes up the z-index for child components */}
      <div className="my-10 grid w-full max-w-screen-xl animate-[slide-down-fade_0.5s_ease-in-out] grid-cols-1 gap-5 px-5 md:grid-cols-3 xl:px-0">
        {examples.map(({ title, description }) => (
          <Card
            key={title}
            title={title}
            description={description}
            // demo={
            //   title === "Beautiful, reusable components" ? (
            //     <ComponentGrid />
            //   ) : (
            //     demo
            //   )
            // }
            // large={large}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Home;

const examples = [
  {
    title: "Beautiful, reusable components",
    description:
      "Pre-built beautiful, a11y-first components, powered by [Tailwind CSS](https://tailwindcss.com/), [Radix UI](https://www.radix-ui.com/), and [Framer Motion](https://framer.com/motion)",
    // large: true,
  },
  {
    title: "Performance first",
    description:
      "Built on [Next.js](https://nextjs.org/) primitives like `@next/font` and `next/image` for stellar performance.",
    // demo: <WebVitals />,
  },
  {
    title: "One-click Deploy",
    description:
      "Jumpstart your next project by deploying Precedent to [Vercel](https://vercel.com/) in one click.",
    // demo: (
    //   <a href={DEPLOY_URL}>
    //     {/* eslint-disable-next-line @next/next/no-img-element */}
    //     <img
    //       src="https://vercel.com/button"
    //       alt="Deploy with Vercel"
    //       width={120}
    //     />
    //   </a>
    // ),
  },
  {
    title: "Built-in Auth + Database",
    description:
      "Precedent comes with authentication and database via [Auth.js](https://authjs.dev/) + [Prisma](https://prisma.io/)",
    // demo: (
    //   <div className="flex items-center justify-center space-x-20">
    //     <Image alt="Auth.js logo" src="/authjs.webp" width={50} height={50} />
    //     <Image alt="Prisma logo" src="/prisma.svg" width={50} height={50} />
    //   </div>
    // ),
  },
  {
    title: "Hooks, utilities, and more",
    description:
      "Precedent offers a collection of hooks, utilities, and `@vercel/og`",
    // demo: (
    //   <div className="grid grid-flow-col grid-rows-3 gap-10 p-10">
    //     <span className="font-mono font-semibold">useIntersectionObserver</span>
    //     <span className="font-mono font-semibold">useLocalStorage</span>
    //     <span className="font-mono font-semibold">useScroll</span>
    //     <span className="font-mono font-semibold">nFormatter</span>
    //     <span className="font-mono font-semibold">capitalize</span>
    //     <span className="font-mono font-semibold">truncate</span>
    //   </div>
    // ),
  },
];
