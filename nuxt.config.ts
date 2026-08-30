// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  $production: {
    nitro: {
      preset: 'cloudflare-pages',
    },
  },

  nitro: {
    compressPublicAssets: true,
    prerender: {
      crawlLinks: true,
      routes: [
        '/',
        '/about',
        '/explore',
        '/explore/virtual-tour',
        '/study',
        '/map',
        '/contact',
        '/contribute',
        '/stories',
        '/journal',
        // Stories / Deep editorial articles
        '/stories/canh-thut-doc-ban-stieng-bu-dang',
        '/stories/ruou-can-stieng-bu-dang-men-la-rung',
        '/stories/tieng-chay-gia-gao-soc-bom-bo-bu-dang',
        '/stories/com-lam-nep-nuong-stieng-bu-dang',
        '/stories/det-tho-cam-stieng-net-hoa-van-dai-ngan',
        '/stories/dan-da-stieng-bu-dang-am-thanh-co-dai',
        // Journal / Project field activities & events
        '/journal/event-001',
        '/journal/event-002',
        '/journal/event-003',
        // All 16 Heritage Detail routes
        '/heritage/can-cu-nua-lon-bu-dang',
        '/heritage/thac-mo-phuoc-long',
        '/heritage/le-hoi-cong-chieng-stieng',
        '/heritage/nha-dai-truyen-thong-stieng',
        '/heritage/di-tich-nha-giao-truyen-thong-bu-dang',
        '/heritage/rung-nguyen-sinh-bu-dang',
        '/heritage/lang-nghe-det-tho-cam-stieng',
        '/heritage/le-hoi-mung-lua-moi-mnong',
        '/heritage/trang-co-bu-lach',
        '/heritage/thac-dung-bu-dang',
        '/heritage/khu-bao-ton-soc-bom-bo',
        '/heritage/nui-ba-ra-phuoc-long',
        '/heritage/chien-thang-phuoc-long-1975',
        '/heritage/can-cu-ta-thiet-loc-ninh',
        '/heritage/nha-giao-te-loc-ninh',
        '/heritage/bao-tang-chien-dich-duong-14-phuoc-long',
        // Heritage QR routes
        '/heritage/qr/can-cu-nua-lon-bu-dang',
        '/heritage/qr/thac-mo-phuoc-long',
        '/heritage/qr/le-hoi-cong-chieng-stieng',
        '/heritage/qr/nha-dai-truyen-thong-stieng',
        '/heritage/qr/di-tich-nha-giao-truyen-thong-bu-dang',
        '/heritage/qr/rung-nguyen-sinh-bu-dang',
        '/heritage/qr/lang-nghe-det-tho-cam-stieng',
        '/heritage/qr/le-hoi-mung-lua-moi-mnong',
        '/heritage/qr/trang-co-bu-lach',
        '/heritage/qr/thac-dung-bu-dang',
        '/heritage/qr/khu-bao-ton-soc-bom-bo',
        '/heritage/qr/nui-ba-ra-phuoc-long',
        '/heritage/qr/chien-thang-phuoc-long-1975',
        '/heritage/qr/can-cu-ta-thiet-loc-ninh',
        '/heritage/qr/nha-giao-te-loc-ninh',
        '/heritage/qr/bao-tang-chien-dich-duong-14-phuoc-long',
        // Study Lessons (10 full interactive lessons)
        '/study/lesson/chien-khu-d',
        '/study/lesson/cong-chieng-stieng',
        '/study/lesson/soc-bom-bo',
        '/study/lesson/trang-co-bu-lach',
        '/study/lesson/nui-ba-ra',
        '/study/lesson/can-cu-nua-lon',
        '/study/lesson/chien-thang-phuoc-long',
        '/study/lesson/can-cu-ta-thiet',
        '/study/lesson/tho-cam-stieng',
        '/study/lesson/thac-dung-dak-wuar',
        // Explore Posts (Community Memories)
        '/explore/post/post-001',
        '/explore/post/post-002',
        '/explore/post/post-003',
        '/explore/post/post-004',
        '/explore/post/post-005',
        '/explore/post/post-006',
      ],
      ignore: ['/admin', '/me'],
    },
  },

  site: {
    url: 'https://disanbudang.com',
    name: 'Di Sản Bù Đăng',
    trailingSlash: true,
  },

  routeRules: {
    '/heritage': { redirect: { to: '/explore/', statusCode: 301 } },
    '/heritage/': { redirect: { to: '/explore/', statusCode: 301 } },
    '/community': { redirect: { to: '/explore/', statusCode: 301 } },
    '/quiz': { redirect: { to: '/study/', statusCode: 301 } },
    '/school': { redirect: { to: '/study/', statusCode: 301 } },
    '/library': { redirect: { to: '/explore/', statusCode: 301 } },
    '/news': { redirect: { to: '/stories/', statusCode: 301 } },
    '/news/': { redirect: { to: '/stories/', statusCode: 301 } },
    '/news/canh-thut-doc-ban-stieng-bu-dang/': { redirect: { to: '/stories/canh-thut-doc-ban-stieng-bu-dang/', statusCode: 301 } },
    '/news/ruou-can-stieng-bu-dang-men-la-rung/': { redirect: { to: '/stories/ruou-can-stieng-bu-dang-men-la-rung/', statusCode: 301 } },
    '/news/tieng-chay-gia-gao-soc-bom-bo-bu-dang/': { redirect: { to: '/stories/tieng-chay-gia-gao-soc-bom-bo-bu-dang/', statusCode: 301 } },
    '/news/com-lam-nep-nuong-stieng-bu-dang/': { redirect: { to: '/stories/com-lam-nep-nuong-stieng-bu-dang/', statusCode: 301 } },
    '/news/det-tho-cam-stieng-net-hoa-van-dai-ngan/': { redirect: { to: '/stories/det-tho-cam-stieng-net-hoa-van-dai-ngan/', statusCode: 301 } },
    '/news/dan-da-stieng-bu-dang-am-thanh-co-dai/': { redirect: { to: '/stories/dan-da-stieng-bu-dang-am-thanh-co-dai/', statusCode: 301 } },
    '/admin/**': { ssr: false },
    '/me/**': { ssr: false },
  },

  runtimeConfig: {
    // Server-only secrets — populated from NUXT_* env vars
    turnstileSecretKey: '',      // NUXT_TURNSTILE_SECRET_KEY
    public: {
      // Admin email — used by FE to show admin button and by server to guard admin routes
      adminEmail: 'nguyenxuankiet294@gmail.com',
      // Turnstile public site key — populated from NUXT_PUBLIC_TURNSTILE_SITE_KEY
      turnstileSiteKey: '',
      firebase: {
        apiKey: process.env.FIREBASE_API_KEY || "AIzaSyCzaEbGasksGT9nSoplZi57J_IDtJ0Mq_o",
        authDomain: process.env.FIREBASE_AUTH_DOMAIN || "disanbudang.firebaseapp.com",
        projectId: process.env.FIREBASE_PROJECT_ID || "disanbudang",
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "disanbudang.firebasestorage.app",
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "41824788557",
        appId: process.env.FIREBASE_APP_ID || "1:41824788557:web:94670b175896359e137c04",
        measurementId: process.env.FIREBASE_MEASUREMENT_ID || "G-FMLQGHRMC1"
      }
    }
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxt/image',
    '@nuxt/content',
    '@nuxt/icon',
    '@vueuse/nuxt',
    '@vueuse/motion/nuxt',
    'nuxt-security',
    '@nuxtjs/sitemap',
  ],

  sitemap: {
    strictNuxtContentPaths: false,
    urls: [
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
      // Journal entries
      '/journal/event-001/',
      '/journal/event-002/',
      '/journal/event-003/',
      // 16 Heritage routes
      '/heritage/can-cu-nua-lon-bu-dang/',
      '/heritage/thac-mo-phuoc-long/',
      '/heritage/le-hoi-cong-chieng-stieng/',
      '/heritage/nha-dai-truyen-thong-stieng/',
      '/heritage/di-tich-nha-giao-truyen-thong-bu-dang/',
      '/heritage/rung-nguyen-sinh-bu-dang/',
      '/heritage/lang-nghe-det-tho-cam-stieng/',
      '/heritage/le-hoi-mung-lua-moi-mnong/',
      '/heritage/trang-co-bu-lach/',
      '/heritage/thac-dung-bu-dang/',
      '/heritage/khu-bao-ton-soc-bom-bo/',
      '/heritage/nui-ba-ra-phuoc-long/',
      '/heritage/chien-thang-phuoc-long-1975/',
      '/heritage/can-cu-ta-thiet-loc-ninh/',
      '/heritage/nha-giao-te-loc-ninh/',
      '/heritage/bao-tang-chien-dich-duong-14-phuoc-long/',
      // 16 Heritage QR routes
      '/heritage/qr/can-cu-nua-lon-bu-dang/',
      '/heritage/qr/thac-mo-phuoc-long/',
      '/heritage/qr/le-hoi-cong-chieng-stieng/',
      '/heritage/qr/nha-dai-truyen-thong-stieng/',
      '/heritage/qr/di-tich-nha-giao-truyen-thong-bu-dang/',
      '/heritage/qr/rung-nguyen-sinh-bu-dang/',
      '/heritage/qr/lang-nghe-det-tho-cam-stieng/',
      '/heritage/qr/le-hoi-mung-lua-moi-mnong/',
      '/heritage/qr/trang-co-bu-lach/',
      '/heritage/qr/thac-dung-bu-dang/',
      '/heritage/qr/khu-bao-ton-soc-bom-bo/',
      '/heritage/qr/nui-ba-ra-phuoc-long/',
      '/heritage/qr/chien-thang-phuoc-long-1975/',
      '/heritage/qr/can-cu-ta-thiet-loc-ninh/',
      '/heritage/qr/nha-giao-te-loc-ninh/',
      '/heritage/qr/bao-tang-chien-dich-duong-14-phuoc-long/',
      // Story Editorial Articles
      '/stories/canh-thut-doc-ban-stieng-bu-dang/',
      '/stories/ruou-can-stieng-bu-dang-men-la-rung/',
      '/stories/tieng-chay-gia-gao-soc-bom-bo-bu-dang/',
      '/stories/com-lam-nep-nuong-stieng-bu-dang/',
      '/stories/det-tho-cam-stieng-net-hoa-van-dai-ngan/',
      '/stories/dan-da-stieng-bu-dang-am-thanh-co-dai/',
      // Study Lessons
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
      // Explore Posts (Community Memories)
      '/explore/post/post-001/',
      '/explore/post/post-002/',
      '/explore/post/post-003/',
      '/explore/post/post-004/',
      '/explore/post/post-005/',
      '/explore/post/post-006/',
    ],
    exclude: [
      '/admin',
      '/admin/**',
      '/admin/*',
      '/me',
      '/me/**',
      '/me/*',
      '/invest',
      '/invest/**',
      '/invest/*',
      '/404',
      '/404.html',
    ],
  },

  security: {
    headers: {
      contentSecurityPolicy: {
        'img-src': [
          "'self'",
          'data:',
          'https://images.unsplash.com',
          'https://*.tile.openstreetmap.org',
          'https://tile.openstreetmap.org',
          'https://*.basemaps.cartocdn.com',
          'https://basemaps.cartocdn.com',
          'https://lh3.googleusercontent.com',  // Firebase Auth Google avatars
        ],
        // Allow Turnstile challenge scripts, Firebase/Google Auth scripts, and WebAssembly compilation
        'script-src': [
          "'self'",
          "'unsafe-inline'",
          "'unsafe-eval'",
          "'wasm-unsafe-eval'",
          'https://challenges.cloudflare.com',
          'https://apis.google.com',
          'https://*.googleapis.com',
          'https://*.gstatic.com',
        ],
        'frame-src': [
          "'self'",
          'https://challenges.cloudflare.com',
          'https://*.firebaseapp.com',
        ],
      },
    },
    rateLimiter: {
      tokensPerInterval: 150,
      interval: 'hour',
    },
    corsHandler: {
      origin: '*',
      methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    },
  },

  css: ['~/assets/css/main.css'],

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  tailwindcss: {
    configPath: 'tailwind.config.ts',
    exposeConfig: true,
  },

  image: {
    quality: 80,
    format: ['avif', 'webp', 'jpg'],
    domains: ['images.unsplash.com', 'lh3.googleusercontent.com'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'vi' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Di Sản Bù Đăng — Bảo Tàng Số Thành Phố Đồng Nai',
      meta: [
        {
          name: 'description',
          content:
            'Bảo tàng số di sản văn hóa, lịch sử và thiên nhiên Thành Phố Đồng Nai - từ Biên Hòa, Sóc Bom Bo đến Chiến Khu Đ, núi Bà Rá. Khám phá và bảo tồn di sản qua không gian số tương tác.',
        },
        { name: 'theme-color', content: '#0A0C10' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'vi_VN' },
        {
          property: 'og:site_name',
          content: 'Di Sản Bù Đăng',
        },
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/png', sizes: '48x48', href: '/favicon/icon-48.png' },
        { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon/icon-96.png' },
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/favicon/icon-192.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/manifest.json' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,400;1,600&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,400&family=Inter:wght@400;500;600;700&display=swap',
        },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },

  experimental: {
    viewTransition: true,
  },

  typescript: {
    strict: true,
    tsConfig: {
      compilerOptions: {
        skipLibCheck: true,
      },
    },
  },

  vite: {
    optimizeDeps: {
      include: [
        'leaflet',
        '@vue/devtools-core',
        '@vue/devtools-kit',
        'firebase/app',
        'firebase/auth',
        'sweetalert2',
      ],
    },
    build: {
      chunkSizeWarningLimit: 600,
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            if (id.includes('node_modules/three') || id.includes('components/tour360') || id.includes('types/virtualTour')) {
              return 'vendor-three'
            }
            if (id.includes('node_modules/leaflet')) {
              return 'vendor-leaflet'
            }
            if (id.includes('node_modules/firebase')) {
              return 'vendor-firebase'
            }
            if (id.includes('node_modules/sweetalert2')) {
              return 'vendor-sweetalert'
            }
          },
        },
      },
    },
  },
})
