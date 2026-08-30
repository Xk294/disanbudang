<template>
  <Teleport to="body">
    <Transition name="ai-modal">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 bg-charcoal-950/80 backdrop-blur-md"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ai-modal-title"
        @click.self="close"
        @keydown.esc="close"
      >
        <div
          class="relative w-full max-w-2xl bg-charcoal-900 border border-gold-500/30 rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_30px_rgba(199,166,100,0.2)] flex flex-col h-[85vh] sm:h-[80vh] max-h-[720px] overflow-hidden backdrop-blur-2xl my-auto"
        >
          <!-- Subtle luxury pattern overlay -->
          <div
            class="absolute inset-0 rounded-[inherit] pointer-events-none opacity-[0.03]"
            style="background-image: radial-gradient(circle at 2px 2px, #C7A664 1px, transparent 0); background-size: 20px 20px;"
            aria-hidden="true"
          />

          <!-- Header (Always fixed at top of modal) -->
          <div class="relative z-20 px-4 sm:px-6 py-3.5 border-b border-charcoal-800 flex items-center justify-between bg-charcoal-950/90 shrink-0">
            <div class="flex items-center gap-3">
              <div class="relative shrink-0">
                <div class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-gold-600 via-gold-400 to-gold-200 flex items-center justify-center text-charcoal-950 shadow-[0_0_15px_rgba(199,166,100,0.4)]">
                  <Icon name="mdi:sparkles" class="w-5 h-5 text-charcoal-950 animate-pulse" />
                </div>
                <span class="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-charcoal-950 rounded-full" />
              </div>
              <div class="min-w-0">
                <div class="flex items-center gap-2 flex-wrap">
                  <h3 id="ai-modal-title" class="font-heading font-bold text-ivory text-base sm:text-lg leading-tight truncate">
                    Trợ Lý AI Di Sản
                  </h3>
                  <span class="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-gold-500/15 text-gold-300 border border-gold-500/30">
                    Bảo Tàng Số
                  </span>
                </div>
                <p class="text-[11px] text-charcoal-400 mt-0.5 truncate">
                  Di tích, Văn hóa S'tiêng, Ẩm thực & Đầu tư Bù Đăng
                </p>
              </div>
            </div>

            <!-- Action buttons: Làm mới & Nút Đóng nổi bật -->
            <div class="flex items-center gap-2 shrink-0">
              <button
                v-if="messages.length > 1"
                type="button"
                class="px-2.5 py-1.5 rounded-xl bg-charcoal-900 hover:bg-charcoal-800 text-charcoal-300 hover:text-ivory border border-charcoal-700/60 transition-all text-xs flex items-center gap-1 cursor-pointer"
                title="Xóa lịch sử trò chuyện"
                @click="clearHistory"
              >
                <Icon name="mdi:trash-can-outline" class="w-3.5 h-3.5" />
                <span class="hidden sm:inline text-2xs">Làm mới</span>
              </button>

              <!-- Prominent Close Button -->
              <button
                type="button"
                class="px-3 py-1.5 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 text-charcoal-200 hover:text-ivory border border-charcoal-600 hover:border-gold-500/40 transition-all flex items-center gap-1.5 font-medium text-xs cursor-pointer shadow-sm"
                aria-label="Đóng trợ lý AI"
                title="Đóng (Phím ESC)"
                @click="close"
              >
                <Icon name="mdi:close" class="w-4 h-4 text-gold-400" />
                <span class="text-xs font-semibold">Đóng</span>
              </button>
            </div>
          </div>

          <!-- Chat messages container -->
          <div ref="chatContainer" class="relative z-10 flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 min-h-[200px] scrollbar-thin">
            <div
              v-for="(msg, index) in messages"
              :key="index"
              class="flex gap-3"
              :class="msg.role === 'user' ? 'justify-end' : 'justify-start'"
            >
              <!-- Assistant Avatar -->
              <div
                v-if="msg.role === 'assistant'"
                class="w-8 h-8 rounded-xl bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-400 shrink-0 mt-0.5 shadow-sm"
              >
                <Icon name="mdi:robot-happy-outline" class="w-4 h-4" />
              </div>

              <!-- Message bubble -->
              <div
                class="max-w-[90%] sm:max-w-[82%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed"
                :class="[
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-gold-500 to-gold-400 text-charcoal-950 font-semibold rounded-tr-xs shadow-[0_4px_16px_rgba(199,166,100,0.25)]'
                    : 'bg-charcoal-950/90 border border-charcoal-800 text-charcoal-100 rounded-tl-xs shadow-md'
                ]"
              >
                <!-- Content formatted with safe markdown replacement -->
                <div class="space-y-1.5 leading-relaxed" v-html="formatMessage(msg.content)" />

                <!-- Related Links (if any) -->
                <div v-if="msg.relatedLinks && msg.relatedLinks.length > 0" class="mt-3.5 pt-3 border-t border-charcoal-800/80 flex flex-wrap gap-2">
                  <NuxtLink
                    v-for="(link, lIdx) in msg.relatedLinks"
                    :key="lIdx"
                    :to="link.url"
                    class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-2xs font-semibold bg-gold-500/10 hover:bg-gold-500/20 text-gold-300 border border-gold-500/30 transition-all hover:scale-[1.02]"
                    @click="close"
                  >
                    <Icon :name="link.icon || 'mdi:arrow-top-right'" class="w-3.5 h-3.5 text-gold-400" />
                    <span>{{ link.title }}</span>
                  </NuxtLink>
                </div>

                <!-- Message Action Bar (for assistant messages) -->
                <div
                  v-if="msg.role === 'assistant' && index > 0"
                  class="mt-3 pt-2.5 border-t border-charcoal-800/60 flex items-center justify-between text-charcoal-400 text-2xs"
                >
                  <div class="flex items-center gap-3">
                    <!-- Copy Button -->
                    <button
                      type="button"
                      class="hover:text-gold-300 transition-colors flex items-center gap-1 cursor-pointer"
                      @click="copyMessage(msg.content, index)"
                    >
                      <Icon :name="copiedIndex === index ? 'mdi:check' : 'mdi:content-copy'" class="w-3.5 h-3.5" :class="{ 'text-emerald-400': copiedIndex === index }" />
                      <span>{{ copiedIndex === index ? 'Đã sao chép' : 'Sao chép' }}</span>
                    </button>

                    <!-- Voice TTS Button -->
                    <button
                      type="button"
                      class="hover:text-gold-300 transition-colors flex items-center gap-1 cursor-pointer"
                      @click="toggleSpeak(msg.content, index)"
                    >
                      <Icon :name="speakingIndex === index ? 'mdi:volume-high animate-pulse text-gold-400' : 'mdi:volume-medium'" class="w-3.5 h-3.5" />
                      <span>{{ speakingIndex === index ? 'Đang đọc...' : 'Nghe đọc' }}</span>
                    </button>
                  </div>

                  <span class="text-[10px] text-charcoal-500 font-mono">DiSan AI Engine</span>
                </div>
              </div>

              <!-- User Avatar -->
              <div
                v-if="msg.role === 'user'"
                class="w-8 h-8 rounded-xl bg-charcoal-800 border border-charcoal-700 flex items-center justify-center text-ivory shrink-0 mt-0.5 shadow-sm"
              >
                <Icon name="mdi:account-outline" class="w-4 h-4" />
              </div>
            </div>

            <!-- Loading typing indicator -->
            <div v-if="isThinking" class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-xl bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-400 shrink-0">
                <Icon name="mdi:sparkles" class="w-4 h-4 animate-spin" />
              </div>
              <div class="bg-charcoal-950/90 border border-charcoal-800 rounded-2xl rounded-tl-xs px-4 py-3 flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-gold-400 animate-bounce" style="animation-delay: 0s" />
                <span class="w-2 h-2 rounded-full bg-gold-400 animate-bounce" style="animation-delay: 0.2s" />
                <span class="w-2 h-2 rounded-full bg-gold-400 animate-bounce" style="animation-delay: 0.4s" />
                <span class="text-xs text-charcoal-400 ml-2 font-mono">Đang tra cứu cơ sở tri thức...</span>
              </div>
            </div>
          </div>

          <!-- Quick prompt chips (Clean horizontal scrolling without ugly scrollbar) -->
          <div class="relative z-10 px-4 sm:px-6 pt-2 pb-2 border-t border-charcoal-800/80 bg-charcoal-950/80 shrink-0">
            <div class="flex items-center justify-between mb-1.5">
              <p class="text-[10px] uppercase tracking-wider font-semibold text-charcoal-400 flex items-center gap-1.5">
                <Icon name="mdi:lightbulb-outline" class="w-3.5 h-3.5 text-gold-400" />
                <span>Gợi ý câu hỏi thông minh:</span>
              </p>
            </div>
            <div class="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              <button
                v-for="chip in currentChips"
                :key="chip"
                type="button"
                class="shrink-0 px-3 py-1.5 rounded-full text-2xs font-medium bg-charcoal-900 border border-charcoal-700/80 text-charcoal-200 hover:text-gold-200 hover:border-gold-500/50 hover:bg-gold-500/15 active:scale-95 transition-all cursor-pointer whitespace-nowrap shadow-xs"
                @click="sendPrompt(chip)"
              >
                {{ chip }}
              </button>
            </div>
          </div>

          <!-- Input Row -->
          <form class="relative z-10 p-3 sm:p-4 bg-charcoal-950 border-t border-charcoal-800 flex items-center gap-2.5 shrink-0" @submit.prevent="submitUserMessage">
            <div class="relative flex-1">
              <input
                ref="inputEl"
                v-model="inputQuery"
                type="text"
                placeholder="Hỏi về di tích, văn hóa S'tiêng, ẩm thực, lộ trình, đầu tư..."
                class="ai-input-field w-full rounded-xl pl-4 pr-10 py-3 text-xs sm:text-sm transition-all focus:outline-none"
                :disabled="isThinking"
                @keydown.enter.exact.prevent="submitUserMessage"
              />
              <button
                v-if="inputQuery"
                type="button"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-400 hover:text-ivory p-1 cursor-pointer"
                @click="inputQuery = ''"
              >
                <Icon name="mdi:close-circle" class="w-4 h-4" />
              </button>
            </div>

            <button
              type="submit"
              class="h-11 px-5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-300 text-charcoal-950 font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-[0_0_18px_rgba(199,166,100,0.25)] hover:shadow-[0_0_24px_rgba(199,166,100,0.4)] active:scale-95 transition-all shrink-0 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              :disabled="!inputQuery.trim() || isThinking"
            >
              <span>Gửi</span>
              <Icon name="mdi:send" class="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { processAiQuery } from '~/utils/aiHeritageEngine'

