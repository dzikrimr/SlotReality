import React from 'react';

export default function Breakdown() {
  return (
    <div className="relative min-h-screen text-white flex flex-col items-center justify-center px-4">
      <div className="absolute bottom-0 left-0 w-full h-80 bg-gradient-to-t from-[#737373]/40 to-transparent pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto py-16 md:py-4 z-10">
        <h1 className="text-left font-medium leading-tight mb-4 md:mb-6 mt-10 text-[2rem] md:text-[clamp(2.5rem,5vw,2rem)]">
          Behind the Screen:<br />
          How Online Gambling Works<br />
        </h1>

        <div className="grid md:grid-cols-2 gap-6 mb-2">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 shadow-xl p-6">
            <div className="font-mono text-xs leading-relaxed">
              <div className="text-purple-400">public class <span className="text-blue-400">JudiOnline</span> {'{'}</div>
              <div className="ml-4 text-purple-400">public static void <span className="text-yellow-400">main</span>(String[] args) {'{'}</div>
              <div className="ml-8 text-gray-400">
                <span>// PROGRAM JUDI YANG SELALU MEMBUAT PEMAIN KALAH</span>
              </div>
              <div className="ml-8 mt-4 text-gray-400">
                <span>// 1. TAMPILAN PALSU: Seolah-olah acak, tapi sebenarnya diatur</span>
              </div>
              <div className="ml-8 text-blue-300">double hasilAcak = Math.random(); <span className="text-gray-400">// Menghasilkan angka 0-1</span></div>
              <div className="ml-8 mt-4 text-gray-400">
                <span>// 2. MANIPULASI: Pemain hanya menang jika hasil &lt; 0.05 (hanya 5% peluang)</span>
              </div>
              <div className="ml-8 text-purple-400">if <span className="text-yellow-300">(hasilAcak &lt; 0.05)</span> {'{'}</div>
              <div className="ml-12 text-blue-300">System.out.println(<span className="text-green-400">'SELAMAT! ANDA MENANG!'</span>);</div>
              <div className="ml-8 text-purple-400">{'}'} else {'{'}</div>
              <div className="ml-12 text-gray-400">
                <div>// 3. PEMAIN SELALU KALAH: 95% kemungkinan kode ini dijalankan</div>
              </div>
              <div className="ml-12 text-blue-300">System.out.println(<span className="text-green-400">'ANDA KALAH! COBA LAGI!'</span>);</div>
              <div className="ml-8 text-purple-400">{'}'}</div>
              <div className="ml-8 mt-4 text-gray-400">
                <span>// 4. TRIK PSIKOLOGIS: Memancing pemain untuk terus mencoba</span>
              </div>
              <div className="ml-8 text-blue-300">System.out.println(<span className="text-green-400">'Sedikit lagi menang! Coba lagi!'</span>);</div>
              <div className="ml-4 text-purple-400">{'}'}</div>
              <div className="text-purple-400">{'}'}</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-600/50 shadow-xl flex items-center justify-center p-2">
            <div className="text-center">
              <div className="mb-4">
                <svg className="w-16 h-16 mx-auto text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-slate-300 leading-relaxed">
                Video Animasi<br />
                Penggunaan<br />
                Web Judi
              </h3>
            </div>
          </div>
        </div>

        <div className="bg-red-900/20 border border-red-500/30 rounded-xl backdrop-blur-sm text-center mt-6 p-2">
          <p className="text-slate-200 leading-relaxed italic">
            Ini memperlihatkan bahwa peluang kemenangan tidak benar-benar acak. Operator bisa menentukan persentasenya, 
            misalnya hanya 10% dari setiap putaran yang berpeluang menang. Artinya, sebagian besar pemain akan tetap kalah 
            meskipun merasa sedang bermain fair.
          </p>
        </div>
      </div>

      <button className="fixed right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-20">
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
