import type { Ref } from 'vue'
import type { Heritage, NewsArticle } from '~/types'

export const SITE_NAME = 'Di Sản Bù Đăng'
export const SITE_HOMEPAGE_TITLE = 'Di Sản Bù Đăng | Bảo tàng số xã Bù Đăng, TP Đồng Nai'
export const SITE_DESCRIPTION = 'Bảo tàng số di sản văn hóa, lịch sử và thiên nhiên Thành Phố Đồng Nai. 16 di sản số hóa, audio guide thuyết minh, bản đồ tương tác và góc học tập.'
export const SITE_URL = 'https://disanbudang.com'
export const DEFAULT_IMAGE = '/images/og-default.jpg'

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
  const cleanPath = path.split('?')[0]?.split('#')[0] || '/'
  if (cleanPath === '/') return '/'
  const hasExtension = /\.[a-z0-9]+$/i.test(cleanPath)
  return cleanPath.endsWith('/') || hasExtension ? cleanPath : `${cleanPath}/`
}

export function buildCanonicalUrl(path: string): string {
  return `${SITE_URL}${ensureTrailingSlash(path)}`
}

export function isArticleRoute(path: string): boolean {
  const normalized = path.toLowerCase()
  return (
    normalized.includes('/heritage/') ||
    normalized.includes('/stories/') ||
    normalized.includes('/journal/') ||
    normalized.includes('/study/lesson/') ||
    normalized.includes('/explore/virtual-tour') ||
    normalized.includes('/explore/post/') ||
    normalized.includes('/explore/post-')
  )
}

