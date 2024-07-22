import { getDataForPerformances } from "../statement";
import { Performance, PlaysRecord } from "../types";
import { PlayTypes } from "../utils";

describe("getDataForPerformances", () => {
  const plays: PlaysRecord = {
    hamlet: { name: "Hamlet", type: PlayTypes.tragedy },
    "as-like": { name: "As You Like It", type: PlayTypes.comedy },
  };

  test("gets data for performances", () => {
    const performances: Performance[] = [
      { playID: "hamlet", audience: 40 },
      { playID: "as-like", audience: 30 },
    ];
    const result = getDataForPerformances(performances, plays);
    expect(result).toEqual([
      {
        playID: "hamlet",
        audience: 40,
        amount: 50000,
        volumeCredits: 10,
      },
      {
        playID: "as-like",
        audience: 30,
        amount: 54000,
        volumeCredits: 6,
      },
    ]);
  });
});
