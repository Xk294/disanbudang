# BASELINE SNAPSHOT — Di Sản Bù Đăng Zero-Trust Final Audit
> Captured: 2026-08-31 00:22–00:35 +07:00
> Auditor: Antigravity Zero-Trust Audit
> Method: Production HTTP + source code — không tin report cũ

## Git State

| Field | Value |
|---|---|
| Last commit | f20304b — feat: enhance explore curated trails |
| Uncommitted modified files | 47 |
| Uncommitted untracked files | 28 |
| Total drift from HEAD | **75 files UNDEPLOYED** |

## Route HTTP Status (Production)

| Route | Status | Notes |
|---|---|---|
| / | 200 | OK |
| /about/ | 200 | OK (308 redirect) |
| /explore/ | 200 | OK |
| /heritage/can-cu-nua-lon-bu-dang/ | 200 | URL resolves BUT content missing from HTML |
| /map/ | 200 | OK |
| /study/ | 200 | OK |
| /invest/ | 200 | OK |
| /contribute/ | 200 | OK |
| /stories/ | 404 | NOT DEPLOYED |
| /journal/ | 404 | NOT DEPLOYED |
| /heritage/ | 404 | NOT DEPLOYED |
| /stories/canh-thut-doc-ban-stieng-bu-dang/ | 404 | NOT DEPLOYED |
| /journal/event-001/ | 404 | NOT DEPLOYED |

## SSR Evidence

| Page | H1 | Title | Body Content | Verdict |
|---|---|---|---|---|
| / | 1 | Correct | 333KB | PASS |
| /about/ | 1 | Correct | OK | PASS |
| /explore/ | 1 | Correct | No heritage cards | PARTIAL |
| /map/ | 1 | Correct | OK | PASS |
| /study/ | 1 | Correct | 238KB | PASS |
| /invest/ | 1 | Correct | OK | PASS |
| /heritage/can-cu-nua-lon-bu-dang/ | 0 H1 | Correct title | NO SECTIONS / NO HERO / NO CONTENT | FAIL |

## Sitemap
- Total URLs: 47
- Heritage: 16 OK
- Stories: 0 (not deployed)
- Journal: 0 (not deployed)
