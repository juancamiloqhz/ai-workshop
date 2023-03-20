import Image from "next/image";
import Link from "next/link";

export default function Header({ title }: { title?: string }) {
  return (
    <header className="mt-5 flex w-full items-center justify-between border-b-2 px-2 pb-7 sm:px-4">
      <Link href="/" className="flex space-x-3">
        <h1 className="text-xl font-bold tracking-tight sm:text-3xl">
          AI Workshop{" "}
          <span className="text-xl font-medium sm:text-lg">{title}</span>
        </h1>
      </Link>
      <a href="https://juancamiloqhz.com" target="_blank" rel="noreferrer">
        <Image
          alt="Vercel Icon"
          src="/vercelLogo.png"
          className="h-[28px] w-8 sm:h-[27px] sm:w-8"
          width={32}
          height={28}
        />
      </a>
    </header>
  );
}
