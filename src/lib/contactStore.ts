import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";

import { Client } from "pg";
import { createClient } from "@supabase/supabase-js";

import type { ContactSubmission } from "@/types/contact";

const FALLBACK_DIR = path.join(process.cwd(), "data");
const FALLBACK_FILE = path.join(FALLBACK_DIR, "contact-submissions.json");
const TABLE_NAME = sanitizeIdentifier(
  process.env.CONTACT_TABLE_NAME,
  "contact_submissions",
);

interface LocalContactRecord extends ContactSubmission {
  submittedAt: string;
}

export async function storeContactSubmission(submission: ContactSubmission) {
  const supabaseUrl = process.env.SUPABASE_URL?.trim();
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ??
    process.env.SUPABASE_ANON_KEY?.trim();

  if (supabaseUrl && supabaseKey) {
    await storeInSupabase(supabaseUrl, supabaseKey, submission);
    return;
  }

  const dbUrl =
    process.env.CONTACT_FORM_DATABASE_URL?.trim() ||
    process.env.DATABASE_URL?.trim();
  if (dbUrl) {
    await storeInPostgres(dbUrl, submission);
    return;
  }

  await storeLocally(submission);
}

async function storeInSupabase(
  url: string,
  key: string,
  submission: ContactSubmission,
) {
  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const record = {
    name: submission.name,
    email: submission.email,
    phone: submission.phone,
    company: submission.company,
    Message: submission.message,
  };

  const { error } = await supabase.from(TABLE_NAME).insert(record);
  if (error) {
    throw new Error(error.message);
  }
}

async function storeInPostgres(dbUrl: string, submission: ContactSubmission) {
  if (!dbUrl) {
    throw new Error("Database URL is missing.");
  }

  const client = new Client({
    connectionString: dbUrl,
    ssl:
      process.env.NODE_ENV === "production"
        ? { rejectUnauthorized: false }
        : undefined,
  });

  await client.connect();

  const createdAt = new Date().toISOString();
  const recordId = randomUUID();

  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
        id UUID PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        company TEXT NOT NULL,
        message TEXT NOT NULL,
        captcha_token TEXT,
        submitted_at TIMESTAMPTZ NOT NULL
      );
    `);

    await client.query(
      `
        INSERT INTO ${TABLE_NAME}
          (id, name, email, phone, company, message, captcha_token, submitted_at)
        VALUES
          ($1, $2, $3, $4, $5, $6, $7, $8);
      `,
      [
        recordId,
        submission.name,
        submission.email,
        submission.phone,
        submission.company,
        submission.message,
        submission.captchaToken,
        createdAt,
      ],
    );
  } finally {
    await client.end();
  }
}

async function storeLocally(submission: ContactSubmission) {
  await fs.mkdir(FALLBACK_DIR, { recursive: true });

  const record: LocalContactRecord = {
    ...submission,
    submittedAt: new Date().toISOString(),
  };

  let existing: LocalContactRecord[] = [];
  try {
    const raw = await fs.readFile(FALLBACK_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      existing = parsed;
    }
  } catch (error) {
    if (
      (error as NodeJS.ErrnoException).code !== "ENOENT" &&
      !(error instanceof SyntaxError)
    ) {
      throw error;
    }
  }

  existing.push(record);

  await fs.writeFile(FALLBACK_FILE, JSON.stringify(existing, null, 2));
}

function sanitizeIdentifier(raw: string | undefined, fallback: string) {
  const candidate = raw?.trim() || fallback;
  const sanitized = candidate.replace(/[^a-zA-Z0-9_]/g, "_");
  return sanitized || fallback;
}
