import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default async function NavBar() {
  return (
    <nav className="flex flex-row h-20 min-w-full border border-x-0 border-t-0 border-slate-200 drop-shadow-md">
      <div className="flex flex-row items-center justify-end w-full px-4">
        <Link href="/dashboard" className="px-4">
          Dashboard
        </Link>
        <p className="px-4">Item 2</p>
        <p className="px-4 pr-8">Item 3</p>
        <UserButton />
      </div>
    </nav>
  );
}
