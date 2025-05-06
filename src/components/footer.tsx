import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground py-6 mt-12">
      <div className="container mx-auto px-4 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Fengshui Master. All rights reserved.</p>
        <p className="mt-1">
          <Link href="/privacy-policy" className="hover:text-foreground transition-colors">Privacy Policy</Link> | <Link href="/terms-of-service" className="hover:text-foreground transition-colors">Terms of Service</Link>
        </p>
        {/* Add social media links or other footer content here */}
      </div>
    </footer>
  );
}
