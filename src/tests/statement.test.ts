import { statement } from "../statement";
import { Invoice, PlaysRecord } from "../types";
import { PlayTypes } from "../utils";

describe("statement", () => {
  const plays: PlaysRecord = {
    hamlet: { name: "Hamlet", type: PlayTypes.tragedy },
    "as-like": { name: "As You Like It", type: PlayTypes.comedy },
  };

  const invoice: Invoice = {
    customer: "BigCo",
    performances: [
      { playID: "hamlet", audience: 40 },
      { playID: "as-like", audience: 30 },
    ],
  };

  test("generates statement for invoice", () => {
    const result = statement(invoice, plays);
    expect(result).toBe(
      `Statement for BigCo\n` +
        `    Hamlet: $500.00 (40 seats)\n` +
        `    As You Like It: $540.00 (30 seats)\n` +
        `  Amount owed is $1,040.00\n` +
        `  You earned 16 credits\n`
    );
  });
});
