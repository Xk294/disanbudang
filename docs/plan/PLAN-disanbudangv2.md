# PLAN-disanbudangv2 — Nâng cấp Cạnh tranh Cấp Quốc gia

> **Trạng thái:** ACTIVE
> **Tạo:** 2026-08-27
> **Mục tiêu:** Đưa DisanBudang từ "website di sản" lên "nền tảng số hóa di sản có dữ liệu cấu trúc, nguồn xác minh, cộng đồng tham gia và tác động giáo dục đo lường được."

---

## Vấn đề cốt lõi cần giải quyết

Hội đồng cấp quốc gia (chuẩn ISEF) đánh giá 3 điều: **Methodology (15đ) + Data/Execution (20đ) + Impact (20đ)**. DisanBudang V1 đang mạnh ở phần ít điểm nhất (visual, creativity) và yếu ở phần nhiều điểm nhất.

Ba gap nguy hiểm nhất:

1. **Không có provenance** — giám khảo hỏi "dữ liệu từ đâu?" không trả lời được bằng UI.
2. **Không có impact data** — learning data chỉ ở LocalStorage, không thống kê được.
3. **Heritage data là TypeScript statics** — không phải structured database, không query được.

---

## PHASE 0 — Audit & Correctness

**Thời gian:** 1–2 tuần | **Không thêm feature mới, chỉ sửa.**

### Tasks

- [ ] **P0.1** Fix brand consistency: `<title>`, `og:site_name`, meta description phải đồng nhất là "Di Sản Bù Đăng" (không lẫn "Di Sản Đồng Nai" ở nơi này "Di Sản Bù Đăng" ở nơi kia).
- [ ] **P0.2** Audit UNESCO claims: tất cả chỗ nhắc UNESCO phải thêm context rõ: "Di sản Cồng chiêng Tây Nguyên (UNESCO 2005), trong đó người S'Tiêng là một trong các chủ thể." Không được claim "UNESCO công nhận Bù Đăng/Sóc Bom Bo" vì đó là trap giám khảo.
- [ ] **P0.3** Các số liệu (16 di sản, 6 ký ức, 4 audio guide) phải nhất quán trên toàn site — kiểm tra từng trang.
- [ ] **P0.4** Images từ Unsplash cần gắn attribution hoặc watermark "Ảnh minh họa — sẽ thay bằng ảnh thực địa". Giám khảo heritage sẽ notice.
- [ ] **P0.5** Xác nhận Tailwind version thực tế đang dùng (PROJECT_MASTER ghi v3, GEMINI.md ghi v4 — cần sync).

### Definition of Done

- Không còn brand inconsistency nào trên production.
- Mọi claim UNESCO đều có đủ context.
- Số liệu khớp nhau trên tất cả các trang.

---

## PHASE 1 — Heritage Data Core

**Thời gian:** 4–6 tuần | **Ưu tiên cao nhất.**

### Mục tiêu

Chuyển toàn bộ heritage data từ TypeScript static files sang PostgreSQL với schema có provenance. Đây là nền tảng của mọi thứ khác trong V2.

### Database Setup

