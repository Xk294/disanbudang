<template>
  <div class="heritage-docent-root fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-[900]">
    
    <!-- Launcher Floating Button -->
    <button
      v-if="!isOpen"
      class="docent-launcher group flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-gold-600 via-gold-500 to-amber-500 text-charcoal-950 font-heading font-bold text-xs uppercase tracking-wider shadow-2xl shadow-gold-500/30 hover:scale-105 active:scale-95 transition-all duration-300 border border-gold-300"
      @click="isOpen = true"
      aria-label="Mở Trợ Lý Tri Thức Di Sản Bù Đăng"
      title="Hỏi đáp cùng Trợ Lý Tri Thức Di Sản Bù Đăng"
    >
      <div class="w-6 h-6 rounded-full bg-charcoal-950/20 flex items-center justify-center">
        <Icon name="mdi:sparkles" class="w-4 h-4 text-charcoal-950 animate-spin" style="animation-duration: 4s;" />
      </div>
      <span class="hidden sm:inline">Trợ Lý Di Sản</span>
      <span class="sm:hidden">Hỏi AI</span>
    </button>

    <!-- Chat Modal Window -->
    <Transition name="chat-slide">
      <div
        v-if="isOpen"
        class="w-[92vw] sm:w-[420px] h-[520px] max-h-[82vh] bg-charcoal-950/96 backdrop-blur-2xl border border-gold-500/40 rounded-3xl overflow-hidden shadow-2xl shadow-black/90 flex flex-col relative"
      >
        <!-- Header -->
        <div class="p-4 bg-gradient-to-r from-charcoal-900 via-charcoal-950 to-charcoal-900 border-b border-charcoal-800 flex items-center justify-between">
          <div class="flex items-center gap-2.5">
            <div class="w-9 h-9 rounded-xl bg-gold-500/20 border border-gold-500/40 flex items-center justify-center text-gold-400">
              <Icon name="mdi:compass-outline" class="w-5 h-5" />
            </div>
            <div>
              <div class="flex items-center gap-1.5">
                <h4 class="font-heading font-bold text-sm text-ivory">Trợ Lý Tri Thức Bù Đăng</h4>
                <span class="w-2 h-2 rounded-full bg-emerald-400" title="Đang hoạt động offline 0ms" />
              </div>
              <p class="text-[10px] text-charcoal-400">Tra cứu di sản & văn hóa bản địa (0ms)</p>
            </div>
          </div>

          <button
            class="p-1.5 rounded-full hover:bg-charcoal-800 text-charcoal-400 hover:text-ivory transition-colors"
            @click="isOpen = false"
            aria-label="Đóng trợ lý"
          >
            <Icon name="mdi:close" class="w-5 h-5" />
          </button>
        </div>

        <!-- Chat History List -->
        <div ref="chatContainer" class="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-none">
          
          <!-- Bot Welcome Message -->
          <div class="flex gap-2.5 items-start">
            <div class="w-7 h-7 rounded-lg bg-gold-500/20 text-gold-400 flex items-center justify-center shrink-0 border border-gold-500/30 text-xs">
              🏛️
            </div>
            <div class="bg-charcoal-900/90 p-3.5 rounded-2xl rounded-tl-none border border-charcoal-800 text-xs text-charcoal-200 leading-relaxed max-w-[85%] space-y-2">
              <p>Xin chào! Tôi là <strong>Trợ lý Di Sản Bù Đăng</strong>. Tôi có thể giải đáp mọi thông tin về 16 di tích, văn hóa S'Tiêng - M'Nông, ẩm thực rừng và chỉ đường bản đồ GIS.</p>
              <p class="text-3xs text-gold-400/90 font-bold uppercase tracking-wider">Bạn có thể thử các câu hỏi nhanh bên dưới:</p>
            </div>
          </div>

          <!-- Dynamic Messages -->
          <div
            v-for="(msg, idx) in messages"
            :key="idx"
            class="flex gap-2.5 items-start"
            :class="msg.role === 'user' ? 'justify-end' : 'justify-start'"
          >
            <!-- Bot Avatar -->
            <div
              v-if="msg.role === 'bot'"
              class="w-7 h-7 rounded-lg bg-gold-500/20 text-gold-400 flex items-center justify-center shrink-0 border border-gold-500/30 text-xs"
            >
              🏛️
            </div>

            <!-- Message bubble -->
            <div
              class="p-3.5 rounded-2xl text-xs leading-relaxed max-w-[85%] space-y-2.5 shadow-md"
              :class="msg.role === 'user'
                ? 'bg-gold-500 text-charcoal-950 font-semibold rounded-tr-none'
                : 'bg-charcoal-900/90 text-charcoal-200 border border-charcoal-800 rounded-tl-none'"
            >
              <p class="whitespace-pre-line">{{ msg.text }}</p>

              <!-- Interactive Action Buttons if matched -->
              <div v-if="msg.actions && msg.actions.length > 0" class="pt-2 border-t border-charcoal-800/80 flex flex-wrap gap-1.5">
                <NuxtLink
                  v-for="act in msg.actions"
                  :key="act.label"
                  :to="act.to"
                  class="px-2.5 py-1 rounded-lg text-3xs font-bold uppercase tracking-wider bg-gold-500/15 hover:bg-gold-500/30 border border-gold-500/40 text-gold-300 flex items-center gap-1 transition-all"
                  @click="isOpen = false"
                >
                  <Icon :name="act.icon" class="w-3.5 h-3.5" />
                  <span>{{ act.label }}</span>
                </NuxtLink>
              </div>
            </div>
          </div>

        </div>

        <!-- Quick Prompt Chips Bar -->
        <div class="p-2.5 bg-charcoal-950 border-t border-charcoal-850 flex gap-1.5 overflow-x-auto scrollbar-none [mask-image:linear-gradient(to_right,black_calc(100%-16px),transparent)]">
          <button
            v-for="chip in quickChips"
            :key="chip"
            class="px-2.5 py-1 rounded-full text-3xs font-semibold bg-charcoal-900 border border-charcoal-800 hover:border-gold-500/50 hover:text-gold-300 text-charcoal-300 whitespace-nowrap transition-colors shrink-0"
            @click="askQuestion(chip)"
          >
            {{ chip }}
          </button>
        </div>

        <!-- Input Area -->
        <div class="p-3 bg-charcoal-900/90 border-t border-charcoal-800 flex items-center gap-2">
          <input
            v-model="inputQuery"
            type="text"
            placeholder="Hỏi về di sản, món ăn, lịch sử Bù Đăng..."
            class="flex-1 bg-charcoal-950 border border-charcoal-800 rounded-xl px-3.5 py-2 text-xs text-ivory placeholder-charcoal-500 focus:outline-none focus:border-gold-500/60"
            @keypress.enter="handleSend"
          />
          <button
            class="p-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-charcoal-950 font-bold transition-transform active:scale-95 disabled:opacity-50"
            :disabled="!inputQuery.trim()"
            @click="handleSend"
            aria-label="Gửi câu hỏi"
          >
            <Icon name="mdi:send" class="w-4 h-4" />
          </button>
        </div>

      </div>
    </Transition>

  </div>
