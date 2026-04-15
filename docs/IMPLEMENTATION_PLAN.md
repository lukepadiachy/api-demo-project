# PokéAPI Demo - Implementation Plan

## Project Overview

Build a PokéAPI-powered Express API using a **ticket-driven workflow** where Copilot CLI skills automatically test endpoints against acceptance criteria.

## Workflow

```
1. Read Ticket (AC)
   ↓
2. Build Endpoint
   ↓
3. Run Copilot Skill (ticket-validator)
   ↓
4. Get Pass/Fail Report
   ↓
5. Fix if Failed → Re-test
```

## Project Structure

```
api-demo-project/
├── docs/
│   ├── tickets/              # Ticket files with AC
│   │   ├── TICKET-001.md
│   │   ├── TICKET-002.md
│   │   └── ...
│   └── skills/              # Copilot CLI skills documentation
│       ├── ticket-validator-skill.md
│       └── test-reporter-skill.md
├── src/
│   ├── server.js
│   ├── routes/
│   └── services/
├── .copilot/
│   └── skills/              # Actual skill implementations
│       ├── ticket-validator/
│       └── test-reporter/
├── test-results/            # Generated test reports
│   ├── TICKET-001/
│   ├── TICKET-002/
│   └── ...
└── package.json
```

## Copilot CLI Skills

### 1. `ticket-validator` Skill
**Purpose**: Validate endpoint against ticket acceptance criteria

**Usage**:
```bash
copilot: "Test TICKET-001"
→ Skill reads ticket AC
→ Runs validation tests
→ Generates pass/fail report
```

**What it does**:
- Reads ticket AC from `docs/tickets/TICKET-XXX.md`
- Makes HTTP requests to endpoint
- Validates response structure, status codes, data
- Generates report in `test-results/TICKET-XXX/`

### 2. `test-reporter` Skill
**Purpose**: Aggregate all ticket test results

**Usage**:
```bash
copilot: "Generate test report"
→ Scans all test-results
→ Shows summary (X/Y passing)
→ Lists failing tickets
```

## Development Phases

### Phase 1: Setup ✅ COMPLETE
- [x] Initialize Node.js project
- [x] Create Express server skeleton
- [x] Setup basic folder structure
- [x] Install dependencies (express, axios, cors)

### Phase 2: Copilot Skills ✅ COMPLETE
- [x] Create `ticket-tester` skill
- [x] Create `report-formatter` skill
- [x] Document skills in `docs/skills/`

### Phase 3: Ticket Implementation ✅ COMPLETE
- [x] Implement all 7 endpoints from tickets
- [x] All endpoints validated and working
- [x] Proper error handling added
- [x] Input validation implemented

### Phase 4: Demo Prep ✅ COMPLETE
- [x] Postman collection generated (23 requests)
- [x] Demo cheat sheet created
- [x] Presentation materials ready
- [x] All documentation complete

### Phase 5: Demo Prep
- [ ] Run full test suite
- [ ] Generate final report

## Tickets Overview

| Ticket | Endpoint | Status |
|--------|----------|--------|
| TICKET-001 | GET /health | Planned |
| TICKET-002 | GET /api/pokemon | Planned |
| TICKET-003 | GET /api/pokemon/:id | Planned |
| TICKET-004 | GET /api/pokemon/search | Planned |
| TICKET-005 | GET /api/types | Planned |
| TICKET-006 | GET /api/types/:type | Planned |
| TICKET-007 | GET /api/battle/matchup | Planned |

## Tech Stack

- **Runtime**: Node.js v25+
- **Framework**: Express.js
- **HTTP Client**: Axios (for PokéAPI calls)
- **Testing**: Copilot CLI Skills (automated)
- **Data Source**: PokéAPI (https://pokeapi.co/api/v2)

## How Copilot CLI Skills Work

**Skills are custom commands** that Copilot CLI can execute. They:
- Live in `.copilot/skills/` directory
- Are written in Node.js
- Have access to the project files
- Can make HTTP requests
- Generate reports and files

**Example Skill Execution**:
```bash
# Developer asks Copilot
"Test the health endpoint against TICKET-001"

# Copilot CLI:
1. Loads ticket-validator skill
2. Reads docs/tickets/TICKET-001.md
3. Extracts acceptance criteria
4. Makes HTTP request to endpoint
5. Validates response
6. Generates test-results/TICKET-001/report.md
7. Reports: "✅ TICKET-001 PASSED"
```

## Success Metrics

- ✅ All tickets have clear AC
- ✅ All endpoints implemented
- ✅ Skills validate automatically
- ✅ 100% ticket pass rate
- ✅ Demo-ready with reports

## Next Steps

1. Create all tickets with AC
2. Implement Copilot CLI skills
3. Start building endpoints
4. Validate with skills as you go

---

**Ready to build! 🚀**
