// =========================================================
// CONTENT GRAPH ENGINE — BẢO TÀNG SỐ DI SẢN BÙ ĐĂNG
// Deterministic Related Content & 8-Vector Quality Evaluator
// =========================================================

import type { ContentQualityScore, DeterministicRelatedItem, EntityType, QualityGrade, QualityVectorKey } from '~/types'
import { GRAPH_ADJACENCY } from '~/data/contentGraph'
import { HERITAGES } from '~/data/heritages'
import { HERITAGE_SOURCES } from '~/data/sources'
import { ARTIFACTS } from '~/data/artifacts'
import { NEWS_ARTICLES, COMMUNITY_POSTS, EVENTS } from '~/data/posts'
import { LESSONS_DATA } from '~/data/lessons'
import { CANONICAL_FACTS } from '~/data/canonicalRegistry'

export interface RelatedContentOptions {
  limit?: number
  targetType?: EntityType
  minScore?: number
}

interface ResolvedMeta extends DeterministicRelatedItem {
  heritageId?: string
  clusterId?: string
  category?: string
  topic?: string
}

/**
 * Deterministic Related Content Algorithm:
 * Multi-vector weighted graph traversal with fixed tie-breaking
 */
export function getDeterministicRelatedContent(
  entityId: string,
  _entityType: EntityType,
  options: RelatedContentOptions = {}
): DeterministicRelatedItem[] {
  const limit = options.limit ?? 6
  const minScore = options.minScore ?? 10
  const scores: Map<string, { item: DeterministicRelatedItem; matchFactors: string[] }> = new Map()

  // 1. Direct Edge Lookups (+40 to +50 points)
  const adjacent = GRAPH_ADJACENCY[entityId] || []
  for (const edge of adjacent) {
    const targetMeta = resolveEntityMetadata(edge.targetId)
    if (!targetMeta) continue
    if (options.targetType && targetMeta.entityType !== options.targetType) continue

    const baseScore = Math.round(40 * (edge.weight / 100))
    addOrUpdateScore(scores, targetMeta, baseScore, `Đường nối trực tiếp (${edge.type})`)
  }

  // 2. Shared Topic / Category / Heritage Lookups
  const currentMeta = resolveEntityMetadata(entityId)
  if (currentMeta) {
    // Check across Heritages
    for (const h of HERITAGES) {
      if (h.id === entityId) continue
      if (options.targetType && options.targetType !== 'heritage') continue

      let sharedScore = 0
      const factors: string[] = []

      if (currentMeta.heritageId && currentMeta.heritageId === h.id) {
        sharedScore += 35
        factors.push('Cùng cụm di sản trực tiếp')
      }
      if (currentMeta.clusterId && currentMeta.clusterId === h.cluster) {
        sharedScore += 25
        factors.push('Cùng không gian địa lý / cụm tuyến')
      }
      if (currentMeta.category && currentMeta.category === h.category) {
        sharedScore += 15
        factors.push('Cùng phân loại di sản')
      }

      if (sharedScore > 0) {
        const meta: DeterministicRelatedItem = {
          id: h.id,
          title: h.title,
          subtitle: h.subtitle,
          entityType: 'heritage',
          role: 'heritage',
          score: sharedScore,
          url: `/heritage/${h.slug}`,
          coverImage: h.coverImage,
          reason: factors.join(', '),
        }
        addOrUpdateScore(scores, meta, sharedScore, factors.join(', '))
      }
    }

    // Check across Lessons
    for (const [lId, l] of Object.entries(LESSONS_DATA)) {
      if (lId === entityId) continue
      if (options.targetType && options.targetType !== 'lesson') continue

      let sharedScore = 0
      const factors: string[] = []

      if (currentMeta.topic && (l.subject.toLowerCase().includes(currentMeta.topic.toLowerCase()) || l.title.toLowerCase().includes(currentMeta.topic.toLowerCase()))) {
        sharedScore += 20
        factors.push('Cùng chủ đề kiến thức học tập')
      }

      if (sharedScore > 0) {
        const meta: DeterministicRelatedItem = {
          id: lId,
          title: l.title,
          subtitle: l.subject,
          entityType: 'lesson',
          role: 'lesson',
          score: sharedScore,
          url: `/study/lesson/${l.id}`,
          coverImage: l.coreKnowledge?.images?.[0]?.url,
          reason: factors.join(', '),
        }
        addOrUpdateScore(scores, meta, sharedScore, factors.join(', '))
      }
    }

    // Check across Stories (NEWS_ARTICLES)
    for (const n of NEWS_ARTICLES) {
      if (n.id === entityId) continue
      if (options.targetType && options.targetType !== 'story') continue

      let sharedScore = 0
      const factors: string[] = []

      if (currentMeta.category && n.category === currentMeta.category) {
        sharedScore += 15
        factors.push('Cùng thể loại câu chuyện')
      }

      if (sharedScore > 0) {
        const meta: DeterministicRelatedItem = {
          id: n.id,
          title: n.title,
          subtitle: n.subtitle,
          entityType: 'story',
          role: 'story',
          score: sharedScore,
          url: `/stories/${n.slug}`,
          coverImage: n.coverImage,
          reason: factors.join(', '),
        }
        addOrUpdateScore(scores, meta, sharedScore, factors.join(', '))
      }
    }
  }

  // Sort deterministically: score desc, then id asc (for strict tie-breaking)
  const results = Array.from(scores.values())
    .map(entry => entry.item)
    .filter(item => item.score >= minScore)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score
      return a.id.localeCompare(b.id)
    })

  return results.slice(0, limit)
}

