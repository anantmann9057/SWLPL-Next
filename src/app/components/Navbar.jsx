"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Dashboard", href: "/" },
  { name: "Version", href: "/version" },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    axios
      .get("/api/logout")
      .then((response) => {
        if (response.status === 200) {
          router.push("/auth/login");
        }
      })
      .catch(() => {});
  };

  const linkClasses = (href) =>
    `transition-all duration-300 px-3 py-2 rounded-md ${
      pathname === href
        ? "text-cyan-900 font-bold border-b-0 border-cyan-700"
        : "text-gray-700 hover:text-cyan-900"
    }`;

  return (
    <nav className="bg-white shadow-md fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-cyan-900">
            SWLPL Control Panel
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={linkClasses(link.href)}
              >
                {link.name}
              </Link>
            ))}
            <button
              className="bg-red-700 hover:bg-red-500 text-white font-bold py-2 px-4 rounded transition duration-300"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-md px-4 pb-4 flex flex-col space-y-2 overflow-hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${linkClasses(link.href)} w-full text-left`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <button
              className="w-full bg-red-700 hover:bg-red-500 text-white font-bold py-2 px-4 rounded transition duration-300"
              onClick={handleLogout}
            >
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
