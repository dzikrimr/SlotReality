"use client";

import React from "react";
import Image from "next/image";

const HelpPage: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full">
      <div className="absolute inset-0 bg-[#0A0F1F] z-0">
        <Image
          src="/images/help.png"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-12">
        <div className="flex flex-col md:flex-row gap-6 max-w-xl w-full items-stretch">
          {/* Hotline */}
          <div className="flex-1 flex">
            <div className="relative bg-[#B1BAE0]/50 backdrop-blur-sm rounded-2xl hover:scale-105 transition-transform cursor-pointer w-full">
              <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 h-34 flex items-center justify-center overflow-hidden rounded-t-2xl">
                <Image
                  src="/images/handshake.png"
                  alt="Handshake"
                  fill
                  className="object-contain"
                />
              </div>

              <div className="relative flex flex-col items-center w-full p-4 pt-46">
                <h2
                  style={{ fontWeight: 700, letterSpacing: "0.1em" }}
                  className="absolute top-4 left-4 text-[#0A0F1F] text-2xl md:text-3xl lg:text-4xl text-left"
                >
                  Butuh
                  <br />
                  Bantuan?
                </h2>

                <a
                  href="https://wa.me/+6281110015080"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#1a2340] text-white text-sm font-bold px-2 py-3 rounded-xl shadow-xl hover:bg-[#0d1527] transition-all hover:shadow-2xl border-2 border-[#2a3558] mt-4 text-center block"
                >
                  HOTLINE STOPJUDOL
                </a>
              </div>
            </div>
          </div>

          {/* Regulasi */}
          <div className="flex-1 flex">
            <div className="relative bg-[#B1BAE0]/50 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-between text-center hover:scale-105 transition-transform cursor-pointer p-4 w-full">
              <h2
                style={{ fontWeight: 700, letterSpacing: "0.1em" }}
                className="absolute top-4 left-4 text-[#0A0F1F] text-2xl md:text-3xl lg:text-4xl text-left z-20"
              >
                Baca Regulasi
                <br />
                Pemerintah
              </h2>

              <div className="relative w-2/3 aspect-square mt-6 z-0">
                <Image
                  src="/images/law.png"
                  alt="Law"
                  fill
                  className="object-contain"
                />
              </div>

              <a
                href="https://drive.google.com/file/d/1l_6zeNKlwMusIGL-RkeTevx9y9kcSwEh/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#1a2340] text-white text-sm font-bold px-2 py-3 rounded-xl shadow-xl hover:bg-[#0d1527] transition-all hover:shadow-2xl border-2 border-[#2a3558] text-center block"
              >
                KEPPRES NO. 21/2024
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;