import type { Ref } from 'vue'
import type { Heritage, NewsArticle } from '~/types'

const SITE_NAME = 'Di Sản Bù Đăng'
const SITE_DESCRIPTION = 'Số hóa di sản văn hóa phi vật thể S\'Tiêng, M\'Nông tại Xã Bù Đăng - Thành Phố Đồng Nai. 16 di sản, audio guide, bản đồ tương tác, Quiz lịch sử địa phương.'
const SITE_URL = 'https://disanbudang.com'
const DEFAULT_IMAGE = '/images/og-default.jpg'

interface MuseumSeoInput {
  title?: string
  description?: string
  image?: string
  path?: string
  type?: 'website' | 'article'
}

export function toAbsoluteUrl(path: string): string {
  if (!path) return `${SITE_URL}${DEFAULT_IMAGE}`
  if (/^https?:\/\//i.test(path)) return path
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

export function ensureTrailingSlash(path: string): string {
  if (!path || path === '/') return '/'
  const parts = path.split('?')
  const base = parts[0] || ''
  const query = parts[1]
  const hasExtension = /\.[a-z5-9]+$/i.test(base)
  const cleanPath = base.endsWith('/') || hasExtension ? base : `${base}/`
  return query ? `${cleanPath}?${query}` : cleanPath
}

export function isArticleRoute(path: string): boolean {
  const normalized = path.toLowerCase()
  return (
    normalized.includes('/heritage/') ||
    normalized.includes('/news/') ||
    normalized.includes('/study/lesson/') ||
    normalized.includes('/explore/virtual-tour')
  )
}

export function buildBreadcrumbSchema(path: string, pageTitle?: string) {
  const parts = path.split('/').filter(Boolean)
  if (parts.length === 0) return null

  const items = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Trang chủ',
      item: SITE_URL,
    }
  ]

  let currentPath = ''
  parts.forEach((part, index) => {
    currentPath += `/${part}`
    const segmentLabels: Record<string, string> = {
      library: 'Thư viện di sản',
      map: 'Bản đồ di sản',
      community: 'Cộng đồng',
      quiz: 'Trò chơi khám phá',
      school: 'Góc học tập',
      news: 'Bài viết & Sự kiện',
      about: 'Giới thiệu',
      explore: 'Khám phá',
      study: 'Góc học tập',
      lesson: 'Bài học',
      heritage: 'Di sản',
      contribute: 'Đóng góp',
      contact: 'Liên hệ',
      invest: 'Đầu tư',
    }
    let name = segmentLabels[part] ?? part.charAt(0).toUpperCase() + part.slice(1)
    
    if (index === parts.length - 1 && pageTitle) {
      name = pageTitle.split(' — ')[0] || pageTitle
    }

    items.push({
      '@type': 'ListItem',
      position: index + 2,
      name,
      item: `${SITE_URL}${ensureTrailingSlash(currentPath)}`,
    })
  })

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  }
}

