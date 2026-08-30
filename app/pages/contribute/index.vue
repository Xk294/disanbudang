<template>
  <div class="bg-charcoal-900 min-h-screen text-ivory">
    <!-- Hero -->
    <div class="relative py-24 overflow-hidden border-b border-charcoal-850">
      <img
        src="/images/heritage/van-hoa-phi-vat-the/di-san-ban-dia-lg.webp"
        alt="Đóng góp tư liệu"
        class="absolute inset-0 w-full h-full object-cover opacity-60"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-charcoal-950 via-charcoal-900/60 to-transparent" />
      <div class="container-heritage relative z-10">
        <span class="section-label text-gold-400">Kiến Tạo Di Sản Số · Thành Phố Đồng Nai</span>
        <h1 class="font-heading font-bold text-ivory text-5xl lg:text-6xl leading-[1.35] md:leading-[1.3] lg:leading-[1.25] mb-6 md:mb-8 text-balance tracking-normal">
          Chung Tay Kiến Tạo<br/> <span class="text-gradient-gold">Bản Đồ Di Sản</span>
        </h1>
        <p class="text-charcoal-300 text-base lg:text-lg max-w-3xl leading-relaxed">
          Mỗi hiện vật cũ kỹ, tấm hình ố màu thời gian hay câu chuyện truyền khẩu chưa từng ghi chép đều mang linh hồn di sản của cha ông để lại. Dù bạn đến từ bất kỳ xã, phường nào trong Thành Phố Đồng Nai, sự đóng góp của bạn trực tiếp giúp thế hệ học sinh, nhà nghiên cứu và cộng đồng thấu hiểu hơn về cội nguồn lịch sử oai hùng và bản sắc tinh hoa đậm nét của mảnh đất này. Hãy để ký ức cá nhân của bạn hòa vào dòng chảy di sản sống mãi của Thành Phố Đồng Nai.
        </p>
      </div>
    </div>

    <div class="container-heritage py-16">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <!-- Wizard Form -->
        <div class="lg:col-span-8 bg-charcoal-950/40 border border-charcoal-850 rounded-3xl p-6 lg:p-10 shadow-2xl relative">
          <!-- Step Progress Indicators -->
          <div class="flex items-center justify-between mb-10 border-b border-charcoal-850 pb-6">
            <div
              v-for="(step, sIdx) in steps"
              :key="step.title"
              class="flex items-center gap-2.5"
            >
              <div
                class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
                :class="[
                  currentStep === sIdx + 1
                    ? 'bg-gold-500 text-charcoal-900 shadow-gold'
                    : currentStep > sIdx + 1
                      ? 'bg-gold-500/20 text-gold-400 border border-gold-500/35'
                      : 'bg-charcoal-900 text-charcoal-500 border border-charcoal-800'
                ]"
              >
                {{ sIdx + 1 }}
              </div>
              <span
                class="text-xs font-semibold uppercase tracking-wider hidden sm:inline"
                :class="currentStep === sIdx + 1 ? 'text-ivory' : 'text-charcoal-500'"
              >
                {{ step.title }}
              </span>
              <Icon
                v-if="sIdx < steps.length - 1"
                name="mdi:chevron-right"
                class="w-4 h-4 text-charcoal-400 hidden sm:block ml-2"
              />
            </div>
          </div>

          <form @submit.prevent="handleSubmit">
            <!-- STEP 1: SELECT TYPE -->
            <div v-if="currentStep === 1" class="space-y-6">
              <h3 class="font-heading font-bold text-xl text-ivory mb-4">Bước 1: Chọn loại hình hiến tặng</h3>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <button
                  v-for="type in contributionTypes"
                  :key="type.id"
                  type="button"
                  class="flex flex-col items-center gap-3 p-5 rounded-2xl border transition-all duration-300 text-sm text-center"
                  :class="selectedType === type.id
                    ? 'bg-gold-500/10 text-gold-400 border-gold-500 shadow-gold/5'
                    : 'border-charcoal-800 text-charcoal-400 hover:border-gold-500/40 hover:text-ivory bg-charcoal-950/20'"
                  @click="selectedType = type.id"
                >
                  <Icon :name="type.icon" class="w-8 h-8 text-gold-400" />
                  <span class="font-semibold">{{ type.label }}</span>
                </button>
              </div>
              <div class="pt-6 flex justify-end">
                <button type="button" class="btn-primary" @click="handleNextStep">
                  Tiếp Tục
                  <Icon name="mdi:arrow-right" class="w-4 h-4" />
                </button>
              </div>
            </div>

            <!-- STEP 2: AUTHOR DETAILS -->
            <div v-if="currentStep === 2" class="space-y-6">
              <h3 class="font-heading font-bold text-xl text-ivory mb-4">Bước 2: Thông tin người hiến tặng</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label class="block text-charcoal-400 text-xs font-semibold uppercase tracking-wider mb-2" for="name">Họ Tên *</label>
                  <input
                    id="name"
                    v-model="form.name"
                    type="text"
                    required
                    placeholder="Nhập họ và tên đầy đủ"
                    class="w-full px-4 py-3.5 bg-charcoal-900 border border-charcoal-800 rounded-xl text-ivory text-sm placeholder-charcoal-400 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/20 transition-all"
                    :class="{ 'border-red-500/60 focus:border-red-500 focus:ring-red-500/20': stepErrors.name }"
                    @input="stepErrors.name = ''"
                  />
                  <p v-if="stepErrors.name" class="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                    <Icon name="mdi:alert-circle" class="w-3.5 h-3.5 animate-pulse" />
                    {{ stepErrors.name }}
                  </p>
                </div>
                <div>
                  <label class="block text-charcoal-400 text-xs font-semibold uppercase tracking-wider mb-2" for="role">Vai Trò</label>
                  <select
                    id="role"
                    v-model="form.role"
                    class="w-full px-4 py-3.5 bg-charcoal-900 border border-charcoal-800 rounded-xl text-ivory text-sm focus:outline-none focus:border-gold-500 transition-colors"
                  >
                    <option value="resident">Người dân bản địa</option>
                    <option value="student">Học sinh / Sinh viên</option>
                    <option value="teacher">Giáo viên / Học giả</option>
                    <option value="visitor">Du khách ghé thăm</option>
                    <option value="other">Khác</option>
                  </select>
                </div>
              </div>
              <div class="pt-6 flex justify-between">
                <button type="button" class="btn-ghost text-xs" @click="currentStep = 1">Quay lại</button>
                <button type="button" class="btn-primary" @click="handleNextStep">
                  Tiếp Tục
                  <Icon name="mdi:arrow-right" class="w-4 h-4" />
                </button>
              </div>
            </div>

            <!-- STEP 3: CONTENT & TRUST CHECKLIST -->
            <div v-if="currentStep === 3" class="space-y-6">
              <h3 class="font-heading font-bold text-xl text-ivory mb-4">Bước 3: Chi tiết tư liệu & Lòng tin</h3>
              <div class="space-y-4">
                <div>
                  <label class="block text-charcoal-400 text-xs font-semibold uppercase tracking-wider mb-2" for="title">Tiêu Đề Đóng Góp *</label>
                  <input
                    id="title"
                    v-model="form.title"
                    type="text"
                    required
                    placeholder="Tiêu đề tóm tắt (ví dụ: Ảnh cưới truyền thống S'tiêng năm 1980)"
                    class="w-full px-4 py-3.5 bg-charcoal-900 border border-charcoal-800 rounded-xl text-ivory text-sm placeholder-charcoal-400 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/20 transition-all"
                  />
                </div>
                <div>
                  <label class="block text-charcoal-400 text-xs font-semibold uppercase tracking-wider mb-2" for="content">Nội Dung / Ghi chú tư liệu *</label>
                  <textarea
                    id="content"
                    v-model="form.content"
                    required
                    rows="6"
                    placeholder="Viết câu chuyện hoặc ghi lại xuất xứ hiện vật..."
                    class="w-full px-4 py-3.5 bg-charcoal-900 border border-charcoal-800 rounded-xl text-ivory text-sm placeholder-charcoal-400 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/20 transition-all resize-none"
                  />
                </div>
                <div>
                  <label class="block text-charcoal-400 text-xs font-semibold uppercase tracking-wider mb-2" for="heritage">Liên kết di tích cụ thể</label>
                  <select
                    id="heritage"
                    v-model="form.heritageId"
                    class="w-full px-4 py-3.5 bg-charcoal-900 border border-charcoal-800 rounded-xl text-ivory text-sm focus:outline-none focus:border-gold-500 transition-colors"
                  >
                    <option value="">-- Không liên kết / Di sản mới --</option>
                    <option v-for="h in heritages" :key="h.id" :value="h.id">{{ h.title }}</option>
                  </select>
                </div>

                <!-- Invisible Bot Honeypot Field -->
                <div class="hidden" style="display:none !important;" aria-hidden="true">
                  <label for="contribute_hp_check">Bỏ trống trường này</label>
                  <input
                    id="contribute_hp_check"
                    v-model="form._hp"
                    type="text"
                    name="_hp"
                    tabindex="-1"
                    autocomplete="off"
                  />
                </div>



                <!-- Trust verification checkbox list -->
                <div class="bg-charcoal-900 border border-charcoal-800 rounded-2xl p-5 space-y-3">
                  <p class="text-xs uppercase text-gold-400 font-semibold tracking-wider flex items-center gap-1.5">
                    <Icon name="mdi:shield-check-outline" class="w-4 h-4" />
                    Cam kết chất lượng tư liệu
                  </p>
                  <label class="flex items-start gap-2.5 cursor-pointer text-xs text-charcoal-400 hover:text-ivory transition-colors">
                    <input v-model="acceptQuality" type="checkbox" required class="mt-0.5 rounded border-charcoal-800 bg-charcoal-950 text-gold-500 focus:ring-gold-500/20" />
                    <span>Tôi xác nhận tư liệu cung cấp là chính xác, không xuyên tạc lịch sử.</span>
                  </label>
                  <label class="flex items-start gap-2.5 cursor-pointer text-xs text-charcoal-400 hover:text-ivory transition-colors">
                    <input v-model="acceptDisplay" type="checkbox" required class="mt-0.5 rounded border-charcoal-800 bg-charcoal-950 text-gold-500 focus:ring-gold-500/20" />
                    <span>Tôi đồng ý ủy quyền số hóa và trưng bày phi thương mại trên Bản đồ Di sản Đồng Nai.</span>
                  </label>
                </div>
              </div>

              <div class="pt-6 flex justify-between">
                <button type="button" class="btn-ghost text-xs" @click="currentStep = 2">Quay lại</button>
                <button type="submit" class="btn-primary" :disabled="isPending || !turnstileToken">
                  <Icon v-if="isPending" name="mdi:loading" class="w-4 h-4 animate-spin" />
                  <Icon v-else name="mdi:send-check-outline" class="w-4 h-4" />
                  {{ isPending ? 'Đang Gửi...' : 'Gửi Đóng Góp' }}
                </button>
              </div>

              <!-- Cloudflare Turnstile widget (renders when step 3 is active) -->
              <div id="turnstile-container" class="flex justify-center mt-4"></div>
              <p v-if="!turnstileToken" class="text-center text-charcoal-500 text-xs mt-1">Vui lòng hoàn thành xác minh bên trên để gửi.</p>

              <!-- Success Alert -->
              <Transition name="fade-in-up">
                <div v-if="isSubmitted" class="p-4 rounded-xl bg-green-950/30 border border-green-800/40 flex items-center gap-3.5 mt-4">
                  <Icon name="mdi:check-circle" class="w-6 h-6 text-green-500 shrink-0 animate-bounce" />
                  <div>
                    <p class="text-green-400 font-semibold text-sm">Cảm ơn bạn!</p>
                    <p class="text-green-500/80 text-xs mt-0.5">Đóng góp của bạn đã được ghi nhận vào hệ thống và đang chờ duyệt.</p>
                  </div>
                </div>
              </Transition>

              <Transition name="fade-in-up">
                <div v-if="submitError" class="p-4 rounded-xl bg-red-950/30 border border-red-800/40 flex items-center gap-3.5 mt-4">
                  <Icon name="mdi:alert-circle" class="w-6 h-6 text-red-500 shrink-0" />
                  <p class="text-red-300 text-sm font-medium">{{ submitError }}</p>
                </div>
              </Transition>
            </div>
          </form>
        </div>

        <!-- Info Sidebar -->
        <div class="lg:col-span-4 space-y-6">
          <div class="bg-charcoal-950/60 border border-charcoal-850 rounded-2xl p-6 shadow-xl backdrop-blur-xl">
            <h3 class="font-heading font-bold text-ivory text-base mb-5">Giá trị của sự hiến tặng</h3>
            <div class="space-y-4">
              <div v-for="reason in reasons" :key="reason.title" class="flex gap-3">
                <div class="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/25 flex items-center justify-center shrink-0 text-gold-400">
                  <Icon :name="reason.icon" class="w-5 h-5" />
                </div>
                <div>
                  <p class="font-medium text-ivory text-sm leading-snug">{{ reason.title }}</p>
                  <p class="text-charcoal-400 text-xs leading-normal mt-1">{{ reason.desc }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-charcoal-950/60 border border-charcoal-850 rounded-2xl p-6 shadow-xl backdrop-blur-xl">
            <h3 class="font-heading font-bold text-ivory text-base mb-4">Tiến Trình Kiểm Duyệt</h3>
            <div class="relative pl-5 border-l border-charcoal-800 ml-2.5 space-y-4 text-xs">
              <div>
                <span class="absolute -left-[25px] top-1 w-2.5 h-2.5 rounded-full bg-gold-500 shadow-gold" />
                <p class="font-semibold text-ivory">1. Ghi nhận thông tin</p>
                <p class="text-charcoal-400 mt-0.5">Tiếp nhận ký ức và thông tin ban đầu gửi về.</p>
              </div>
              <div>
                <span class="absolute -left-[25px] top-[84px] w-2.5 h-2.5 rounded-full bg-charcoal-600" />
                <p class="font-semibold text-charcoal-350">2. Xác minh khảo cổ</p>
                <p class="text-charcoal-500 mt-0.5">Ban quản lý di tích đối chiếu sử liệu địa phương.</p>
              </div>
              <div>
                <span class="absolute -left-[25px] top-[164px] w-2.5 h-2.5 rounded-full bg-charcoal-600" />
                <p class="font-semibold text-charcoal-350">3. Số hóa công khai</p>
                <p class="text-charcoal-500 mt-0.5">Trưng bày chính thức lên bản đồ di sản số.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ===== Approved Contributions Section ===== -->
    <section class="border-t border-charcoal-850 py-20">
      <div class="container-heritage">
        <div class="text-center mb-12">
          <span class="section-label text-gold-400">Ký Ức Cộng Đồng</span>
          <h2 class="font-heading font-bold text-ivory text-3xl lg:text-4xl leading-tight">
            Những Tư Liệu Đã Được Lưu Giữ
          </h2>
          <p class="text-charcoal-400 mt-3 max-w-xl mx-auto text-sm leading-relaxed">
            Các đóng góp đã được kiểm duyệt và chính thức trở thành một phần của kho di sản số Thành Phố Đồng Nai.
          </p>
        </div>

        <!-- Loading skeleton -->
        <div v-if="approvedPending" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="n in 6"
            :key="n"
            class="bg-charcoal-950/40 border border-charcoal-850 rounded-2xl p-6 space-y-3 animate-pulse"
          >
            <div class="w-20 h-5 rounded-full bg-charcoal-800" />
            <div class="w-full h-4 rounded bg-charcoal-800" />
            <div class="w-3/4 h-4 rounded bg-charcoal-800" />
            <div class="space-y-2 mt-4">
              <div class="w-full h-3 rounded bg-charcoal-800" />
              <div class="w-full h-3 rounded bg-charcoal-800" />
              <div class="w-2/3 h-3 rounded bg-charcoal-800" />
            </div>
          </div>
        </div>

        <!-- Empty state -->
        <div
          v-else-if="!approvedPending && (!approvedData?.contributions || approvedData.contributions.length === 0)"
          class="text-center py-16"
        >
          <div class="w-16 h-16 rounded-2xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center mx-auto mb-4">
            <Icon name="mdi:archive-outline" class="w-8 h-8 text-gold-400" />
          </div>
          <p class="text-charcoal-400 text-sm">Các đóng góp được duyệt sẽ xuất hiện tại đây.</p>
        </div>

        <!-- Contribution cards -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <article
            v-for="item in approvedData!.contributions"
            :key="(item as ApprovedContribution).id"
            class="group bg-charcoal-950/40 border border-charcoal-850 rounded-2xl p-6 flex flex-col gap-4 hover:border-gold-500/30 transition-all duration-300"
          >
            <div class="flex items-start justify-between gap-3">
              <span
                class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border"
                :class="typeStyle((item as ApprovedContribution).type)"
              >
                <Icon :name="typeIcon((item as ApprovedContribution).type)" class="w-3 h-3" />
                {{ typeLabel((item as ApprovedContribution).type) }}
              </span>
              <time
                class="text-charcoal-500 text-[10px] shrink-0 mt-0.5"
                :datetime="(item as ApprovedContribution).created_at"
              >
                {{ formatDate((item as ApprovedContribution).created_at) }}
              </time>
            </div>

            <h3 class="font-heading font-bold text-ivory text-base leading-snug group-hover:text-gold-300 transition-colors duration-200 line-clamp-2">
              {{ (item as ApprovedContribution).title }}
            </h3>

            <p class="text-charcoal-400 text-xs leading-relaxed line-clamp-4 flex-1">
              {{ (item as ApprovedContribution).excerpt }}
            </p>

            <div class="flex items-center gap-2 pt-2 border-t border-charcoal-850">
              <div class="w-6 h-6 rounded-full bg-gold-500/15 border border-gold-500/25 flex items-center justify-center shrink-0">
                <Icon name="mdi:account" class="w-3.5 h-3.5 text-gold-400" />
              </div>
              <span class="text-charcoal-400 text-xs truncate">
                {{ (item as ApprovedContribution).author_name }}
                <span class="text-charcoal-600 mx-1">·</span>
                {{ roleLabel((item as ApprovedContribution).author_role) }}
              </span>
            </div>
          </article>
        </div>

        <!-- "Xem thêm" footer -->
        <div
          v-if="approvedData && approvedData.total > approvedData.contributions.length"
          class="text-center mt-10"
        >
          <p class="text-charcoal-500 text-xs">
            Đang hiển thị {{ approvedData.contributions.length }}
            trong tổng số {{ approvedData.total }} tư liệu được lưu giữ.
          </p>
        </div>
      </div>
    </section>

    <!-- ===== Project Rating ===== -->
    <ProjectRating />

  </div>
</template>

<script setup lang="ts">
import { HERITAGES } from '~/data/heritages'
import { useMuseumSeo } from '~/composables/useMuseumSeo'

interface ApprovedContribution {
  id: string
  type: string
  title: string
  author_name: string
  author_role: string
  heritage_id: string | null
  created_at: string
  excerpt: string
}

definePageMeta({ layout: 'default' })
useMuseumSeo({
  title: 'Hiến Tặng Tư Liệu',
  description: 'Đóng góp công sức của bạn vào cổng bảo tồn di sản số. Gửi tranh vẽ, hình ảnh, văn bản tư liệu đã qua kiểm chứng.'
})

// ── Approved contributions (public, no auth) ────────────────────────────────
const { data: approvedData, pending: approvedPending } = await useFetch<{
  ok: boolean
  contributions: ApprovedContribution[]
  total: number
}>('/api/contributions/approved', { default: () => ({ ok: false, contributions: [], total: 0 }) })

// ── Type/role display helpers ────────────────────────────────────────────────
const TYPE_META: Record<string, { label: string; icon: string; style: string }> = {
  story:    { label: 'Câu Chuyện',   icon: 'mdi:book-open-variant', style: 'bg-blue-950/40 text-blue-300 border-blue-800/50' },
  photo:    { label: 'Ảnh / Video',  icon: 'mdi:camera',            style: 'bg-purple-950/40 text-purple-300 border-purple-800/50' },
  document: { label: 'Hiện Vật',     icon: 'mdi:file-document',     style: 'bg-amber-950/40 text-amber-300 border-amber-800/50' },
  memory:   { label: 'Ký Ức',        icon: 'mdi:heart',             style: 'bg-rose-950/40 text-rose-300 border-rose-800/50' },
  artwork:  { label: 'Tranh Vẽ',     icon: 'mdi:palette',           style: 'bg-emerald-950/40 text-emerald-300 border-emerald-800/50' },
  research: { label: 'Khảo Cứu',     icon: 'mdi:magnify',           style: 'bg-gold-950/40 text-gold-300 border-gold-800/50' },
}
const ROLE_LABELS: Record<string, string> = {
  resident: 'Người dân bản địa',
  student:  'Học sinh / Sinh viên',
  teacher:  'Giáo viên / Học giả',
  visitor:  'Du khách',
  other:    'Khác',
}
function typeLabel(t: string)  { return TYPE_META[t]?.label ?? t }
function typeIcon(t: string)   { return TYPE_META[t]?.icon  ?? 'mdi:tag' }
function typeStyle(t: string)  { return TYPE_META[t]?.style ?? 'bg-charcoal-900 text-charcoal-400 border-charcoal-700' }
function roleLabel(r: string)  { return ROLE_LABELS[r] ?? r }
function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' })
  } catch { return iso }
}


