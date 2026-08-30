// =========================================================
// TYPES — CONTENT GRAPH & CANONICAL ARCHITECTURE (PHASE 3)
// Bảo Tàng Số Di Sản Bù Đăng — Thành Phố Đồng Nai
// =========================================================

import type {
  HeritageCategory,
  HeritagePeriod,
  HeritageCluster,
  HeritageCoordinates,
  HeritageQuickFact,
  HeritageTimelineItem,
  HeritageGalleryImage,
  HeritageAudio,
  HeritageQuiz,
  HeritageSource,
  CommunityAuthor,
} from './index'
import type { Artifact } from './virtualTour'

// ─────────────────────────────────────────────────────────
// 1. CONTENT ROLES & QUESTIONS
// ─────────────────────────────────────────────────────────

export type ContentRole =
  | 'heritage' // "Đây là gì?" — Hồ sơ di sản định danh khách quan, phân loại, thuộc tính, bản quyền/pháp lý, tọa độ, biên niên sử
  | 'story' // "Điều gì đáng kể sâu hơn?" — Câu chuyện lịch sử, huyền thoại, chiều sâu văn hóa, góc nhìn truyền thuyết & biến cố
  | 'lesson' // "Tôi học được gì?" — Kiến thức giáo dục, câu hỏi suy ngẫm, hoạt động thực tế, bài học lịch sử - kỹ năng
  | 'memory' // "Con người nhớ điều này thế nào?" — Ký ức nhân chứng, già làng, cư dân, tiếng nói thứ nhất, truyền khẩu
  | 'journal' // "Dự án đang làm gì?" — Nhật ký điền dã, tiến độ số hóa, ghi chép bảo tồn thực địa, nghiên cứu

export interface ContentRoleDefinition {
  role: ContentRole
  question: string
  label: string
  intent: string
  primaryTarget: string
  voice: 'objective_archival' | 'narrative_deep' | 'pedagogical' | 'first_person_oral' | 'fieldwork_log'
}

// ─────────────────────────────────────────────────────────
// 2. THE 11 CANONICAL CONTENT ENTITY TYPES
// ─────────────────────────────────────────────────────────

export type EntityType =
  | 'heritage'
  | 'story'
  | 'lesson'
  | 'memory'
  | 'journal'
  | 'person'
  | 'place'
  | 'artifact'
  | 'media'
  | 'source'
  | 'topic'

// 2.1 Person Entity (Nhân vật / Nghệ nhân / Nhân chứng)
export interface PersonEntity {
  id: string
  name: string
  alternateNames?: string[]
  title: string // Danh xưng / Chức sắc: "Già làng", "Nghệ nhân ưu tú", "Cựu chiến binh", "Nhà nghiên cứu"
  ethnicGroup?: 'S\'Tiêng' | 'M\'Nông' | 'Kinh' | 'Châu Mạ' | 'Khác'
  birthYear?: number | string
  deathYear?: number | string
  hometown?: string
  biography: string
  role: 'artisan' | 'witness' | 'researcher' | 'historical_figure' | 'community_voice'
  avatar?: string
  relatedHeritageIds: string[]
  relatedPlaceIds: string[]
  relatedTopicIds: string[]
  verified: boolean
}

// 2.2 Place Entity (Không gian địa lý / Danh lam / Di tích)
export interface PlaceEntity {
  id: string
  name: string
  alternateNames?: string[]
  cluster: HeritageCluster
  coordinates: HeritageCoordinates
  administrativeLocation: string // Xã Bình Minh, Phường Phước Long...
  terrainType: 'forest' | 'waterway' | 'grassland' | 'mountain' | 'village' | 'monument'
  description: string
  culturalSignificance: string
  coverImage?: string
  gallery?: string[]
  relatedHeritageIds: string[]
  relatedTopicIds: string[]
}

// 2.3 Topic Entity (Chủ đề / Nhãn tri thức bản địa)
export interface TopicEntity {
  id: string
  slug: string
  name: string
  subtitle: string
  description: string
  icon: string
  color: string
  parentTopicId?: string
  entityCount?: number
}

// 2.4 Artifact Entity (Hiện vật / Di vật số)
export interface ArtifactEntity extends Artifact {
  heritageId?: string
  placeId?: string
  sourceIds?: string[]
  topicIds: string[]
  relatedPersonIds?: string[]
}

