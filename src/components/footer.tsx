import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="relative w-full border-t text-center text-sm py-6 md:py-8">
      <div className="container mx-auto px-4 flex items-center justify-center">
        Copyright © 2025-PRESENT |
        <Link
          href="https://github.com/WuChenDi/"
          className="text-primary hover:underline focus:outline-none focus:ring-2 pl-2"
        >
          wudi
        </Link>
      </div>
    </footer>
  )
}
