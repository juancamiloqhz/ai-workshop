import Link from "next/link";
import Balancer from "react-wrap-balancer";

export default function Card({
  title,
  description,
  // demo,
  link = "/",
}: {
  title: string;
  description: string;
  // demo: ReactNode;
  link: string;
}) {
  return (
    <Link href={link} className="card snake">
      {/* <div className="flex h-60 items-center justify-center">{demo}</div> */}
      <div className="inner">
        <h2 className="bg-gradient-to-br from-black to-stone-500 bg-clip-text font-display text-3xl font-bold !leading-none text-transparent md:text-3xl md:font-normal">
          <Balancer>{title}</Balancer>
        </h2>

        <p className="mt-2 leading-normal text-gray-500">
          <Balancer>{description}</Balancer>
        </p>
      </div>
    </Link>
  );
}
