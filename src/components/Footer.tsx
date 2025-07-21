import Link from "next/link";
import { MountainIcon } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-muted py-6 w-full shrink-0">
      <div className="container px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <MountainIcon className="h-6 w-6 text-primary" />
          <span className="text-lg font-semibold font-headline">Strenium Lite</span>
        </Link>
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Strenium Lite. All rights reserved.</p>
        <nav className="flex gap-4 sm:gap-6">
          <Link href="#" className="text-sm hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-sm hover:underline underline-offset-4" prefetch={false}>
            Privacy Policy
          </Link>
        </nav>
      </div>
    </footer>
  );
}
