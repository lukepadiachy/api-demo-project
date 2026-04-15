---
name: ticket-tester
description: Test API endpoints against ticket acceptance criteria and generate reports. Use when asked to test tickets, validate endpoints, check implementation, or generate test summaries.
---

# Ticket Tester Skill

This skill validates API endpoints against ticket acceptance criteria and generates comprehensive test reports. It can test individual tickets or generate summary reports for all tickets.

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

### Mode 1: Test Individual Ticket
1. **Read the ticket** from `docs/tickets/TICKET-XXX.md`
2. **Extract acceptance criteria** (all AC sections)
3. **Make HTTP requests** to test the endpoint
4. **Validate responses** against expected:
   - Status codes
   - Response structure (fields present)
   - Data types
   - Values and ranges
5. **Generate report** at `test-results/TICKET-XXX/report.md` with:
   - Pass/Fail for each AC
   - Details of failures
   - HTTP request/response samples
   - Timestamp

### Mode 2: Generate Summary Report
1. **Scan** `test-results/` directory for all ticket reports
2. **Extract** pass/fail status from each report
3. **Aggregate** results and calculate metrics
4. **Generate** `test-results/SUMMARY.md` with:
   - Total tickets tested
   - Pass/fail counts and percentages
   - Table of all tickets with status
   - Details of failed tickets
   - Recommendations for fixes

## Testing Approach

### For each Acceptance Criteria:

**AC: Response Structure**
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
- Measure response time
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
**Status**: ✅ PASSED | ❌ FAILED

## Summary
- Total AC: X
- Passed: Y
- Failed: Z

## Detailed Results

### AC1: [Description]
**Status**: ✅ PASSED

**Test**:
```bash
curl -X GET http://localhost:3000/health
```

**Response**:
```json
{
  "status": "healthy",
  "timestamp": "2026-04-15T20:08:00.000Z"
}
```

**Validation**:
- ✅ Status code: 200
- ✅ Field 'status' exists
- ✅ Field 'timestamp' exists
- ✅ Response time: 12ms (< 50ms requirement)

---

### AC2: [Description]
**Status**: ❌ FAILED

**Test**:
```bash
curl -X GET http://localhost:3000/api/pokemon/999999
```

**Expected**: 404 status
**Actual**: 500 status

**Failure Details**:
- ❌ Expected status 404, got 500
- Server error instead of proper not-found handling

---

## Recommendations

[If failed, suggest fixes]
```

## Commands I'll Use

```bash
# Start server (if not running)
curl -s http://localhost:3000/health || echo "Server not running"

# Test endpoint
curl -X GET http://localhost:3000/api/endpoint -w "\nStatus: %{http_code}\nTime: %{time_total}s\n"

# Test with data
curl -X POST http://localhost:3000/api/endpoint \
  -H "Content-Type: application/json" \
  -d '{"test": "data"}'

# Create report directory
mkdir -p test-results/TICKET-XXX

# Write report
cat > test-results/TICKET-XXX/report.md << EOF
[report content]
EOF
```

## Example Workflow

When you ask: **"Test TICKET-001"**

I will:
1. Read `docs/tickets/TICKET-001.md`
2. See it's the health endpoint (`GET /health`)
3. Extract AC1, AC2, AC3
4. Run tests:
   - `curl http://localhost:3000/health`
   - Check response structure
   - Measure response time
   - Test without auth
5. Generate `test-results/TICKET-001/report.md`
6. Tell you: "✅ TICKET-001 PASSED - All 3 acceptance criteria met"

Or if failed:
"❌ TICKET-001 FAILED - 1 of 3 acceptance criteria failed. Check test-results/TICKET-001/report.md"

## Notes

- Server must be running on `http://localhost:3000`
- Tests are read-only (won't modify data)
- Reports are timestamped
- Previous reports are overwritten

---

## Summary Report Format

When you ask for a test summary, I'll generate:

```markdown
# Test Summary Report

**Generated**: 2026-04-15T20:13:00.000Z
**Total Tickets**: 7
**Passed**: 5 ✅
**Failed**: 2 ❌
**Pass Rate**: 71%

## Status by Ticket

| Ticket | Endpoint | Status | AC Passed | Last Tested |
|--------|----------|--------|-----------|-------------|
| TICKET-001 | GET /health | ✅ PASSED | 3/3 | 2026-04-15 |
| TICKET-002 | GET /api/pokemon | ✅ PASSED | 6/6 | 2026-04-15 |
| TICKET-003 | GET /api/pokemon/:id | ❌ FAILED | 5/6 | 2026-04-15 |

## Failed Tickets

### TICKET-003: Get Single Pokémon Details
**Issue**: Returns 500 instead of 404 for non-existent Pokémon
**Fix**: Add proper error handling

## Recommendations
1. Fix error handling in TICKET-003
2. Re-test after fixes
```

## Commands for Summary

```bash
# List all results
ls -1 test-results/ | grep "TICKET-"

# Generate summary
cat > test-results/SUMMARY.md
```

## Example Outputs

**Individual Test:**
```
✅ TICKET-001 PASSED
All 3 acceptance criteria met.
Report: test-results/TICKET-001/report.md
```

**Summary:**
```
📊 Test Summary

Total: 7 | ✅ 5 Passed (71%) | ❌ 2 Failed

Failed: TICKET-003, TICKET-006
Full report: test-results/SUMMARY.md
```
