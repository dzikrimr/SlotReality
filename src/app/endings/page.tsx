"use client";

import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface EndingPageProps {
  type: "good" | "bad";
  onReturnChoice: () => void;
}

export default function EndingPage({ type, onReturnChoice }: EndingPageProps) {
  const isGood = type === "good";
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Slide out of page
  const goToMaps = () => {
    if (!containerRef.current) return;
    gsap.to(containerRef.current, {
      y: "-100%", 
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => {
        router.push("/maps-aio");
      },
    });
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom top",
      onUpdate: (self) => {
        if (self.direction > 0 && self.progress > 0.05) {
          goToMaps();
          trigger.kill(); 
        }
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center bg-gray-900 relative overflow-hidden"
    >
      <section className="w-full max-w-4xl mx-auto text-center px-4">
        <div className="max-w-[600px] mx-auto mb-8">
          <h1 className="text-5xl font-bold mb-8">
            {isGood ? "🎉 Ending Baik!" : "💔 Ending Buruk!"}
          </h1>
          <p
            className="text-xl font-bold italic leading-relaxed"
            style={{
              color: isGood ? "#61DA65" : "#F68D8A",
              textShadow: isGood
                ? "0 0 10px rgba(97, 218, 101, 0.8), 0 0 20px rgba(97, 218, 101, 0.6)"
                : "0 0 10px rgba(246, 141, 138, 0.8), 0 0 20px rgba(246, 141, 138, 0.6)",
            }}
          >
            {isGood
              ? "Kamu membuat keputusan bijak. Tetap waspada terhadap slot online dan pikirkan risiko sebelum mencoba lagi."
              : "Banyak orang terjerumus karena tidak menyadari risiko. Terus bermain bisa merugikan diri sendiri dan orang terdekat. Hentikan sebelum terlambat."}
          </p>
        </div>

        <div className="flex flex-col gap-4 items-center">
          <button
            className="bg-[rgba(217,217,217,0.12)] text-white h-[50px] px-8 rounded-[15px] font-semibold tracking-wide hover:opacity-90 transition-opacity"
            onClick={onReturnChoice}
          >
            Return Choice
          </button>
        </div>
      </section>

      <div className="absolute bottom-6 w-full flex flex-col items-center">
        <button
          className="flex flex-col items-center gap-1 cursor-pointer"
          onClick={goToMaps}
        >
          <span className="text-blue-400 font-semibold tracking-wide hover:text-blue-300 transition-colors">
            Lihat Insights
          </span>
          <svg
            width="50"
            height="50"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="animate-bounceArrow"
          >
            <path
              d="M5 10 L25 30 L45 10"
              stroke="#D9D9D9"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M5 20 L25 40 L45 20"
              stroke="#D9D9D9"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <style jsx>{`
        @keyframes bounceArrow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(6px);
          }
        }
        .animate-bounceArrow {
          animation: bounceArrow 1s infinite;
        }
      `}</style>
    </div>
  );
}
