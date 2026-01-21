"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav({
  isEmbedded = false,
}: {
  isEmbedded?: boolean;
}) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav
      className={`${isEmbedded ? "relative" : "fixed bottom-0 left-0 right-0"} bg-white border-t border-gray-200 shadow-lg z-50`}
    >
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        <Link
          href="/inkopslista"
          className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
            isActive("/inkopslista")
              ? "text-blue-600"
              : "text-black hover:text-blue-500"
          }`}
        >
          <svg
            className="w-6 h-6 mb-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
            />
          </svg>
          <span className="text-xs">Inköpslista</span>
        </Link>

        <Link
          href="/"
          className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
            isActive("/") ? "text-blue-600" : "text-black hover:text-blue-500"
          }`}
        >
          <svg
            className="w-6 h-6 mb-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
          <span className="text-xs">Innehåll</span>
        </Link>

        <Link
          href="/energi"
          className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
            isActive("/energi")
              ? "text-blue-600"
              : "text-black hover:text-blue-500"
          }`}
        >
          <svg
            className="w-6 h-6 mb-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          <span className="text-xs">Energi</span>
        </Link>
      </div>
    </nav>
  );
}
