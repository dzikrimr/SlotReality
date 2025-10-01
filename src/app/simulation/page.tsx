"use client";

import React, { useState, useEffect } from "react";
import EndingPage from "../endings/page";
import Navbar from "@/components/Navbar";

const ICONS = [
  "/icons/simulation/apple.png",
  "/icons/simulation/bar.png",
  "/icons/simulation/bell.png",
  "/icons/simulation/cherry.png",
  "/icons/simulation/diamond.png",
  "/icons/simulation/dollar.png",
  "/icons/simulation/seven.png",
  "/icons/simulation/watermelon.png",
];

const SPECIAL_ICONS = {
  BONUS: "/icons/simulation/bonus.png",
  BIGWIN: "/icons/simulation/bigwin.png",
};

function checkWinPattern(grid: string[][]) {
  const rows = 3;
  const cols = 5;
  let hasWin = false;
  let winType = "";
  let bonusCount = 0;

  // Hitung bonus/scatter
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === SPECIAL_ICONS.BONUS) bonusCount++;
    }
  }

  if (bonusCount >= 3) {
    return { hasWin: true, winType: "BONUS", payout: 5 };
  }

  // Check horizontal
  for (let r = 0; r < rows; r++) {
    const firstIcon = grid[r][0];
    let count = 1;
    for (let c = 1; c < cols; c++) {
      if (grid[r][c] === firstIcon) count++;
      else break;
    }
    if (count >= 3) {
      hasWin = true;
      winType = `Horizontal Row ${r + 1}`;
      return { hasWin, winType, payout: count };
    }
  }

  // Check diagonal kiri atas ke kanan bawah
  if (rows === 3 && cols >= 3) {
    const firstIcon = grid[0][0];
    if (grid[1][1] === firstIcon && grid[2][2] === firstIcon) {
      hasWin = true;
      winType = "Diagonal";
      return { hasWin, winType, payout: 3 };
    }
  }

  // Check diagonal kanan atas ke kiri bawah
  if (rows === 3 && cols >= 3) {
    const firstIcon = grid[0][2];
    if (grid[1][1] === firstIcon && grid[2][0] === firstIcon) {
      hasWin = true;
      winType = "Diagonal";
      return { hasWin, winType, payout: 3 };
    }
  }

  return { hasWin: false, winType: "", payout: 0 };
}

// Generate spin result
function generateSpinResult(spinNumber: number): string[][] {
  const rows = 3;
  const cols = 5;
  const result: string[][] = Array(rows)
    .fill(0)
    .map(() => Array(cols).fill(""));

  if (spinNumber === 1) {
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        result[r][c] = ICONS[Math.floor(Math.random() * ICONS.length)];
      }
    }
    return result;
  }

  if (spinNumber >= 2 && spinNumber <= 5) {
    const patterns = ["horizontal", "diagonal_down", "diagonal_up", "bonus"];
    const pattern = patterns[Math.floor(Math.random() * patterns.length)];

    if (pattern === "horizontal") {
      const winRow = Math.floor(Math.random() * rows);
      const winIcon = ICONS[Math.floor(Math.random() * ICONS.length)];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (r === winRow) {
            result[r][c] = winIcon;
          } else {
            result[r][c] = ICONS[Math.floor(Math.random() * ICONS.length)];
          }
        }
      }
    } else if (pattern === "diagonal_down") {
      const winIcon = ICONS[Math.floor(Math.random() * ICONS.length)];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (r === c && c < 3) {
            result[r][c] = winIcon;
          } else {
            result[r][c] = ICONS[Math.floor(Math.random() * ICONS.length)];
          }
        }
      }
    } else if (pattern === "diagonal_up") {
      const winIcon = ICONS[Math.floor(Math.random() * ICONS.length)];
      result[0][2] = winIcon;
      result[1][1] = winIcon;
      result[2][0] = winIcon;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (result[r][c] === "") {
            result[r][c] = ICONS[Math.floor(Math.random() * ICONS.length)];
          }
        }
      }
    } else if (pattern === "bonus") {
      const bonusPositions: [number, number][] = [];
      const bonusCount = 3 + Math.floor(Math.random() * 2);

      while (bonusPositions.length < bonusCount) {
        const r = Math.floor(Math.random() * rows);
        const c = Math.floor(Math.random() * cols);
        if (!bonusPositions.some(([pr, pc]) => pr === r && pc === c)) {
          bonusPositions.push([r, c]);
        }
      }

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (bonusPositions.some(([pr, pc]) => pr === r && pc === c)) {
            result[r][c] = SPECIAL_ICONS.BONUS;
          } else {
            result[r][c] = ICONS[Math.floor(Math.random() * ICONS.length)];
          }
        }
      }
    }

    return result;
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      result[r][c] = ICONS[Math.floor(Math.random() * ICONS.length)];
    }
  }

  return result;
}

