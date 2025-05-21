"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const handleLogout = () => {
    axios
      .get("api/logout")
      .then((response) => {
        if (response.status == 200) {
          router.push("/auth/login");
        }
      })
      .catch((e) => {});
  };
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
            <Link href="/" className="text-gray-700 hover:text-cyan-900">
              Dashboard
            </Link>
            <Link href="/version" className="text-gray-700 hover:text-cyan-900">
              Version
            </Link>
            <Link href="/url" className="text-gray-700 hover:text-cyan-900">
              URL Config
            </Link>
            <button
              class="bg-red-700 hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
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
      {isOpen && (
        <div className="md:hidden bg-white shadow-md px-4 pb-4 space-y-2">
          <Link href="/" className="block text-gray-700 hover:text-blue-500">
            Dashboard
          </Link>
          <Link
            href="/version"
            className="block text-gray-700 hover:text-blue-500"
          >
            Version
          </Link>
          <Link href="/url" className="block text-gray-700 hover:text-blue-500">
            URL Config
          </Link>
          <button
            class="bg-red-700 hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
