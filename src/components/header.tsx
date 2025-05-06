import Link from 'next/link';
import { MountainIcon } from 'lucide-react'; // Placeholder icon, replace if needed

export function Header() {
  return (
    <header className="bg-background shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
          {/* Placeholder Icon */}
           <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
            >
             <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.657 7.343A8 8 0 0118.657 17.657 7.95 7.95 0 0117 19c-1 0-2-.5-3-1.5a8.14 8.14 0 01-2.657-2.657z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 14.121A3 3 0 1014.12 9.88" />
            </svg>
          <span>Fengshui Master</span>
        </Link>
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          {/* Add navigation links here if needed in the future */}
          {/* Example: <Link href="/about" className="text-muted-foreground hover:text-foreground">About</Link> */}
        </nav>
        {/* Add mobile menu button here if needed */}
      </div>
    </header>
  );
}