export default function Simulation() {
  const [currentPage, setCurrentPage] = useState<"game" | "ending">("game");
  const [isSpinning, setIsSpinning] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [isAutoSpin, setIsAutoSpin] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const [balance, setBalance] = useState(50);
  const [bet, setBet] = useState(5);
  const [spinCount, setSpinCount] = useState(0);
  const [endingType, setEndingType] = useState<"good" | "bad" | null>(null);
  const [glowType, setGlowType] = useState<"idle" | "win" | "lose">("idle");

  const [displayGrid, setDisplayGrid] = useState<string[][]>(
    Array(3)
      .fill(0)
      .map(() =>
        Array(5)
          .fill(0)
          .map(() => ICONS[Math.floor(Math.random() * ICONS.length)])
      )
  );

  const [winMessage, setWinMessage] = useState("");

  const performSpin = () => {
    if (isSpinning || balance < bet) {
      if (balance < bet) {
        setEndingType("bad");
        setIsAutoSpin(false);
        setTimeout(() => {
          setIsTransitioning(true);
          setTimeout(() => setCurrentPage("ending"), 600);
        }, 500);
      }
      return;
    }

    setIsSpinning(true);
    setWinMessage("");
    setGlowType("idle");

    const newSpinCount = spinCount + 1;

    let spinCounter = 0;
    const spinInterval = setInterval(() => {
      setDisplayGrid(
        Array(3)
          .fill(0)
          .map(() =>
            Array(5)
              .fill(0)
              .map(() => ICONS[Math.floor(Math.random() * ICONS.length)])
          )
      );
      spinCounter++;

      if (spinCounter >= 15) {
        clearInterval(spinInterval);

        const results = generateSpinResult(newSpinCount);
        setDisplayGrid(results);

        const winCheck = checkWinPattern(results);

        let delta = 0;
        let isWin = false;

        if (winCheck.hasWin) {
          delta = bet * winCheck.payout;
          isWin = true;
          setWinMessage(`${winCheck.winType} - Win $${delta}!`);
        } else {
          delta = -bet;
          setWinMessage(`No Win - Lost $${bet}`);
        }

        const newBalance = Math.max(balance + delta, 0);
        setBalance(newBalance);
        setSpinCount(newSpinCount);

        setGlowType(isWin ? "win" : "lose");
        setIsSpinning(false);

        if (newBalance <= 0 || newSpinCount >= 10) {
          setTimeout(() => {
            setEndingType("bad");
            setIsAutoSpin(false);
            setIsTransitioning(true);
            setTimeout(() => setCurrentPage("ending"), 600);
          }, 2000);
        } else if (newSpinCount === 5 && newBalance > 50) {
          setTimeout(() => {
            setShowOverlay(true);
            setIsAutoSpin(false);
          }, 2000);
        }
      }
    }, 100);
  };

  const spin = () => {
    performSpin();
  };

  const toggleAutoSpin = () => {
    setIsAutoSpin(!isAutoSpin);
  };

  const setMaxBet = () => {
    setBet(balance);
  };

  const handleReturnChoice = () => {
    setIsTransitioning(true);

    setTimeout(() => {
      setCurrentPage("game");
      setBalance(50);
      setBet(5);
      setSpinCount(0);
      setEndingType(null);
      setGlowType("idle");
      setShowOverlay(false);
      setIsAutoSpin(false);
      setWinMessage("");
      setIsTransitioning(false);
      setDisplayGrid(
        Array(3)
          .fill(0)
          .map(() =>
            Array(5)
              .fill(0)
              .map(() => ICONS[Math.floor(Math.random() * ICONS.length)])
          )
      );
    }, 600);
  };

  const handleGoodEnding = () => {
    setEndingType("good");
    setIsTransitioning(true);
    setTimeout(() => setCurrentPage("ending"), 600);
  };

  const handleContinuePlaying = () => {
    setShowOverlay(false);
    setGlowType("idle");
  };

  useEffect(() => {
    if (
      isAutoSpin &&
      !isSpinning &&
      !showOverlay &&
      balance >= bet &&
      currentPage === "game"
    ) {
      const timeout = setTimeout(() => {
        performSpin();
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [isAutoSpin, isSpinning, showOverlay, balance, bet, currentPage]);

  if (currentPage === "ending" && endingType) {
    return (
      <div
        className={
          isTransitioning ? "animate-fadeSlideDown" : "animate-fadeSlideUp"
        }
      >
        <EndingPage type={endingType} onReturnChoice={handleReturnChoice} />
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <style jsx>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeSlideDown {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-30px);
          }
        }

        .animate-fadeSlideUp {
          animation: fadeSlideUp 0.6s ease-out forwards;
        }

        .animate-fadeSlideDown {
          animation: fadeSlideDown 0.6s ease-out forwards;
        }
      `}</style>

      {winMessage && (
        <div className="fixed top-30 left-0 right-0 z-50 flex justify-center pt-4">
          <div
            className={`px-6 py-3 rounded-lg font-bold text-lg shadow-lg ${
              glowType === "win"
                ? "bg-yellow-500 text-gray-900"
                : "bg-red-600 text-white"
            }`}
          >
            {winMessage}
          </div>
        </div>
      )}

      <div
        className={`min-h-screen flex items-center justify-center bg-gray-900 ${
          isTransitioning ? "animate-fadeSlideDown" : ""
        }`}
      >
        <section className="w-full max-w-3xl mx-auto mt-12 relative px-4">
          <div className="flex items-center justify-between mb-4 px-2">
            <div className="text-sm font-semibold tracking-wider text-gray-300 w-20">
              BALANCE
            </div>
            <div className="bg-gray-800/60 text-gray-100 px-4 py-2 rounded-md font-medium w-48 text-center">
              $ {balance.toFixed(2)}
            </div>
          </div>
          <div className="flex items-center justify-between mb-4 px-2">
            <div className="text-sm font-semibold tracking-wider text-gray-300 w-20">
              BET
            </div>
            <div className="flex items-center justify-center bg-gray-800/60 text-gray-100 px-4 py-2 rounded-md font-medium gap-2 w-48">
              <button
                onClick={() => setBet((b) => Math.max(1, b - 1))}
                className="bg-gray-700 px-2 py-1 rounded hover:bg-gray-600"
                disabled={isSpinning}
              >
                -
              </button>
              <span>$ {bet}</span>
              <button
                onClick={() => setBet((b) => Math.min(balance, b + 1))}
                className="bg-gray-700 px-2 py-1 rounded hover:bg-gray-600"
                disabled={isSpinning}
              >
                +
              </button>
            </div>
          </div>

          <div
            className={`relative rounded-2xl border-[10px] border-gray-700 px-6 py-8 bg-[#222C4D] transition-shadow duration-500 ${
              showOverlay ? "" : "overflow-hidden"
            } ${
              isSpinning
                ? "shadow-[0_0_35px_rgba(183,188,193,0.7),0_0_75px_rgba(183,188,193,0.55)]"
                : glowType === "win"
                ? "shadow-[0_0_45px_rgba(255,215,0,0.8),0_0_85px_rgba(255,215,0,0.65)]"
                : glowType === "lose"
                ? "shadow-[0_0_45px_rgba(220,38,38,0.8),0_0_85px_rgba(220,38,38,0.65)]"
                : "shadow-[0_0_25px_rgba(183,188,193,0.45)]"
            }`}
          >
            <div className="flex gap-3 justify-center">
              {[0, 1, 2, 3, 4].map((colIdx) => (
                <div
                  key={colIdx}
                  className="bg-[#0A0F1F] rounded-lg px-4 py-3 flex flex-col gap-3"
                >
                  {[0, 1, 2].map((rowIdx) => (
                    <div
                      key={`${rowIdx}-${colIdx}`}
                      className="flex items-center justify-center h-20 w-20"
                    >
                      <img
                        src={displayGrid[rowIdx][colIdx]}
                        alt={`icon-${rowIdx}-${colIdx}`}
                        className="h-16 w-16 object-contain"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {showOverlay && (
              <div className="absolute inset-0 bg-black/95 rounded-xl z-20 flex flex-col items-center justify-center text-white px-4">
                <p className="text-2xl font-bold text-center mb-2">
                  Anda sudah untung!
                </p>
                <p className="text-lg text-center mb-6">
                  Apakah ingin berhenti atau lanjut bermain?
                </p>
                <div className="flex gap-4">
                  <button
                    className="bg-green-600 px-8 py-3 rounded-lg font-bold hover:bg-green-700 text-lg"
                    onClick={handleGoodEnding}
                  >
                    Berhenti
                  </button>
                  <button
                    className="bg-red-600 px-8 py-3 rounded-lg font-bold hover:bg-red-700 text-lg"
                    onClick={handleContinuePlaying}
                  >
                    Lanjut
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-center mt-6 gap-4">
            {!showOverlay && (
              <>
                <button
                  className={`${
                    isAutoSpin ? "bg-red-500" : "bg-[#222C4D]"
                  } text-white px-12 py-4 rounded-xl font-bold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all`}
                  onClick={toggleAutoSpin}
                  disabled={isSpinning || balance < bet}
                >
                  {isAutoSpin ? "STOP AUTO" : "AUTO SPIN"}
                </button>
                <button
                  className="bg-gradient-to-b from-yellow-500 to-yellow-600 text-gray-900 px-12 py-4 rounded-xl font-bold text-xl shadow-lg hover:from-yellow-400 hover:to-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  onClick={spin}
                  disabled={isSpinning || balance < bet || isAutoSpin}
                >
                  {isSpinning ? "SPINNING..." : "SPIN"}
                  <div className="text-sm font-normal">(${bet} per spin)</div>
                </button>
                <button
                  className="bg-[#222C4D] text-white px-12 py-4 rounded-xl font-bold text-lg shadow-lg hover:from-purple-400 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  onClick={setMaxBet}
                  disabled={isSpinning || bet === balance}
                >
                  MAX BET
                </button>
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
