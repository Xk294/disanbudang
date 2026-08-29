export interface SchoolResourceExtended {
  id: string
  title: string
  description: string
  type: 'research' | 'presentation' | 'artwork' | 'document' | 'video'
  subject: string
  grade: string
  school: string
  author: string
  coverImage?: string
  publishedAt: string
  featured: boolean
  downloadCount: number
  motivation?: string
  keyFindings?: string[]
  fileSize?: string
  fileUrl?: string
  quizId?: string
  pages?: string[]
  difficulty?: number
}

export interface TextAnnotation {
  id: string
  bookId: string
  page: number
  text: string
  note?: string
}

export interface GlossaryTerm {
  term: string
  pronunciation: string
  definition: string
  category: 'Tâm Linh' | 'Ẩm Thực' | 'Địa Danh' | 'Vật Dụng'
  isFlipped?: boolean
}

export interface MapLandmark {
  id: string
  name: string
  desc: string
  icon: string
  x: number
  y: number
  audioGuide?: boolean
  paper?: SchoolResourceExtended
}

export interface ImageStory {
  title: string
  tag: string
  image: string
  story: string
}