// 2.5 Media Entity (Đa phương tiện & Bản quyền)
export interface MediaEntity {
  id: string
  type: 'image' | 'audio' | 'video' | 'panorama360' | 'model3d' | 'map_overlay'
  title: string
  description?: string
  url: string
  thumbnailUrl?: string
  format: string
  duration?: number // seconds for audio/video
  dimensions?: { width: number; height: number }
  license: 'public_domain' | 'cc_by_nc_nd' | 'project_exclusive' | 'author_permission'
  credit: string
  yearCaptured?: number | string
  heritageId?: string
  placeId?: string
  sourceId?: string
}

// 2.6 Source Entity (Nguồn tư liệu quy chuẩn)
export interface SourceEntity extends HeritageSource {
  fullCitation?: string
  isbnOrCode?: string
  archivalLocation?: string
  factCount?: number
}

// 2.7 Story Entity (Chuyện di sản chiều sâu)
export interface StoryEntity {
  id: string
  slug: string
  title: string
  subtitle?: string
  excerpt: string
  content: string
  role: 'story'
  coverImage: string
  heritageId?: string
  placeId?: string
  personIds?: string[]
  sourceIds: string[]
  topicIds: string[]
  readTime: number
  author: string
  publishedAt: string
  featured: boolean
  tags: string[]
}

// 2.8 Lesson Entity (Bài học / Đơn vị giáo dục)
export interface LessonEntity {
  id: string
  title: string
  subject: string
  role: 'lesson'
  tldr: string
  coreKnowledge: {
    text: string
    images?: { url: string; caption: string }[]
  }
  heritageId?: string
  topicIds: string[]
  placeIds?: string[]
  personIds?: string[]
  sourceIds?: string[]
  xpReward: number
  estimatedMinutes: number
  video?: string
  hotspotImage?: { url: string; alt?: string; hotspots: { x: number; y: number; label: string; desc: string }[] }
  timeline?: { date: string; event: string; detail?: string; image?: string }[]
  didYouKnow?: string[]
  glossary?: { term: string; definition: string }[]
  flashcards?: { front: string; back: string }[]
  openQuestions?: string[]
  quiz?: { question: string; options: string[]; correct: number; explanation: string }[]
  essay?: { prompt: string; hint?: string }
}

// 2.9 Memory Entity (Ký ức nhân chứng / Tiếng nói cộng đồng)
export interface MemoryEntity {
  id: string
  title: string
  excerpt: string
  content: string
  role: 'memory'
  coverImage: string
  author: CommunityAuthor
  heritageId?: string
  placeId?: string
  personId?: string
  topicIds: string[]
  sourceIds?: string[]
  tags: string[]
  publishedAt: string
  likes?: number
  viewCount?: number
}

// 2.10 Journal Entity (Nhật ký điền dã & Sự kiện thực địa)
export interface JournalEntity {
  id: string
  title: string
  description: string
  role: 'journal'
  type: 'field_log' | 'cultural_event' | 'research_expedition' | 'preservation_milestone'
  location: string
  placeId?: string
  heritageId?: string
  personIds?: string[]
  startDate: string
  endDate?: string
  isOnline: boolean
  participants?: string
  keyMilestones?: string[]
  findings?: string[]
  sourceIds?: string[]
  topicIds: string[]
}

// 2.11 Heritage Entity (Hồ sơ Di sản cốt lõi)
export interface HeritageEntity {
  id: string
  slug: string
  title: string
  subtitle: string
  role: 'heritage'
  category: HeritageCategory
  period: HeritagePeriod
  cluster: HeritageCluster
  year?: string
  coordinates: HeritageCoordinates
  coverImage: string
  gallery: HeritageGalleryImage[]
  shortDescription: string
  longStory: string
  quickFacts: HeritageQuickFact[]
  timeline: HeritageTimelineItem[]
  audio?: HeritageAudio
  quiz?: HeritageQuiz
  sources?: HeritageSource[]
  relatedIds: string[]
  topicIds: string[]
  placeId?: string
  tags: string[]
  references: string[]
  featured: boolean
  status: 'published' | 'draft'
  publishedAt: string
  viewCount?: number
}

// ─────────────────────────────────────────────────────────
// 3. CANONICAL FACT & SOURCE REGISTRY
// ─────────────────────────────────────────────────────────

export type VerificationStatus =
  | 'archival_confirmed' // Xác thực tuyệt đối qua văn bản nhà nước / quyết định xếp hạng / bảo tàng
  | 'verified' // Xác thực qua công trình nghiên cứu học thuật có ISBN / phản biện
  | 'field_attested' // Chứng thực qua phỏng vấn điền dã thực địa nhân chứng / già làng
  | 'unverified' // Chưa có nguồn đối chứng độc lập, đang trong diện theo dõi