</template>

<script setup lang="ts">
import { HERITAGES } from '~/data/heritages'

interface ActionLink {
  label: string
  to: string
  icon: string
}

interface ChatMessage {
  role: 'user' | 'bot'
  text: string
  actions?: ActionLink[]
}

const isOpen = ref(false)
const inputQuery = ref('')
const chatContainer = ref<HTMLElement | null>(null)

const quickChips = [
  'Ý nghĩa Sóc Bom Bo?',
  'Cách nấu Canh Thụt S\'Tiêng?',
  'Tìm Trảng Cỏ Bù Lạch trên bản đồ',
  'Bộ Cồng Chiêng 6 chiếc',
  'Căn cứ Nửa Lon là gì?',
  'Lễ hội Mừng Lúa Mới'
]

const messages = ref<ChatMessage[]>([])

function handleSend() {
  if (!inputQuery.value.trim()) return
  const q = inputQuery.value.trim()
  inputQuery.value = ''
  askQuestion(q)
}

function askQuestion(query: string) {
  messages.value.push({ role: 'user', text: query })
  scrollToBottom()

  setTimeout(() => {
    const res = processKnowledgeQuery(query)
    messages.value.push(res)
    scrollToBottom()
  }, 100)
}

function scrollToBottom() {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
  })
}

