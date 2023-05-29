export default function Footer() {
  return (
    <footer className="mb-3 mt-5 flex h-16 w-full flex-col items-center justify-between space-y-3 border-t border-gray-500 px-3 pt-4 text-center sm:mb-0 sm:h-20 sm:flex-row sm:pt-2">
      <div className="text-gray-500">
        Powered by{" "}
        <a
          href="https://pytorch.org/"
          target="_blank"
          className="font-bold underline-offset-2 transition hover:text-gray-300 hover:underline"
        >
          PyTorch{" "}
        </a>
        and{" "}
        <a
          href="https://vercel.com/"
          target="_blank"
          className="font-bold underline-offset-2 transition hover:text-gray-300 hover:underline"
        >
          Vercel.
        </a>
      </div>
    </footer>
  );
}
