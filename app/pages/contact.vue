<template>
  <div class="bg-charcoal-900 min-h-screen">
    <!-- Hero -->
    <div class="bg-dark-earth py-20 relative overflow-hidden">
      <div class="absolute top-0 right-0 w-96 h-96 bg-gold-500/6 rounded-full blur-3xl" />
      <div class="container-heritage relative z-10">
        <span class="section-label text-gold-400">Liên Hệ</span>
        <h1 class="font-heading font-bold text-ivory text-5xl lg:text-6xl leading-[1.35] md:leading-[1.3] lg:leading-[1.25] mb-6 md:mb-8 text-balance tracking-normal">
          Kết Nối<br/> <span class="text-gradient-gold">Với Chúng Tôi</span>
        </h1>
        <p class="text-charcoal-300 text-lg max-w-xl">
          Có thắc mắc, đề xuất hoặc muốn hợp tác? Chúng tôi luôn sẵn lòng lắng nghe
        </p>
      </div>
    </div>

    <div class="container-heritage py-16">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <!-- Contact info -->
        <div class="space-y-6">
          <div
            v-for="info in contactInfo"
            :key="info.label"
            class="flex gap-4 p-5 bg-charcoal-950 border border-charcoal-850 rounded-2xl shadow-lg reveal"
          >
            <div class="w-11 h-11 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center flex-shrink-0">
              <Icon :name="info.icon" class="w-5 h-5 text-gold-400" />
            </div>
            <div>
              <p class="text-charcoal-400 text-xs uppercase tracking-wider mb-1">{{ info.label }}</p>
              <p class="font-medium text-ivory text-sm">{{ info.value }}</p>
            </div>
          </div>

          <!-- Map placeholder with Google Maps Link -->
          <a
            href="https://www.google.com/maps/search/?api=1&query=Bù+Đăng+Đồng+Nai"
            target="_blank"
            rel="noopener noreferrer"
            class="block bg-charcoal-800 rounded-2xl aspect-video flex items-center justify-center relative overflow-hidden group border border-charcoal-700 hover:border-gold-500/50 transition-all duration-500 shadow-md reveal"
          >
            <div class="absolute inset-0 bg-[url('/images/heritage/danh-thang/bu-lach-sm.webp')] bg-cover bg-center opacity-25 filter blur-xs group-hover:scale-105 transition-transform duration-700" />
            <div class="absolute inset-0 bg-charcoal-950/60" />
            <div class="relative z-10 text-center p-6">
              <Icon name="mdi:map-marker-radius" class="w-10 h-10 text-gold-450 mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
              <h3 class="text-white text-base font-bold font-heading">Bản Đồ Chỉ Đường</h3>
              <p class="text-charcoal-350 text-xs mt-1">Thành Phố Đồng Nai, Việt Nam</p>
              <span class="inline-flex items-center gap-1 text-gold-450 text-2xs uppercase tracking-widest font-semibold mt-3 group-hover:text-gold-400 transition-colors">
                Xem trên Google Maps
                <Icon name="mdi:open-in-new" class="w-3 h-3" />
              </span>
            </div>
          </a>
        </div>

        <!-- Form -->
        <div class="lg:col-span-2">
          <form class="space-y-6 bg-charcoal-950 border border-charcoal-850 rounded-3xl p-8 shadow-2xl reveal" @submit.prevent="handleSubmit">
            <h2 class="font-heading font-bold text-ivory text-2xl mb-2">Gửi Tin Nhắn</h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label class="block text-charcoal-300 text-sm font-medium mb-2" for="c-name">Họ Tên *</label>
                <input id="c-name" v-model="form.name" type="text" required placeholder="Nguyễn Văn A"
                  class="w-full px-4 py-3 bg-[#1A140F] border border-charcoal-800 rounded-xl text-ivory placeholder-charcoal-400 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/20 transition-all duration-300" />
              </div>
              <div>
                <label class="block text-charcoal-300 text-sm font-medium mb-2" for="c-email">Email *</label>
                <input id="c-email" v-model="form.email" type="email" required placeholder="email@example.com"
                  class="w-full px-4 py-3 bg-[#1A140F] border border-charcoal-800 rounded-xl text-ivory placeholder-charcoal-400 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/20 transition-all duration-300" />
              </div>
            </div>

            <div>
              <label class="block text-charcoal-300 text-sm font-medium mb-2" for="c-subject">Chủ Đề</label>
              <select id="c-subject" v-model="form.subject" aria-label="Chủ đề liên hệ"
                class="w-full px-4 py-3 bg-[#1A140F] border border-charcoal-800 rounded-xl text-ivory focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/20 transition-all duration-300">
                <option value="general">Thắc mắc chung</option>
                <option value="contribute">Đóng góp tư liệu</option>
                <option value="partnership">Hợp tác</option>
                <option value="media">Truyền thông</option>
                <option value="bug">Báo lỗi kỹ thuật</option>
              </select>
            </div>

            <div>
              <label class="block text-charcoal-300 text-sm font-medium mb-2" for="c-message">Nội Dung *</label>
              <textarea id="c-message" v-model="form.message" required rows="5" placeholder="Nội dung tin nhắn..."
                class="w-full px-4 py-3 bg-[#1A140F] border border-charcoal-800 rounded-xl text-ivory placeholder-charcoal-400 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/20 transition-all duration-300 resize-none" />
            </div>

            <!-- Invisible Bot Honeypot Field -->
            <div class="hidden" style="display:none !important;" aria-hidden="true">
              <label for="contact_hp_check">Bỏ trống trường này</label>
              <input id="contact_hp_check" v-model="form._hp" type="text" name="_hp" tabindex="-1" autocomplete="off" />
            </div>

            <button type="submit" class="btn-primary w-full justify-center py-4 text-base">
              <Icon name="mdi:email-edit-outline" class="w-5 h-5 animate-pulse-gold" />
              Soạn Email Gửi Chúng Tôi
            </button>
            <p class="text-charcoal-400 text-xs text-center">Nhấn nút trên để mở trình soạn email với nội dung đã điền sẵn, gửi tới {{ CONTACT_EMAIL }}.</p>

            <Transition name="fade">
              <div v-if="submitted" class="p-4 rounded-xl bg-green-950/40 border border-green-800/40 flex items-center gap-3">
                <Icon name="mdi:check-circle" class="w-6 h-6 text-green-500 flex-shrink-0 animate-bounce" />
                <p class="text-green-400 text-sm font-medium">Trình soạn email đã mở với nội dung của bạn. Nhấn Gửi trong email để hoàn tất. Chúng tôi phản hồi trong 1-3 ngày làm việc.</p>
              </div>
            </Transition>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })
