# Rule: Never read `.env` files

Do **not** open, read, cat, grep, or otherwise inspect `.env` (or any `.env.*`
variant) in this project. These files hold live secrets (Stripe keys, Firebase
service-account credentials, Google OAuth tokens, Resend API key).

- If you need to know which variables exist, see the env-vars section in
  `CLAUDE.md` — the names are documented there.
- If you need an actual value, **ask the user** rather than reading the file.
- When writing code that consumes a new variable, reference it by name
  (`process.env.FOO`) and tell the user to add it to `.env` themselves.
