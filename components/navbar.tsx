import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

const navItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "Item 2",
    href: "/item2",
  },
  {
    name: "Item 3",
    href: "/item3",
  },
];

export default async function NavBar() {
  return (
    <nav className="flex flex-row h-20 min-w-full border border-x-0 border-t-0 border-slate-200 drop-shadow-md">
      <div className="flex flex-row items-center justify-end w-full px-4">
        <div className="pr-8">
          {navItems.map((item) => (
            <Link href={item.href} key={item.name} className="px-4">
              {item.name}
            </Link>
          ))}
        </div>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>
    </nav>
  );
}
