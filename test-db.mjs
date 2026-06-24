import postgres from './node_modules/postgres/src/index.js';
import { readFileSync } from 'fs';

// Load environment variables from .env.local
const envFile = readFileSync('./.env.local', 'utf-8');
for (const line of envFile.split(/\r?\n/)) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  const eqIdx = trimmed.indexOf('=');
  if (eqIdx === -1) continue;
  const key = trimmed.slice(0, eqIdx).trim();
  const raw = trimmed.slice(eqIdx + 1).trim();
  process.env[key] = raw.replace(/^"(.*)"$/, '$1');
}

const sql = postgres(process.env.DATABASE_URL, { prepare: false });

async function run() {
  console.log('Querying events using CS-Website DATABASE_URL...');
  const rows = await sql`
    SELECT id, title, status FROM events
  `;
  console.log('Result:', JSON.stringify(rows, null, 2));
}

run()
  .catch(console.error)
  .finally(() => sql.end());
