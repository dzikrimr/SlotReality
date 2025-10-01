"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import IndonesiaMap from "./page";
import Breakdown from "../breakdown/page";
import Impact from "../impact/page";

gsap.registerPlugin(ScrollTrigger);

export default function MapsBreakdownWrapper() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showBreakdown, setShowBreakdown] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    ScrollTrigger.getAll().forEach((st) => st.kill());

    const sections = gsap.utils.toArray<HTMLElement>(
      container.querySelectorAll(".panel")
    );

    if (sections.length > 0) {
      gsap.to(sections, {
        xPercent: -200 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1,
          snap: {
            snapTo: 1 / (sections.length - 1),
            duration: 0.3,
            ease: "power1.inOut",
          },
          end: () => "+=" + container.offsetWidth * (sections.length - 1),
          invalidateOnRefresh: true,
        },
      });
    }

    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;

        if (scrollTop + clientHeight >= scrollHeight - 50) {
          setShowBreakdown(true);
        }
      }, 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  useEffect(() => {
    if (showBreakdown) {
      gsap.fromTo(
        ".breakdown-container",
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power2.inOut" }
      );
    }
  }, [showBreakdown]);

  const handleCloseBreakdown = () => {
    gsap.to(".breakdown-container", {
      opacity: 0,
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => {
        setShowBreakdown(false);

        const impactEl = document.querySelector(".impact-section");
        if (impactEl) {
          impactEl.scrollIntoView({ behavior: "smooth" });
        }
      },
    });
  };

  return (
    <div className="w-full relative">
      <div
        className={`transition-opacity duration-500 ${
          showBreakdown ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div
          ref={containerRef}
          className="relative w-full h-screen overflow-hidden"
        >
          <div className="flex h-full w-max">
            <section className="panel w-screen h-screen flex-shrink-0 bg-gray-900">
              <IndonesiaMap />
            </section>
          </div>
        </div>

        <div className="impact-section">
          <Impact />
        </div>
      </div>

      {showBreakdown && (
        <div className="breakdown-container fixed inset-0 z-50 bg-gray-900 overflow-y-auto">
          <Breakdown />
        </div>
      )}
    </div>
  );
}
