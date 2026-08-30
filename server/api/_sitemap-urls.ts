import { HERITAGES } from '../../app/data/heritages'
import { NEWS_ARTICLES, COMMUNITY_POSTS, EVENTS } from '../../app/data/posts'
import { LESSONS_DATA } from '../../app/data/lessons'

export default defineEventHandler(() => {
  const routes = [
    '/',
    '/about/',
    '/explore/',
    '/explore/virtual-tour/',
    '/study/',
    '/map/',
    '/contact/',
    '/contribute/',
    '/stories/',
    '/journal/',
    ...HERITAGES.map((h) => `/heritage/${h.slug}/`),
    ...HERITAGES.map((h) => `/heritage/qr/${h.slug}/`),
    ...NEWS_ARTICLES.map((n) => `/stories/${n.slug}/`),
    ...EVENTS.map((e) => `/journal/${e.id}/`),
    ...Object.keys(LESSONS_DATA).map((id) => `/study/lesson/${id}/`),
    ...COMMUNITY_POSTS.map((p) => `/explore/${p.id}/`),
    ...COMMUNITY_POSTS.map((p) => `/explore/post/${p.id}/`),
  ]

  return routes.map((loc) => ({
    loc,
    changefreq: 'weekly',
    priority: loc === '/' ? 1.0 : (loc.startsWith('/heritage/') && !loc.includes('/qr/')) ? 0.9 : 0.8,
  }))
})