export type ConflictStatus =
  | 'none' // Không có tranh chấp thông tin
  | 'disputed' // Có ý kiến dị biệt giữa các nguồn (nêu rõ trong notes)
  | 'resolved' // Đã giải quyết tranh chấp theo quan điểm khảo cứu chính thống

export interface CanonicalFact {
  id: string
  entityId: string // hrt-001, dan-da-soc-bom-bo, person-dieu-minh...
  entityType: EntityType
  field: string // "year", "coordinates", "origin", "event_date", "recipe_ingredient"...
  claim: string // Tóm tắt luận điểm sự thật
  value: string | number | boolean | Record<string, any> // Giá trị sự thật chuẩn hóa
  sourceId: string // Trỏ tới Source ID (vd: src-001-1, src-011-1)
  verification: VerificationStatus
  conflictStatus: ConflictStatus
  confidence: number // 0.0 -> 1.0 (ví dụ: 1.0 = 100% tin cậy)
  auditedAt: string // Ngày audit (YYYY-MM-DD)
  notes?: string
}

// ─────────────────────────────────────────────────────────
// 4. RELATION GRAPH SCHEMA & DETERMINISTIC ENGINE
// ─────────────────────────────────────────────────────────

export type GraphRelationType =
  | 'heritage_to_story'
  | 'heritage_to_lesson'
  | 'heritage_to_memory'
  | 'heritage_to_person'
  | 'heritage_to_place'
  | 'heritage_to_artifact'
  | 'heritage_to_media'
  | 'heritage_to_source'
  | 'heritage_to_topic'
  | 'heritage_to_journal'
  | 'story_to_person'
  | 'story_to_place'
  | 'story_to_source'
  | 'story_to_topic'
  | 'lesson_to_topic'
  | 'lesson_to_memory'
  | 'lesson_to_place'
  | 'memory_to_person'
  | 'memory_to_place'
  | 'artifact_to_place'
  | 'artifact_to_person'
  | 'journal_to_place'
  | 'journal_to_person'
  | 'related_to'

export interface GraphEdge {
  source: string // ID thực thể nguồn (vd: "hrt-011")
  target: string // ID thực thể đích (vd: "dan-da-soc-bom-bo")
  type: GraphRelationType
  weight: number // 1 -> 100
  bidirectional?: boolean
  description?: string
}

export interface DeterministicRelatedItem {
  id: string
  entityType?: EntityType
  type?: EntityType
  role: ContentRole | 'reference' | 'context'
  title: string
  subtitle?: string
  slug?: string
  url?: string
  route?: string
  image?: string
  coverImage?: string
  score: number // Trọng số liên quan tính toán được
  reason?: string // Giải trình lý do liên quan (ví dụ: "Cùng chủ đề Cồng Chiêng", "Cùng cụm Sóc Bom Bo")
  matchReasons?: string[]
}

// ─────────────────────────────────────────────────────────
// 5. CONTENT QUALITY SCORE MATRIX (8 VECTORS)
// ─────────────────────────────────────────────────────────

export type QualityVectorKey =
  | 'evidence' // Căn cứ chứng cứ & hồ sơ nguồn (0 - 15)
  | 'uniqueness' // Tính độc bản, không trùng lặp câu chữ (0 - 15)
  | 'specificity' // Chi tiết con số, địa danh, tên riêng cụ thể (0 - 15)
  | 'usefulness' // Giá trị học tập / tra cứu thực tiễn (0 - 15)
  | 'depth' // Chiều sâu phân tích, bối cảnh, nhân văn (0 - 10)
  | 'media' // Đa phương tiện đi kèm (ảnh, audio, 3D) (0 - 10)
  | 'relationship' // Độ kết nối trong relation graph (0 - 10)
  | 'credibility' // Độ tin cậy & trạng thái xác minh (0 - 10)

export type QualityGrade = 'A+' | 'A' | 'B' | 'C' | 'D'

export interface ContentQualityScore {
  entityId: string
  entityType: EntityType
  title?: string
  evidence?: number
  uniqueness?: number
  specificity?: number
  usefulness?: number
  depth?: number
  media?: number
  relationship?: number
  credibility?: number
  compositeScore?: number
  tier?: 'diamond' | 'gold' | 'silver' | 'bronze'
  evaluatedAt?: string
  recommendations?: string[]
  vectors?: Record<QualityVectorKey, number>
  totalScore?: number // Max 100
  grade?: QualityGrade
  strengths?: string[]
  weaknesses?: string[]
  suggestions?: string[]
  lastAudited?: string
}
