import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1 className="text-2xl font-bold mb-4">CPRG 306: Web Development 2 - Assignments</h1>
      <ul className="list-disc list-inside">
        <li><Link href="./week-2/">Week-2</Link></li>
         <li><Link href="./week-3">Week-3</Link></li>
         <li><Link href="./week-4">Week-4</Link></li>
         <li><Link href="./week-5">Week-5</Link></li>
         <li><Link href="./week-6">Week-6</Link></li>
         <li><Link href="./week-7">Week-7</Link></li>
         <li><Link href="./week-8">Week-8</Link></li>
         <li><Link href="./week-9">Week-9</Link></li>
         <li><Link href="./week-10">Week-10</Link></li>




      </ul>
    </main>
  );
}
