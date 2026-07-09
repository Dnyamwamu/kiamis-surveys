import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative isolate min-h-screen overflow-hidden flex items-center justify-center px-6 bg-linear-to-b from-gray-100 via-gray-50 to-white">
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg
          aria-hidden="true"
          className="absolute top-0 left-1/2 h-[60rem] w-[80rem] -translate-x-1/2 mask-[radial-gradient(40rem_40rem_at_top,white,transparent)] stroke-gray-400/30"
        >
          <defs>
            <pattern
              id="grid-pattern"
              x="50%"
              y={-1}
              width={120}
              height={120}
              patternUnits="userSpaceOnUse"
            >
              <path d="M120 0V120M0 0H120" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>

      {/* Soft gradient blobs */}
      <div
        aria-hidden="true"
        className="absolute -top-40 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl"
      >
        <div className="h-[28rem] w-[28rem] rounded-full bg-gradient-to-tr from-green-300 to-emerald-400 opacity-20" />
      </div>

      <div
        aria-hidden="true"
        className="absolute top-20 right-10 -z-10 transform-gpu blur-3xl"
      >
        <div className="h-[22rem] w-[22rem] rounded-full bg-gradient-to-tr from-lime-200 to-green-500 opacity-15" />
      </div>

      {/* Centered content */}
      <div className="relative z-10 max-w-xl text-center">
        <div className="mb-8 flex items-center justify-center gap-4">
          <Image
            alt="KIAMIS Logo"
            src="/emblem-template.png"
            width={70}
            height={80}
          />
          <span className="text-2xl font-bold text-gray-900">KIAMIS</span>
        </div>

        <p className="font-semibold text-amber-600 text-6xl">404</p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
          Page not found
        </h1>

        <p className="mt-6 text-lg text-gray-600">
          Sorry, we couldn’t find the page you’re looking for.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
          <Link
            href="/"
            className="rounded-md bg-green-700 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-green-800"
          >
            Go back home
          </Link>
          <Link href="#" className="text-sm font-semibold text-green-800">
            Contact support →
          </Link>
        </div>
      </div>
    </section>
  );
}
