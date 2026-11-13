import { API_BASE } from "./blogs";
import { authHeaders } from "../helpers/auth";
import type { SubmissionStatus } from "../constants/submissionStatuses";

const SUBMISSIONS_API = `${API_BASE}/submissions`;

export type SubmissionData = {
  name: string;
  email: string;
  message: string;
  type: string;
  cartItems: { blogId: string; title: string; price: string }[];
};

export type Submission = SubmissionData & {
  id: string;
  status: SubmissionStatus;
  createdAt: string;
};

export async function submitForm(data: SubmissionData) {
  const res = await fetch(SUBMISSIONS_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to submit form");
  return res.json();
}

export async function fetchSubmissions(): Promise<Submission[]> {
  const res = await fetch(SUBMISSIONS_API, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch submissions");
  return res.json();
}

export async function updateSubmissionStatus(
  id: string,
  status: SubmissionStatus,
): Promise<Submission> {
  const res = await fetch(`${SUBMISSIONS_API}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error("Failed to update submission");
  return res.json();
}

export async function deleteSubmission(id: string): Promise<void> {
  const res = await fetch(`${SUBMISSIONS_API}/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Failed to delete submission");
}