// Load Turnstile script (only on this page, only once)
function loadTurnstileScript() {
  if (!import.meta.client) return
  if (window.turnstile) return // already available
  if (document.querySelector('script[src*="turnstile"]')) return // already loading
  const script = document.createElement('script')
  script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
  script.defer = true
  document.head.appendChild(script)
}

// Turnstile
const config = useRuntimeConfig()
declare global {
  interface Window {
    turnstile?: {
      render: (container: string | HTMLElement, options: Record<string, unknown>) => string
      reset: (widgetId: string) => void
      remove: (widgetId: string) => void
    }
  }
}
const turnstileToken = ref('')
const turnstileWidgetId = ref<string | null>(null)

const heritages = HERITAGES
const selectedType = ref('story')
const currentStep = ref(1)
const isSubmitted = ref(false)
const isPending = ref(false)
const submitError = ref('')

// Checkboxes and inline errors
const acceptQuality = ref(false)
const acceptDisplay = ref(false)
const stepErrors = reactive({
  type: '',
  name: '',
})

const steps = [
  { title: 'Chọn Loại' },
  { title: 'Tác Giả' },
  { title: 'Nội Dung' }
]

const form = reactive({
  name: '', role: 'resident', title: '', content: '', heritageId: '', _hp: '',
})

const contributionTypes = [
  { id: 'story', label: 'Câu Chuyện Bản Địa', icon: 'mdi:book-open-variant' },
  { id: 'photo', label: 'Ảnh / Video Cổ', icon: 'mdi:camera' },
  { id: 'document', label: 'Hiện Vật Số Hóa', icon: 'mdi:file-document' },
  { id: 'memory', label: 'Ký Ức Truyền Miệng', icon: 'mdi:heart' },
  { id: 'artwork', label: 'Tác Phẩm Tranh Vẽ', icon: 'mdi:palette' },
  { id: 'research', label: 'Khảo Cứu Dân Gian', icon: 'mdi:magnify' },
]

