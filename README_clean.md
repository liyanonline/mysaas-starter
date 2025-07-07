### 4. 🧼 Clean Build and Type Cache (Locally)

Before pushing to Vercel:

rm -rf .next
rm -rf node_modules
pnpm install
pnpm run build

This helps eliminate incorrect .d.ts files that might conflict with app/blog/[id]/edit/page.tsx.

---

### checkField error:
  "exclude": [
    "node_modules",
    ".next/types/**/*"
  ]

  ---
  