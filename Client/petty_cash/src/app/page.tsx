'use client';
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Login from './login/page'

export default function Home() {
  const Pages = [
 //   { name: "Login", path: "/Login" },
    { name: "Login", path: "/login" },
    { name: "Expenses", path: "/expenses" },
  ];
  const pathname = usePathname();
  return (
    <div className="">
      {/* <h1 className="text-3xl font-bold underline">NADINE</h1> */}
      <nav className="flex flex-col gap-2 mt-4">
        {Pages.map((page) => (
          <Link
            key={page.name}
            href={page.path}
            className={
              pathname === page.path
                ? "text-blue-500 font-semibold"
                : "text-white"
            }
          >
            {page.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}