export function buildBreadcrumbSchema(path: string, pageTitle?: string) {
  const cleanPath = path.split('?')[0]?.split('#')[0] || ''
  const parts = cleanPath.split('/').filter(Boolean)
  if (parts.length === 0) return null

  const items = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Trang chủ',
      item: `${SITE_URL}/`,
    }
  ]

  let currentPath = ''
  parts.forEach((part, index) => {
    currentPath += `/${part}`
    const segmentLabels: Record<string, string> = {
      about: 'Giới thiệu',
      explore: 'Thư viện',
      map: 'Bản đồ',
      stories: 'Chuyện di sản',
      study: 'Góc học tập',
      lesson: 'Bài học',
      journal: 'Nhật ký điền dã',
      heritage: 'Di sản',
      contribute: 'Đóng góp',
      contact: 'Liên hệ',
      'virtual-tour': 'Tour ảo 360°',
      post: 'Ký ức cộng đồng',
      qr: 'Trải nghiệm QR',
    }
    let name = segmentLabels[part] ?? part.charAt(0).toUpperCase() + part.slice(1)
    
    if (index === parts.length - 1 && pageTitle) {
      name = pageTitle.split(' | ')[0] || pageTitle.split(' — ')[0] || pageTitle
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
  const routePath = route.path.replace(/\/$/, '') || '/'

  // Exact Title Strategy
  let title = ''
  if (input.title) {
    if (input.title.includes('|')) {
      title = input.title
    } else {
      title = `${input.title} | ${SITE_NAME}`
    }
  } else if (routePath === '/') {
    title = SITE_HOMEPAGE_TITLE
  } else {
    title = `${SITE_NAME} | Bảo tàng số xã Bù Đăng, TP Đồng Nai`
  }

  let description = input.description ?? SITE_DESCRIPTION

  // Clean invalid characters & normalize whitespace
  title = title.replace(/—/g, '-').replace(/–/g, '-').replace(/\s+/g, ' ').trim()
  description = description.replace(/—/g, '-').replace(/–/g, '-').replace(/\s+/g, ' ').trim()

  // Enforce title & description limits (no stuffing)
  const titleLimit = isArticleRoute(route.path) ? 80 : 70
  if (title.length > titleLimit) {
    title = title.slice(0, titleLimit - 3).trim() + '...'
  }

  if (description.length > 155) {
    description = description.slice(0, 152).trim() + '...'
  }

  const image = toAbsoluteUrl(input.image ?? DEFAULT_IMAGE)
  const canonical = buildCanonicalUrl(input.path ?? route.path)

  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogImage: image,
    ogUrl: canonical,
    ogType: input.type ?? 'website',
    ogSiteName: SITE_NAME,
    ogLocale: 'vi_VN',
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: image,
  })

  // Geo position meta tag for local SEO
  if (routePath === '/') {
    useHead({
      meta: [
        { name: 'geo.position', content: '11.7589;107.1325' },
        { name: 'geo.placename', content: 'Xã Bù Đăng, Thành Phố Đồng Nai' },
        { name: 'geo.region', content: 'VN-39' },
      ],
    })
  }

  // Scripts array for JSON-LD schemas
  const scripts: any[] = []

  // Global Organization, WebSite Schema (only on homepage)
  if (routePath === '/') {
    scripts.push({
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Organization',
            '@id': `${SITE_URL}/#organization`,
            name: SITE_NAME,
            alternateName: [
              'Bảo Tàng Số Di Sản Bù Đăng',
              'Bảo Tàng Số Thành Phố Đồng Nai',
            ],
            url: `${SITE_URL}/`,
            logo: {
              '@type': 'ImageObject',
              url: `${SITE_URL}/favicon/icon-192.png`,
              width: 192,
              height: 192,
            },
            description: SITE_DESCRIPTION,
            foundingDate: '2025',
            founder: {
              '@type': 'Person',
              '@id': `${SITE_URL}/#author`,
              name: 'Nguyễn Xuân Kiệt',
              jobTitle: 'Học sinh, tác giả dự án',
              affiliation: {
                '@type': 'EducationalOrganization',
                name: 'THPT Lê Quý Đôn, Thành Phố Đồng Nai',
              },
            },
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Xã Bù Đăng',
              addressRegion: 'Thành Phố Đồng Nai',
              addressCountry: 'VN',
            },
            knowsAbout: [
              'Lịch sử Thành Phố Đồng Nai',
              'Văn hóa dân tộc S\'Tiêng',
              'Văn hóa dân tộc M\'Nông',
              'Chiến Khu Đ',
              'Không gian văn hóa Cồng chiêng Tây Nguyên',
              'Sóc Bom Bo',
              'Núi Bà Rá',
              'Căn cứ Tà Thiết',
              'Căn cứ Nửa Lon',
            ],
          },
          {
            '@type': 'WebSite',
            '@id': `${SITE_URL}/#website`,
            url: `${SITE_URL}/`,
            name: SITE_NAME,
            alternateName: ['Di Sản Bù Đăng', 'di san bu dang', 'disanbudang'],
            publisher: {
              '@id': `${SITE_URL}/#organization`,
            },
            inLanguage: 'vi',
            potentialAction: {
              '@type': 'SearchAction',
              target: {
                '@type': 'EntryPoint',
                urlTemplate: `${SITE_URL}/explore/?search={search_term_string}`,
              },
              'query-input': 'required name=search_term_string',
            },
          },
          {
            '@type': 'WebPage',
            '@id': `${SITE_URL}/#webpage`,
            url: `${SITE_URL}/`,
            name: SITE_HOMEPAGE_TITLE,
            description: SITE_DESCRIPTION,
            isPartOf: {
              '@id': `${SITE_URL}/#website`,
            },
            about: {
              '@id': `${SITE_URL}/#organization`,
            },
            inLanguage: 'vi',
          },
        ],
      }),
    })
  }

  // Dynamic BreadcrumbList Schema (for all subpages)
  if (routePath !== '/') {
    const breadcrumb = buildBreadcrumbSchema(route.path, input.title)
    if (breadcrumb) {
      scripts.push({
        type: 'application/ld+json',
        innerHTML: JSON.stringify(breadcrumb),
      })
    }
  }

  useHead({
    link: [{ rel: 'canonical', href: canonical }],
    script: scripts,
  })
}

