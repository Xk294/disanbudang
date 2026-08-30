// =========================================================
// CONTENT RELATION GRAPH — BẢO TÀNG SỐ DI SẢN BÙ ĐĂNG
// Full Multi-Entity Adjacency & Weighted Graph Edges
// =========================================================

import type { GraphEdge } from '~/types'

export const CONTENT_GRAPH_EDGES: GraphEdge[] = [
  // ── HRT-001: Căn cứ Nửa Lon Bù Đăng ──
  { source: 'hrt-001', target: 'can-cu-nua-lon', type: 'heritage_to_lesson', weight: 95, bidirectional: true },
  { source: 'hrt-001', target: 'chien-khu-d', type: 'heritage_to_lesson', weight: 85, bidirectional: true },
  { source: 'hrt-001', target: 'post-002', type: 'heritage_to_memory', weight: 90, bidirectional: true },
  { source: 'hrt-001', target: 'post-003', type: 'heritage_to_memory', weight: 92, bidirectional: true },
  { source: 'hrt-001', target: 'person-dieu-krut', type: 'heritage_to_person', weight: 95, bidirectional: true },
  { source: 'hrt-001', target: 'person-tran-van-nam', type: 'heritage_to_person', weight: 88, bidirectional: true },
  { source: 'hrt-001', target: 'place-can-cu-nua-lon', type: 'heritage_to_place', weight: 100, bidirectional: true },
  { source: 'hrt-001', target: 'top-khang-chien', type: 'heritage_to_topic', weight: 95, bidirectional: true },
  { source: 'hrt-001', target: 'top-giao-duc', type: 'heritage_to_topic', weight: 80, bidirectional: true },
  { source: 'hrt-001', target: 'src-001-1', type: 'heritage_to_source', weight: 100 },
  { source: 'hrt-001', target: 'src-001-2', type: 'heritage_to_source', weight: 90 },
  { source: 'hrt-001', target: 'src-001-3', type: 'heritage_to_source', weight: 85 },

  // ── HRT-002: Hồ Thác Mơ — Phước Long ──
  { source: 'hrt-002', target: 'nui-ba-ra', type: 'heritage_to_lesson', weight: 90, bidirectional: true },
  { source: 'hrt-002', target: 'post-004', type: 'heritage_to_memory', weight: 92, bidirectional: true },
  { source: 'hrt-002', target: 'person-thi-diep', type: 'heritage_to_person', weight: 90, bidirectional: true },
  { source: 'hrt-002', target: 'place-ho-thac-mo', type: 'heritage_to_place', weight: 100, bidirectional: true },
  { source: 'hrt-002', target: 'top-danh-thang', type: 'heritage_to_topic', weight: 95, bidirectional: true },
  { source: 'hrt-002', target: 'top-tin-nguong', type: 'heritage_to_topic', weight: 75, bidirectional: true },
  { source: 'hrt-002', target: 'src-002-1', type: 'heritage_to_source', weight: 100 },
  { source: 'hrt-002', target: 'src-002-2', type: 'heritage_to_source', weight: 90 },
  { source: 'hrt-002', target: 'src-002-3', type: 'heritage_to_source', weight: 85 },

  // ── HRT-003: Không Gian Văn Hóa Cồng Chiêng S'Tiêng ──
  { source: 'hrt-003', target: 'cong-chieng-stieng', type: 'heritage_to_lesson', weight: 100, bidirectional: true },
  { source: 'hrt-003', target: 'news-006', type: 'heritage_to_story', weight: 88, bidirectional: true },
  { source: 'hrt-003', target: 'post-001', type: 'heritage_to_memory', weight: 96, bidirectional: true },
  { source: 'hrt-003', target: 'person-dieu-minh', type: 'heritage_to_person', weight: 100, bidirectional: true },
  { source: 'hrt-003', target: 'person-dieu-kgiang', type: 'heritage_to_person', weight: 85, bidirectional: true },
  { source: 'hrt-003', target: 'place-soc-bom-bo', type: 'heritage_to_place', weight: 95, bidirectional: true },
  { source: 'hrt-003', target: 'cong-chieng-stieng', type: 'heritage_to_artifact', weight: 100, bidirectional: true },
  { source: 'hrt-003', target: 'dan-da-soc-bom-bo', type: 'heritage_to_artifact', weight: 90, bidirectional: true },
  { source: 'hrt-003', target: 'top-am-nhac', type: 'heritage_to_topic', weight: 100, bidirectional: true },
  { source: 'hrt-003', target: 'top-tin-nguong', type: 'heritage_to_topic', weight: 85, bidirectional: true },
  { source: 'hrt-003', target: 'src-003-1', type: 'heritage_to_source', weight: 100 },
  { source: 'hrt-003', target: 'src-003-2', type: 'heritage_to_source', weight: 95 },
  { source: 'hrt-003', target: 'src-003-3', type: 'heritage_to_source', weight: 90 },

  // ── HRT-004: Nghề Dệt Thổ Cẩm S'Tiêng ──
  { source: 'hrt-004', target: 'tho-cam-stieng', type: 'heritage_to_lesson', weight: 100, bidirectional: true },
  { source: 'hrt-004', target: 'news-005', type: 'heritage_to_story', weight: 98, bidirectional: true },
  { source: 'hrt-004', target: 'post-005', type: 'heritage_to_memory', weight: 95, bidirectional: true },
  { source: 'hrt-004', target: 'person-thi-ret', type: 'heritage_to_person', weight: 100, bidirectional: true },
  { source: 'hrt-004', target: 'place-dak-nhau', type: 'heritage_to_place', weight: 100, bidirectional: true },
  { source: 'hrt-004', target: 'place-soc-bom-bo', type: 'heritage_to_place', weight: 85, bidirectional: true },
  { source: 'hrt-004', target: 'gui-tho-cam-ruou-can', type: 'heritage_to_artifact', weight: 90, bidirectional: true },
  { source: 'hrt-004', target: 'top-nghe-thu-cong', type: 'heritage_to_topic', weight: 100, bidirectional: true },
  { source: 'hrt-004', target: 'src-004-1', type: 'heritage_to_source', weight: 100 },
  { source: 'hrt-004', target: 'src-004-2', type: 'heritage_to_source', weight: 95 },

  // ── HRT-005: Căn Cứ Khu Ủy Miền Đông Nam Bộ ──
  { source: 'hrt-005', target: 'chien-khu-d', type: 'heritage_to_lesson', weight: 95, bidirectional: true },
  { source: 'hrt-005', target: 'can-cu-ta-thiet', type: 'heritage_to_lesson', weight: 80, bidirectional: true },
  { source: 'hrt-005', target: 'top-khang-chien', type: 'heritage_to_topic', weight: 100, bidirectional: true },
  { source: 'hrt-005', target: 'src-005-1', type: 'heritage_to_source', weight: 100 },
  { source: 'hrt-005', target: 'src-005-2', type: 'heritage_to_source', weight: 90 },

  // ── HRT-006: Vườn Quốc Gia Bù Gia Mập ──
  { source: 'hrt-006', target: 'place-bu-gia-map', type: 'heritage_to_place', weight: 100, bidirectional: true },
  { source: 'hrt-006', target: 'top-danh-thang', type: 'heritage_to_topic', weight: 100, bidirectional: true },
  { source: 'hrt-006', target: 'src-006-1', type: 'heritage_to_source', weight: 100 },
  { source: 'hrt-006', target: 'src-006-2', type: 'heritage_to_source', weight: 90 },

  // ── HRT-007: Nhà Giao Tế Lộc Ninh ──
  { source: 'hrt-007', target: 'can-cu-ta-thiet', type: 'heritage_to_lesson', weight: 85, bidirectional: true },
  { source: 'hrt-007', target: 'top-khang-chien', type: 'heritage_to_topic', weight: 100, bidirectional: true },
  { source: 'hrt-007', target: 'src-007-1', type: 'heritage_to_source', weight: 100 },

  // ── HRT-008: Căn Cứ Bộ Chỉ Huy Miền (Tà Thiết) ──
  { source: 'hrt-008', target: 'can-cu-ta-thiet', type: 'heritage_to_lesson', weight: 100, bidirectional: true },
  { source: 'hrt-008', target: 'chien-thang-phuoc-long', type: 'heritage_to_lesson', weight: 88, bidirectional: true },
  { source: 'hrt-008', target: 'place-can-cu-ta-thiet', type: 'heritage_to_place', weight: 100, bidirectional: true },
  { source: 'hrt-008', target: 'top-khang-chien', type: 'heritage_to_topic', weight: 100, bidirectional: true },
  { source: 'hrt-008', target: 'src-008-1', type: 'heritage_to_source', weight: 100 },

  // ── HRT-009: Cụm Trảng Cỏ Bù Lạch ──
  { source: 'hrt-009', target: 'trang-co-bu-lach', type: 'heritage_to_lesson', weight: 100, bidirectional: true },
  { source: 'hrt-009', target: 'place-trang-co-bu-lach', type: 'heritage_to_place', weight: 100, bidirectional: true },
  { source: 'hrt-009', target: 'thac-dung-dak-wuar', type: 'heritage_to_lesson', weight: 75, bidirectional: true },
  { source: 'hrt-009', target: 'top-danh-thang', type: 'heritage_to_topic', weight: 100, bidirectional: true },
  { source: 'hrt-009', target: 'src-009-1', type: 'heritage_to_source', weight: 100 },
  { source: 'hrt-009', target: 'src-009-2', type: 'heritage_to_source', weight: 90 },

  // ── HRT-010: Danh Thắng Thác Đứng Bù Đăng ──
  { source: 'hrt-010', target: 'thac-dung-dak-wuar', type: 'heritage_to_lesson', weight: 100, bidirectional: true },
  { source: 'hrt-010', target: 'place-thac-dung', type: 'heritage_to_place', weight: 100, bidirectional: true },
  { source: 'hrt-010', target: 'top-danh-thang', type: 'heritage_to_topic', weight: 100, bidirectional: true },
  { source: 'hrt-010', target: 'src-010-1', type: 'heritage_to_source', weight: 100 },

  // ── HRT-011: Khu Bảo Tồn Văn Hóa Sóc Bom Bo ──
  { source: 'hrt-011', target: 'soc-bom-bo', type: 'heritage_to_lesson', weight: 100, bidirectional: true },
  { source: 'hrt-011', target: 'cong-chieng-stieng', type: 'heritage_to_lesson', weight: 90, bidirectional: true },
  { source: 'hrt-011', target: 'news-003', type: 'heritage_to_story', weight: 100, bidirectional: true },
  { source: 'hrt-011', target: 'news-001', type: 'heritage_to_story', weight: 85, bidirectional: true },
  { source: 'hrt-011', target: 'news-002', type: 'heritage_to_story', weight: 85, bidirectional: true },
  { source: 'hrt-011', target: 'post-001', type: 'heritage_to_memory', weight: 92, bidirectional: true },
  { source: 'hrt-011', target: 'person-xuan-hong', type: 'heritage_to_person', weight: 100, bidirectional: true },
  { source: 'hrt-011', target: 'person-dieu-minh', type: 'heritage_to_person', weight: 95, bidirectional: true },
  { source: 'hrt-011', target: 'person-dieu-len', type: 'heritage_to_person', weight: 90, bidirectional: true },
  { source: 'hrt-011', target: 'place-soc-bom-bo', type: 'heritage_to_place', weight: 100, bidirectional: true },
  { source: 'hrt-011', target: 'coi-chay-doi-bom-bo', type: 'heritage_to_artifact', weight: 100, bidirectional: true },
  { source: 'hrt-011', target: 'cong-chieng-stieng', type: 'heritage_to_artifact', weight: 90, bidirectional: true },
  { source: 'hrt-011', target: 'dan-da-soc-bom-bo', type: 'heritage_to_artifact', weight: 90, bidirectional: true },
  { source: 'hrt-011', target: 'event-001', type: 'heritage_to_journal', weight: 95, bidirectional: true },
  { source: 'hrt-011', target: 'flog-001', type: 'heritage_to_journal', weight: 95, bidirectional: true },
  { source: 'hrt-011', target: 'top-khang-chien', type: 'heritage_to_topic', weight: 95, bidirectional: true },
  { source: 'hrt-011', target: 'top-am-nhac', type: 'heritage_to_topic', weight: 90, bidirectional: true },
  { source: 'hrt-011', target: 'top-am-thuc', type: 'heritage_to_topic', weight: 85, bidirectional: true },
  { source: 'hrt-011', target: 'src-011-1', type: 'heritage_to_source', weight: 100 },
  { source: 'hrt-011', target: 'src-011-2', type: 'heritage_to_source', weight: 95 },
  { source: 'hrt-011', target: 'src-011-3', type: 'heritage_to_source', weight: 90 },

  // ── HRT-012: Rừng Nguyên Sinh Bù Đăng ──
  { source: 'hrt-012', target: 'top-danh-thang', type: 'heritage_to_topic', weight: 100, bidirectional: true },
  { source: 'hrt-012', target: 'src-012-1', type: 'heritage_to_source', weight: 100 },

  // ── HRT-013: Lễ Hội Cầu Mưa & Mừng Lúa Mới S'Tiêng ──
  { source: 'hrt-013', target: 'post-006', type: 'heritage_to_memory', weight: 95, bidirectional: true },
  { source: 'hrt-013', target: 'news-004', type: 'heritage_to_story', weight: 88, bidirectional: true },
  { source: 'hrt-013', target: 'news-002', type: 'heritage_to_story', weight: 85, bidirectional: true },
  { source: 'hrt-013', target: 'event-003', type: 'heritage_to_journal', weight: 95, bidirectional: true },
  { source: 'hrt-013', target: 'gui-tho-cam-ruou-can', type: 'heritage_to_artifact', weight: 90, bidirectional: true },
  { source: 'hrt-013', target: 'top-tin-nguong', type: 'heritage_to_topic', weight: 100, bidirectional: true },
  { source: 'hrt-013', target: 'src-013-1', type: 'heritage_to_source', weight: 100 },
  { source: 'hrt-013', target: 'src-013-2', type: 'heritage_to_source', weight: 90 },

  // ── HRT-014: Nhà Dài Truyền Thống S'Tiêng ──
  { source: 'hrt-014', target: 'place-soc-bom-bo', type: 'heritage_to_place', weight: 95, bidirectional: true },
  { source: 'hrt-014', target: 'flog-002', type: 'heritage_to_journal', weight: 90, bidirectional: true },
  { source: 'hrt-014', target: 'top-kien-truc', type: 'heritage_to_topic', weight: 100, bidirectional: true },
  { source: 'hrt-014', target: 'src-014-1', type: 'heritage_to_source', weight: 100 },
  { source: 'hrt-014', target: 'src-014-2', type: 'heritage_to_source', weight: 90 },

  // ── HRT-015: Chiến Thắng Phước Long 1975 ──
  { source: 'hrt-015', target: 'chien-thang-phuoc-long', type: 'heritage_to_lesson', weight: 100, bidirectional: true },
  { source: 'hrt-015', target: 'nui-ba-ra', type: 'heritage_to_lesson', weight: 90, bidirectional: true },
  { source: 'hrt-015', target: 'place-ho-thac-mo', type: 'heritage_to_place', weight: 90, bidirectional: true },
  { source: 'hrt-015', target: 'top-khang-chien', type: 'heritage_to_topic', weight: 100, bidirectional: true },
  { source: 'hrt-015', target: 'src-015-1', type: 'heritage_to_source', weight: 100 },
  { source: 'hrt-015', target: 'src-015-2', type: 'heritage_to_source', weight: 95 },

  // ── HRT-016: Tượng Đài Chiến Thắng Phước Long ──
  { source: 'hrt-016', target: 'chien-thang-phuoc-long', type: 'heritage_to_lesson', weight: 95, bidirectional: true },
  { source: 'hrt-016', target: 'place-ho-thac-mo', type: 'heritage_to_place', weight: 85, bidirectional: true },
  { source: 'hrt-016', target: 'top-khang-chien', type: 'heritage_to_topic', weight: 100, bidirectional: true },
  { source: 'hrt-016', target: 'src-016-1', type: 'heritage_to_source', weight: 100 },

  // ── Cross Entity Edges: Story & Lesson & Memory & Artifact ──
  { source: 'news-001', target: 'top-am-thuc', type: 'story_to_topic', weight: 100 },
  { source: 'news-001', target: 'place-soc-bom-bo', type: 'story_to_place', weight: 90 },
  { source: 'news-002', target: 'top-am-thuc', type: 'story_to_topic', weight: 100 },
  { source: 'news-002', target: 'gui-tho-cam-ruou-can', type: 'related_to', weight: 95 },
  { source: 'news-003', target: 'coi-chay-doi-bom-bo', type: 'related_to', weight: 100 },
  { source: 'news-003', target: 'person-xuan-hong', type: 'story_to_person', weight: 100 },
  { source: 'news-005', target: 'person-thi-ret', type: 'story_to_person', weight: 100 },
  { source: 'news-006', target: 'dan-da-soc-bom-bo', type: 'related_to', weight: 100 },
  { source: 'news-006', target: 'person-dieu-kgiang', type: 'story_to_person', weight: 100 },
]

// ─────────────────────────────────────────────────────────
// FAST ADJACENCY LOOKUP INDEX
// ─────────────────────────────────────────────────────────

export const GRAPH_ADJACENCY: Record<string, { targetId: string; type: string; weight: number }[]> = {}

// Build bidirectional index
for (const edge of CONTENT_GRAPH_EDGES) {
  const sourceList = GRAPH_ADJACENCY[edge.source] || []
  sourceList.push({
    targetId: edge.target,
    type: edge.type,
    weight: edge.weight,
  })
  GRAPH_ADJACENCY[edge.source] = sourceList

  if (edge.bidirectional) {
    const targetList = GRAPH_ADJACENCY[edge.target] || []
    targetList.push({
      targetId: edge.source,
      type: edge.type,
      weight: edge.weight,
    })
    GRAPH_ADJACENCY[edge.target] = targetList
  }
}

