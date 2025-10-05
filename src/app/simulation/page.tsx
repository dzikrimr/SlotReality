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
  let bonusCount = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === SPECIAL_ICONS.BONUS) bonusCount++;
    }
  }

  if (bonusCount >= 3) return { hasWin: true, winType: "BONUS", payout: 5 };

  for (let r = 0; r < rows; r++) {
    const firstIcon = grid[r][0];
    let count = 1;
    for (let c = 1; c < cols; c++) {
      if (grid[r][c] === firstIcon) count++;
      else break;
    }
    if (count >= 3)
      return {
        hasWin: true,
        winType: `Horizontal Row ${r + 1}`,
        payout: count,
      };
  }

  if (rows === 3 && cols >= 3) {
    const firstIcon = grid[0][0];
    if (grid[1][1] === firstIcon && grid[2][2] === firstIcon)
      return { hasWin: true, winType: "Diagonal", payout: 3 };
  }

  if (rows === 3 && cols >= 3) {
    const firstIcon = grid[0][2];
    if (grid[1][1] === firstIcon && grid[2][0] === firstIcon)
      return { hasWin: true, winType: "Diagonal", payout: 3 };
  }

  return { hasWin: false, winType: "", payout: 0 };
}

function generateSpinResult(spinNumber: number): string[][] {
  const rows = 3;
  const cols = 5;
  const result: string[][] = Array(rows)
    .fill(0)
    .map(() => Array(cols).fill(""));

  if (spinNumber === 1 || spinNumber >= 6) {
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++)
        result[r][c] = ICONS[Math.floor(Math.random() * ICONS.length)];
    return result;
  }

  const patterns = ["horizontal", "diagonal_down", "diagonal_up", "bonus"];
  const pattern = patterns[Math.floor(Math.random() * patterns.length)];

  if (pattern === "horizontal") {
    const winRow = Math.floor(Math.random() * rows);
    const winIcon = ICONS[Math.floor(Math.random() * ICONS.length)];
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++)
        result[r][c] =
          r === winRow
            ? winIcon
            : ICONS[Math.floor(Math.random() * ICONS.length)];
  } else if (pattern === "diagonal_down") {
    const winIcon = ICONS[Math.floor(Math.random() * ICONS.length)];
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++)
        result[r][c] =
          r === c && c < 3
            ? winIcon
            : ICONS[Math.floor(Math.random() * ICONS.length)];
  } else if (pattern === "diagonal_up") {
    const winIcon = ICONS[Math.floor(Math.random() * ICONS.length)];
    result[0][2] = winIcon;
    result[1][1] = winIcon;
    result[2][0] = winIcon;
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++)
        if (result[r][c] === "")
          result[r][c] = ICONS[Math.floor(Math.random() * ICONS.length)];
  } else if (pattern === "bonus") {
    const bonusPositions: [number, number][] = [];
    const bonusCount = 3 + Math.floor(Math.random() * 2);
    while (bonusPositions.length < bonusCount) {
      const r = Math.floor(Math.random() * rows);
      const c = Math.floor(Math.random() * cols);
      if (!bonusPositions.some(([pr, pc]) => pr === r && pc === c))
        bonusPositions.push([r, c]);
    }
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++)
        result[r][c] = bonusPositions.some(([pr, pc]) => pr === r && pc === c)
          ? SPECIAL_ICONS.BONUS
          : ICONS[Math.floor(Math.random() * ICONS.length)];
  }

  return result;
}

