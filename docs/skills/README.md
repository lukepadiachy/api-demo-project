# Copilot CLI Skills Documentation

This directory contains documentation for all custom Copilot CLI skills used in this project.

## 📍 Skill Locations

**Active Skills** (used by Copilot CLI):
- `.github/skills/ticket-tester/SKILL.md`
- `.github/skills/report-formatter/SKILL.md`

**Documentation Copies** (for reference):
- `docs/skills/ticket-tester.md`
- `docs/skills/report-formatter.md`

## 🛠️ Available Skills

### 1. ticket-tester
**Purpose**: Validate API endpoints against ticket acceptance criteria

**Usage**:
- "Test TICKET-001"
- "Test all tickets"
- "Generate test report"

**What it does**:
- Reads ticket AC from `docs/tickets/`
- Makes HTTP requests to endpoints
- Validates responses against requirements
- Generates pass/fail reports in `test-results/`

**Output**:
- Individual: `test-results/TICKET-XXX/report.md`
- Summary: `test-results/SUMMARY.md`

---

### 2. report-formatter
**Purpose**: Convert Markdown reports to professional PDF/HTML documents

**Usage**:
- "Convert test reports to PDF"
- "Generate PDF for TICKET-001"
- "Format the summary as PDF"

**What it does**:
- Installs `md-to-pdf` tool
- Converts Markdown reports to PDF
- Applies professional styling
- Creates presentation-ready documents

**Output**:
- PDFs: `test-results/TICKET-XXX/report.pdf`
- Summary: `test-results/SUMMARY.pdf`

---

## 📚 How Skills Work

### Skill Structure
```
.github/skills/
└── skill-name/
    └── SKILL.md          # YAML frontmatter + Markdown
```

### SKILL.md Format
```markdown
---
name: skill-name
description: What this skill does and when to use it
---

# Skill Name

Instructions for Copilot on how to execute this skill...
```

### Copilot Loads Skills Automatically
- Copilot CLI scans `.github/skills/` directory
- Loads skills based on YAML frontmatter
- Matches user requests to skill descriptions
- Executes skill instructions

## 🎯 Creating New Skills

1. **Create directory**: `.github/skills/my-skill/`
2. **Create SKILL.md** with YAML frontmatter
3. **Write instructions** for what Copilot should do
4. **Test it**: Ask Copilot to use the skill

### Example Template
```markdown
---
name: my-skill
description: Brief description of when to use this skill
---

# My Skill

## Usage
- "Example command 1"
- "Example command 2"

## What I'll Do
1. Step 1
2. Step 2
3. Step 3

## Commands I'll Use
\`\`\`bash
# Commands here
\`\`\`
```

## 📖 Skill Documentation

For detailed skill documentation, see:
- [ticket-tester.md](./ticket-tester.md) - Testing and validation
- [report-formatter.md](./report-formatter.md) - PDF/HTML generation

## 🔗 Official Resources

- [GitHub Copilot CLI Skills Documentation](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-skills)
- [Skill Creation Guide](https://smartscope.blog/en/generative-ai/github-copilot/github-copilot-skills-guide/)

---

**Note**: Skills in `.github/skills/` are the active ones. Files in `docs/skills/` are copies for reference only.
