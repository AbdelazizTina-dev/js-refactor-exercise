import { PlayTypes } from "./utils";

export type Invoice = {
  customer: string;
  performances: Performance[];
};

export type Performance = {
  playID: string;
  audience: number;
};

export type Play = {
  name: string;
  type: PlayType;
};

export type PlaysRecord = {
  [name: string]: Play;
};

export type PerformanceOutput = Performance & {
  amount: number;
  volumeCredits: number;
};

export type PlayType = keyof typeof PlayTypes;
