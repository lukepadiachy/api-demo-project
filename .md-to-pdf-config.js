module.exports = {
  css: `
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      max-width: 210mm;
      margin: 0 auto;
      padding: 20mm;
      line-height: 1.6;
      color: #333;
      font-size: 11pt;
    }
    
    h1 {
      color: #2c3e50;
      border-bottom: 3px solid #3498db;
      padding-bottom: 10px;
      margin-top: 0;
      font-size: 28pt;
      font-weight: 700;
    }
    
    h2 {
      color: #34495e;
      margin-top: 30px;
      border-bottom: 2px solid #bdc3c7;
      padding-bottom: 8px;
      font-size: 20pt;
      font-weight: 600;
    }
    
    h3 {
      color: #555;
      margin-top: 20px;
      font-size: 16pt;
      font-weight: 600;
    }
    
    h4 {
      color: #666;
      margin-top: 15px;
      font-size: 13pt;
      font-weight: 600;
    }
    
    /* Pass/Fail indicators */
    strong:contains("PASSED"),
    em:contains("PASSED"),
    *:contains("✅") {
      color: #27ae60;
      font-weight: 700;
    }
    
    strong:contains("FAILED"),
    em:contains("FAILED"),
    *:contains("❌") {
      color: #e74c3c;
      font-weight: 700;
    }
    
    /* Code styling */
    code {
      background: #f4f4f4;
      padding: 2px 6px;
      border-radius: 3px;
      font-size: 0.9em;
      font-family: "SF Mono", "Monaco", "Inconsolata", "Roboto Mono", "Courier New", monospace;
      color: #e74c3c;
      border: 1px solid #e1e4e8;
    }
    
    pre {
      background: #f8f8f8;
      border: 1px solid #ddd;
      padding: 15px;
      border-radius: 5px;
      overflow-x: auto;
      font-size: 10pt;
      line-height: 1.4;
    }
    
    pre code {
      background: none;
      padding: 0;
      color: #333;
      border: none;
    }
    
    /* Table styling */
    table {
      border-collapse: collapse;
      width: 100%;
      margin: 20px 0;
      font-size: 10pt;
      box-shadow: 0 2px 3px rgba(0,0,0,0.1);
    }
    
    th {
      background: #3498db;
      color: white;
      font-weight: 600;
      padding: 12px;
      text-align: left;
      border: 1px solid #2980b9;
    }
    
    td {
      border: 1px solid #ddd;
      padding: 10px 12px;
      text-align: left;
    }
    
    tr:nth-child(even) {
      background: #f9f9f9;
    }
    
    tr:hover {
      background: #f0f7ff;
    }
    
    /* Lists */
    ul, ol {
      margin: 10px 0;
      padding-left: 25px;
    }
    
    li {
      margin: 5px 0;
    }
    
    /* Blockquotes */
    blockquote {
      border-left: 4px solid #3498db;
      padding-left: 15px;
      margin: 15px 0;
      color: #555;
      font-style: italic;
      background: #f9f9f9;
      padding: 10px 15px;
    }
    
    /* Links */
    a {
      color: #3498db;
      text-decoration: none;
    }
    
    a:hover {
      text-decoration: underline;
    }
    
    /* Horizontal rules */
    hr {
      border: none;
      border-top: 2px solid #ecf0f1;
      margin: 30px 0;
    }
    
    /* Print optimizations */
    @media print {
      body {
        padding: 15mm;
      }
      
      h1, h2, h3 {
        page-break-after: avoid;
      }
      
      table, pre, blockquote {
        page-break-inside: avoid;
      }
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
    displayHeaderFooter: false,
    preferCSSPageSize: true
  }
};
