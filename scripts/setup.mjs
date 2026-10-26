// Creates cms/.env and web/.env.local with random secrets – nothing to look up or copy.
// Existing files are never overwritten.
import { randomBytes } from 'node:crypto'
import { existsSync, writeFileSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const key = () => randomBytes(32).toString('base64')
const cmsEnv = join(root, 'cms', '.env')
const webEnv = join(root, 'web', '.env.local')

let previewSecret = randomBytes(24).toString('hex')
if (existsSync(cmsEnv)) {
  const m = readFileSync(cmsEnv, 'utf8').match(/^PREVIEW_SECRET=(.*)$/m)
  if (m) previewSecret = m[1].trim()
}

if (!existsSync(cmsEnv)) {
  writeFileSync(
    cmsEnv,
    `HOST=0.0.0.0
PORT=1337
APP_KEYS=${[key(), key(), key(), key()].join(',')}
API_TOKEN_SALT=${key()}
ADMIN_JWT_SECRET=${key()}
TRANSFER_TOKEN_SALT=${key()}
JWT_SECRET=${key()}
ENCRYPTION_KEY=${key()}
DATABASE_FILENAME=.tmp/data.db
# The website address (for the Preview button)
CLIENT_URL=http://localhost:3000
PREVIEW_SECRET=${previewSecret}
`,
  )
  console.log('✔ created cms/.env')
}

if (!existsSync(webEnv)) {
  writeFileSync(
    webEnv,
    `# Where Strapi runs (change to your CMS domain when live)
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
# Must match PREVIEW_SECRET in cms/.env
PREVIEW_SECRET=${previewSecret}
# Optional: a Strapi API token (Settings → API Tokens) used to save form submissions
# STRAPI_API_TOKEN=
`,
  )
  console.log('✔ created web/.env.local')
}
