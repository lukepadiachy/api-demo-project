# PokéAPI Demo Project

A demonstration project showcasing GitHub Copilot CLI's **custom skills** for automated ticket-based API testing. Build endpoints from tickets, then use Copilot skills to validate them automatically.

## 🎯 Project Purpose

This project demonstrates:
- **Ticket-driven development** with acceptance criteria
- **Copilot CLI Skills** that validate endpoints against tickets
- **Automated test reporting** without writing test code
- **Real-world workflow** for API development

## 🏗️ Workflow

```
1. Read Ticket (AC) → 2. Build Endpoint → 3. Ask Copilot to Test → 4. Get Report → 5. Fix & Repeat
```

### Core Components

1. **Tickets** (`docs/tickets/`) - Feature specs with acceptance criteria
2. **Express API** - Endpoints built from ticket requirements  
3. **Copilot Skills** (`.github/skills/`) - Auto-validate endpoints
4. **Test Reports** (`test-results/`) - Pass/fail reports per ticket

## 📚 Documentation

- **[Implementation Plan](./docs/IMPLEMENTATION_PLAN.md)** - Project roadmap and workflow
- **Tickets** (`docs/tickets/TICKET-*.md`) - 7 tickets with acceptance criteria
- **Skills** (`.github/skills/`) - Copilot CLI skills for testing

## 🚀 Quick Start

> **Note**: Project is currently in planning phase. Implementation coming soon.

### Prerequisites

- Node.js v25+ 
- npm v11+
- Postman CLI (`postman` command)

### Installation (When Implemented)

```bash
# Install dependencies
npm install

# Start the server
npm start
# Server runs on http://localhost:3000

# Stop the server
# Press Ctrl+C in the terminal
```

**Note**: The server starts in foreground mode. No PID files are created.

## 🎮 Tickets & Endpoints

| Ticket | Endpoint | Status |
|--------|----------|--------|
| TICKET-001 | `GET /health` | Planned |
| TICKET-002 | `GET /api/pokemon` | Planned |
| TICKET-003 | `GET /api/pokemon/:id` | Planned |
| TICKET-004 | `GET /api/pokemon/search` | Planned |
| TICKET-005 | `GET /api/types` | Planned |
| TICKET-006 | `GET /api/types/:type` | Planned |
| TICKET-007 | `GET /api/battle/matchup` | Planned |
| TICKET-008 | `GET /api/pokemon/random` | Implemented |

See `docs/tickets/` for full acceptance criteria.

## 🛠️ Copilot CLI Skill

### `ticket-tester`
**What it does**: 
- Tests endpoints against ticket acceptance criteria
- Generates individual test reports
- Creates summary reports of all tests

**Usage**: 
- "Test TICKET-001" → Individual test
- "Test all tickets" → Test everything
- "Generate test report" → Summary of results

**Output**: 
- `test-results/TICKET-XXX/report.md` (individual)
- `test-results/SUMMARY.md` (summary)

The skill is in `.github/skills/ticket-tester/SKILL.md`

## 🧪 Testing with Copilot Skills

No test code needed! Just ask Copilot:

```bash
# Test a single ticket
"Test TICKET-001"

# Test all tickets
"Test TICKET-001 through TICKET-007"

# Get summary
"Generate test report"
```

Copilot reads the ticket AC and validates automatically!

## 📊 Project Status

**Current Phase**: Ready to Build

- [x] 7 tickets created with AC
- [x] 1 Copilot skill created (ticket-tester)
- [x] Git repository initialized
- [ ] Build endpoints from tickets
- [ ] Validate with Copilot skill
- [ ] Fix failures and iterate
- [ ] Demo presentation

See **[Implementation Plan](./docs/IMPLEMENTATION_PLAN.md)** for workflow details.

## 🎬 Demo Flow (For Presentation)

1. **Show a ticket with AC**
   ```bash
   cat docs/tickets/TICKET-001.md
   ```

2. **Build the endpoint** (live coding or show existing)

3. **Ask Copilot to test it**
   ```
   "Test TICKET-001"
   ```

4. **Copilot generates report**
   ```bash
   cat test-results/TICKET-001/report.md
   ```

5. **Show aggregate summary**
   ```
   "Generate test report"
   cat test-results/SUMMARY.md
   ```

## 🔑 Key Takeaways for Presentation

1. **No test code needed** - Copilot reads tickets and tests automatically
2. **Ticket-driven workflow** - AC = automated tests
3. **Custom skills are simple** - Just Markdown files with YAML frontmatter
4. **Real-world pattern** - Mirrors actual development workflows

## 📦 Technology Stack

- **Runtime**: Node.js v25+
- **Framework**: Express.js
- **HTTP Client**: Axios (for PokéAPI)
- **Testing**: Copilot CLI Skills (automated)
- **Data Source**: PokéAPI (https://pokeapi.co)

## 🤝 Contributing

This is a demo project for presentation purposes.

## 📄 License

MIT

---

**Built with ❤️ using GitHub Copilot CLI**
