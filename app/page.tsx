import Link from "next/link";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SquigglyLines from "../components/SquigglyLines";

export const metadata = {
  title: "AI Fetch",
};

export default function Home() {
  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center py-2">
      <Header />
      <main className="background-gradient mt-20 flex w-full flex-1 flex-col items-center justify-center px-4 text-center sm:mt-20">
        <a
          href="https://github.com/omar-besbes/ppp-front"
          target="_blank"
          rel="noreferrer"
          className="mb-5 rounded-lg border border-gray-700 px-4 py-2 text-sm text-gray-400 transition duration-300 ease-in-out hover:text-gray-300"
        >
          Clone and deploy your own with{" "}
          <span className="text-blue-600">Vercel</span>
        </a>
        <h1 className="font-display mx-auto max-w-4xl text-5xl font-bold tracking-normal text-gray-300 sm:text-7xl">
          Finding the best photos{" "}
          <span className="relative whitespace-nowrap text-blue-600">
            <SquigglyLines />
            <span className="relative">using AI</span>
          </span>
        </h1>
        <h2 className="mx-auto mt-12 max-w-xl text-lg leading-7  text-gray-500 sm:text-gray-400">
          Take a picture and see similar photos.
        </h2>
        <Link
          className="mt-8 rounded-xl bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-500 sm:mt-10"
          href="/search"
        >
          Find the best photos
        </Link>
      </main>
      <Footer />
    </div>
  );
}
