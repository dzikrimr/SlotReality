"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AOS from "aos";
import "aos/dist/aos.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const aboutTexts = [
  `Kami Mahasiswa dari Universitas Brawijaya, Fakultas Ilmu Komputer, berangkat dari keresahan terhadap maraknya fenomena judi online di Indonesia.\n\nMelihat bagaimana perjudian daring merenggut tidak hanya aspek finansial, tetapi juga hubungan keluarga dan masa depan generasi muda, kami terdorong untuk menghadirkan sebuah karya interaktif berbasis web yang mampu memberikan edukasi sekaligus pengalaman langsung tentang bahaya yang tersembunyi di balik permainan slot digital.`,
  `Melalui SlotReality, kami berusaha menyajikan simulasi, data, dan narasi nyata yang diolah dalam bentuk visual dan interaktif, agar siapa pun yang mengaksesnya dapat memahami risiko judi online dengan cara yang lebih mendalam dan membekas.\n\nHarapan kami, ini dapat menjadi kontribusi kecil dari lingkungan akademis untuk masyarakat luas, sekaligus bukti bahwa teknologi tidak hanya bisa dimanfaatkan untuk hiburan, tetapi juga sebagai sarana edukasi dan penyadaran akan isu sosial yang semakin mendesak.`,
];

export default function HelpAndAbout() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: false, 
      mirror: true, 
    });

    if (!wrapperRef.current) return;
    const wrapper = wrapperRef.current;

    const stBg = ScrollTrigger.create({
      trigger: wrapper,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.3,
      onUpdate: (self) => {
        const progress = self.progress;
        const startColor = [10, 15, 31]; // #0A0F1F
        const endColor = [115, 135, 66]; // #738742
        const r = Math.round(
          startColor[0] + (endColor[0] - startColor[0]) * progress
        );
        const g = Math.round(
          startColor[1] + (endColor[1] - startColor[1]) * progress
        );
        const b = Math.round(
          startColor[2] + (endColor[2] - startColor[2]) * progress
        );

        wrapper.style.background = `linear-gradient(180deg, rgb(${r},${g},${b}) 0%, #0A0F1F 100%)`;
      },
    });

    return () => {
      stBg.kill();
    };
  }, []);

  return (
    <div ref={wrapperRef} className="w-full text-white">
      {/* ================== SECTION HELP ================== */}
      <section className="relative min-h-screen w-full flex items-center justify-center px-4 py-12">
        <div className="flex flex-col md:flex-row gap-6 max-w-xl w-full items-stretch">
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
                  className="w-full"
                >
                  <button className="w-full bg-[#1a2340] text-white text-sm font-bold px-2 py-3 rounded-xl shadow-xl hover:bg-[#0d1527] transition-all hover:shadow-2xl border-2 border-[#2a3558] mt-4 cursor-pointer">
                    HOTLINE STOPJUDOL
                  </button>
                </a>
              </div>
            </div>
          </div>

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
                className="w-full"
              >
                <button className="w-full bg-[#1a2340] text-white text-sm font-bold px-2 py-3 rounded-xl shadow-xl hover:bg-[#0d1527] transition-all hover:shadow-2xl border-2 border-[#2a3558] cursor-pointer">
                  KEPPRES NO. 21/2024
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================== SECTION ABOUT ================== */}
      <section
        className="relative flex flex-col items-center justify-start px-4 pt-16 pb-12 min-h-screen"
      >
        <h2
          className="text-3xl md:text-4xl font-semibold mb-6 text-center"
          data-aos="fade-up"
          data-aos-delay={0}
        >
          About Us
          <span className="block w-50 h-[2px] bg-white mx-auto mt-2"></span>
        </h2>

        {aboutTexts.map((text, i) => (
          <p
            key={i}
            className="text-sm md:text-base lg:text-base leading-relaxed max-w-3xl whitespace-pre-line text-center mb-6"
            data-aos="fade-up"
            data-aos-delay={(i + 1) * 300}
          >
            {text}
          </p>
        ))}

        <p
          className="text-sm md:text-base lg:text-base leading-relaxed max-w-3xl whitespace-pre-line text-center mt-8 font-bold"
          data-aos="fade-up"
          data-aos-delay={(aboutTexts.length + 1) * 50}
        >
          TIM PECEL SUKUN
          <br />
          ADE NUGROHO - DZIKRI MURTADLO - CAMILA CAHYA ARIFAH
        </p>
      </section>
    </div>
  );
}