export function useMuseumSeo(input: MuseumSeoInput = {}) {
  const route = useRoute()
  let title = input.title ? `${input.title} - ${SITE_NAME}` : `${SITE_NAME} - Bảo Tàng Số Địa Phương`
  let description = input.description ?? SITE_DESCRIPTION

  // Clean invalid characters (em-dash/en-dash)
  title = title.replace(/—/g, '-').replace(/–/g, '-')
  description = description.replace(/—/g, '-').replace(/–/g, '-')

  // Enforce title limits
  const titleLimit = isArticleRoute(route.path) ? 80 : 60
  if (title.length > titleLimit) {
    title = title.slice(0, titleLimit - 3).trim() + '...'
  }

  // Enforce description limit
  if (description.length > 155) {
    description = description.slice(0, 152).trim() + '...'
  }

  const image = toAbsoluteUrl(input.image ?? DEFAULT_IMAGE)
  const canonical = `${SITE_URL}${ensureTrailingSlash(input.path ?? route.path)}`

  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogImage: image,
    ogType: input.type ?? 'website',
    ogSiteName: SITE_NAME,
    twitterCard: 'summary_large_image',
  })

  // Geo position meta tag (homepage only)
  if (route.path === '/') {
    useHead({
      meta: [
        { name: 'geo.position', content: '10.9447;106.8243' },
        { name: 'geo.placename', content: 'Thành Phố Đồng Nai' },
        { name: 'geo.region', content: 'VN-39' },
      ],
    })
  }

  // Build scripts array
  const scripts: any[] = []

  // Global Organization, WebSite, and WebPage Schema (only on homepage)
  if (route.path === '/') {
    scripts.push({
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Organization',
            '@id': `${SITE_URL}/#organization`,
            'name': SITE_NAME,
            'alternateName': [
              'Bảo Tàng Số Di Sản Thành Phố Đồng Nai',
              'Di Sản Bù Đăng',
            ],
            'url': `${SITE_URL}/`,
            'logo': `${SITE_URL}/favicon/icon-192.png`,
            'description': SITE_DESCRIPTION,
            'foundingDate': '2025',
            'founder': {
              '@type': 'Person',
              '@id': `${SITE_URL}/#author`,
              'name': 'Nguyễn Xuân Kiệt',
              'jobTitle': 'Học sinh, tác giả dự án',
              'affiliation': {
                '@type': 'EducationalOrganization',
                'name': 'THPT Lê Quý Đôn, Thành Phố Đồng Nai',
              },
            },
            'address': {
              '@type': 'PostalAddress',
              'addressLocality': 'Thành Phố Đồng Nai',
              'addressCountry': 'VN'
            },
            'knowsAbout': [
              'Lịch sử Thành Phố Đồng Nai',
              'Văn hóa dân tộc S\'tiêng',
              'Di sản thiên nhiên Đồng Nai - Bình Phước cũ',
              'Du lịch sinh thái Thành Phố Đồng Nai',
              'Chiến Khu Đ',
              'Cồng chiêng Tây Nguyên',
              'Sóc Bom Bo',
              'Núi Bà Rá',
              'Căn cứ Tà Thiết',
            ]
          },
          {
            '@type': 'WebSite',
            '@id': `${SITE_URL}/#website`,
            'url': `${SITE_URL}/`,
            'name': SITE_NAME,
            'alternateName': ['Di Sản Bù Đăng', 'di san bu dang', 'disanbudang'],
            'publisher': {
              '@id': `${SITE_URL}/#organization`
            },
            'potentialAction': {
              '@type': 'SearchAction',
              'target': {
                '@type': 'EntryPoint',
                'urlTemplate': `${SITE_URL}/explore/?search={search_term_string}`
              },
              'query-input': 'required name=search_term_string'
            }
          },
          {
            '@type': 'WebPage',
            '@id': `${SITE_URL}/#webpage`,
            'url': `${SITE_URL}/`,
            'name': `${SITE_NAME} - Bảo Tàng Số Địa Phương`,
            'description': SITE_DESCRIPTION,
            'isPartOf': {
              '@id': `${SITE_URL}/#website`
            },
            'about': {
              '@id': `${SITE_URL}/#organization`
            }
          },
          // NOTE: FAQPage schema is owned by FAQSection.vue (matches visible FAQ content).
          // Do not add a second FAQPage here — Google penalizes duplicate FAQPage per page.
        ]
      })
    })
  }

  // Dynamic Breadcrumb Schema
  const breadcrumb = buildBreadcrumbSchema(route.path, input.title)
  if (breadcrumb) {
    scripts.push({
      type: 'application/ld+json',
      innerHTML: JSON.stringify(breadcrumb)
    })
  }

  useHead({
    link: [{ rel: 'canonical', href: canonical }],
    script: scripts
  })
}

