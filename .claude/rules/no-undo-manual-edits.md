# Rule: Don't undo manual code edits

The user edits this codebase by hand between and during sessions. Treat existing
code as intentional.

- Do **not** revert, overwrite, "clean up", or rewrite code you didn't just write
  unless the user specifically asks for that change.
- When a file's current state contradicts what you expected (e.g. a value or
  approach changed), assume it was a deliberate manual edit. Surface it and ask —
  don't silently restore your earlier version.
- Scope edits narrowly to the task at hand. Avoid drive-by refactors, reformatting,
  or reordering of untouched code.
- If a manual change appears to conflict with the task, point out the conflict and
  let the user decide rather than choosing for them.