function addOrUpdateScore(
  map: Map<string, { item: DeterministicRelatedItem; matchFactors: string[] }>,
  target: DeterministicRelatedItem,
  scoreToAdd: number,
  reason: string
) {
  if (map.has(target.id)) {
    const existing = map.get(target.id)!
    existing.item.score += scoreToAdd
    if (!existing.matchFactors.includes(reason)) {
      existing.matchFactors.push(reason)
      existing.item.reason = existing.matchFactors.join(', ')
    }
  } else {
    map.set(target.id, {
      item: {
        ...target,
        score: scoreToAdd,
        reason,
      },
      matchFactors: [reason],
    })
  }
}

/**
 * Resolve entity metadata across all local registries
 */
export function resolveEntityMetadata(id: string): ResolvedMeta | null {
  // Heritage
  const h = HERITAGES.find(x => x.id === id || x.slug === id)
  if (h) {
    return {
      id: h.id,
      title: h.title,
      subtitle: h.subtitle,
      entityType: 'heritage',
      role: 'heritage',
      score: 0,
      url: `/heritage/${h.slug}`,
      coverImage: h.coverImage,
      reason: '',
      heritageId: h.id,
      clusterId: h.cluster,
      category: h.category,
    }
  }

  // Lesson
  if (LESSONS_DATA[id]) {
    const l = LESSONS_DATA[id]
    return {
      id: l.id,
      title: l.title,
      subtitle: l.subject,
      entityType: 'lesson',
      role: 'lesson',
      score: 0,
      url: `/study/lesson/${l.id}`,
      coverImage: l.coreKnowledge?.images?.[0]?.url,
      reason: '',
      topic: l.subject,
    }
  }

  // Story (NEWS_ARTICLES)
  const n = NEWS_ARTICLES.find(x => x.id === id || x.slug === id)
  if (n) {
    return {
      id: n.id,
      title: n.title,
      subtitle: n.subtitle,
      entityType: 'story',
      role: 'story',
      score: 0,
      url: `/stories/${n.slug}`,
      coverImage: n.coverImage,
      reason: '',
      category: n.category,
    }
  }

  // Memory (COMMUNITY_POSTS)
  const p = COMMUNITY_POSTS.find(x => x.id === id)
  if (p) {
    return {
      id: p.id,
      title: p.title,
      subtitle: p.author.name,
      entityType: 'memory',
      role: 'memory',
      score: 0,
      url: `/explore/post/${p.id}`,
      coverImage: p.coverImage,
      reason: '',
    }
  }

  // Artifact
  const artifactList = Object.values(ARTIFACTS)
  const a = artifactList.find(x => x.id === id)
  if (a) {
    return {
      id: a.id,
      title: a.name,
      subtitle: a.subtitle,
      entityType: 'artifact',
      role: 'context',
      score: 0,
      url: `/explore/virtual-tour`,
      coverImage: a.image,
      reason: '',
    }
  }

  // Journal (EVENTS)
  const e = EVENTS.find(x => x.id === id)
  if (e) {
    return {
      id: e.id,
      title: e.title,
      subtitle: e.location,
      entityType: 'journal',
      role: 'journal',
      score: 0,
      url: `/journal/${e.id}`,
      reason: '',
    }
  }

  return null
}

// ─────────────────────────────────────────────────────────
// 8-VECTOR CONTENT QUALITY SCORE EVALUATOR
// ─────────────────────────────────────────────────────────