- [ ] **P1.1** Setup PostgreSQL — dùng [Neon.tech](https://neon.tech) (free tier, serverless, compatible với Cloudflare Workers).
- [ ] **P1.2** Implement schema mới (xem chi tiết bên dưới).
- [ ] **P1.3** Migrate 16 heritage từ `app/data/` vào DB. Giữ `app/data/` làm fallback tĩnh nếu DB unreachable.
- [ ] **P1.4** Refactor `stores/heritage.ts` — fetch từ API route thay vì import static.

### Schema V2

```sql
-- Bảng 1: heritage (entity chính)
CREATE TABLE heritage (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  period TEXT NOT NULL,
  cluster TEXT,
  lat REAL, lng REAL,
  short_desc TEXT,
  status TEXT DEFAULT 'published',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bảng 2: sources (nguồn gốc — quan trọng nhất)
CREATE TABLE sources (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  author TEXT,
  institution TEXT,
  published_year INT,
  url TEXT,
  credibility TEXT DEFAULT 'secondary',
  verification_status TEXT DEFAULT 'unverified',
  collected_by TEXT,
  collected_at DATE,
  notes TEXT
);

-- Bảng 3: entity_sources (link source với bất kỳ entity nào)
CREATE TABLE entity_sources (
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  source_id TEXT NOT NULL REFERENCES sources(id),
  claim TEXT,
  PRIMARY KEY (entity_type, entity_id, source_id)
);

-- Bảng 4: memories (ký ức cộng đồng — Living Archive)
CREATE TABLE memories (
  id TEXT PRIMARY KEY,
  heritage_id TEXT REFERENCES heritage(id),
  narrator_name TEXT,
  narrator_role TEXT,
  narrator_age INT,
  recorded_at DATE,
  recorded_by TEXT,
  audio_url TEXT,
  transcript TEXT,
  content TEXT,
  consent_type TEXT,
  access_level TEXT DEFAULT 'public',
  status TEXT DEFAULT 'pending',
  reviewed_by TEXT,
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bảng 5: learning_sessions (impact measurement)
CREATE TABLE learning_sessions (
  id TEXT PRIMARY KEY,
  session_key TEXT NOT NULL,
  heritage_id TEXT,
  lesson_id TEXT,
  pre_score INT,
  post_score INT,
  questions_count INT DEFAULT 5,
  completed_at TIMESTAMPTZ DEFAULT NOW()
);
```

### API Routes mới

- [ ] **P1.5** `GET /api/heritage` — list với filter (category, period, cluster).
- [ ] **P1.6** `GET /api/heritage/[slug]` — detail với sources count.
- [ ] **P1.7** `GET /api/heritage/[slug]/sources` — full source list cho 1 heritage.
- [ ] **P1.8** `GET /api/sources` — public bibliography (dùng cho trang /sources).

### Source Provenance UI

- [ ] **P1.9** Component `SourceBadge.vue` — 4 style: `verified` (xanh), `partial` (vàng), `oral` (tím), `unverified` (xám). Click → `SourcePanel.vue` slide-out với full citation list.
- [ ] **P1.10** Aggregate panel ở đầu mỗi heritage page: "Heritage này có X nguồn xác minh."
- [ ] **P1.11** Trang `/sources` — public bibliography, filter được theo type/credibility.

### Data Entry (song song với code)

- [ ] **P1.12** Nhập ≥ 3 sources cho mỗi trong 16 di sản (tối thiểu 48 sources). Ưu tiên: Sóc Bom Bo, Chiến Khu Đ, Núi Bà Rá.
- [ ] **P1.13** Mỗi source phải có: type, title, author/institution, năm, credibility level.

### Definition of Done

- Heritage data được fetch từ DB, không phải TypeScript import.
- Mỗi heritage page có source badge hiển thị rõ.
- Trang /sources public và có ít nhất 33 entries.

---

## PHASE 2 — Impact Measurement

**Thời gian:** 3–4 tuần | **Chạy pilot study song song ngay khi P2.2 xong.**

### Mục tiêu

Có data educational impact thật từ pre/post test — không phải claim, phải là số.

### Tasks

- [ ] **P2.1** Refactor `quiz.ts`: ghi vào `learning_sessions` table (server-side) thay vì chỉ LocalStorage.
- [ ] **P2.2** Pre-test flow: 5 câu hỏi trước khi bắt đầu mỗi learning path.
- [ ] **P2.3** Post-test flow: 5 câu tương đương sau khi hoàn thành.
- [ ] **P2.4** `POST /api/learning/session` — ghi anonymous session (không lưu PII).
- [ ] **P2.5** `GET /api/impact/summary` — aggregate stats (avg gain, total sessions).
- [ ] **P2.6** Impact numbers panel trên `/about` — hiển thị live từ API.

### Pilot Study

- [ ] **P2.7** Recruit ≥ 50 học sinh (THCS hoặc THPT tại địa phương).
- [ ] **P2.8** Chạy 4 tuần: pre-test → 2–3 tuần tự dùng platform → post-test.
- [ ] **P2.9** Phân tích: avg knowledge gain, % improvement. T-test nếu đủ sample (n ≥ 30).
- [ ] **P2.10** Viết 1–2 trang methodology + results để kèm demo cho giám khảo.

### Definition of Done

- `learning_sessions` table có ≥ 50 records thật.
- Có số liệu cụ thể: "avg gain = X điểm / Y% improvement."
- Impact panel trên /about hiển thị live.

---

## PHASE 3 — Living Heritage Archive

**Thời gian:** 3–4 tuần.**

### Mục tiêu

Nâng "Ký ức cộng đồng" từ static content lên living archive thực sự.

### Tasks

- [ ] **P3.1** Refactor `/contribute` form: thêm fields narrator_role, narrator_age, heritage_id link.
- [ ] **P3.2** Audio recording in-browser: Web Audio API + MediaRecorder (không thêm library mới).
- [ ] **P3.3** Consent flow: checkbox với giải thích rõ ràng bằng tiếng Việt đơn giản.
- [ ] **P3.4** File upload: chuyển sang Cloudflare R2 (đã có wrangler.toml).
- [ ] **P3.5** Admin review UI tại `/admin/memories`.
- [ ] **P3.6** Trang `/memories` — living archive: audio player + transcript + narrator info + heritage link.
- [ ] **P3.7** Cross-link: memories xuất hiện trong heritage detail page liên quan.

### Definition of Done

- Submission flow hoàn chỉnh: form → upload → consent → review → publish.
- Mỗi memory có narrator metadata, consent_type, access_level.
- `/memories` page hoạt động với audio playback.

---

## PHASE 4 — Heritage Explorer V2

**Thời gian:** 2–3 tuần.**

### Mục tiêu

Bản đồ trở thành Heritage Exploration Engine, không chỉ widget markers.

### Tasks

- [ ] **P4.1** On-site mode: GPS detect user trong phạm vi ±150m của một heritage → tự động hiện Field Card với audio guide button.
- [ ] **P4.2** QR code per heritage: `/heritage/[slug]?src=qr`. Generate và export để in sticker gắn thực địa.
- [ ] **P4.3** Heritage routes: 3 tuyến (kháng chiến / văn hóa bản địa / thiên nhiên) hiển thị như polyline trên map.
- [ ] **P4.4** 360° integration: ≥ 2 địa điểm (Sóc Bom Bo, Căn cứ Tà Thiết). Dùng [Pannellum](https://pannellum.org/) qua CDN iframe — không add library mới.
- [ ] **P4.5** Spatial ambient audio: ghi âm ambient sound thực địa → play nhẹ khi vào heritage page. Dùng Howler.js hiện có.
- [ ] **P4.6** `?src=qr` param → trigger on-site mode tự động.

### Definition of Done

- GPS on-site trigger hoạt động (test tại địa điểm thực).
- ≥ 2 heritage có 360° photos.
- QR codes được tạo cho tất cả 16 di sản.

---

## PHASE 5 — Education Engine

**Thời gian:** 3–4 tuần.**

### Mục tiêu

Quiz trở thành Learning System có cấu trúc, dùng được trong lớp học.

### Tasks

- [ ] **P5.1** Learning path model: 3 paths (Lịch sử Kháng chiến / Văn hóa Bản địa / Thiên nhiên Di sản).
- [ ] **P5.2** Lesson template: Hook → Explore → Learn → Quiz → Reflect → Connect.
- [ ] **P5.3** Teacher dashboard tại `/teacher`: tạo class, assign path, xem progress.
- [ ] **P5.4** Field mission: task gắn GPS → complete → badge.
- [ ] **P5.5** Badge system upgrade: Explorer (check-in ≥3 thực địa), Guardian (contribution approved), Historian (complete learning path).

### Definition of Done

- ≥ 2 learning paths với ≥ 3 lessons mỗi path.
- Teacher dashboard tạo class và xem progress được.
- Field mission hoạt động với GPS validation.

---

## PHASE 6 — AI Heritage Guide

**Thời gian:** 4–6 tuần | **Điều kiện: Phase 1–5 xong, DB có ≥ 50 sourced entities.**

### Tasks

- [ ] **P6.1** Embedding pipeline: chunk Heritage + Story + Memory → embeddings.
- [ ] **P6.2** Vector search: pgvector extension trên Neon.tech (free).
- [ ] **P6.3** RAG API route: retrieve → Gemini API với strict grounding prompt.
- [ ] **P6.4** Grounding rules cứng: chỉ answer từ context, từ chối nếu ngoài data, luôn cite source.
- [ ] **P6.5** UI: Heritage Guide button → chat interface.
- [ ] **P6.6** Evaluation: hallucination rate ≤ 5% trên 20 test queries.

### Definition of Done

- AI guide trả lời có citation, từ chối khi ngoài data.
- Hallucination rate ≤ 5%.

---

## Không làm (dù có thể)

| Feature | Lý do |
|---|---|
| VR museum tour | Effort/impact ratio kém, không accessible |
| AR camera overlay | Unstable, drains battery, kém UX |
| AI content generation | Credibility = 0 với historical content |
| Blockchain provenance | Over-engineering không cần thiết |
| Social feed / comments | Moderation nightmare, không focus |

---

## Metric thành công tổng thể

| Metric | Target |
|---|---|
| Heritage entities có ≥ 1 verified source | 100% (16/16) |
| Total sources trong bibliography | ≥ 50 |
| Learning sessions có data | ≥ 100 |
| Avg knowledge gain (pre → post) | ≥ 30% |
| Community memories approved | ≥ 15 |
| GPS on-site activations | ≥ 50 |
| 360° sites | ≥ 2 |

---

## Tài liệu liên quan

- [Kiến Trúc Hệ Thống V2](../arch/system.md) — master doc duy nhất
- [Backend Operations](../arch/backend-operations.md) — luồng request, D1, admin
- [Business Backbone](../biz/overview.md) — định vị, monetize
