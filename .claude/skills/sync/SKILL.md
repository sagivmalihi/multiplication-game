---
name: sync
description: Review code changes, create meaningful git commits, rebase with remote, resolve conflicts, and push. Use when user says "/sync" or asks to sync, commit and push changes, or wants to save their work to the remote repository.
---

# Sync

Review uncommitted changes, create meaningful commits, rebase with remote, and push.

## Workflow

### 1. Review Changes

Run in parallel:
- `git status` - see all modified/untracked files
- `git diff` - see unstaged changes
- `git diff --cached` - see staged changes
- `git log --oneline -5` - see recent commit style

### 2. Create Meaningful Commits

Analyze changes and group them logically. Create separate commits when changes are unrelated (e.g., feature work vs. config changes vs. bug fixes).

For each logical group:
1. Stage relevant files: `git add <files>`
2. Commit with descriptive message using heredoc:
```bash
git commit -m "$(cat <<'EOF'
Brief summary of change

Optional longer description if needed.

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
```

Commit message guidelines:
- Use imperative mood ("Add feature" not "Added feature")
- First line: concise summary (<50 chars ideal)
- Match repository's existing commit style
- Never commit secrets (.env, credentials, API keys)

### 3. Rebase with Remote

```bash
git fetch origin
git rebase origin/<current-branch>
```

If rebase fails with conflicts, proceed to conflict resolution.

### 4. Resolve Conflicts

When conflicts occur:
1. Identify conflicted files: `git status`
2. Read each conflicted file to understand both versions
3. Edit to resolve (remove conflict markers, merge changes appropriately)
4. Stage resolved files: `git add <file>`
5. Continue rebase: `git rebase --continue`
6. Repeat until rebase completes

If rebase becomes too complex, ask user before using `git rebase --abort`.

### 5. Push

```bash
git push origin <current-branch>
```

If push is rejected (remote has new commits), repeat from step 3.

## Important

- Never force push unless explicitly requested
- Never skip hooks unless explicitly requested
- If unsure about grouping changes, ask the user
- Report final status: what was committed and pushed
