import Link from "next/link";
import { NextPage } from "next";
import Layout from "@/shared/layout";
import { motion } from "framer-motion";
import { FADE_DOWN_ANIMATION_VARIANTS } from "@/lib/constants";
import Balancer from "react-wrap-balancer";
import Card from "@/components/home/card";
import React from "react";

const Home: NextPage = () => {
  React.useEffect(() => {
    const cards = document.querySelectorAll(`.card`) as NodeListOf<HTMLElement>;
    // Add the tails to each card
    cards.forEach((card) => {
      [`top`, `right`, `bottom`, `left`].forEach((side) => {
        const tail = document.createElement(`div`);
        tail.classList.add(`tail`, side);
        card.appendChild(tail);
      });
      // if that card has no colours, add some
      // if (!card.style.getPropertyValue(`--color1`)) {
      card.style.setProperty(
        `--color1`,
        `hsl(${Math.random() * 360}, 100%, 50%)`,
      );
      card.style.setProperty(
        `--color2`,
        `hsl(${Math.random() * 360}, 100%, 50%)`,
      );
      // }
    });

    const interval = setInterval(() => {
      cards.forEach((card) => {
        // if (!card.style.getPropertyValue(`--color1`)) {
        card.style.setProperty(
          `--color1`,
          `hsl(${Math.random() * 360}, 100%, 50%)`,
        );
        card.style.setProperty(
          `--color2`,
          `hsl(${Math.random() * 360}, 100%, 50%)`,
        );
        // }
      });
    }, 10000);
    return () => clearInterval(interval);
  }, []);

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
      </motion.div>
      {/* here we are animating with Tailwind instead of Framer Motion because Framer Motion messes up the z-index for child components */}
      <div className="my-16 grid w-full max-w-screen-xl animate-[slide-down-fade_0.5s_ease-in-out] grid-cols-1 gap-5 px-5 sm:grid-cols-2 lg:grid-cols-3 xl:px-0">
        {examples.map(({ title, description, link }) => (
          <Card
            key={title}
            title={title}
            description={description}
            link={link}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Home;

const examples = [
  {
    title: "Chat",
    description: "A simple chat app built with ChatGPT-3 turbo",
    link: "/chat",
  },
  {
    title: "Generate Twitter Bio",
    description: "Generate a Twitter bio using GPT-3",
    link: "/twitter-bio",
  },
  {
    title: "Name My Pet",
    description: "Generate a name for your pet using GPT-3",
    link: "/name-my-pet",
  },
];