const reasons = [
  { icon: 'mdi:archive', title: 'Bảo Tồn Vĩnh Cửu', desc: 'Dữ liệu được lưu trữ trên cụm đám mây an toàn, tránh mục nát theo thời gian.' },
  { icon: 'mdi:account-group', title: 'Kết Nối Thế Hệ', desc: 'Thế hệ trẻ học lịch sử sống từ chính tư liệu do gia đình bạn đóng góp.' },
  { icon: 'mdi:medal-outline', title: 'Ghi Danh Tôn Vinh', desc: 'Tên tuổi và vai trò hiến tặng của bạn được hiển thị vinh dự trên cổng thông tin.' },
]

function handleNextStep() {
  if (currentStep.value === 1) {
    if (!selectedType.value) {
      stepErrors.type = 'Vui lòng chọn loại hình hiến tặng'
      return
    }
    stepErrors.type = ''
    currentStep.value = 2
  } else if (currentStep.value === 2) {
    if (!form.name.trim()) {
      stepErrors.name = 'Vui lòng nhập họ và tên của bạn'
      return
    }
    stepErrors.name = ''
    currentStep.value = 3
  }
}

async function handleSubmit() {
  if (!form.name.trim()) {
    currentStep.value = 2
    stepErrors.name = 'Vui lòng nhập họ và tên của bạn'
    return
  }
  if (!form.title.trim()) {
    submitError.value = 'Vui lòng nhập tiêu đề đóng góp'
    return
  }
  if (!form.content.trim()) {
    submitError.value = 'Vui lòng điền nội dung / ghi chú tư liệu'
    return
  }
  if (!acceptQuality.value || !acceptDisplay.value) {
    submitError.value = 'Vui lòng cam kết chất lượng tư liệu và ủy quyền số hóa'
    return
  }

  isSubmitted.value = false
  submitError.value = ''
  isPending.value = true

  try {
    await $fetch('/api/contribute', {
      method: 'POST',
      body: {
        type: selectedType.value,          // send the ID, not the label
        authorName: form.name,
        authorRole: form.role,
        title: form.title,
        content: form.content,
        heritageId: form.heritageId || null,
        _hp: form._hp || undefined,
        turnstileToken: turnstileToken.value || undefined,
      }
    })

    isSubmitted.value = true
    form.title = ''
    form.content = ''
    // Reset Turnstile after successful submit
    if (window.turnstile && turnstileWidgetId.value) {
      window.turnstile.reset(turnstileWidgetId.value)
      turnstileToken.value = ''
    }
  } catch (err: unknown) {
    const e = err as { data?: { statusMessage?: string } }
    submitError.value = e.data?.statusMessage || 'Đã có lỗi xảy ra. Vui lòng thử lại sau.'
    // Reset Turnstile on error so user can retry
    if (window.turnstile && turnstileWidgetId.value) {
      window.turnstile.reset(turnstileWidgetId.value)
      turnstileToken.value = ''
    }
  } finally {
    isPending.value = false
  }
}

