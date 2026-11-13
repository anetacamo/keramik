import Fastify from "fastify";
import fs from "fs";
import path from "path";

const app = Fastify();

const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "changeme";

const SUBMISSION_STATUSES = [
  "unresolved",
  "confirmed",
  "payed",
  "shipped",
  "finished",
] as const;

const dataPath = path.join(process.cwd(), "data", "blogs.json");
const submissionsPath = path.join(process.cwd(), "data", "submissions.json");

function readData() {
  const raw = fs.readFileSync(dataPath, "utf-8");
  return JSON.parse(raw);
}

function readSubmissions() {
  try {
    const raw = fs.readFileSync(submissionsPath, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

app.get("/blogs", async () => {
  return readData();
});

app.get("/blogs/:id", async (request, reply) => {
  const { id } = request.params as { id: string };
  const data = readData();
  const item = data.find((x: any) => x.id === id);

  if (!item) {
    return reply.status(404).send({ error: "Not found" });
  }

  return item;
});

app.post("/blogs/:id/like", async (request, reply) => {
  const { id } = request.params as { id: string };
  const data = readData();
  const item = data.find((x: any) => x.id === id);

  if (!item) {
    return reply.status(404).send({ error: "requested blog was not found" });
  }

  item.likes = (item.likes ?? 0) + 1;
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

  return item;
});

app.register(require("@fastify/static"), {
  root: path.join(process.cwd(), "images"),
  prefix: "/images/",
});

app.post("/submissions", async (request, reply) => {
  const body = request.body as {
    name?: string;
    email?: string;
    message?: string;
    type?: string;
    cartItems?: { blogId: string; title: string; price: string }[];
  };

  if (!body.name || !body.email) {
    return reply.status(400).send({ error: "Name and email are required" });
  }

  const submissions = readSubmissions();
  const submission = {
    id: Date.now().toString(),
    ...body,
    status: "unresolved",
    createdAt: new Date().toISOString(),
  };
  submissions.push(submission);
  fs.writeFileSync(submissionsPath, JSON.stringify(submissions, null, 2));

  return submission;
});

function requireAuth(request: any, reply: any, done: any) {
  const auth = request.headers.authorization;
  if (!auth || auth !== `Bearer ${ADMIN_TOKEN}`) {
    reply.status(401).send({ error: "Unauthorized" });
    return;
  }
  done();
}

app.get("/submissions", { preHandler: requireAuth }, async () => {
  return readSubmissions();
});

app.patch("/submissions/:id", { preHandler: requireAuth }, async (request, reply) => {
  const { id } = request.params as { id: string };
  const { status } = request.body as { status: string };

  if (!SUBMISSION_STATUSES.includes(status as any)) {
    return reply.status(400).send({ error: "Invalid status" });
  }

  const submissions = readSubmissions();
  const submission = submissions.find((s: any) => s.id === id);

  if (!submission) {
    return reply.status(404).send({ error: "Submission not found" });
  }

  submission.status = status;
  fs.writeFileSync(submissionsPath, JSON.stringify(submissions, null, 2));
  return submission;
});

app.delete("/submissions/:id", { preHandler: requireAuth }, async (request, reply) => {
  const { id } = request.params as { id: string };
  const submissions = readSubmissions();
  const index = submissions.findIndex((s: any) => s.id === id);

  if (index === -1) {
    return reply.status(404).send({ error: "Submission not found" });
  }

  submissions.splice(index, 1);
  fs.writeFileSync(submissionsPath, JSON.stringify(submissions, null, 2));
  return { success: true };
});

app.listen({ port: 3000 });
