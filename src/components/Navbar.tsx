"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); // Ambil path saat ini

  // Fungsi untuk cek apakah menu aktif
  const isActive = (path: string) => pathname === path;

  return (
    <div className="fixed top-8 left-8 right-8 z-20">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center flex-shrink-0">
          <Image
            src="/images/slotreality-logo.png"
            alt="Slot Reality Logo"
            width={100}
            height={60}
            className="object-contain"
            unoptimized={true}
            onError={() => console.error("Failed to load SlotReality logo")}
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center bg-white/15 backdrop-blur-lg rounded-2xl border border-white/30 shadow-2xl h-10 px-4 md:px-6">
          <button
            className={`${
              isActive("/") ? "font-bold" : "font-medium text-white/80"
            } text-white hover:text-purple-300 transition-all duration-300 tracking-widest cursor-pointer py-3 px-5 text-base`}
            onClick={() => router.push("/")}
          >
            Home
          </button>
          <div className="h-6 w-px bg-white/40 mx-2"></div>
          <button
            className={`${
              isActive("/simulation") ? "font-bold" : "font-medium text-white/80"
            } text-white hover:text-purple-300 transition-all duration-300 tracking-widest cursor-pointer py-3 px-5 text-base`}
            onClick={() => router.push("/simulation")}
          >
            Experience
          </button>
          <div className="h-6 w-px bg-white/40 mx-2"></div>
          <button
            className={`${
              isActive("/maps-aio") ? "font-bold" : "font-medium text-white/80"
            } text-white hover:text-purple-300 transition-all duration-300 tracking-widest cursor-pointer py-3 px-5 text-base`}
            onClick={() => router.push("/maps-aio")}
          >
            Insights
          </button>
        </div>

        {/* Support (Desktop only) */}
        <div className="hidden md:block flex-shrink-0">
          <button
            className={`${
              isActive("/help") ? "font-bold" : "font-medium text-white/80"
            } text-white font-bold text-lg hover:text-purple-300 transition-all duration-300 tracking-widest cursor-pointer`}
            onClick={() => router.push("/help")}
          >
            SUPPORT
          </button>
        </div>

        {/* Mobile Burger Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Fullscreen Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-30 bg-[#0A0F1F]/85 flex flex-col justify-center items-center space-y-6">
          <button
            className={`${
              isActive("/") ? "font-bold" : "font-medium"
            } text-white text-2xl tracking-widest hover:text-purple-300 transition`}
            onClick={() => {
              router.push("/");
              setIsOpen(false);
            }}
          >
            Home
          </button>
          <div className="h-px w-40 bg-white/40"></div>

          <button
            className={`${
              isActive("/simulation") ? "font-bold" : "font-medium"
            } text-white text-2xl tracking-widest hover:text-purple-300 transition`}
            onClick={() => {
              router.push("/simulation");
              setIsOpen(false);
            }}
          >
            Experience
          </button>
          <div className="h-px w-40 bg-white/40"></div>

          <button
            className={`${
              isActive("/maps-aio") ? "font-bold" : "font-medium"
            } text-white text-2xl tracking-widest hover:text-purple-300 transition`}
            onClick={() => {
              router.push("/maps-aio");
              setIsOpen(false);
            }}
          >
            Insights
          </button>
          <div className="h-px w-40 bg-white/40"></div>

          <button
            className={`${
              isActive("/help") ? "font-bold" : "font-medium"
            } text-white text-2xl tracking-widest hover:text-purple-300 transition`}
            onClick={() => {
              router.push("/help");
              setIsOpen(false);
            }}
          >
            Support
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