const isOpen = useState<boolean>('isAiAssistantOpen', () => false)
const isThinking = ref(false)
const inputQuery = ref('')
const inputEl = ref<HTMLInputElement | null>(null)
const chatContainer = ref<HTMLElement | null>(null)
const copiedIndex = ref<number | null>(null)
const speakingIndex = ref<number | null>(null)

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  relatedLinks?: { title: string; url: string; icon?: string }[]
}

const defaultGreeting = `👋 **Xin chào! Tôi là Trợ lý AI Bảo Tàng Số Di Sản Bù Đăng.**

Tôi đã được trang bị toàn bộ cơ sở tri thức đa ngành:
• 🏛️ **Di tích Lịch sử:** Căn cứ Nửa Lon, Sóc Bom Bo, Chiến Khu Đ, Dốc 31...
• 🌲 **Danh thắng Thiên nhiên:** Quần thể Trảng cỏ Bù Lạch (500 ha), Thác Đứng, VQG Cát Tiên...
• 🥁 **Bản sắc Văn hóa:** Cồng chiêng S'tiêng, Dệt thổ cẩm, Lễ hội Mừng lúa mới...
• 🍲 **Ẩm thực Bản địa:** Canh thụt ống nứa, Cơm lam gà nướng, Hạt điều OCOP 5 sao...
• 💼 **Đầu tư & Du lịch:** Nông nghiệp công nghệ cao, tuyến cao tốc, cẩm nang tour 1 ngày/2 ngày...

Bạn muốn tìm hiểu thông tin nào hôm nay?`

