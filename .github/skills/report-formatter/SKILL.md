---
name: report-formatter
description: Convert Markdown test reports to professional PDF documents. Use when asked to format reports, generate PDFs, create presentation documents, or export test results for sharing.
allowed-tools:
  - bash
  - glob
  - view
---

# Report Formatter Skill

Convert Markdown test reports into professional PDF documents perfect for presentations, sharing with stakeholders, or printing.

## Usage

- "Convert test reports to PDF"
- "Generate PDF for TICKET-001 report"
- "Format the summary as PDF"
- "Make presentation-ready documents"

## What I'll Do

This skill delegates PDF generation work to the **report-formatter** agent for execution.

### Workflow

1. **Delegate to the `report-formatter` agent** to handle conversion:
   - Agent installs `md-to-pdf` if needed
   - Agent creates professional styling config
   - Agent converts all Markdown reports to PDF
   - Agent verifies output files exist

#### Agent Delegation

```
Use the report-formatter agent to convert test reports to PDF.
Convert all Markdown files in test-results/ to professionally styled PDFs.
Verify each PDF was created successfully.
```

### Conversion Commands

```bash
# Install conversion tool (if needed)
npm install --save-dev md-to-pdf

# Convert single report
npx md-to-pdf test-results/TICKET-001/report.md

# Convert all reports
find test-results -name "report.md" -o -name "SUMMARY.md" | while read file; do
  npx md-to-pdf "$file"
done

# Open result on macOS
open test-results/SUMMARY.pdf
```

## Styling

The agent creates `.md-to-pdf-config.js` for consistent professional styling:
- Clean typography with system fonts
- Color-coded pass/fail indicators
- Syntax-highlighted code blocks
- A4 print-optimized layout with proper margins
- Styled tables with alternating row colors

## Output Structure

```
test-results/
  TICKET-001/
    report.md           <- Original Markdown
    report.pdf          <- Generated PDF
  TICKET-002/
    report.md
    report.pdf
  SUMMARY.md
  SUMMARY.pdf           <- Main summary PDF
```

## Demo Flow

```bash
# 1. Run tests (uses ticket-tester skill + postman-tester agent)
"Test all tickets"

# 2. Generate summary
"Generate test report"

# 3. Convert to PDF (uses this skill + report-formatter agent)
"Convert test reports to PDF"

# 4. Open and present
open test-results/SUMMARY.pdf
```

## Notes

- Uses Puppeteer (headless Chrome) for PDF generation via md-to-pdf
- First run downloads Chromium (~100MB) - only once
- Fast conversion after initial setup
- Works offline after setup
- PDFs preserve all Markdown formatting including tables and code blocks
