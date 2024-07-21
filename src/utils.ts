export const PlayTypes = {
  tragedy: "tragedy",
  comedy: "comedy",
} as const;

export const TragedyFees = {
  BASE_FEE: 40000,
  AUDIENCE_THRESHOLD: 30,
  FEE_PER_EXTRA_PERSON: 1000,
} as const;

export const ComedyFees = {
  BASE_FEE: 30000,
  AUDIENCE_THRESHOLD: 20,
  FEE_PER_PERSON: 300,
  FEE_PER_EXTRA_PERSON: 500,
  FLAT_EXTRA_FEE: 10000,
} as const;

export const AUDIENCE_THRESHOLD_FOR_VOLUME_CREDITS = 30;

export const COMEDY_AUDIENCE_DIVISOR = 5;

export const format = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
}).format;