// 100% Native Local Intent & Knowledge Retrieval Engine
function processKnowledgeQuery(query: string): ChatMessage {
  const q = query.toLowerCase()

  // 1. Sóc Bom Bo
  if (q.includes('bom bo') || q.includes('chày') || q.includes('giã gạo')) {
    const h = HERITAGES.find(x => x.id === 'hrt-011')
    return {
      role: 'bot',
      text: 'Sóc Bom Bo là biểu tượng kháng chiến oai hùng của đồng bào S\'Tiêng. Trong chiến dịch Đồng Xoài 1965, già làng Điểu Lên cùng người dân đã đốt đuốc le, giã gạo nuôi quân thâu đêm bằng cối chày đôi gỗ lim, đi vào bài ca bất hủ "Tiếng chày trên sóc Bom Bo".',
      actions: [
        { label: 'Xem Chi Tiết Di Tích', to: `/heritage/${h?.slug || 'khu-bao-ton-soc-bom-bo'}`, icon: 'mdi:file-document-outline' },
        { label: 'Xem Trên Bản Đồ GIS', to: `/map/?select=hrt-011`, icon: 'mdi:map-marker' },
        { label: 'Làm Bài Học Lịch Sử', to: `/study/lesson/soc-bom-bo`, icon: 'mdi:school' }
      ]
    }
  }

  // 2. Canh Thụt & Ẩm thực S'Tiêng
  if (q.includes('canh thụt') || q.includes('rượu cần') || q.includes('cơm lam') || q.includes('ẩm thực') || q.includes('món ăn')) {
    return {
      role: 'bot',
      text: 'Ẩm thực S\'Tiêng Bù Đăng nổi tiếng với Canh Thụt (nấu trong ống tre lồ ô với đọt mây, lá nhíp, cá suối nướng than củi) và Rượu Cần Men Lá Rừng (Đ\'rắp S\'lung) ủ từ rễ cây thảo mộc đại ngàn.',
      actions: [
        { label: 'Đọc Bài Chuyện Canh Thụt', to: '/stories/canh-thut-doc-ban-stieng-bu-dang', icon: 'mdi:book-open-outline' },
        { label: 'Bí Quyết Rượu Cần Men Rừng', to: '/stories/ruou-can-stieng-bu-dang-men-la-rung', icon: 'mdi:glass-cocktail' }
      ]
    }
  }

  // 3. Cồng Chiêng & Đàn Đá
  if (q.includes('cồng chiêng') || q.includes('đàn đá') || q.includes('nhạc cụ') || q.includes('âm nhạc')) {
    return {
      role: 'bot',
      text: 'Không gian văn hóa Cồng Chiêng S\'Tiêng (thuộc kiệt tác di sản UNESCO) gồm bộ cồng 6 chiếc thiêng liêng. Bên cạnh đó, Đàn Đá Cổ Bù Đăng có niên đại hơn 3.000 năm phát ra thang âm ngũ cung huyền ảo vang vọng đại ngàn.',
      actions: [
        { label: 'Di Sản Cồng Chiêng', to: '/heritage/le-hoi-cong-chieng-stieng', icon: 'mdi:music' },
        { label: 'Xem Bản Đồ GIS', to: '/map/?select=hrt-003', icon: 'mdi:map-marker' }
      ]
    }
  }

  // 4. Trảng Cỏ Bù Lạch & Thác Đứng
  if (q.includes('trảng cỏ') || q.includes('bù lạch') || q.includes('thác đứng') || q.includes('danh thắng')) {
    return {
      role: 'bot',
      text: 'Trảng cỏ Bù Lạch là quần thể thảo nguyên xanh tự nhiên rộng gần 500 ha bao quanh hồ nước ngọt trong veo giữa rừng nguyên sinh Bù Đăng. Gần đó có Thác Đứng kỳ vĩ với dòng nước tuôn trào trên vách đá bazan dựng đứng.',
      actions: [
        { label: 'Khám Phá Trảng Cỏ Bù Lạch', to: '/heritage/trang-co-bu-lach', icon: 'mdi:pine-tree' },
        { label: 'Xem Trên Bản Đồ GIS', to: '/map/?select=hrt-009', icon: 'mdi:map-marker' }
      ]
    }
  }

  // 5. Căn cứ Nửa Lon & Di tích lịch sử
  if (q.includes('nửa lon') || q.includes('tà thiết') || q.includes('phước long') || q.includes('bà rá')) {
    return {
      role: 'bot',
      text: 'Căn cứ Nửa Lon (Bù Đăng) là căn cứ kháng chiến kiên cường, nơi cán bộ và chiến sĩ chia nhau từng nửa lon gạo để duy trì đường dây liên lạc huyết mạch Chiến khu Đ. Núi Bà Rá và Căn cứ Tà Thiết là những địa chỉ đỏ lịch sử oai hùng.',
      actions: [
        { label: 'Chi Tiết Căn Cứ Nửa Lon', to: '/heritage/can-cu-nua-lon-bu-dang', icon: 'mdi:shield' },
        { label: 'Tuyến Kháng Chiến Bản Đồ', to: '/map', icon: 'mdi:map-legend' }
      ]
    }
  }

  // Default Fuzzy Matching across all 16 Heritages
  const matched = HERITAGES.find(h => 
    h.title.toLowerCase().includes(q) || 
    h.shortDescription.toLowerCase().includes(q) ||
    h.tags.some(t => t.toLowerCase().includes(q))
  )

  if (matched) {
    return {
      role: 'bot',
      text: `Tìm thấy di sản: "${matched.title}"\n${matched.shortDescription}`,
      actions: [
        { label: 'Xem Chi Tiết Di Sản', to: `/heritage/${matched.slug}`, icon: 'mdi:file-document-outline' },
        { label: 'Xem Trên Bản Đồ GIS', to: `/map/?select=${matched.id}`, icon: 'mdi:map-marker' }
      ]
    }
  }

  return {
    role: 'bot',
    text: `Tôi đã tìm kiếm trong kho tri thức di sản Bù Đăng. Bạn có thể tra cứu theo tên địa danh (Sóc Bom Bo, Trảng Cỏ Bù Lạch, Căn Cứ Nửa Lon), ẩm thực (Canh thụt, Rượu cần), hoặc mở Bản đồ GIS để trực quan hóa 16 điểm di sản.`,
    actions: [
      { label: 'Mở Bản Đồ GIS', to: '/map', icon: 'mdi:map-legend' },
      { label: 'Kho Bài Học Lịch Sử', to: '/study', icon: 'mdi:school' }
    ]
  }
}
</script>

<style scoped>
.chat-slide-enter-active,
.chat-slide-leave-active {
  transition: all 0.35s cubic-bezier(0.19, 1, 0.22, 1);
}
.chat-slide-enter-from,
.chat-slide-leave-to {
  opacity: 0;
  transform: translateY(30px) scale(0.95);
}
</style>
