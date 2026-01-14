const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Manually parse .env.local
let env = {};
try {
    console.log('Reading .env.local...');
    const envContent = fs.readFileSync(path.resolve(__dirname, '../.env.local'), 'utf8');
    console.log('File content length:', envContent.length);
    const lines = envContent.split(/\r?\n|\r/);
    console.log('Number of lines:', lines.length);

    lines.forEach((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) return;

        const eqIdx = trimmed.indexOf('=');
        if (eqIdx > 0) {
            const key = trimmed.substring(0, eqIdx).trim();
            const val = trimmed.substring(eqIdx + 1).trim();
            env[key] = val;
            // console.log(`Parsed line ${idx}: ${key}=${val.substring(0,5)}...`);
        } else {
            console.log(`Skipped line ${idx}: '${line}' (Hex: ${Buffer.from(line).toString('hex')})`);
        }
    });
} catch (e) {
    console.error('Could not read .env.local', e);
    process.exit(1);
}

console.log('Env keys found:', Object.keys(env));
if (!env.SUPABASE_URL) {
    if (Object.keys(env).length === 0) {
        console.log('No keys found. Raw content check:');
        try {
            const raw = fs.readFileSync(path.resolve(__dirname, '../.env.local'));
            console.log('File size:', raw.length);
            console.log('First 20 bytes:', raw.subarray(0, 20));
            console.log('String value (utf8):', raw.toString('utf8'));
        } catch (e) { console.log('Read failed', e); }
    }
}

const supabaseUrl = env.SUPABASE_URL;
const supabaseKey = env.SUPABASE_ANON_KEY;
const tableName = env.CONTACT_TABLE_NAME || 'contact_submissions';

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials.');
    process.exit(1);
}

console.log('Connecting to Supabase at:', supabaseUrl);
// console.log('Key:', supabaseKey); // Don't log secrets

const supabase = createClient(supabaseUrl, supabaseKey);

async function verifyConnection() {
    try {
        // 1. Try to Select
        console.log(`Checking access to table '${tableName}'...`);
        const { count, error: selectError } = await supabase
            .from(tableName)
            .select('*', { count: 'exact', head: true });

        if (selectError) {
            console.error('Read check failed:', selectError.message);
            if (selectError.code) console.error('Error code:', selectError.code);
        } else {
            console.log('Read check successful. Row count:', count);
        }

        // 2. Try to Insert
        // We try 'Message' with capital M first as seen in contactStore.ts
        // If that fails, maybe we try lowercase.
        console.log('Attempting to insert test record with "Message" (capital M)...');

        // Using random ID if needed, but usually ID is auto-generated or UUID.
        // contactStore.ts for postgres generates UUID. Supabase usually auto-generates if set to default.
        // Let's assume standard columns.

        const recordMs = {
            name: 'Verification Bot',
            email: 'verify@example.com',
            phone: '0000000000',
            company: 'Nexus Verium',
            Message: 'Connectivity verification test ' + new Date().toISOString(),
        };

        const { data: dataMs, error: errorMs } = await supabase
            .from(tableName)
            .insert(recordMs)
            .select();

        if (errorMs) {
            console.error('Insert with "Message" failed:', errorMs.message);
            if (errorMs.code) console.error('Error code:', errorMs.code);
            if (errorMs.details) console.error('Details:', errorMs.details);

            console.log('Retrying with lowercase "message"...');

            const recordLc = {
                ...recordMs,
                message: recordMs.Message
            };
            delete recordLc.Message;

            const { data: dataLc, error: errorLc } = await supabase
                .from(tableName)
                .insert(recordLc)
                .select();

            if (errorLc) {
                console.error('Insert with "message" failed:', errorLc.message);
                if (errorLc.code) console.error('Error code:', errorLc.code);
                if (errorLc.details) console.error('Details:', errorLc.details);
            } else {
                console.log('Insert with "message" successful:', dataLc);
            }

        } else {
            console.log('Insert with "Message" successful:', dataMs);
        }

    } catch (err) {
        console.error('Unexpected error:', err);
    }
}

verifyConnection();