export function useHeritageSeo(heritage: Ref<Heritage | null>) {
  watchEffect(() => {
    if (!heritage.value) return

    const h = heritage.value
    useMuseumSeo({
      title: `${h.title} | ${SITE_NAME}`,
      description: h.shortDescription,
      image: h.coverImage,
      path: `/heritage/${h.slug}`,
      type: 'article',
    })

    const schemaTypes = ['TouristAttraction', 'Place']
    if (h.archetype === 'historical') {
      schemaTypes.push('LandmarksOrHistoricalBuildings')
    }

    const scripts: any[] = [
      {
        type: 'application/ld+json',
        key: 'heritage-detail-jsonld',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': schemaTypes,
          name: h.title,
          alternateName: h.subtitle,
          description: h.shortDescription,
          image: {
            '@type': 'ImageObject',
            url: toAbsoluteUrl(h.coverImage),
          },
          url: buildCanonicalUrl(`/heritage/${h.slug}`),
          isAccessibleForFree: true,
          touristType: ['Học sinh', 'Du khách', 'Nhà nghiên cứu văn hóa'],
          hasMap: `${SITE_URL}/map/?select=${h.id}`,
          geo: {
            '@type': 'GeoCoordinates',
            latitude: h.coordinates.lat,
            longitude: h.coordinates.lng,
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
    ]

    // AudioObject schema if heritage has audio guide
    if (h.audio) {
      scripts.push({
        type: 'application/ld+json',
        key: 'heritage-audio-jsonld',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'AudioObject',
          name: h.audio.title,
          description: `Bản thuyết minh audio di sản ${h.title} bởi ${h.audio.narrator}`,
          contentUrl: toAbsoluteUrl(h.audio.url),
          duration: `PT${Math.floor(h.audio.duration / 60)}M${h.audio.duration % 60}S`,
          encodingFormat: 'audio/mpeg',
          inLanguage: 'vi',
          author: {
            '@type': 'Person',
            name: h.audio.narrator,
          },
        }),
      })
    }

    useHead({ script: scripts })
  })
}

export function useStorySeo(article: Ref<NewsArticle | null>) {
  watchEffect(() => {
    if (!article.value) return

    const art = article.value
    useMuseumSeo({
      title: `${art.title} | ${SITE_NAME}`,
      description: art.excerpt,
      image: art.coverImage,
      path: `/stories/${art.slug}`,
      type: 'article',
    })

    const scripts: any[] = [
      {
        type: 'application/ld+json',
        key: 'story-article-jsonld',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: art.title,
          description: art.excerpt,
          image: {
            '@type': 'ImageObject',
            url: toAbsoluteUrl(art.coverImage),
          },
          datePublished: art.publishedAt,
          dateModified: art.publishedAt,
          inLanguage: 'vi',
          author: art.author ? { '@type': 'Person', name: art.author } : { '@type': 'Organization', name: SITE_NAME },
          mainEntityOfPage: buildCanonicalUrl(`/stories/${art.slug}`),
          url: buildCanonicalUrl(`/stories/${art.slug}`),
          publisher: {
            '@type': 'Organization',
            name: SITE_NAME,
            logo: {
              '@type': 'ImageObject',
              url: `${SITE_URL}/favicon/icon-192.png`,
            },
          },
        }),
      },
    ]

    // Add Recipe schema for culinary stories
    if (art.slug === 'canh-thut-doc-ban-stieng-bu-dang') {
      scripts.push({
        type: 'application/ld+json',
        key: 'story-recipe-jsonld',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Recipe',
          name: 'Canh Thụt S\'Tiêng Bù Đăng',
          description: 'Món canh độc đáo của người S\'Tiêng nấu trong ống tre lồ ô với đọt mây, lá nhíp, cá suối và ớt hiểm nướng than củi rừng.',
          image: toAbsoluteUrl(art.coverImage),
          author: { '@type': 'Organization', name: 'Đồng bào S\'Tiêng Xã Bù Đăng' },
          recipeCuisine: 'S\'Tiêng',
          recipeCategory: 'Món canh truyền thống',
          prepTime: 'PT30M',
          cookTime: 'PT45M',
          recipeYield: '4-6 phần',
          recipeIngredient: [
            'Ống tre lồ ô bánh tẻ',
            'Đọt mây rừng',
            'Lá nhíp rừng non',
            'Cá suối hoặc thịt nướng than',
            'Ớt hiểm rừng',
            'Cà pháo rừng và muối hột',
          ],
          recipeInstructions: [
            {
              '@type': 'HowToStep',
              text: 'Chuẩn bị ống tre lồ ô tươi nguyên, rửa sạch các loại rau rừng và đọt mây.',
            },
            {
              '@type': 'HowToStep',
              text: 'Cho toàn bộ nguyên liệu vào ống tre lồ ô, nêm muối hột và ớt hiểm rừng.',
            },
            {
              '@type': 'HowToStep',
              text: 'Đưa ống tre lên bếp than hồng, dựng nghiêng và nướng chín đều.',
            },
            {
              '@type': 'HowToStep',
              text: 'Dùng que tre thụt nhuyễn nguyên liệu bên trong ống rồi thưởng thức nóng.',
            },
          ],
        }),
      })
    } else if (art.slug === 'com-lam-nep-nuong-stieng-bu-dang') {
      scripts.push({
        type: 'application/ld+json',
        key: 'story-recipe-jsonld',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Recipe',
          name: 'Cơm Lam Nếp Nương S\'Tiêng',
          description: 'Món cơm lam thơm dẻo từ nếp rẫy nương nướng trong ống nứa non bên suối nguồn đại ngàn.',
          image: toAbsoluteUrl(art.coverImage),
          recipeCuisine: 'S\'Tiêng',
          recipeCategory: 'Món ăn truyền thống',
          recipeIngredient: [
            'Gạo nếp nương nương rẫy',
            'Nước suối nguồn tinh khiết',
            'Ống tre nứa non bánh tẻ',
            'Lá chuối rừng bịt đầu ống',
          ],
        }),
      })
    } else if (art.slug === 'ruou-can-stieng-bu-dang-men-la-rung') {
      scripts.push({
        type: 'application/ld+json',
        key: 'story-recipe-jsonld',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Recipe',
          name: 'Rượu Cần Men Lá Rừng S\'Tiêng (Đ\'rắp S\'lung)',
          description: 'Nghệ thuật ủ rượu cần truyền thống S\'Tiêng sử dụng men lá cây Krông và rễ thảo mộc rừng già.',
          image: toAbsoluteUrl(art.coverImage),
          recipeCuisine: 'S\'Tiêng',
          recipeCategory: 'Đồ uống lễ hội truyền thống',
          recipeIngredient: [
            'Gạo nếp rẫy hoặc hạt kê',
            'Vỏ cây Krông rừng làm men',
            'Rễ cây Đơn và nghệ rừng',
            'Trấu sạch ủ men',
          ],
        }),
      })
    }

    useHead({ script: scripts })
  })
}