export function useHeritageSeo(heritage: Ref<Heritage | null>) {
  watchEffect(() => {
    if (!heritage.value) return

    useMuseumSeo({
      title: heritage.value.title,
      description: heritage.value.shortDescription,
      image: heritage.value.coverImage,
      path: `/heritage/${heritage.value.slug}`,
      type: 'article',
    })

    // TouristAttraction + LandmarksOrHistoricalBuildings: strongest signals for
    // heritage/tourism entities in Google rich results and AI answers
    useHead({
      script: [
        {
          type: 'application/ld+json',
          key: 'heritage-detail-jsonld',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': ['TouristAttraction', 'LandmarksOrHistoricalBuildings'],
            name: heritage.value.title,
            alternateName: heritage.value.subtitle,
            description: heritage.value.shortDescription,
            image: toAbsoluteUrl(heritage.value.coverImage),
            url: `${SITE_URL}${ensureTrailingSlash(`/heritage/${heritage.value.slug}`)}`,
            isAccessibleForFree: true,
            touristType: ['Học sinh', 'Du khách tự túc', 'Nhà nghiên cứu'],
            hasMap: `${SITE_URL}/map/?select=${heritage.value.id}`,
            geo: {
              '@type': 'GeoCoordinates',
              latitude: heritage.value.coordinates.lat,
              longitude: heritage.value.coordinates.lng,
            },
            containedInPlace: {
              '@type': 'AdministrativeArea',
              name: 'Thành Phố Đồng Nai',
            },
            isPartOf: {
              '@type': 'WebSite',
              name: SITE_NAME,
              url: `${SITE_URL}/`,
            },
          }),
        },
      ],
    })
  })
}

export function buildArticleSchema(article: NewsArticle) {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.excerpt,
    image: toAbsoluteUrl(article.coverImage),
    datePublished: article.publishedAt,
    author: article.author ? { '@type': 'Person', name: article.author } : undefined,
    mainEntityOfPage: `${SITE_URL}${ensureTrailingSlash(`/news/${article.slug}`)}`,
    url: `${SITE_URL}${ensureTrailingSlash(`/news/${article.slug}`)}`,
    publisher: { 
      '@type': 'Organization', 
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/favicon/icon-192.png`
      }
    },
  }
}

export function useStudySeo() {
  useMuseumSeo({
    title: 'Cổng Học Tập Số Di Sản',
    description: 'Nền tảng học tập di sản số hóa tương tác: flashcards, quiz, AI tra cứu, thư viện tài liệu và hành trình khám phá văn hóa Thành Phố Đồng Nai dành cho học sinh, giáo viên.',
    image: '/images/heritage/op-og-preview.jpg',
    path: '/study',
  })

  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'EducationalOrganization',
          name: 'Góc Học Tập Di Sản Thành Phố Đồng Nai',
          url: `${SITE_URL}/study/`,
          description: 'Không gian học tập số về di sản văn hóa, lịch sử và thiên nhiên Thành Phố Đồng Nai',
          provider: {
            '@type': 'Organization',
            name: SITE_NAME,
            url: SITE_URL,
          },
          teaches: ['Lịch sử địa phương', 'Văn hóa dân tộc thiểu số S\'tiêng', 'Di sản thiên nhiên Đồng Nai'],
          educationalLevel: ['Trung học cơ sở', 'Trung học phổ thông'],
          inLanguage: 'vi',
          availableLanguage: 'Vietnamese',
          hasCourse: [
            {
              '@type': 'Course',
              name: 'Lịch Sử Chiến Khu Đ',
              description: 'Khám phá lịch sử hào hùng của căn cứ địa cách mạng Chiến Khu Đ giữa đại ngàn Thành Phố Đồng Nai',
              courseCode: 'DSB-HIST-001',
              provider: { '@type': 'Organization', name: SITE_NAME },
            },
            {
              '@type': 'Course',
              name: 'Văn Hóa S\'tiêng Bản Địa',
              description: 'Tìm hiểu thổ cẩm, cồng chiêng và ngôn ngữ S\'tiêng của đồng bào dân tộc bản địa Thành Phố Đồng Nai',
              courseCode: 'DSB-CULT-001',
              provider: { '@type': 'Organization', name: SITE_NAME },
            },
          ],
        }),
      },
    ],
  })
}

export function useNewsSeo(article: Ref<NewsArticle | null>) {
  watchEffect(() => {
    if (!article.value) return

    useMuseumSeo({
      title: article.value.title,
      description: article.value.excerpt,
      image: article.value.coverImage,
      path: `/news/${article.value.slug}`,
      type: 'article',
    })

    useHead({
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify(buildArticleSchema(article.value)),
        },
      ],
    })
  })
}