// Caching form inputs in sessionStorage
watch(
  () => ({ type: selectedType.value, form }),
  (state) => {
    if (import.meta.client) {
      sessionStorage.setItem('disanbudang_contribute_draft', JSON.stringify({
        selectedType: state.type,
        form: state.form,
      }))
    }
  },
  { deep: true }
)

onMounted(() => {
  loadTurnstileScript()
  if (import.meta.client) {
    const draftJson = sessionStorage.getItem('disanbudang_contribute_draft')
    if (draftJson) {
      try {
        const draft = JSON.parse(draftJson)
        if (draft.selectedType) selectedType.value = draft.selectedType
        if (draft.form) Object.assign(form, draft.form)
      } catch (e) {
        console.error('Failed to parse draft form data', e)
      }
    }
  }
})

// Init Turnstile widget when user reaches step 3
watch(() => currentStep.value, (step) => {
  if (step !== 3 || !import.meta.client) return
  nextTick(() => {
    if (!window.turnstile || turnstileWidgetId.value) return
    turnstileWidgetId.value = window.turnstile.render('#turnstile-container', {
      sitekey: config.public.turnstileSiteKey || '1x00000000000000000000AA', // test key fallback
      callback: (token: string) => { turnstileToken.value = token },
      'expired-callback': () => { turnstileToken.value = '' },
      'error-callback': () => { turnstileToken.value = '' },
      theme: 'dark',
    })
  })
})

onUnmounted(() => {
  if (import.meta.client && window.turnstile && turnstileWidgetId.value) {
    window.turnstile.remove(turnstileWidgetId.value)
    turnstileWidgetId.value = null
  }
})
</script>

<style scoped>
.fade-in-up-enter-active { transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1); }
.fade-in-up-enter-from { opacity: 0; transform: translateY(10px); }
</style>
