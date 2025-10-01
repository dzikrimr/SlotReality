import { Key } from "react";

export interface FallingElementProps {
  id: Key | null | undefined;
  type: 'card_10' | 'card_j' | 'gaple' | 'slot';
  delay: number;
  duration: number;
  startX: number;
  rotation: number;
  scale: number;
}

export interface FallingElementData {
  id: number;
  type: 'card_10' | 'card_j' | 'gaple' | 'slot';
  delay: number;
  duration: number;
  startX: number;
  rotation: number;
  scale: number;
}

export interface CoinData {
  id: number;
  x: number;
  y: number;
  delay: number;
  scale: number;
}