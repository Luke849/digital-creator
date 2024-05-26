import Link from "next/link"

export function Footer() {
  return (
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-zinc-200 dark:border-zinc-700 dark:bg-zinc-900">
        <p className="text-xs text-zinc-500 dark:text-zinc-400">© 2024 Digital Creator. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4 text-zinc-900 dark:text-zinc-50" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4 text-zinc-900 dark:text-zinc-50" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
  )
}
