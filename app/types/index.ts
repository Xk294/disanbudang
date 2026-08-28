// =========================================================
// TYPES — DI SẢN BÙ ĐĂNG
// =========================================================

export type HeritageCategory =
  | 'lich-su'
  | 'danh-thang'
  | 'van-hoa-phi-vat-the'
  | 'doi-song-cong-dong'
  | 'giao-duc-truyen-thong'

export type HeritagePeriod =
  | 'tien-su'
  | 'phong-kien'
  | 'phap-thuoc'
  | 'khang-chien'
  | 'hien-dai'

// Cụm địa lý — kết nối di sản khởi nguồn Bù Đăng ra toàn Thành Phố Đồng Nai.
// Không phải ranh giới hành chính chặt, mà là nhóm điểm di sản gần nhau,
// dùng để gợi ý hành trình tham quan liên xã trên bản đồ và thư viện.
export type HeritageCluster =
  | 'bu-dang'
  | 'bom-bo'
  | 'phuoc-long'
  | 'loc-ninh'

export interface HeritageCoordinates {
  lat: number
  lng: number
}

export interface HeritageQuickFact {
  label: string
  value: string
  icon?: string
}

export interface HeritageAudio {
  id: string
  title: string
  narrator: string
  narratorRole?: string
  duration: number // seconds
  url: string
  transcript?: string
  coverImage?: string
}

export interface HeritageTimelineItem {
  year: string
  title: string
  description: string
  image?: string
}

export interface HeritageGalleryImage {
  src: string
  alt: string
  caption?: string
  photographer?: string
}

export interface HeritageQuizQuestion {
  id: string
  question: string
  options: string[]
  correctIndex: number
  explanation?: string
  image?: string
}

export interface HeritageQuiz {
  id: string
  heritageId: string
  title: string
  description?: string
  questions: HeritageQuizQuestion[]
  badgeId?: string
}

export interface HeritageSource {
  id: string
  type: 'primary' | 'academic' | 'oral' | 'fieldwork'
  title: string
  author?: string
  institution?: string
  publishedYear?: number | string
  referenceCode?: string
  url?: string
  credibility: 'official' | 'research' | 'community'
  notes?: string
}

export interface Heritage {
  id: string
  slug: string
  title: string
  subtitle: string
  category: HeritageCategory
  period: HeritagePeriod
  cluster: HeritageCluster
  year?: string
  coverImage: string
  gallery: HeritageGalleryImage[]
  coordinates: HeritageCoordinates
  shortDescription: string
  longStory: string
  quickFacts: HeritageQuickFact[]
  timeline: HeritageTimelineItem[]
  audio?: HeritageAudio
  video?: {
    title: string
    url: string
    coverImage?: string
  }
  quiz?: HeritageQuiz
  sources?: HeritageSource[]
  relatedIds: string[]
  tags: string[]
  references: string[]
  featured: boolean
  status: 'published' | 'draft'
  publishedAt: string
  viewCount?: number
}

// =========================================================
// CATEGORIES
// =========================================================

export interface HeritageCategory_Meta {
  id: HeritageCategory
  label: string
  labelShort: string
  description: string
  icon: string
  color: string
  textColor: string
  bgClass: string
  count?: number
}

export interface HeritageCluster_Meta {
  id: HeritageCluster
  label: string
  description: string
  icon: string
  color: string
}

// =========================================================
// COMMUNITY / POSTS
// =========================================================

export type PostType = 'story' | 'artwork' | 'photo' | 'memory' | 'research'

export interface CommunityAuthor {
  id: string
  name: string
  role: string
  school?: string
  avatar?: string
  grade?: string
}

export interface CommunityPost {
  id: string
  type: PostType
  title: string
  excerpt: string
  content?: string
  coverImage: string
  additionalImages?: string[]
  author: CommunityAuthor
  heritageId?: string
  tags: string[]
  likes?: number
  viewCount?: number
  featured: boolean
  publishedAt: string
}

// =========================================================
// NEWS & EVENTS
// =========================================================

export type NewsCategory = 'su-kien' | 'tin-tuc' | 'nghien-cuu' | 'hoat-dong'

export interface NewsArticle {
  id: string
  slug: string
  title: string
  subtitle?: string
  excerpt: string
  content?: string
  coverImage: string
  category: NewsCategory
  author?: string
  publishedAt: string
  readTime: number // minutes
  featured: boolean
  tags: string[]
}

export interface Event {
  id: string
  title: string
  description: string
  location: string
  startDate: string
  endDate?: string
  image?: string
  type: 'su-kien' | 'trien-lam' | 'hoi-thao' | 'hoat-dong-truong-hoc'
  isOnline: boolean
  registrationUrl?: string
}

// =========================================================
// QUIZ / GAMIFICATION
// =========================================================

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  color: string
  condition: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
}

export interface QuizResult {
  quizId: string
  score: number
  total: number
  timeSpent: number
  completedAt: string
  badgeEarned?: string
}

export interface UserProgress {
  completedQuizzes: string[]
  earnedBadges: string[]
  totalScore: number
  visitedHeritages: string[]
}

// =========================================================
// SCHOOL CORNER
// =========================================================

export interface SchoolResource {
  id: string
  title: string
  description: string
  type: 'research' | 'presentation' | 'artwork' | 'document' | 'video'
  subject: string
  grade: string
  school: string
  author: string
  fileUrl?: string
  coverImage?: string
  publishedAt: string
  featured: boolean
  downloadCount: number
}

// =========================================================
// MAP
// =========================================================

export interface MapFilter {
  categories: HeritageCategory[]
  periods: HeritagePeriod[]
  clusters: HeritageCluster[]
  search: string
}

export interface MapPopupData {
  heritage: Heritage
  position: HeritageCoordinates
}

// =========================================================
// AUDIO PLAYER
// =========================================================

export interface AudioPlayerState {
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
  isMuted: boolean
  currentTrack: HeritageAudio | null
  heritageId: string | null
}

// =========================================================
// TOURISM & INVESTMENT MVP
// =========================================================

export interface TourismService {
  id: string
  name: string
  type: 'homestay' | 'restaurant' | 'specialty' | 'tour'
  description: string
  image?: string
  address: string
  phone?: string
  priceRange?: string
  coordinates?: HeritageCoordinates
}

export interface InvestmentOpportunity {
  id: string
  title: string
  category: 'agriculture' | 'tourism' | 'infrastructure' | 'industry'
  description: string
  potential: string
  contactEmail: string
}
