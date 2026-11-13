export const SUBMISSION_STATUSES = [
  "unresolved",
  "confirmed",
  "payed",
  "shipped",
  "finished",
] as const;

export type SubmissionStatus = (typeof SUBMISSION_STATUSES)[number];
