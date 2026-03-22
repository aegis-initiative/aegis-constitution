#!/usr/bin/env python3
"""
Update the releases index page with today's release entry.

Scans git tags for the current day and adds/updates an entry in
src/content/docs/releases/index.md.

Reads configuration from environment variables:
  ANTHROPIC_API_KEY — optional, for generating a summary from commit messages

Uses git tags and commit log to determine what was released today.
"""

import os
import re
import subprocess
import sys
from datetime import datetime, timezone


def run(cmd):
    result = subprocess.run(cmd, capture_output=True, text=True, shell=True)
    return result.stdout.strip()


def get_today_tags():
    """Find all CalVer tags for today."""
    now = datetime.now(timezone.utc)
    year = now.strftime("%y")
    month = str(now.month)
    day = str(now.day)
    prefix = f"v{year}.{month}.{day}"

    all_tags = run("git tag --list 'v*'").split("\n")
    today_tags = [t for t in all_tags if t == prefix or t.startswith(prefix + ".")]
    return sorted(today_tags), year, month, day


def get_commits_for_tags(tags):
    """Get commit messages between the tag before the first today-tag and the last today-tag."""
    if not tags:
        return ""

    # Find the tag before our first tag
    first_tag = tags[0]
    last_tag = tags[-1]

    prev_tag = run(f"git describe --tags --abbrev=0 {first_tag}^ 2>/dev/null || echo ''")

    if prev_tag:
        commits = run(f'git log --pretty=format:"- %s" {prev_tag}..{last_tag}')
    else:
        commits = run(f'git log --pretty=format:"- %s" {last_tag}')

    # Filter out release notes commits
    lines = commits.split("\n")
    filtered = [l for l in lines if not l.startswith("- docs: release notes for")]
    return "\n".join(filtered)


def generate_summary(commits):
    """Generate a one-line summary from commits using Claude API, or fall back to first commit."""
    api_key = os.environ.get("ANTHROPIC_API_KEY", "")

    if not api_key or not commits.strip():
        # Fall back to first non-trivial commit message
        lines = [l.lstrip("- ").strip() for l in commits.split("\n") if l.strip()]
        meaningful = [l for l in lines if not l.startswith("docs:") and not l.startswith("chore:")]
        if meaningful:
            return meaningful[0][:80]
        elif lines:
            return lines[0][:80]
        return "Updates and improvements"

    import json
    import urllib.request

    payload = {
        "model": "claude-sonnet-4-20250514",
        "max_tokens": 100,
        "messages": [
            {
                "role": "user",
                "content": (
                    "Summarize these git commits into a single concise phrase (under 80 chars) "
                    "for a release notes index. No period at the end. Return ONLY the phrase, "
                    "nothing else.\n\nCommits:\n" + commits
                ),
            }
        ],
    }

    req = urllib.request.Request(
        "https://api.anthropic.com/v1/messages",
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "x-api-key": api_key,
            "anthropic-version": "2023-06-01",
            "content-type": "application/json",
        },
    )

    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            return data["content"][0]["text"].strip()
    except Exception as e:
        print(f"Warning: Claude API call failed ({e}), using fallback", file=sys.stderr)
        lines = [l.lstrip("- ").strip() for l in commits.split("\n") if l.strip()]
        return lines[0][:80] if lines else "Updates and improvements"


def update_index(year, month, day, tag, summary):
    """Update the releases index file."""
    index_path = "src/content/docs/releases/index.md"

    if not os.path.exists(index_path):
        print(f"Error: {index_path} not found", file=sys.stderr)
        sys.exit(1)

    with open(index_path, "r") as f:
        content = f.read()

    # The base tag for today (without build suffix)
    base_tag = f"v{year}.{month}.{day}"
    # Anchor format used in the monthly file
    anchor_tag = base_tag.replace(".", "")
    entry_line = f"- [{base_tag}](/releases/{year}/{month}/#release--{anchor_tag}) — {summary}"

    # Check if today's entry already exists
    entry_pattern = re.compile(rf"- \[{re.escape(base_tag)}\].*")
    if entry_pattern.search(content):
        # Update existing entry
        content = entry_pattern.sub(entry_line, content)
        print(f"Updated existing entry for {base_tag}")
    else:
        # Need to add new entry
        year_full = datetime.now(timezone.utc).strftime("%Y")
        month_name = datetime.now(timezone.utc).strftime("%B")
        month_header = f"### [{month_name}](/releases/{year}/{month}/)"
        year_header = f"## {year_full}"

        if month_header in content:
            # Add after the month header line
            pos = content.index(month_header) + len(month_header)
            # Find the next newline after the header
            next_nl = content.index("\n", pos)
            # Insert after the blank line following the header
            insert_pos = next_nl + 1
            # Skip blank line if present
            if insert_pos < len(content) and content[insert_pos] == "\n":
                insert_pos += 1
            content = content[:insert_pos] + entry_line + "\n" + content[insert_pos:]
            print(f"Added new entry for {base_tag} under {month_name}")
        elif year_header in content:
            # New month — add month header and entry after year header
            pos = content.index(year_header) + len(year_header)
            next_nl = content.index("\n", pos)
            insert = f"\n\n{month_header}\n\n{entry_line}\n"
            content = content[: next_nl + 1] + insert + content[next_nl + 1 :]
            print(f"Added new month {month_name} with entry for {base_tag}")
        else:
            # New year — add year and month headers
            # Find the end of frontmatter
            fm_end = content.index("---", content.index("---") + 3) + 3
            insert = f"\n\n{year_header}\n\n{month_header}\n\n{entry_line}\n"
            content = content[:fm_end] + insert + content[fm_end:]
            print(f"Added new year {year_full} with entry for {base_tag}")

    with open(index_path, "w") as f:
        f.write(content)

    return index_path


def main():
    tags, year, month, day = get_today_tags()

    if not tags:
        print("No tags found for today. Nothing to update.")
        sys.exit(0)

    print(f"Found {len(tags)} tag(s) for today: {', '.join(tags)}")

    commits = get_commits_for_tags(tags)
    print(f"Commits:\n{commits}\n")

    summary = generate_summary(commits)
    print(f"Summary: {summary}")

    path = update_index(year, month, day, tags[-1], summary)
    print(f"Updated: {path}")


if __name__ == "__main__":
    main()
