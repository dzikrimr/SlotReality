"use client";

import React from "react";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Simulation from "../simulation/page";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface FallingElement {
  id: number;
  type: "card_10" | "gaple" | "slot" | "card_j";
  left: number;
  size: number;
  rotation: number;
  delay: number;
  duration: number;
  opacity: number;
}

const Landing = () => {
  const [fallingElements, setFallingElements] = useState<FallingElement[]>([]);
  const [coinPositions, setCoinPositions] = useState<
    Array<{
      left: number;
      top: number;
      duration: number;
      delay: number;
      rotation: number;
    }>
  >([]);
  const [ambientPositions, setAmbientPositions] = useState<
    Array<{ left: number; top: number; duration: number; delay: number }>
  >([]);
  const [isMounted, setIsMounted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showNextPage, setShowNextPage] = useState(false);

  const unmaskedManRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const fadeOverlayRef = useRef<HTMLDivElement>(null);
  const nextPageRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const scifiLineRef = useRef<HTMLDivElement>(null);

  // Generate random positions after component mounts to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);

    // Generate falling elements
    const elements: FallingElement[] = [];
    const elementTypes: ("card_10" | "gaple" | "slot" | "card_j")[] = [
      "card_10",
      "gaple",
      "slot",
      "card_j",
    ];

    for (let i = 0; i < 25; i++) {
      elements.push({
        id: i,
        type: elementTypes[Math.floor(Math.random() * elementTypes.length)],
        left: Math.random() * 100,
        size: 40 + Math.random() * 60,
        rotation: Math.random() * 360,
        delay: Math.random() * 5,
        duration: 8 + Math.random() * 4,
        opacity: 0.6 + Math.random() * 0.4,
      });
    }
    setFallingElements(elements);

    // Generate coin positions with random rotation
    const coins = [];
    for (let i = 0; i < 50; i++) {
      coins.push({
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 3 + Math.random() * 2,
        delay: Math.random() * 2,
        rotation: Math.random() * 360,
      });
    }
    setCoinPositions(coins);

    // Generate ambient positions
    const ambient = [];
    for (let i = 0; i < 15; i++) {
      ambient.push({
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 4 + Math.random() * 3,
        delay: Math.random() * 3,
      });
    }
    setAmbientPositions(ambient);
  }, []);

  // Enhanced GSAP Smooth Scroll Setup with Phone Zoom Effect
  useEffect(() => {
    if (!isMounted || !unmaskedManRef.current) return;

    // Set initial position for unmasked man (completely off-screen right)
    gsap.set(unmaskedManRef.current, {
      x: "120vw",
      y: "60vh",
      scale: 1.6,
    });

    // Set initial states for fade elements
    gsap.set(fadeOverlayRef.current, {
      opacity: 0,
    });

    // Set initial state for sci-fi line
    gsap.set(scifiLineRef.current, {
      opacity: 0,
      scale: 1,
    });

    // Create enhanced smooth scroll animation for unmasked man with phone zoom
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollContainerRef.current,
        start: "top top",
        end: "+=500%", // Extended range for multi-stage animation
        scrub: 1,
        markers: false,
        onUpdate: (self) => {
          console.log("ScrollTrigger progress:", self.progress);

          // Dynamic state management based on scroll direction
          if (self.progress >= 0.85 && self.direction === 1) {
            // Scrolling down - show next page
            if (!isTransitioning) {
              setIsTransitioning(true);
            }
            if (self.progress >= 0.95 && !showNextPage) {
              setShowNextPage(true);
            }
          } else if (self.progress < 0.85 && self.direction === -1) {
            // Scrolling up - hide next page
            if (showNextPage) {
              setShowNextPage(false);
            }
            if (isTransitioning) {
              setIsTransitioning(false);
            }
          }
        },
      },
    });

    // Stage 1: Animate unmasked man from right to center (0% - 40% of scroll)
    tl.to(unmaskedManRef.current, {
      x: "50vw",
      y: "100vh",
      xPercent: -50,
      yPercent: -50,
      scale: 1.5,
      ease: "power2.out",
      duration: 0.4,
    })

      // Stage 2: Hold position briefly (40% - 50% of scroll)
      .to(unmaskedManRef.current, {
        x: "50vw",
        y: "100vh",
        xPercent: -50,
        yPercent: -50,
        scale: 1.6,
        ease: "none",
        duration: 0.1,
      })

      // Show sci-fi line during stage 2
      .to(
        scifiLineRef.current,
        {
          opacity: 1,
          scale: 1.2,
          ease: "power2.out",
          duration: 0.05,
        },
        "-=0.1"
      )

      // Stage 3: Zoom and shift effect - scale up while moving right for phone focus (50% - 80% of scroll)
      .to(unmaskedManRef.current, {
        x: "1020vw", // Move further right to focus on phone area
        y: "1300vh", // Slight vertical adjustment for phone position
        xPercent: -30, // Adjust anchor point for better phone focus
        yPercent: -40,
        scale: 60, // Scale up significantly for zoom effect
        ease: "power2.inOut",
        duration: 0.3,
        onStart: () => {
          console.log("Starting phone zoom");
        },
      })

      // Hide sci-fi line when zooming starts
      .to(
        scifiLineRef.current,
        {
          opacity: 0,
          scale: 0.6,
          ease: "power2.in",
          duration: 0.1,
        },
        "-=0.3"
      )

      // Stage 4: Hold zoom position briefly (80% - 85% of scroll)
      .to(unmaskedManRef.current, {
        scale: 60,
        ease: "none",
        duration: 0.05,
      })

      // Stage 5: Fade transition to next page (85% - 100% of scroll)
      .to(fadeOverlayRef.current, {
        opacity: 1,
        ease: "power2.inOut",
        duration: 0.1,
        onReverseComplete: () => {
          // When scrolling back up, hide next page
          setShowNextPage(false);
          setIsTransitioning(false);
          console.log("Reverse animation complete - back to landing");
        },
      });

    // Animate floating cards with GSAP
    setTimeout(() => {
      const cards = document.querySelectorAll("[data-floating-card]");
      cards.forEach((card, index) => {
        gsap.to(card, {
          y: "+=15",
          x: "+=10",
          rotation: "+=5",
          duration: 4 + (index % 3),
          delay: index * 0.1,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }, 500);

    // Animate coins with GSAP
    setTimeout(() => {
      const coins = document.querySelectorAll("[data-floating-coin]");
      coins.forEach((coin, index) => {
        gsap.to(coin, {
          y: "+=12",
          rotation: "+=180",
          duration: 3 + (index % 2),
          delay: index * 0.05,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }, 300);

    // Animate ambient particles
    setTimeout(() => {
      const particles = document.querySelectorAll("[data-ambient-particle]");
      particles.forEach((particle, index) => {
        gsap.to(particle, {
          y: "+=20",
          x: "+=15",
          opacity: 0.8,
          duration: 4 + (index % 3),
          delay: index * 0.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }, 200);

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [isMounted, isTransitioning, showNextPage]);

  useEffect(() => {
    if (!isMounted) return;

    const updateEffects = () => {
      if (!backgroundRef.current || !arrowRef.current) return;
      const scrollTop = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / maxScroll, 1);

      // blur background
      backgroundRef.current.style.filter = `blur(${progress * 12}px)`;

      // arrow fade in/out
      arrowRef.current.style.opacity = `${1 - Math.min(progress / 0.4, 1)}`;
    };

    // Hitung efek setiap scroll
    window.addEventListener("scroll", updateEffects);

    // Reset efek saat landing page muncul lagi
    if (!showNextPage) {
      updateEffects();
    }

    return () => {
      window.removeEventListener("scroll", updateEffects);
    };
  }, [isMounted, showNextPage]);

  // Enhanced smooth scroll to section
  const smoothScrollTo = (target: string) => {
    gsap.to(window, {
      duration: 1.5,
      scrollTo: target,
      ease: "power2.inOut",
    });
  };

  // Next Page Component (Phone Screen Content)
  const NextPageContent = () => (
    <div className="w-full h-full">
      <Simulation />
    </div>
  );

  return (
    <div
      className="min-h-screen bg-[#0A0F1F] relative"
      ref={scrollContainerRef}
    >
      {/* Ensure page has scrollable height for multi-stage animation */}
      <div className="w-full" style={{ height: "600vh" }}></div>

      {/* Enhanced CSS Animations with GSAP-friendly transforms */}
      <style jsx>
        {`
          @keyframes cardFloat {
            0%,
            100% {
              transform: var(--rotation) translateY(0px);
              opacity: 0.7;
            }
            25% {
              transform: var(--rotation) translateY(-8px);
              opacity: 0.9;
            }
            50% {
              transform: var(--rotation) translateY(-4px);
              opacity: 0.8;
            }
            75% {
              transform: var(--rotation) translateY(-10px);
              opacity: 0.85;
            }
          }

          @keyframes coinFade {
            0% {
              transform: var(--coin-rotation) translateY(-50px);
              opacity: 0;
            }
            100% {
              transform: var(--coin-rotation) translateY(0);
              opacity: 0.3;
            }
          }

          @keyframes float {
            0%,
            100% {
              transform: var(--coin-rotation) translateY(0px);
            }
            50% {
              transform: var(--coin-rotation) translateY(-10px);
            }
          }

          /* Smooth scroll enhancement */
          html {
            scroll-behavior: smooth;
          }

          /* Smooth fade transitions */
          .fade-overlay {
            transition: opacity 0.5s ease-in-out;
          }

          .next-page-enter {
            opacity: 0;
            transform: scale(0.95);
            animation: nextPageFadeIn 0.8s ease-out forwards;
          }

          @keyframes nextPageFadeIn {
            0% {
              opacity: 0;
              transform: scale(0.95);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }

          /* Smooth phone screen transition */
          .phone-content {
            backdrop-filter: blur(20px);
            animation: phoneGlow 2s ease-in-out infinite alternate;
          }

          @keyframes bounceArrow {
            0%,
            100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-12px);
            }
          }

          .animate-bounceArrow {
            animation: bounceArrow 1s ease-in-out infinite;
          }

          @keyframes phoneGlow {
            0% {
              box-shadow: 0 0 20px rgba(147, 51, 234, 0.3);
            }
            100% {
              box-shadow: 0 0 40px rgba(147, 51, 234, 0.6),
                0 0 60px rgba(59, 130, 246, 0.3);
            }
          }

          @keyframes scifiGlow {
            0%,
            100% {
              filter: drop-shadow(0 0 8px rgba(0, 255, 255, 0.6));
            }
            50% {
              filter: drop-shadow(0 0 15px rgba(0, 255, 255, 0.9));
            }
          }

          .scifi-line {
            animation: scifiGlow 2s ease-in-out infinite;
          }
        `}
      </style>

      {/* Semi-circle gradient overlay */}
      <div
        className="fixed top-0 left-0 w-full pointer-events-none"
        style={{
          height: "85%",
          background: `radial-gradient(ellipse 120% 100% at 50% 0%, rgba(197, 212, 255, 0.6) 0%, rgba(197, 212, 255, 0.4) 30%, rgba(10, 15, 31, 0.3) 70%, rgba(10, 15, 31, 0) 100%)`,
        }}
      />

      {/* Background + Floating Cards Container */}
      {isMounted && (
        <div
          ref={backgroundRef}
          className="fixed inset-0 z-10 pointer-events-none"
          style={{ filter: "blur(0px)" }}
        >
          {/* Large Background Coin */}
          <Image
            src="/images/coin.png"
            alt=""
            fill
            className="object-cover"
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
              maskImage:
                "linear-gradient(to bottom, transparent 20%, black 90%)",
            }}
            unoptimized
          />

          {/* Floating Cards */}
          {fallingElements.map((element) => (
            <div
              key={element.id}
              data-floating-card
              className="absolute"
              style={
                {
                  left: `${element.left}%`,
                  top: `${40 + ((element.id * 10) % 60)}%`,
                  opacity: element.opacity,
                  "--rotation": `rotate(${element.rotation}deg)`,
                } as React.CSSProperties & { "--rotation": string }
              }
            >
              <Image
                src={`/images/${element.type}.png`}
                alt={element.type}
                width={element.size}
                height={element.size}
                className="object-contain"
                style={{
                  filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
                }}
                unoptimized
              />
            </div>
          ))}
        </div>
      )}

      {/* Main Content */}
      <div
        className="fixed left-0 right-0 mx-auto z-30 pointer-events-none"
        style={{
          top: "25%",
          height: "60%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          textAlign: "center",
          paddingTop: "0",
        }}
      >
        <div className="w-full max-w-4xl px-6 pointer-events-auto">
          <h1
            className="text-center mb-4"
            style={{
              fontSize: "clamp(48px, 8vw, 80px)",
              lineHeight: 1.1,
              marginBottom: "1.5rem",
            }}
          >
            <span className="font-normal">Unmasking </span>
            <span className="font-medium">Reality</span>
          </h1>
          <p
            className="text-white/80 mx-auto text-center mb-8"
            style={{
              maxWidth: "720px",
              fontSize: "clamp(16px, 2.2vw, 22px)",
              margin: "0 auto 6rem auto",
            }}
          >
            Tidak semua yang terlihat itu nyata.
          </p>

          <div ref={arrowRef} className="flex flex-col items-center">
            {isMounted && (
              <>
                <div
                  className="animate-bounceArrow cursor-pointer mb-2"
                  style={{
                    marginBottom: "0.5rem",
                  }}
                  onClick={() => smoothScrollTo("50%")}
                >
                  <Image
                    src="/images/ic_arrow_down.png"
                    alt="Scroll down"
                    width={48}
                    height={48}
                    className="object-contain"
                    unoptimized
                    onError={() =>
                      console.error("Failed to load arrow down icon")
                    }
                  />
                </div>
                <p className="text-white/60 text-sm">Scroll to Discover...</p>
              </>
            )}
          </div>
        </div>
      </div>

      {isMounted && (
        <div
          ref={unmaskedManRef}
          className="fixed top-0 left-0 z-40 pointer-events-none"
          style={{
            width: "600px",
            height: "700px",
            transformOrigin: "65% 45%",
          }}
        >
          <Image
            src="/images/unmaskedman.png"
            alt="Unmasked Man"
            width={600}
            height={700}
            className="object-contain w-full h-full"
            style={{
              filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.5))",
              objectFit: "contain",
            }}
            onError={() => {
              console.error("Failed to load unmaskedman.png");
            }}
            onLoad={() => {
              console.log("Unmasked man image loaded successfully");
            }}
            unoptimized={true}
          />
        </div>
      )}

      {/* Line Guide */}
      {isMounted && (
        <div
          ref={scifiLineRef}
          className="fixed z-50 pointer-events-none"
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -20%)",
            opacity: 0,
          }}
        >
          <svg
            width="580"
            height="250"
            className="scifi-line"
            style={{
              position: "relative",
            }}
          >
            <circle cx="50" cy="150" r="8" fill="none" />
            <circle cx="50" cy="150" r="4" fill="cyan" opacity="0.6" />

            <line
              x1="50"
              y1="150"
              x2="80"
              y2="50"
              stroke="cyan"
              strokeWidth="2"
              opacity="0.8"
            />

            <circle cx="80" cy="50" r="6" fill="none" />
            <circle cx="80" cy="50" r="3" fill="cyan" opacity="0.6" />

            <line
              x1="80"
              y1="50"
              x2="450"
              y2="50"
              stroke="cyan"
              strokeWidth="2"
              opacity="0.8"
            />

            <circle cx="450" cy="50" r="8" fill="none" />
            <circle cx="450" cy="50" r="4" fill="cyan" opacity="0.6" />
          </svg>

          <div
            className="absolute"
            style={{
              left: "265px",
              top: "20px",
              transform: "translateX(-50%)",
              whiteSpace: "nowrap",
            }}
          >
            <p
              className="text-cyan-400 font-light tracking-wide"
              style={{
                fontSize: "16px",
                textShadow:
                  "0 0 10px rgba(0, 255, 255, 0.6), 0 0 20px rgba(0, 255, 255, 0.4)",
                letterSpacing: "0.05em",
              }}
            >
              Langkah kecil menuju lingkaran tanpa akhir
            </p>
          </div>
        </div>
      )}
      <div
        ref={fadeOverlayRef}
        className="fixed inset-0 z-50 pointer-events-none"
        style={{
          opacity: 0,
        }}
      />

      {showNextPage && (
        <div ref={nextPageRef} className="fixed inset-0 z-[60] next-page-enter">
          <NextPageContent />
        </div>
      )}

      {isMounted && (
        <div className="fixed inset-0 pointer-events-none">
          {ambientPositions.map((ambient, i) => (
            <div
              key={`ambient-${i}`}
              data-ambient-particle
              className="absolute w-2 h-2 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full opacity-40"
              style={{
                left: `${ambient.left}%`,
                top: `${ambient.top}%`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Landing;
