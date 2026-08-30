import { HERITAGES } from '../../app/data/heritages'
import { NEWS_ARTICLES, COMMUNITY_POSTS, EVENTS } from '../../app/data/posts'

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
    '/study/lesson/chien-khu-d/',
    '/study/lesson/cong-chieng-stieng/',
    '/study/lesson/soc-bom-bo/',
    '/study/lesson/trang-co-bu-lach/',
    '/study/lesson/nui-ba-ra/',
    '/study/lesson/can-cu-nua-lon/',
    '/study/lesson/chien-thang-phuoc-long/',
    '/study/lesson/can-cu-ta-thiet/',
    '/study/lesson/tho-cam-stieng/',
    '/study/lesson/thac-dung-dak-wuar/',
    ...COMMUNITY_POSTS.map((p) => `/explore/${p.id}/`),
    ...COMMUNITY_POSTS.map((p) => `/explore/post/${p.id}/`),
  ]

  return routes.map((loc) => ({
    loc,
    changefreq: 'weekly',
    priority: loc === '/' ? 1.0 : (loc.startsWith('/heritage/') && !loc.includes('/qr/')) ? 0.9 : 0.8,
  }))
})
