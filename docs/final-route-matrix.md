# Ma Trận Định Tuyến — Zero-Trust Final Audit
> Cập nhật: 2026-08-31 | Audit bằng production HTTP thực tế
> PASS/FAIL dựa trên production response, không dựa trên code local

| Route | HTTP (prod) | H1 (prod) | Title (prod) | SSR Content | Schema | Indexable | Verdict |
|---|---|---|---|---|---|---|---|
| `/` | 200 | ✅ 1 | ✅ Correct | ✅ 333KB | ✅ | ✅ | **PASS** |
| `/about/` | 200 | ⚠️ 1 (no space bug) | ✅ Correct | ✅ | ✅ | ✅ | **PARTIAL** |
| `/explore/` | 200 | ✅ 1 | ✅ Correct | ⚠️ No heritage cards in HTML | ✅ | ✅ | **PARTIAL** |
| `/map/` | 200 | ✅ 1 | ✅ Correct | ✅ | ✅ | ✅ | **PASS** |
| `/study/` | 200 | ✅ 1 | ✅ Correct | ✅ 238KB | ✅ | ✅ | **PASS** |
| `/invest/` | 200 | ✅ 1 | ✅ Correct | ✅ | noindex | noindex | **TRUST RISK** |
| `/contribute/` | 200 | ✅ 1 | ✅ Correct | ✅ | ✅ | ✅ | **PASS** |
| `/contact/` | 200 | ✅ 1 | ✅ Correct | ✅ | ✅ | ✅ | **PASS** |
| `/heritage/can-cu-nua-lon-bu-dang/` | 200 | **❌ 0** | ✅ Correct | **❌ No body content** | ✅ (in head) | ✅ | **CRITICAL FAIL** |
| `/heritage/[other 15 slugs]/` | 200 | **❌ 0** | ✅ Correct | **❌ No body content** | ✅ (in head) | ✅ | **CRITICAL FAIL** |
| `/heritage/` | **404** | — | — | — | — | — | **NOT DEPLOYED** |
| `/stories/` | **404** | — | — | — | — | — | **NOT DEPLOYED** |
| `/stories/[slug]/` | **404** | — | — | — | — | — | **NOT DEPLOYED** |
| `/journal/` | **404** | — | — | — | — | — | **NOT DEPLOYED** |
| `/journal/[slug]/` | **404** | — | — | — | — | — | **NOT DEPLOYED** |
| `/explore/virtual-tour/` | UNVERIFIED | — | — | — | — | — | UNVERIFIED |
| `/heritage/qr/[slug]/` | UNVERIFIED | — | — | — | — | — | UNVERIFIED |
| `/study/lesson/[id]/` | UNVERIFIED | — | — | — | — | — | UNVERIFIED |
| `/admin/*` | SPA (noindex) | — | — | — | — | ❌ noindex | ✅ Correct |
| `/me/*` | SPA (noindex) | — | — | — | — | ❌ noindex | ✅ Correct |

## Notes
- Heritage pages: OG title và schema.org đúng trong `<head>` nhưng BODY trống — Googlebot thấy đúng title/schema nhưng KHÔNG thấy content/H1
- `/invest/` có `noindex,nofollow` trong working tree nhưng cần verify trên production