const initialChips = [
  '⚔️ Chiến Khu Đ là gì?',
  '🥁 Huyền thoại Sóc Bom Bo',
  '🌾 Lễ hội mừng lúa mới S\'tiêng',
  '🌲 Trảng cỏ Bù Lạch',
  '🍲 Món canh thụt ống nứa',
  '💼 Cơ hội đầu tư Bù Đăng',
  '🗺️ Gợi ý lịch trình 1 ngày'
]

const currentChips = ref<string[]>([...initialChips])

const messages = ref<ChatMessage[]>([
  {
    role: 'assistant',
    content: defaultGreeting,
    relatedLinks: [
      { title: 'Khám phá Di Sản', url: '/explore', icon: 'mdi:compass' },
      { title: 'Bản đồ tương tác', url: '/map', icon: 'mdi:map-marker-radius' },
      { title: 'Virtual Tour 360°', url: '/explore/virtual-tour', icon: 'mdi:video-360' }
    ]
  }
])

function close() {
  stopSpeaking()
  isOpen.value = false
}

function clearHistory() {
  stopSpeaking()
  messages.value = [
    {
      role: 'assistant',
      content: 'Tôi đã làm mới hội thoại. Hãy hỏi tôi bất kỳ điều gì về di tích, văn hóa, ẩm thực hoặc đầu tư nhé!',
      relatedLinks: [
        { title: 'Khám phá Di Sản', url: '/explore', icon: 'mdi:compass' },
        { title: 'Cơ hội Đầu Tư', url: '/invest', icon: 'mdi:chart-line' }
      ]
    }
  ]
  currentChips.value = [...initialChips]
}

function scrollToBottom() {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
  })
}

