"use client";

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Impact() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const waveRef = useRef<HTMLDivElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const [isReady, setIsReady] = useState(false);

  const impacts = [
    {
      id: 1,
      image: "images/impact1.png",
      title: "Dompet Kosong, Hidup Terpuruk",
      desc: "Banyak orang kehilangan seluruh tabungan yang telah dikumpulkan dengan susah payah. Uang gaji, simpanan, bahkan aset berharga habis tergerus untuk menutup kekalahan.",
    },
    {
      id: 2,
      image: "images/impact2.png",
      title: "Keluarga yang Retak Karena Judi",
      desc: "Pertengkaran rumah tangga sering muncul akibat kebiasaan berjudi. Suami-istri kehilangan rasa percaya, anak-anak menjadi korban emosi dan kondisi psikologis yang tidak stabil. Lambat laun, ikatan keluarga bisa benar-benar hancur.",
    },
    {
      id: 3,
      image: "images/impact3.png",
      title: "Stres dan Depresi Menghantui",
      desc: "Kekalahan demi kekalahan membawa beban pikiran yang berat. Tidak sedikit korban mengalami stres, insomnia, hingga depresi mendalam akibat lilitan hutang dan tekanan sosial. Judi online tidak hanya merusak keuangan, tetapi juga kesehatan mental.",
    },
    {
      id: 4,
      image: "images/impact4.png",
      title: "Jeratan Hutang Tanpa Akhir",
      desc: "Banyak korban mencari pinjaman online sebagai jalan pintas. Namun, yang terjadi justru tumpukan bunga dan tagihan yang kian menjerat. Hidup pun semakin sulit karena dikejar-kejar hutang dari berbagai arah.",
    },
    {
      id: 5,
      image: "images/impact5.png",
      title: "Produktivitas Hancur, Pekerjaan Hilang",
      desc: "Fokus kerja hilang dan tanggung jawab diabaikan. Tidak sedikit pekerja akhirnya dipecat karena performa yang menurun. Dampaknya, sumber penghasilan utama pun hilang, memperburuk keadaan finansial.",
    },
    {
      id: 6,
      image: "images/impact6.png",
      title: "Dari Judi ke Kriminalitas",
      desc: "Melahirkan banyak berita kelam: pencurian, penipuan, hingga tindakan kriminal lain demi mencari uang cepat. Pelaku bukan hanya merugikan diri sendiri, tapi juga menciptakan keresahan sosial.",
    },
    {
      id: 7,
      image: "images/impact7.png",
      title: "Dari Kriminal Hingga Tragisnya Bunuh Diri",
      desc: "Lebih tragis lagi, banyak korban memilih mengakhiri hidupnya karena tidak mampu menanggung beban hutang.",
    },
  ];

  useEffect(() => {
    const readyTimer = setTimeout(() => {
      setIsReady(true);
    }, 50);
    return () => clearTimeout(readyTimer);
  }, []);

  useEffect(() => {
    if (!isReady) return;
    if (!contentRef.current || !sectionRef.current || !waveRef.current || !bgRef.current)
      return;

    const content = contentRef.current;
    const section = sectionRef.current;
    const wave = waveRef.current;
    const bg = bgRef.current;

    const setupTimer = setTimeout(() => {
      ScrollTrigger.getAll().forEach((st) => st.kill());

      const totalWidth = content.scrollWidth;
      const viewportWidth = window.innerWidth;
      const scrollDistance = totalWidth - viewportWidth;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${scrollDistance}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: () => {
            const newTotalWidth = content.scrollWidth;
            const newScrollDistance = newTotalWidth - window.innerWidth;
            tl.scrollTrigger?.vars.end &&
              (tl.scrollTrigger.vars.end = `+=${newScrollDistance}`);
          },
        },
      });

      tl.to(content, { x: -scrollDistance, ease: "none" }, 0)
        .to(wave, { x: -scrollDistance * 0.3, ease: "none" }, 0)
        .to(bg, { x: -scrollDistance * 0.5, ease: "none" }, 0);

      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(setupTimer);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [isReady]);

  return (
    <div
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-[#0a0e1a]"
    >
      <div className="absolute bottom-0 left-0 w-full h-80 bg-gradient-to-t from-[#737373]/20 to-transparent backdrop-blur-[2px] z-1"></div>

      <div className="absolute top-0 left-0 z-0 h-full w-full overflow-hidden pointer-events-none">
        <div
          ref={waveRef}
          className="absolute top-1/2 left-0 h-1/2 transform -translate-y-1/2 will-change-transform w-[200%]"
        >
          <img
            src="images/impact_wave.png"
            alt="wave"
            className="h-full w-full object-cover opacity-30"
          />
        </div>

        <div
          ref={bgRef}
          className="absolute bottom-0 left-0 h-[30%] will-change-transform w-[160%]"
        >
          <img
            src="images/impact_bg.png"
            alt="background"
            className="h-full w-full object-cover opacity-40"
          />
        </div>
      </div>

      <div
        ref={contentRef}
        className="relative z-10 flex items-center gap-16 h-full will-change-transform w-max"
      >
        {impacts.map((impact, index) => {
          const verticalOffset = index % 2 === 0 ? "translate-y-0" : "translate-y-20";
          const isFirst = index === 0;
          const isLast = index === impacts.length - 1;

          return (
            <div
              key={impact.id}
              className={`relative transform transition-all duration-300 hover:scale-105 hover:z-20 flex-shrink-0 ${verticalOffset} ${
                isFirst ? "ml-16" : ""
              } ${isLast ? "mr-60" : ""} w-[300px]`}
            >
              <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/40 backdrop-blur-sm rounded-2xl overflow-hidden border-2 border-slate-700/50 shadow-2xl">
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={impact.image}
                    alt={impact.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="px-6 pt-4 pb-7">
                  <h3 className="text-white font-extrabold text-base mb-4 leading-tight">
                    {impact.title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{impact.desc}</p>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-[#B9D86D] rounded-full flex items-center justify-center text-[#222C4D] font-bold text-xl shadow-lg border-2 border-slate-900 z-30">
                {impact.id}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
