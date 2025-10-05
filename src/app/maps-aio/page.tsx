"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import MapsWrapper from "../maps/maps-wrapper";

export default function MapsPage() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (wrapperRef.current) {
      gsap.fromTo(
        wrapperRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power2.inOut" }
      );
    }
  }, []);

  return (
    <div ref={wrapperRef} className="w-full h-full">
      <MapsWrapper />
    </div>
  );
}
