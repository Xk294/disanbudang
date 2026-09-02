/**
 * GET /api/contributions/approved
 * Public endpoint — no auth required.
 * Returns the latest approved contributions for display on the /contribute page.
 * Query: ?limit=12 ?offset=0
 *
 * Fields returned are safe for public display:
 *   id, type, title, author_name, author_role, heritage_id, created_at, excerpt
 * Fields intentionally excluded:
 *   ip, review_note, reviewed_by, content (full), files_data
 */

const FALLBACK_APPROVED_CONTRIBUTIONS = [
  {
    id: 'contrib-seed-001',
    type: 'document',
    title: 'Tài Liệu Ghi Chép Điền Dã & Lịch Sử Truyền Khẩu Sóc Bom Bo',
    author_name: 'Điểu K\'Rốt',
    author_role: 'resident',
    heritage_id: 'hrt-011',
    created_at: '2024-04-18T08:30:00.000Z',
    excerpt: 'Tập ghi chép chi tiết về các thế hệ già làng Sóc Bom Bo, tư liệu truyền khẩu về phong trào giã gạo nuôi quân trong chiến dịch Đồng Xoài 1965 cùng danh sách các hiện vật cối chày truyền thống.',
    file_url: '/tai-lieu/soc-bom-bo-dong-nai.pdf',
    file_name: 'soc-bom-bo-dong-nai.pdf',
    file_size: '900 KB',
  },
  {
    id: 'contrib-seed-002',
    type: 'research',
    title: 'Hồ Sơ Tư Liệu Khảo Sát & Sơ Đồ Di Tích Căn Cứ Kháng Chiến U1',
    author_name: 'Nguyễn Hoàng Mai',
    author_role: 'student',
    heritage_id: 'hrt-001',
    created_at: '2024-05-02T14:15:00.000Z',
    excerpt: 'Bản khảo cứu khoa học sinh viên kèm sơ đồ tọa độ các hầm chỉ huy, hệ thống địa đạo ngầm và hiện vật thời kháng chiến chống Mỹ tại vùng căn cứ cách mạng U1 Biên Hòa - Đồng Nai.',
    file_url: '/tai-lieu/can-cu-u1.pdf',
    file_name: 'can-cu-u1.pdf',
    file_size: '901 KB',
  },
  {
    id: 'contrib-seed-003',
    type: 'document',
    title: 'Ký Ức Hào Hùng & Sử Liệu Kháng Chiến Rừng Chiến Khu Đ',
    author_name: 'Trần Văn Thành',
    author_role: 'teacher',
    heritage_id: null,
    created_at: '2024-05-19T09:45:00.000Z',
    excerpt: 'Tổng hợp hồi ký cựu chiến binh và tư liệu số hóa về căn cứ địa Chiến khu Đ miền Đông gian lao mà anh dũng, phục vụ giáo dục truyền thống lịch sử cho thế hệ trẻ học sinh.',
    file_url: '/tai-lieu/chien-khu-d.pdf',
    file_name: 'chien-khu-d.pdf',
    file_size: '505 KB',
  },
]

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const limit = Math.min(Number(query.limit) || 12, 50)
  const offset = Number(query.offset) || 0

  const db = event.context.cloudflare?.env?.DB
  if (!db) {
    return {
      ok: true,
      contributions: FALLBACK_APPROVED_CONTRIBUTIONS.slice(offset, offset + limit),
      total: FALLBACK_APPROVED_CONTRIBUTIONS.length,
    }
  }

  try {
    const [rows, countRow] = await Promise.all([
      db.prepare(`
        SELECT
          id,
          type,
          title,
          author_name,
          author_role,
          heritage_id,
          created_at,
          files_data,
          substr(content, 1, 200) AS excerpt
        FROM contributions
        WHERE status = 'approved'
        ORDER BY reviewed_at DESC
        LIMIT ? OFFSET ?
      `).bind(limit, offset).all(),

      db.prepare(
        'SELECT COUNT(*) as total FROM contributions WHERE status = "approved"',
      ).first(),
    ])

    const total = (countRow as { total: number } | null)?.total ?? 0
    let results = (rows.results ?? []) as Array<any>

    if (total === 0 && results.length === 0) {
      results = FALLBACK_APPROVED_CONTRIBUTIONS.slice(offset, offset + limit)
    } else {
      results = results.map((r) => {
        let file_url: string | null = null
        let file_name: string | null = null
        if (r.files_data) {
          try {
            const parsed = JSON.parse(r.files_data)
            if (Array.isArray(parsed) && parsed.length > 0) {
              file_url = parsed[0]
              file_name = file_url ? file_url.split('/').pop() || null : null
            }
          } catch {}
        }
        return {
          id: r.id,
          type: r.type,
          title: r.title,
          author_name: r.author_name,
          author_role: r.author_role,
          heritage_id: r.heritage_id,
          created_at: r.created_at,
          excerpt: r.excerpt,
          file_url,
          file_name,
        }
      })
    }

    return {
      ok: true,
      contributions: results,
      total: total > 0 ? total : FALLBACK_APPROVED_CONTRIBUTIONS.length,
    }
  } catch (err) {
    console.error('[contributions/approved] DB error:', err)
    return {
      ok: true,
      contributions: FALLBACK_APPROVED_CONTRIBUTIONS.slice(offset, offset + limit),
      total: FALLBACK_APPROVED_CONTRIBUTIONS.length,
    }
  }
})