useMuseumSeo({
  title: 'Liên Hệ',
  description: 'Liên hệ với ban quản lý dự án Di Sản Bù Đăng để hợp tác, đóng góp tư liệu hoặc tìm hiểu thêm về di sản văn hóa.'
})

// ContactPage schema per RULE-seo page-type matrix
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Liên Hệ Di Sản Bù Đăng',
        url: 'https://disanbudang.com/contact/',
        about: { '@id': 'https://disanbudang.com/#organization' },
      }),
    },
  ],
})

const { observeAll } = useScrollReveal()
onMounted(() => nextTick(() => observeAll()))

const form = reactive({ name: '', email: '', subject: 'general', message: '', _hp: '' })
const submitted = ref(false)

const CONTACT_EMAIL = 'nguyenxuankiet294@gmail.com'
const subjectLabels: Record<string, string> = {
  general: 'Thắc mắc chung',
  contribute: 'Đóng góp tư liệu',
  partnership: 'Hợp tác',
  media: 'Truyền thông',
  bug: 'Báo lỗi kỹ thuật',
}

const contactInfo = [
  { icon: 'mdi:map-marker-outline', label: 'Địa Chỉ', value: 'Thành Phố Đồng Nai, Việt Nam' },
  { icon: 'mdi:phone-outline', label: 'Số Điện Thoại', value: '0355 356 294' },
  { icon: 'mdi:email-outline', label: 'Email', value: 'nguyenxuankiet294@gmail.com' },
]

function handleSubmit() {
  if (form._hp) {
    submitted.value = true
    return
  }
  const subject = `[Di Sản Bù Đăng] ${subjectLabels[form.subject] ?? form.subject}`
  const body = `Họ tên: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  submitted.value = true
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.4s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
