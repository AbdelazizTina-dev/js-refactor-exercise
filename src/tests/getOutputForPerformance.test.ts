import { getOutputForPerformance } from "../statement";
import { Performance } from "../types";
import { PlayTypes } from "../utils";

describe("getOutputForPerformance", () => {
  test("gets output for tragedy performance", () => {
    const performance: Performance = { playID: "hamlet", audience: 40 };
    const result = getOutputForPerformance(performance, PlayTypes.tragedy);
    expect(result).toEqual({
      ...performance,
      amount: 50000,
      volumeCredits: 10,
    });
  });

  test("gets output for comedy performance", () => {
    const performance: Performance = { playID: "as-like", audience: 30 };
    const result = getOutputForPerformance(performance, PlayTypes.comedy);
    expect(result).toEqual({
      ...performance,
      amount: 54000,
      volumeCredits: 6,
    });
  });
});
