"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const aboutTexts = [
  `Kami Mahasiswa dari Universitas Brawijaya, Fakultas Ilmu Komputer, berangkat dari keresahan terhadap maraknya fenomena judi online di Indonesia.\n\nMelihat bagaimana perjudian daring merenggut tidak hanya aspek finansial, tetapi juga hubungan keluarga dan masa depan generasi muda, kami terdorong untuk menghadirkan sebuah karya interaktif berbasis web yang mampu memberikan edukasi sekaligus pengalaman langsung tentang bahaya yang tersembunyi di balik permainan slot digital.`,
  `Melalui SlotReality, kami berusaha menyajikan simulasi, data, dan narasi nyata yang diolah dalam bentuk visual dan interaktif, agar siapa pun yang mengaksesnya dapat memahami risiko judi online dengan cara yang lebih mendalam dan membekas.\n\nHarapan kami, karya ini dapat menjadi kontribusi kecil dari lingkungan akademis untuk masyarakat luas, sekaligus bukti bahwa teknologi tidak hanya bisa dimanfaatkan untuk hiburan, tetapi juga sebagai sarana edukasi dan penyadaran akan isu sosial yang semakin mendesak.`,
  `TIM PECEL SUKUN\n\nADE NUGROHO - DZIKRI MURTADLO - CAMILA CAHYA ARIFAH`
];

export default function About() {
  const textRef = useRef<HTMLParagraphElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const stepRef = useRef(0);

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return;
    let mounted = true;
    const section = containerRef.current;

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=200%",
      scrub: 0.3,
      pin: true,
      onUpdate: (self) => {
        const progress = self.progress;

        const currentStep = Math.min(
          aboutTexts.length - 1,
          Math.floor(progress * aboutTexts.length)
        );

        if (currentStep !== stepRef.current && textRef.current && mounted) {
          stepRef.current = currentStep;

          // Hentikan animasi lama
          gsap.killTweensOf(textRef.current);

          gsap.to(textRef.current, {
            opacity: 0,
            y: 20,
            duration: 0.3,
            onComplete: () => {
              if (textRef.current && mounted) {
                textRef.current.innerText = aboutTexts[currentStep];
                gsap.fromTo(
                  textRef.current,
                  { opacity: 0, y: 20 },
                  { opacity: 1, y: 0, duration: 0.3 }
                );
              }
            },
          });
        }

        const startColor = [10, 15, 31]; 
        const endColor = [115, 135, 66]; 
        const r = Math.round(startColor[0] + (endColor[0] - startColor[0]) * progress);
        const g = Math.round(startColor[1] + (endColor[1] - startColor[1]) * progress);
        const b = Math.round(startColor[2] + (endColor[2] - startColor[2]) * progress);

        section.style.background = `linear-gradient(180deg, rgb(${r},${g},${b}) 0%, #0A0F1F 100%)`;
      },
    });

    return () => {
      mounted = false;
      st.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative text-white px-4 flex flex-col items-center justify-center"
      style={{ minHeight: "100vh", background: "#0A0F1F" }}
    >
      <h2 className="text-3xl font-semibold mb-8 text-center">
        About Us
        <span className="block w-50 h-[2px] bg-white mx-auto mt-2"></span>
      </h2>

      <p
        ref={textRef}
        className="text-base md:text-lg leading-relaxed max-w-3xl whitespace-pre-line text-center"
        style={{ opacity: 1 }}
      >
        {aboutTexts[0]}
      </p>
    </div>
  );
}
