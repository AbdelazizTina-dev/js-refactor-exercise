import {
  Invoice,
  Performance,
  PerformanceOutput,
  PlaysRecord,
  PlayType,
} from "./types";
import {
  AUDIENCE_THRESHOLD_FOR_VOLUME_CREDITS,
  COMEDY_AUDIENCE_DIVISOR,
  ComedyFees,
  format,
  PlayTypes,
  TragedyFees,
} from "./utils";

export const calculateVolumeCredits = (
  playType: PlayType,
  audienceNumber: number
): number => {
  let volumeCredits = Math.max(
    audienceNumber - AUDIENCE_THRESHOLD_FOR_VOLUME_CREDITS,
    0
  );

  if (playType === PlayTypes.comedy)
    volumeCredits += Math.floor(audienceNumber / COMEDY_AUDIENCE_DIVISOR);

  return volumeCredits;
};

export const calculateAmount = (
  audience: number,
  playType: PlayType
): number => {
  let amount =
    playType === PlayTypes.tragedy ? TragedyFees.BASE_FEE : ComedyFees.BASE_FEE;

  switch (playType) {
    case PlayTypes.tragedy:
      if (audience > TragedyFees.AUDIENCE_THRESHOLD) {
        amount +=
          TragedyFees.FEE_PER_EXTRA_PERSON *
          (audience - TragedyFees.AUDIENCE_THRESHOLD);
      }

      return amount;
    case PlayTypes.comedy:
      if (audience > ComedyFees.AUDIENCE_THRESHOLD) {
        amount +=
          ComedyFees.FLAT_EXTRA_FEE +
          ComedyFees.FEE_PER_EXTRA_PERSON *
            (audience - ComedyFees.AUDIENCE_THRESHOLD);
      }

      amount += ComedyFees.FEE_PER_PERSON * audience;

      return amount;
    default:
      throw new Error("Unknown play type!");
  }
};

export const getOutputForPerformance = (
  performance: Performance,
  playType: PlayType
): PerformanceOutput => {
  return {
    ...performance,
    amount: calculateAmount(performance.audience, playType),
    volumeCredits: calculateVolumeCredits(playType, performance.audience),
  };
};

export const getDataForPerformances = (
  performances: Performance[],
  plays: PlaysRecord
): PerformanceOutput[] => {
  const output: PerformanceOutput[] = [];

  for (let perf of performances) {
    const play = plays[perf.playID];
    output.push(getOutputForPerformance(perf, play.type));
  }

  return output;
};

const getResult = (
  customer: string,
  performancesData: PerformanceOutput[],
  totalAmount: number,
  volumeCredits: number,
  plays: PlaysRecord
): string => {
  let result = `Statement for ${customer}\n`;

  performancesData.forEach((data) => {
    result += `    ${plays[data.playID].name}: ${format(data.amount / 100)} (${
      data.audience
    } seats)\n`;
  });

  result += `  Amount owed is ${format(totalAmount / 100)}\n`;
  result += `  You earned ${volumeCredits} credits\n`;

  return result;
};

export function statement(invoice: Invoice, plays: PlaysRecord): string {
  const performancesData = getDataForPerformances(invoice.performances, plays);

  const totalAmount = performancesData.reduce(
    (sum, data) => sum + data.amount,
    0
  );

  const volumeCredits = performancesData.reduce(
    (sum, data) => sum + data.volumeCredits,
    0
  );

  return getResult(
    invoice.customer,
    performancesData,
    totalAmount,
    volumeCredits,
    plays
  );
}
