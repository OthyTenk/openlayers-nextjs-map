"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FC } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/text-with-marker", label: "Text with marker" },
  { href: "/marker-with-popup", label: "Marker with Popup" },
];

const Navbar: FC = () => {
  const currentRoute = usePathname();
  console.log();

  return (
    <div className="w-full flex gap-3">
      {links.map((link, index) => (
        <div
          key={index}
          className={`${currentRoute === link.href ? "bg-green-200" : ""} p-3`}
        >
          <Link href={link.href}>{link.label}</Link>
        </div>
      ))}
    </div>
  );
};

export default Navbar;