// Simple safe markdown formatter for bold, lists, and line breaks
function formatMessage(text: string): string {
  if (!text) return ''
  let html = text
    // Escape HTML basic
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-gold-300 font-semibold">$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, '<em class="text-charcoal-300 italic">$1</em>')
    // Bullet points
    .replace(/^• (.*$)/gim, '<div class="flex items-start gap-2 my-1"><span class="text-gold-400 mt-0.5 shrink-0">•</span><span>$1</span></div>')
    .replace(/^- (.*$)/gim, '<div class="flex items-start gap-2 my-0.5 ml-4 text-charcoal-300"><span class="text-gold-500/70 shrink-0">-</span><span>$1</span></div>')
    // Line breaks
    .replace(/\n\n/g, '<div class="h-1.5"></div>')
    .replace(/\n/g, '<br />')

  return html
}

// Copy message text to clipboard
async function copyMessage(content: string, index: number) {
  try {
    const plainText = content.replace(/\*\*/g, '').replace(/\*/g, '')
    await navigator.clipboard.writeText(plainText)
    copiedIndex.value = index
    setTimeout(() => {
      if (copiedIndex.value === index) copiedIndex.value = null
    }, 2000)
  } catch (err) {
    console.error('Failed to copy', err)
  }
}

// Web Speech API Text-to-Speech
function toggleSpeak(content: string, index: number) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return

  if (speakingIndex.value === index) {
    stopSpeaking()
    return
  }

  stopSpeaking()
  const plainText = content.replace(/[*#•\-_]/g, '').replace(/\n+/g, '. ')
  const utterance = new SpeechSynthesisUtterance(plainText)
  utterance.lang = 'vi-VN'
  utterance.rate = 1.0

  // Select Vietnamese voice if available
  const voices = window.speechSynthesis.getVoices()
  const viVoice = voices.find(v => v.lang.includes('vi') || v.lang.includes('VN'))
  if (viVoice) {
    utterance.voice = viVoice
  }

  utterance.onend = () => {
    speakingIndex.value = null
  }
  utterance.onerror = () => {
    speakingIndex.value = null
  }

  speakingIndex.value = index
  window.speechSynthesis.speak(utterance)
}

function stopSpeaking() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel()
  }
  speakingIndex.value = null
}

watch(isOpen, async (val) => {
  if (val) {
    scrollToBottom()
    await nextTick()
    inputEl.value?.focus()
  } else {
    stopSpeaking()
  }
})

function sendPrompt(promptText: string) {
  inputQuery.value = promptText
  submitUserMessage()
}

function submitUserMessage() {
  const text = inputQuery.value.trim()
  if (!text || isThinking.value) return

  stopSpeaking()

  // Add User Message
  messages.value.push({
    role: 'user',
    content: text,
  })
  inputQuery.value = ''
  isThinking.value = true
  scrollToBottom()

  // Process query through smart zero-cost AI Knowledge Engine
  setTimeout(() => {
    isThinking.value = false
    const res = processAiQuery(text)

    messages.value.push({
      role: 'assistant',
      content: res.answer,
      relatedLinks: res.relatedLinks
    })

    if (res.suggestions && res.suggestions.length > 0) {
      currentChips.value = res.suggestions
    }

    scrollToBottom()
  }, 450)
}

onUnmounted(() => {
  stopSpeaking()
})
</script>

<style scoped>
.ai-modal-enter-active,
.ai-modal-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.ai-modal-enter-from,
.ai-modal-leave-to {
  opacity: 0;
  transform: scale(0.96) translateY(12px);
  filter: blur(4px);
}

/* Custom dark input styling to prevent white background in all browsers */
.ai-input-field {
  background-color: #120f0c !important;
  color: #fdfbf7 !important;
  border: 1px solid rgba(199, 166, 100, 0.3) !important;
}
.ai-input-field:focus {
  border-color: #C7A664 !important;
  box-shadow: 0 0 0 2px rgba(199, 166, 100, 0.25) !important;
  background-color: #17130f !important;
}
.ai-input-field::placeholder {
  color: #71685f !important;
}
.ai-input-field:-webkit-autofill,
.ai-input-field:-webkit-autofill:hover,
.ai-input-field:-webkit-autofill:focus {
  -webkit-text-fill-color: #fdfbf7 !important;
  -webkit-box-shadow: 0 0 0px 1000px #120f0c inset !important;
  transition: background-color 5000s ease-in-out 0s;
}

/* Custom crisp scrollbar for chat container */
::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: rgba(199, 166, 100, 0.25);
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(199, 166, 100, 0.5);
}

/* Explicitly hide scrollbar for chips */
.scrollbar-none {
  scrollbar-width: none !important;
  -ms-overflow-style: none !important;
}
.scrollbar-none::-webkit-scrollbar {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
}
</style>
