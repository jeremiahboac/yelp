import Link from "next/link";

export default function Home() {
  return (
    <main id="home">
      <div className=" max-w-[60vw] h-full flex flex-col gap-6 text-center justify-center m-auto text-white">
        <h1 className="text-6xl font-bold">YelpCamp</h1>
        <p className="max-w-4xl mx-auto">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque qui alias, adipisci necessitatibus vero facilis delectus ad facere recusandae labore libero minima vel itaque iusto sed blanditiis dolores tenetur eos.</p>
        <Link href={'/campgrounds'} className="underline text-gray-400 hover:text-white">View Campgrounds</Link>
      </div>
    </main>
  );
}
