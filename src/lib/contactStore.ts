import { promises as fs } from "fs";
import path from "path";

import { Client } from "pg";
import { createClient } from "@supabase/supabase-js";

import type { ContactSubmission } from "@/types/contact";

const FALLBACK_DIR = path.join(process.cwd(), "data");
const FALLBACK_FILE = path.join(FALLBACK_DIR, "contact-submissions.json");
const TABLE_NAME = sanitizeIdentifier(
  process.env.CONTACT_TABLE_NAME,
  "Contacted",
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
    phone: submission.phone.trim(),
    company: submission.company,
    Message: submission.message.trim(),
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
  // removed manual ID generation to let DB handle it (identity column)

  try {
    // We assume the table exists with the correct schema as provided by the user.
    // If we were to CREATE it, we'd need to match their schema exacty.
    // Since we are fixing for an EXISTING table, we skip the CREATE check or at least assume it's there.
    // For safety, we will just INSERT.

    await client.query(
      `
        INSERT INTO "${TABLE_NAME}"
          (name, email, phone, company, "Message", captcha_token, submitted_at)
        VALUES
          ($1, $2, $3, $4, $5, $6, $7);
      `,
      [
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
  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "Database not configured. Production requires SUPABASE_URL/KEY or DATABASE_URL.",
    );
  }

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
  // allow quotes if user provided them in env var? no, just simple sanitization
  // but "Contacted" is fine.
  // if fallback is "Contacted", it's fine.
  // The user table is public."Contacted".
  // Note: the code uses `FROM ${TABLE_NAME}`.
  // If user sets TABLE_NAME env var to `public."Contacted"`, sanitize might strip quotes.
  // But here we default to "Contacted". In Postgres `INSERT INTO Contacted` might fail if it requires quotes.
  // User said: create table public."Contacted".
  // This usually means it is case sensitive.
  // So we probably need quoting.
  // Let's force quotes in the default if we change sanitize?
  // Or just trust the `sanitizeIdentifier` doesn't break it.
  // `sanitizeIdentifier` replaces non-alphanumeric with _.
  // So "Contacted" -> "Contacted".
  // `INSERT INTO Contacted` -> Postgres folds to `contacted`.
  // If table is `"Contacted"`, we MUST quote it in the SQL string.
  // `INSERT INTO "${TABLE_NAME}"`?
  // Let's modify the query to quote the table name safely.
  // Or simpler: Just hardcode "Contacted" inside the query quotes if TABLE_NAME matches?
  // Let's update sanitizeIdentifier or just use a specific string.
  // Actually, I will just quote the identifier in the query: `INSERT INTO "${TABLE_NAME}" ...`
  // But `storeInSupabase` uses `supabase.from(TABLE_NAME)`. Supabase client handles quoting usually.

  // Wait, `sanitizeIdentifier` strips quotes.
  // I should probably relax `sanitizeIdentifier` or just handle the default safely.
  // Let's just use "Contacted" as default.
  // In `storeInPostgres` query: `INSERT INTO ${TABLE_NAME}` -> `INSERT INTO Contacted`.
  // If I want `"Contacted"`, I should probably pass `"Contacted"` as the string?
  // But `sanitizeIdentifier` strips quotes.
  // I will assume for now `Contacted` works or I will explicitly add quotes in the SQL.

  // Let's stick to the ReplacementContent above but ADD QUOTES in the Postgres query around table name.
  // And `sanitizeIdentifier`... if I pass "Contacted", it returns "Contacted".
  // `INSERT INTO "Contacted"` is what we want.
  // So `INSERT INTO "${TABLE_NAME}"` is safer.

  return candidate.replace(/[^a-zA-Z0-9_]/g, "_") || fallback;
}