export default function Simulation() {
  const [currentPage, setCurrentPage] = useState<"game" | "ending">("game");
  const [isSpinning, setIsSpinning] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [isAutoSpin, setIsAutoSpin] = useState(false);

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

  useEffect(() => {
    if (showOverlay) {
      setTimeout(() => setOverlayVisible(true), 10);
    } else {
      setOverlayVisible(false);
    }
  }, [showOverlay]);

  const performSpin = () => {
    if (isSpinning || balance < bet) {
      if (balance < bet) {
        setEndingType("bad");
        setIsAutoSpin(false);
        setTimeout(() => setCurrentPage("ending"), 500);
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
            setCurrentPage("ending");
          }, 2000);
        } else if (newSpinCount === 5 && newBalance > 50) {
          setTimeout(() => setShowOverlay(true), 2000);
        }
      }
    }, 100);
  };

  const spin = () => performSpin();
  const toggleAutoSpin = () => setIsAutoSpin(!isAutoSpin);
  const setMaxBet = () => setBet(balance);

  const handleReturnChoice = () => {
    setCurrentPage("game");
    setBalance(50);
    setBet(5);
    setSpinCount(0);
    setEndingType(null);
    setGlowType("idle");
    setShowOverlay(false);
    setOverlayVisible(false);
    setIsAutoSpin(false);
    setWinMessage("");
    setDisplayGrid(
      Array(3)
        .fill(0)
        .map(() =>
          Array(5)
            .fill(0)
            .map(() => ICONS[Math.floor(Math.random() * ICONS.length)])
        )
    );
  };

  const handleGoodEnding = () => {
    setEndingType("good");
    setCurrentPage("ending");
  };

  useEffect(() => {
    if (
      isAutoSpin &&
      !isSpinning &&
      !showOverlay &&
      balance >= bet &&
      currentPage === "game"
    ) {
      const timeout = setTimeout(() => performSpin(), 1500);
      return () => clearTimeout(timeout);
    }
  }, [isAutoSpin, isSpinning, showOverlay, balance, bet, currentPage]);

  if (currentPage === "ending" && endingType)
    return <EndingPage type={endingType} onReturnChoice={handleReturnChoice} />;

  return (
    <div className="relative w-full">
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <section className="w-full max-w-3xl mx-auto mt-12 relative px-4">
          <div className="flex items-center justify-between mb-4 px-2">
            <div className="text-sm font-semibold tracking-wider text-gray-300">
              BALANCE
            </div>
            <div className="bg-gray-800/60 text-gray-100 px-4 py-2 rounded-md font-medium w-32 text-center">
              ${balance.toFixed(2)}
            </div>
          </div>

          <div className="flex items-center justify-between mb-4 px-2">
            <div className="text-sm font-semibold tracking-wider text-gray-300">
              BET
            </div>
            <div className="flex items-center justify-center bg-gray-800/60 text-gray-100 px-4 py-2 rounded-md font-medium w-32 gap-2">
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

          {winMessage && (
            <div className="fixed top-20 left-0 right-0 z-50 flex justify-center">
              <div
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-bold text-sm sm:text-lg shadow-lg ${
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
            className={`relative rounded-xl border-[6px] sm:border-[10px] border-gray-700 px-3 sm:px-6 py-4 sm:py-8 bg-[#222C4D] transition-shadow duration-500 ${
              showOverlay ? "" : "overflow-hidden"
            } ${
              isSpinning
                ? "shadow-[0_0_20px_rgba(183,188,193,0.7),0_0_40px_rgba(183,188,193,0.55)]"
                : glowType === "win"
                ? "shadow-[0_0_25px_rgba(255,215,0,0.8),0_0_50px_rgba(255,215,0,0.65)]"
                : glowType === "lose"
                ? "shadow-[0_0_25px_rgba(220,38,38,0.8),0_0_50px_rgba(220,38,38,0.65)]"
                : "shadow-[0_0_15px_rgba(183,188,193,0.45)]"
            }`}
          >
            <div className="flex gap-2 sm:gap-3 justify-center">
              {[0, 1, 2, 3, 4].map((colIdx) => (
                <div
                  key={colIdx}
                  className="bg-[#0A0F1F] rounded-md sm:rounded-lg px-2 sm:px-4 py-2 sm:py-3 flex flex-col gap-2 sm:gap-3"
                >
                  {[0, 1, 2].map((rowIdx) => (
                    <div
                      key={`${rowIdx}-${colIdx}`}
                      className="flex items-center justify-center h-12 w-12 sm:h-20 sm:w-20"
                    >
                      <img
                        src={displayGrid[rowIdx][colIdx]}
                        alt={`icon-${rowIdx}-${colIdx}`}
                        className="h-10 w-10 sm:h-16 sm:w-16 object-contain"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div
              className={`absolute inset-0 rounded-xl z-20 flex flex-col items-center justify-center text-white px-4 bg-black/95 transition-opacity duration-500 ease-in-out ${
                overlayVisible ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <p className="text-2xl font-bold text-center mb-2">
                Anda sudah untung!
              </p>
              <p className="text-lg text-center mb-6">
                Apakah ingin berhenti atau lanjut bermain?
              </p>
              <div className="flex gap-4 w-full max-w-md">
                <button
                  className="flex-1 bg-green-600 px-8 py-3 rounded-lg font-bold hover:bg-green-700 text-lg text-center cursor-pointer"
                  onClick={handleGoodEnding}
                >
                  Berhenti
                </button>
                <button
                  className="flex-1 bg-red-600 px-8 py-3 rounded-lg font-bold hover:bg-red-700 text-lg text-center cursor-pointer"
                  onClick={() => setShowOverlay(false)}
                >
                  Lanjut
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center mt-6 gap-3 sm:gap-4 w-full">
            {!showOverlay && (
              <>
                <button
                  className={`${
                    isAutoSpin ? "bg-red-500" : "bg-[#222C4D]"
                  } text-white px-6 py-3 sm:px-12 sm:py-4 rounded-xl font-bold text-base sm:text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all w-full sm:w-auto cursor-pointer`}
                  onClick={toggleAutoSpin}
                  disabled={isSpinning || balance < bet}
                >
                  {isAutoSpin ? "STOP AUTO" : "AUTO SPIN"}
                </button>
                <button
                  className="bg-gradient-to-b from-yellow-500 to-yellow-600 text-gray-900 px-6 py-3 sm:px-12 sm:py-4 rounded-xl font-bold text-lg sm:text-xl shadow-lg hover:from-yellow-400 hover:to-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all w-full sm:w-auto cursor-pointer"
                  onClick={spin}
                  disabled={isSpinning || balance < bet || isAutoSpin}
                >
                  {isSpinning ? "SPINNING..." : "SPIN"}
                  <div className="text-xs sm:text-sm font-normal">
                    (${bet} per spin)
                  </div>
                </button>
                <button
                  className="bg-[#222C4D] text-white px-6 py-3 sm:px-12 sm:py-4 rounded-xl font-bold text-base sm:text-lg shadow-lg hover:bg-[#2f3a63] disabled:opacity-50 disabled:cursor-not-allowed transition-all w-full sm:w-auto cursor-pointer"
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
