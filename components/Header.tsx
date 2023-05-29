import Link from "next/link";

export default function Header() {
  return (
    <header className="mt-3 flex w-full flex-col items-center justify-between gap-2 border-b border-gray-500 px-2 pb-7 xs:flex-row sm:px-4">
      <Link href="/" className="flex space-x-2">
        <h1 className="ml-2 text-xl font-bold tracking-tight sm:text-3xl">
          recommendations.io
        </h1>
      </Link>
      <div className="flex items-center space-x-4">
        <Link
          href="/search"
          className="flex space-x-2 border-r border-gray-300 pr-4 transition hover:text-blue-400"
        >
          <div>Search</div>
        </Link>
        <Link
          href="/"
          className="flex space-x-2 pr-4 transition hover:text-blue-400"
        >
          <div>Home</div>
        </Link>
      </div>
    </header>
  );
}
