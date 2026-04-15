---
name: report-formatter
description: Convert Markdown test reports to beautiful PDF or HTML documents. Use when asked to format reports, generate PDFs, create presentation documents, or export test results for sharing.
---

# Report Formatter Skill

Convert Markdown test reports into professional PDF or HTML documents perfect for presentations, sharing with stakeholders, or printing.

## Usage

- "Convert test reports to PDF"
- "Generate PDF for TICKET-001 report"
- "Format the summary as PDF"
- "Create HTML version of all reports"
- "Make presentation-ready documents"

## What I'll Do

1. **Install conversion tools** (if needed):
   ```bash
   npm install --save-dev md-to-pdf
   ```

2. **Convert Markdown to PDF/HTML**:
   - Individual reports: `test-results/TICKET-XXX/report.md` → `report.pdf`
   - Summary: `test-results/SUMMARY.md` → `SUMMARY.pdf`
   - All reports in one command

3. **Apply professional styling**:
   - Clean typography
   - Color-coded pass/fail indicators
   - Syntax-highlighted code blocks
   - Print-optimized layout

## Commands I'll Use

### Convert Single Report to PDF
```bash
npx md-to-pdf test-results/TICKET-001/report.md
```

### Convert All Reports to PDF
```bash
find test-results -name "report.md" -o -name "SUMMARY.md" | while read file; do
  npx md-to-pdf "$file"
done
```

### Convert to HTML (alternative)
```bash
npx markdown-it test-results/TICKET-001/report.md > test-results/TICKET-001/report.html
```

## Custom Styling

I'll create a config file for beautiful PDFs:

```javascript
// .md-to-pdf-config.js
module.exports = {
  css: `
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      max-width: 210mm;
      margin: 0 auto;
      padding: 20mm;
      line-height: 1.6;
      color: #333;
    }
    h1 {
      color: #2c3e50;
      border-bottom: 3px solid #3498db;
      padding-bottom: 10px;
      margin-bottom: 20px;
    }
    h2 {
      color: #34495e;
      margin-top: 30px;
      border-bottom: 1px solid #ddd;
      padding-bottom: 5px;
    }
    h3 {
      color: #555;
      margin-top: 20px;
    }
    code {
      background: #f4f4f4;
      padding: 2px 6px;
      border-radius: 3px;
      font-family: "Monaco", "Courier New", monospace;
      font-size: 0.9em;
    }
    pre {
      background: #f8f8f8;
      border: 1px solid #ddd;
      padding: 15px;
      border-radius: 5px;
      overflow-x: auto;
    }
    pre code {
      background: none;
      padding: 0;
    }
    table {
      border-collapse: collapse;
      width: 100%;
      margin: 20px 0;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 12px;
      text-align: left;
    }
    th {
      background: #3498db;
      color: white;
      font-weight: 600;
    }
    tr:nth-child(even) {
      background: #f9f9f9;
    }
    strong {
      color: #2c3e50;
    }
    /* Pass/Fail styling */
    *:contains("✅") {
      color: #27ae60;
    }
    *:contains("❌") {
      color: #e74c3c;
    }
  `,
  pdf_options: {
    format: 'A4',
    margin: {
      top: '20mm',
      right: '20mm',
      bottom: '20mm',
      left: '20mm'
    },
    printBackground: true,
    displayHeaderFooter: false
  }
};
```

## Example Workflow

**You ask:** "Convert test reports to PDF"

**I do:**
1. Check if md-to-pdf is installed
2. Install if needed: `npm install --save-dev md-to-pdf`
3. Create styling config: `.md-to-pdf-config.js`
4. Find all Markdown reports
5. Convert each to PDF:
   ```
   ✅ test-results/TICKET-001/report.pdf
   ✅ test-results/TICKET-002/report.pdf
   ✅ test-results/TICKET-003/report.pdf
   ✅ test-results/SUMMARY.pdf
   ```
6. Report: "📄 Generated 8 PDF documents in test-results/"

## Output Structure

```
test-results/
├── TICKET-001/
│   ├── report.md           ← Original Markdown
│   ├── report.pdf          ← ✨ Generated PDF
│   └── report.html         ← Optional HTML
├── TICKET-002/
│   ├── report.md
│   └── report.pdf
├── SUMMARY.md
└── SUMMARY.pdf             ← ✨ Main summary PDF
```

## Demo Flow (Perfect for Presentation!)

```bash
# 1. Run tests
"Test all tickets"

# 2. Generate summary
"Generate test report"

# 3. Convert to PDF
"Convert test reports to PDF"

# 4. Open and show
open test-results/SUMMARY.pdf
```

**Audience sees:**
- Professional PDF report
- Color-coded results
- Clean formatting
- Ready to print/share

## Features

✅ **Professional appearance**
✅ **Batch processing** - all reports at once
✅ **Color-coded** - pass/fail indicators
✅ **Print-ready** - A4 format with margins
✅ **No manual formatting** - fully automated
✅ **Shareable** - email-ready PDFs

## Notes

- Uses Puppeteer (headless Chrome) for PDF generation
- First run downloads Chrome (~100MB) - only once
- Fast conversion after initial setup
- Works offline after setup
- PDFs preserve all Markdown formatting
- Can customize styling per project

---

**This makes your demo super impressive - from code to professional reports in seconds!** 🚀
