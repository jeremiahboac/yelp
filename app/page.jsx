import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>YelpCamp</h1>
      <Link href={'/campgrounds'}>View Campgrounds</Link>
    </main>
  );
}
