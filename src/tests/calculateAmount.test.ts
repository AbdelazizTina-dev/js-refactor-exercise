import { calculateAmount } from "../statement";
import { PlayTypes } from "../utils";

describe("calculateAmount", () => {
  test("calculates amount for tragedy play with audience below threshold", () => {
    const amount = calculateAmount(20, PlayTypes.tragedy);
    expect(amount).toBe(40000);
  });

  test("calculates amount for tragedy play with audience above threshold", () => {
    const amount = calculateAmount(40, PlayTypes.tragedy);
    expect(amount).toBe(50000); // 40000 + 1000 * (40 - 30)
  });

  test("calculates amount for comedy play with audience below threshold", () => {
    const amount = calculateAmount(10, PlayTypes.comedy);
    expect(amount).toBe(33000); // 30000 + 300 * 10
  });

  test("calculates amount for comedy play with audience above threshold", () => {
    const amount = calculateAmount(30, PlayTypes.comedy);
    expect(amount).toBe(54000); // 30000 + 10000 + 500 * (30 - 20) + 300 * 30
  });
});
