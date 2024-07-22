import { calculateVolumeCredits } from "../statement";
import { PlayTypes } from "../utils";

describe("calculateVolumeCredits", () => {
  test("calculates volume credits for tragedy play", () => {
    const credits = calculateVolumeCredits(PlayTypes.tragedy, 40);
    expect(credits).toBe(10); // audience - 30
  });

  test("calculates volume credits for comedy play", () => {
    const credits = calculateVolumeCredits(PlayTypes.comedy, 40);
    expect(credits).toBe(18); // (audience - 30) + Math.floor(40 / 5)
  });
});
