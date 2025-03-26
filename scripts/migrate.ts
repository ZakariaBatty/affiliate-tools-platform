import { execSync } from "child_process"
import { join } from "path"
import * as fs from "fs"

// Get migration name from command line arguments
const migrationName = process.argv[2]

if (!migrationName) {
  console.error("Please provide a migration name")
  console.error('Example: npm run migrate:create "add_user_profile"')
  process.exit(1)
}

// Create migration
console.log(`Creating migration: ${migrationName}`)
try {
  execSync(`npx prisma migrate dev --name ${migrationName}`, { stdio: "inherit" })
  console.log("Migration created successfully")
} catch (error) {
  console.error("Failed to create migration:", error)
  process.exit(1)
}

// Path to migrations directory
const migrationsDir = join(process.cwd(), "prisma", "migrations")

// Get the latest migration directory
const migrations = fs
  .readdirSync(migrationsDir)
  .filter((dir) => dir.match(/^\d{14}_/))
  .sort((a, b) => b.localeCompare(a))

if (migrations.length === 0) {
  console.error("No migrations found")
  process.exit(1)
}

const latestMigration = migrations[0]
console.log(`Latest migration: ${latestMigration}`)

// Create a README file in the migration directory
const readmePath = join(migrationsDir, latestMigration, "README.md")
fs.writeFileSync(
  readmePath,
  `# Migration: ${migrationName}

Created at: ${new Date().toISOString()}

## Changes

- Describe the changes made in this migration

## Rollback

If you need to rollback this migration, you can use:

\`\`\`bash
npx prisma migrate resolve --rolled-back ${latestMigration}
\`\`\`

Then apply the previous migration:

\`\`\`bash
npx prisma migrate resolve --applied <previous-migration>
\`\`\`
`,
)

console.log(`Created README at ${readmePath}`)

