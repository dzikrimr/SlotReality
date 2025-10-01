"use client";

import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  smoothScrollTo?: (target: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ smoothScrollTo }) => {
  const [isOpen, setIsOpen] = useState(false);

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
            className="text-white hover:text-purple-300 transition-all duration-300 font-bold tracking-widest cursor-pointer py-3 px-5 text-base"
            onClick={() => smoothScrollTo?.("top")}
          >
            Home
          </button>
          <div className="h-6 w-px bg-white/40 mx-2"></div>
          <button
            className="text-white/80 hover:text-purple-300 transition-all duration-300 font-bold tracking-widest cursor-pointer py-3 px-5 text-base"
            onClick={() => smoothScrollTo?.("50%")}
          >
            Experience
          </button>
          <div className="h-6 w-px bg-white/40 mx-2"></div>
          <button
            className="text-white/80 hover:text-purple-300 transition-all duration-300 font-bold tracking-widest cursor-pointer py-3 px-5 text-base"
            onClick={() => smoothScrollTo?.("bottom")}
          >
            Insights
          </button>
        </div>

        {/* Support (Desktop only) */}
        <div className="hidden md:block flex-shrink-0">
          <button
            className="text-white font-extrabold text-lg hover:text-purple-300 transition-all duration-300 tracking-widest cursor-pointer"
            onClick={() => console.log("Support clicked")}
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
            className="text-white text-2xl font-bold tracking-widest hover:text-purple-300 transition"
            onClick={() => {
              smoothScrollTo?.("top");
              setIsOpen(false);
            }}
          >
            Home
          </button>
          <div className="h-px w-40 bg-white/40"></div>

          <button
            className="text-white text-2xl font-bold tracking-widest hover:text-purple-300 transition"
            onClick={() => {
              smoothScrollTo?.("50%");
              setIsOpen(false);
            }}
          >
            Experience
          </button>
          <div className="h-px w-40 bg-white/40"></div>

          <button
            className="text-white text-2xl font-bold tracking-widest hover:text-purple-300 transition"
            onClick={() => {
              smoothScrollTo?.("bottom");
              setIsOpen(false);
            }}
          >
            Insights
          </button>
          <div className="h-px w-40 bg-white/40"></div>

          <button
            className="text-white text-2xl font-extrabold tracking-widest hover:text-purple-300 transition"
            onClick={() => {
              console.log("Support clicked");
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