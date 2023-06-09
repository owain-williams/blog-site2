"use client";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export default async function NavBar() {
  const pathname = usePathname();
  const navItems = [
    {
      name: "Home",
      href: "/",
      isActive: pathname === "/",
    },
    {
      name: "Write",
      href: "/write",
      isActive: pathname === "/write",
    },
  ];

  return (
    <nav className="flex flex-row h-16 min-w-full border border-x-0 border-t-0 border-indigo-300 drop-shadow-md">
      <div className="flex flex-row items-center justify-end w-full px-4">
        <SignedIn>
          <div className="pr-8">
            {navItems.map((item) => (
              <Link href={item.href} key={item.name} className={`px-4`}>
                <Button disabled={item.isActive} variant="link">
                  {item.name}
                </Button>
              </Link>
            ))}
          </div>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SignedOut>
          <Button asChild>
            <SignInButton />
          </Button>
        </SignedOut>
      </div>
    </nav>
  );
}