export function evaluateContentQuality(entityId: string, entityType: EntityType): ContentQualityScore {
  const weaknesses: string[] = []
  const strengths: string[] = []
  const suggestions: string[] = []

  let evidence = 11 // 0-15
  let uniqueness = 12 // 0-15
  let specificity = 12 // 0-15
  let usefulness = 12 // 0-15
  let depth = 8 // 0-10
  let media = 8 // 0-10
  let relationship = 6 // 0-10
  let credibility = 8 // 0-10
  let title = entityId

  // Check sources & citations
  const sources = HERITAGE_SOURCES[entityId] || []
  if (sources.length >= 3) {
    evidence = 15
    credibility = 10
    strengths.push('Hệ thống nguồn đối chiếu lưu trữ và công trình học thuật đầy đủ')
  } else if (sources.length >= 1) {
    evidence = 13
    credibility = 9
    strengths.push('Có nguồn trích dẫn khảo cứu chính thức')
  } else {
    evidence = 9
    credibility = 7
    weaknesses.push('Thiếu nguồn tham khảo độc lập mở rộng')
    suggestions.push('Bổ sung thêm quyết định xếp hạng hoặc tài liệu lưu trữ bảo tàng')
  }

  // Check canonical facts corroboration
  const verifiedFacts = CANONICAL_FACTS.filter(f => f.entityId === entityId && (f.verification === 'archival_confirmed' || f.verification === 'verified'))
  if (verifiedFacts.length > 0) {
    specificity = Math.min(15, specificity + 2)
    strengths.push(`Có ${verifiedFacts.length} dữ kiện đã xác thực lưu trữ tuyệt đối`)
  }

  // Check graph connectedness
  const edges = GRAPH_ADJACENCY[entityId] || []
  if (edges.length >= 5) {
    relationship = 10
    strengths.push('Mạng lưới liên kết đa chiều phong phú trong content graph')
  } else if (edges.length >= 2) {
    relationship = 8
  } else {
    relationship = 5
    suggestions.push('Liên kết thực thể này với thêm các bài học, ký ức nhân chứng hoặc địa danh lân cận')
  }

  // Specific content checks per entity type
  if (entityType === 'heritage') {
    const h = HERITAGES.find(x => x.id === entityId)
    if (h) {
      title = h.title
      if (h.longStory && h.longStory.length > 500) depth = 10
      if (h.gallery && h.gallery.length >= 3) media = 10
      if (h.quickFacts && h.quickFacts.length >= 4) usefulness = 15
    }
  } else if (entityType === 'lesson') {
    const l = LESSONS_DATA[entityId]
    if (l) {
      title = l.title
      if (l.quiz && l.quiz.length >= 5) usefulness = 15
      if (l.flashcards && l.flashcards.length >= 3) usefulness = 15
      if (l.timeline && l.timeline.length >= 3) depth = 10
      if (l.glossary && l.glossary.length >= 3) specificity = 15
    }
  } else if (entityType === 'story') {
    const s = NEWS_ARTICLES.find(x => x.id === entityId)
    if (s) {
      title = s.title
      depth = 10
      uniqueness = 15
    }
  }

  const vectors: Record<QualityVectorKey, number> = {
    evidence,
    uniqueness,
    specificity,
    usefulness,
    depth,
    media,
    relationship,
    credibility,
  }

  const totalScore = evidence + uniqueness + specificity + usefulness + depth + media + relationship + credibility

  let grade: QualityGrade = 'B'
  if (totalScore >= 90) grade = 'A+'
  else if (totalScore >= 80) grade = 'A'
  else if (totalScore >= 70) grade = 'B'
  else if (totalScore >= 60) grade = 'C'
  else grade = 'D'

  return {
    entityId,
    entityType,
    title,
    vectors,
    totalScore,
    grade,
    strengths,
    weaknesses,
    suggestions,
    lastAudited: '2026-08-30',
  }
}

/**
 * Batch quality evaluation across the entire database
 */
export function calculateAllQualityScores(): ContentQualityScore[] {
  const scores: ContentQualityScore[] = []

  // Heritages
  for (const h of HERITAGES) {
    scores.push(evaluateContentQuality(h.id, 'heritage'))
  }

  // Lessons
  for (const id of Object.keys(LESSONS_DATA)) {
    scores.push(evaluateContentQuality(id, 'lesson'))
  }

  // Stories
  for (const n of NEWS_ARTICLES) {
    scores.push(evaluateContentQuality(n.id, 'story'))
  }

  // Memories
  for (const p of COMMUNITY_POSTS) {
    scores.push(evaluateContentQuality(p.id, 'memory'))
  }

  return scores
}