export function useStudySeo() {
  useMuseumSeo({
    title: 'Góc Học Tập Di Sản | Di Sản Bù Đăng',
    description: 'Kho tư liệu giáo dục số, 10 bài học tương tác, tài liệu giảng dạy và bộ trắc nghiệm lịch sử văn hóa Bù Đăng.',
    path: '/study',
    type: 'website',
  })
}

export function useLessonSeo(lesson: Ref<{ id: string; title: string; tldr: string; subject?: string } | null>) {
  watchEffect(() => {
    if (!lesson.value) return

    const l = lesson.value
    useMuseumSeo({
      title: `Học ${l.title} | Góc học tập`,
      description: l.tldr,
      path: `/study/lesson/${l.id}`,
      type: 'article',
    })

    useHead({
      script: [
        {
          type: 'application/ld+json',
          key: 'lesson-course-jsonld',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: l.title,
            description: l.tldr,
            courseCode: `DSB-LESSON-${l.id.toUpperCase()}`,
            provider: {
              '@type': 'Organization',
              name: SITE_NAME,
              url: `${SITE_URL}/`,
            },
            inLanguage: 'vi',
            isAccessibleForFree: true,
            educationalLevel: ['Trung học cơ sở', 'Trung học phổ thông'],
          }),
        },
      ],
    })
  })
}

export function useCommunityPostSeo(post: Ref<{ id: string; title: string; excerpt: string; author?: { name: string }; coverImage?: string } | null>) {
  watchEffect(() => {
    if (!post.value) return

    const p = post.value
    useMuseumSeo({
      title: `${p.title} | ${SITE_NAME}`,
      description: p.excerpt,
      image: p.coverImage,
      path: `/explore/post/${p.id}`,
      type: 'article',
    })

    useHead({
      script: [
        {
          type: 'application/ld+json',
          key: 'community-post-jsonld',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: p.title,
            description: p.excerpt,
            image: toAbsoluteUrl(p.coverImage || DEFAULT_IMAGE),
            inLanguage: 'vi',
            author: p.author?.name ? { '@type': 'Person', name: p.author.name } : { '@type': 'Organization', name: SITE_NAME },
            mainEntityOfPage: buildCanonicalUrl(`/explore/post/${p.id}`),
            publisher: {
              '@type': 'Organization',
              name: SITE_NAME,
            },
          }),
        },
      ],
    })
  })
}

export const useNewsSeo = useStorySeo

