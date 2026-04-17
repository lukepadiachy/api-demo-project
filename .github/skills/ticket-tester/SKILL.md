---
name: ticket-tester
description: Test API endpoints against ticket acceptance criteria using the Postman CLI and generate reports. Use when asked to test tickets, validate endpoints, check implementation, or generate test summaries.
allowed-tools:
  - bash
  - grep
  - glob
  - view
---

# Ticket Tester Skill

Validates API endpoints against ticket acceptance criteria using the **Postman CLI** and generates comprehensive test reports. Can test individual tickets or generate summary reports for all tickets.

## Usage

### Test Individual Tickets
- "Test TICKET-001"
- "Validate the health endpoint"
- "Check if TICKET-003 is passing"
- "Test all tickets"

### Generate Summary Reports
- "Generate test report"
- "Show me the test summary"
- "Which tickets are failing?"
- "What's the overall test status?"

## What I'll Do

This skill delegates testing work to the **postman-tester** agent for execution.

### Mode 1: Test Individual Ticket

1. **Read the ticket** from `docs/tickets/TICKET-XXX.md`
2. **Extract acceptance criteria** (all AC sections)
3. **Delegate to the `postman-tester` agent** to execute tests:
   - The agent uses `postman request` to test each endpoint
   - Validates responses against expected status codes, structure, data types, values
   - Measures response times against AC requirements
4. **Generate report** at `test-results/TICKET-XXX/report.md`

#### Postman CLI Commands Used

```bash
# Test a GET endpoint
postman request GET http://localhost:3000/health --response-only

# Test a POST endpoint with body
postman request POST http://localhost:3000/api/pokemon \
  --body '{"name": "Pikachu", "type": "Electric"}' \
  --response-only

# Test error scenarios
postman request GET http://localhost:3000/api/pokemon/999999 --response-only

# Run a full Postman collection (if available)
postman collection run <collectionId-or-path> \
  --env-var "baseUrl=http://localhost:3000" \
  -r cli,json \
  --reporter-json-export ./test-results/results.json \
  --verbose
```

### Mode 2: Generate Summary Report

1. **Scan** `test-results/` directory for all ticket reports
2. **Extract** pass/fail status from each report
3. **Aggregate** results and calculate metrics
4. **Generate** `test-results/SUMMARY.md`

## Agent Delegation

When testing tickets, delegate to the `postman-tester` agent:

```
Use the postman-tester agent to test TICKET-XXX against its acceptance criteria.
Read docs/tickets/TICKET-XXX.md for the acceptance criteria.
Use postman request to test each AC.
Write results to test-results/TICKET-XXX/report.md.
```

When testing all tickets, spin up the `postman-tester` agent for each ticket or batch them.

## Testing Approach

### For each Acceptance Criteria:

**AC: Response Structure**
- Use `postman request` with `--response-only` to get the response
- Check all required fields exist
- Verify correct data types
- Validate nested objects/arrays

**AC: Status Codes**
- Test expected success codes (200, 201, etc.)
- Test error scenarios (400, 404, 500)

**AC: Data Validation**
- Check value ranges
- Verify enums/constants
- Validate formats (ISO dates, URLs, etc.)

**AC: Performance**
- Measure response time from Postman CLI output
- Compare against AC requirements

**AC: Edge Cases**
- Test with invalid inputs
- Test with missing parameters
- Test boundary conditions

## Report Format

```markdown
# TICKET-XXX Validation Report

**Ticket**: TICKET-XXX
**Endpoint**: GET /api/endpoint
**Tested At**: 2026-04-15T20:08:00.000Z
**Tool**: Postman CLI v1.33.6
**Status**: PASSED | FAILED

## Summary
- Total AC: X
- Passed: Y
- Failed: Z

## Detailed Results

### AC1: [Description]
**Status**: PASSED

**Command**:
postman request GET http://localhost:3000/health --response-only

**Response**:
{
  "status": "healthy",
  "timestamp": "2026-04-15T20:08:00.000Z"
}

**Validation**:
- Status code: 200
- Field 'status' exists
- Field 'timestamp' exists
- Response time: 12ms (< 50ms requirement)

---

### AC2: [Description]
**Status**: FAILED

**Command**:
postman request GET http://localhost:3000/api/pokemon/999999 --response-only

**Expected**: 404 status
**Actual**: 500 status

**Failure Details**:
- Expected status 404, got 500
- Server error instead of proper not-found handling

---

## Recommendations
[If failed, suggest fixes]
```

## Summary Report Format

```markdown
# Test Summary Report

**Generated**: 2026-04-15T20:13:00.000Z
**Tool**: Postman CLI v1.33.6
**Total Tickets**: 7
**Passed**: 5
**Failed**: 2
**Pass Rate**: 71%

## Status by Ticket

| Ticket | Endpoint | Status | AC Passed | Last Tested |
|--------|----------|--------|-----------|-------------|
| TICKET-001 | GET /health | PASSED | 3/3 | 2026-04-15 |
| TICKET-002 | GET /api/pokemon | PASSED | 6/6 | 2026-04-15 |
| TICKET-003 | GET /api/pokemon/:id | FAILED | 5/6 | 2026-04-15 |

## Failed Tickets

### TICKET-003: Get Single Pokemon Details
**Issue**: Returns 500 instead of 404 for non-existent Pokemon
**Fix**: Add proper error handling

## Recommendations
1. Fix error handling in TICKET-003
2. Re-test after fixes
```

## Example Workflow

When you ask: **"Test TICKET-001"**

1. Read `docs/tickets/TICKET-001.md`
2. Delegate to the `postman-tester` agent
3. Agent runs: `postman request GET http://localhost:3000/health --response-only`
4. Agent validates response against AC1, AC2, AC3
5. Agent writes `test-results/TICKET-001/report.md`
6. Report back: "TICKET-001 PASSED - All 3 acceptance criteria met"

## Notes

- Server must be running on `http://localhost:3000`
- All endpoint tests use `postman request` (Postman CLI), not curl
- Collection tests use `postman collection run` when a collection file is available
- Tests are read-only (won't modify data)
- Reports are timestamped and overwrite previous runs
