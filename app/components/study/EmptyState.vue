<template>
  <div class="w-full max-w-5xl mx-auto py-8 px-4 animate-fade-in relative z-10">
    
    <!-- ============================================ -->
    <!-- 1. RESEARCH TÀI LIỆU EMPTY STATE            -->
    <!-- ============================================ -->
    <div v-if="tab === 'research'" class="space-y-8">
      <!-- Welcome Hero Section -->
      <div class="relative overflow-hidden bg-gradient-to-b from-charcoal-950 to-charcoal-900 border border-gold-500/20 rounded-3xl p-8 md:p-12 shadow-gold/5 flex flex-col md:flex-row items-center gap-8 group">
        <!-- Subtle Background Glow -->
        <div class="absolute -top-24 -left-24 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
        <div class="absolute -bottom-24 -right-24 w-64 h-64 bg-earth-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div class="flex-1 space-y-4 text-left z-10">
          <span class="text-xs font-bold text-gold-400 uppercase tracking-widest bg-gold-500/10 px-3 py-1 rounded-full border border-gold-500/20">
            Học viện số Di sản
          </span>
          <h2 class="font-heading text-2xl md:text-4xl font-bold text-ivory tracking-tight leading-snug">
            Chào mừng đến với Học Tập Di Sản Bù Đăng
          </h2>
          <p class="text-charcoal-300 text-sm md:text-base leading-relaxed font-body">
            Khám phá lịch sử, văn hóa, con người và những giá trị di sản của Thành Phố Đồng Nai thông qua các tài liệu số, bài học tương tác và công cụ học tập thông minh.
          </p>
        </div>
        
        <!-- Large Cultural Asset Illustration Graphic (Mockup) -->
        <div class="w-48 h-48 md:w-56 md:h-56 shrink-0 relative flex items-center justify-center bg-charcoal-950 rounded-2xl border border-charcoal-800 shadow-2xl p-6 group-hover:border-gold-500/30 transition-all duration-500">
          <div class="absolute inset-0 bg-noise opacity-5 rounded-2xl pointer-events-none" />
          <Icon name="mdi:bank-outline" class="w-24 h-24 text-gold-500/30 group-hover:text-gold-500/60 transition-colors duration-500" />
          <div class="absolute bottom-4 text-center">
            <span class="text-3xs font-bold uppercase tracking-wider text-gold-400/80">Khảo Cứu Số Hóa</span>
          </div>
        </div>
      </div>

      <!-- Quick Actions Grid -->
      <div class="space-y-4">
        <h3 class="text-3xs uppercase tracking-widest font-bold text-charcoal-400">Hành động nhanh</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <button 
            @click="$emit('action', 'explore-heritage')"
            class="flex items-center gap-4 p-5 bg-charcoal-950 border border-charcoal-850 hover:border-gold-500/40 rounded-2xl text-left hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group"
          >
            <div class="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center text-gold-400 shrink-0 group-hover:scale-110 transition-transform">
              <Icon name="mdi:compass-outline" class="w-6 h-6" />
            </div>
            <div>
              <span class="block text-sm font-bold text-ivory">📚 Khám phá Di sản</span>
              <span class="text-charcoal-450 text-2xs">Tìm kiếm và tra cứu nhanh toàn thư viện</span>
            </div>
          </button>

          <button 
            @click="$emit('action', 'ask-ai')"
            class="flex items-center gap-4 p-5 bg-charcoal-950 border border-charcoal-850 hover:border-gold-500/40 rounded-2xl text-left hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group"
          >
            <div class="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center text-gold-400 shrink-0 group-hover:scale-110 transition-transform">
              <Icon name="mdi:robot" class="w-6 h-6" />
            </div>
            <div>
              <span class="block text-sm font-bold text-ivory">🤖 Hỏi AI về Di sản</span>
              <span class="text-charcoal-450 text-2xs">Tra cứu nhanh bằng trợ lý ảo thông minh</span>
            </div>
          </button>

          <button 
            @click="$emit('action', 'open-map')"
            class="flex items-center gap-4 p-5 bg-charcoal-950 border border-charcoal-850 hover:border-gold-500/40 rounded-2xl text-left hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group"
          >
            <div class="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center text-gold-400 shrink-0 group-hover:scale-110 transition-transform">
              <Icon name="mdi:map-marker-radius" class="w-6 h-6" />
            </div>
            <div>
              <span class="block text-sm font-bold text-ivory">🗺️ Mở Bản đồ Học tập</span>
              <span class="text-charcoal-450 text-2xs">Theo dõi lộ trình di tích thực địa</span>
            </div>
          </button>
        </div>
      </div>

      <!-- Starter Topics -->
      <div class="space-y-4">
        <h3 class="text-3xs uppercase tracking-widest font-bold text-charcoal-400">Các chủ đề gợi ý tự học</h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <button
            v-for="topic in starterTopics"
            :key="topic.name"
            @click="$emit('action', 'ask-ai-topic', topic.query)"
            class="p-4 bg-charcoal-950 border border-charcoal-850 hover:border-gold-500/30 rounded-xl text-center flex flex-col items-center justify-center gap-2 hover:-translate-y-0.5 hover:bg-gold-500/5 hover:shadow-md transition-all duration-300 group"
          >
            <Icon :name="topic.icon" class="w-6 h-6 text-gold-500/80 group-hover:text-gold-400 transition-colors" />
            <span class="text-2xs font-semibold text-charcoal-300 group-hover:text-ivory transition-colors">{{ topic.name }}</span>
          </button>
        </div>
      </div>

      <!-- Informational Status Card -->
      <div class="p-4 bg-gold-500/5 border border-gold-500/20 rounded-2xl flex items-center gap-3.5 max-w-2xl mx-auto shadow-inner">
        <Icon name="mdi:information" class="w-5 h-5 text-gold-400 shrink-0" />
        <p class="text-gold-400/90 text-xs text-left">
          Tài liệu đang được số hóa và sẽ liên tục được cập nhật từ kho lưu trữ bảo tàng số Thành Phố Đồng Nai.
        </p>
      </div>
    </div>

    <!-- ============================================ -->
    <!-- 2. HÀNH TRÌNH BÀI HỌC EMPTY STATE           -->
    <!-- ============================================ -->
    <div v-else-if="tab === 'lessons'" class="space-y-8 py-4 text-center max-w-3xl mx-auto">
      <div class="space-y-2">
        <h2 class="font-heading text-2xl font-bold text-ivory">Bắt đầu hành trình khám phá</h2>
        <p class="text-charcoal-400 text-xs">Đi qua lộ trình mô-đun bài học để mở khóa kiến thức lịch sử, văn hóa dân tộc S'tiêng.</p>
      </div>

      <!-- Timeline Preview Cards -->
      <div class="relative py-6 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-2">
        <!-- Connecting Line for desktop -->
        <div class="hidden md:block absolute left-10 right-10 top-1/2 -translate-y-4 h-0.5 bg-gradient-to-r from-earth-700 via-gold-500/30 to-earth-700 pointer-events-none" />

        <div 
          v-for="(step, idx) in lessonSteps"
          :key="step.title"
          class="relative w-full md:w-44 bg-charcoal-950 border border-charcoal-850 hover:border-gold-500/30 rounded-2xl p-4 flex md:flex-col items-center gap-3 text-left md:text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group"
        >
          <!-- Node Badge -->
          <div class="w-10 h-10 rounded-full bg-charcoal-900 border border-charcoal-800 text-gold-400 flex items-center justify-center font-bold text-xs group-hover:border-gold-500 group-hover:text-charcoal-900 group-hover:bg-gold-500 shadow transition-all duration-300 relative z-10 shrink-0">
            {{ idx + 1 }}
          </div>
          
          <div class="space-y-1">
            <span class="block text-2xs font-bold text-ivory tracking-wide">{{ step.title }}</span>
            <span class="block text-3xs text-charcoal-450">{{ step.desc }}</span>
          </div>
        </div>
      </div>

      <div class="pt-4">
        <button 
          @click="$emit('action', 'start-learning')"
          class="px-8 py-3 bg-gradient-to-r from-earth-600 to-gold-500 hover:from-earth-500 hover:to-gold-400 text-charcoal-950 font-bold rounded-full text-xs uppercase tracking-wider shadow-lg shadow-gold/25 hover:shadow-gold/45 hover:scale-105 transition-all duration-300"
        >
          Bắt đầu học ngay
        </button>
      </div>
    </div>

    <!-- ============================================ -->
    <!-- 3. AI TRA CỨU DI SẢN EMPTY STATE            -->
    <!-- ============================================ -->
    <div v-else-if="tab === 'ai'" class="space-y-8 max-w-3xl mx-auto text-left">
      <!-- AI Welcome Message -->
      <div class="bg-charcoal-950 border border-charcoal-850 rounded-2xl p-6 md:p-8 space-y-4 relative overflow-hidden">
        <div class="absolute -top-10 -right-10 w-44 h-44 bg-gold-500/5 rounded-full blur-2xl pointer-events-none" />
        
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center text-gold-400 shrink-0">
            <Icon name="mdi:robot" class="w-6 h-6" />
          </div>
          <div>
            <h2 class="font-heading text-lg font-bold text-ivory">Đặt câu hỏi đầu tiên của bạn</h2>
            <p class="text-charcoal-400 text-xs">Trợ lý AI được huấn luyện về dữ liệu di sản Thành Phố Đồng Nai luôn sẵn sàng.</p>
          </div>
        </div>

        <div class="pt-2">
          <span class="text-3xs uppercase tracking-wider font-bold text-charcoal-500">AI CÓ THỂ GIẢI THÍCH CHO BẠN:</span>
          <div class="grid grid-cols-2 md:grid-cols-5 gap-3 mt-2 text-center">
            <div class="p-3 bg-charcoal-900 border border-charcoal-850 rounded-xl space-y-1">
              <Icon name="mdi:history" class="w-4.5 h-4.5 text-gold-500/80" />
              <span class="block text-3xs font-semibold text-charcoal-350">Lịch sử</span>
            </div>
            <div class="p-3 bg-charcoal-900 border border-charcoal-850 rounded-xl space-y-1">
              <Icon name="mdi:palette-swatch" class="w-4.5 h-4.5 text-gold-500/80" />
              <span class="block text-3xs font-semibold text-charcoal-350">Văn hóa</span>
            </div>
            <div class="p-3 bg-charcoal-900 border border-charcoal-850 rounded-xl space-y-1">
              <Icon name="mdi:translate" class="w-4.5 h-4.5 text-gold-500/80" />
              <span class="block text-3xs font-semibold text-charcoal-350">Ngôn ngữ</span>
            </div>
            <div class="p-3 bg-charcoal-900 border border-charcoal-850 rounded-xl space-y-1">
              <Icon name="mdi:account-group" class="w-4.5 h-4.5 text-gold-500/80" />
              <span class="block text-3xs font-semibold text-charcoal-350">Nhân vật</span>
            </div>
            <div class="p-3 bg-charcoal-900 border border-charcoal-850 rounded-xl space-y-1">
              <Icon name="mdi:map-marker" class="w-4.5 h-4.5 text-gold-500/80" />
              <span class="block text-3xs font-semibold text-charcoal-350">Địa danh</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick prompts -->
      <div class="space-y-3">
        <span class="text-3xs uppercase tracking-wider font-bold text-charcoal-400 block">Ví dụ câu hỏi nghiên cứu gợi ý:</span>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <button
            v-for="prompt in aiPrompts"
            :key="prompt"
            @click="$emit('action', 'send-prompt', prompt)"
            class="p-4 bg-charcoal-950 border border-charcoal-850 hover:border-gold-500/30 rounded-xl text-left hover:bg-gold-500/5 transition-all duration-300 text-xs text-charcoal-350 hover:text-ivory font-medium flex items-center justify-between group"
          >
            <span>"{{ prompt }}"</span>
            <Icon name="mdi:arrow-right" class="w-3.5 h-3.5 text-charcoal-400 group-hover:text-gold-400 group-hover:translate-x-0.5 transition-all" />
          </button>
        </div>
      </div>
    </div>

    <!-- ============================================ -->
    <!-- 4. BẢN ĐỒ HỌC TẬP EMPTY STATE               -->
    <!-- ============================================ -->
    <div v-else-if="tab === 'map'" class="space-y-8 max-w-4xl mx-auto text-center">
      <div class="space-y-2">
        <h2 class="font-heading text-2xl font-bold text-ivory">Bản Đồ Học Tập Di Tích</h2>
        <p class="text-charcoal-400 text-xs">Mở rộng và khám phá bản đồ địa điểm nghiên cứu điền dã thực tế.</p>
      </div>

      <!-- Map Trail Visual Preview -->
      <div class="relative bg-charcoal-950 border border-charcoal-850 rounded-2xl p-8 overflow-hidden h-44 flex items-center justify-center">
        <!-- SVG Connecting line -->
        <svg class="absolute inset-x-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 60 80 Q 240 130 480 80 T 900 100" fill="none" stroke="#C7A664" stroke-width="2" stroke-dasharray="6,6" class="opacity-20" />
        </svg>

        <div class="flex justify-between w-full max-w-3xl px-4 relative z-10">
          <div 
            v-for="landmark in mapRoadmap"
            :key="landmark.name"
            class="flex flex-col items-center gap-2 group cursor-pointer"
            @click="$emit('action', 'show-landmark-toast', landmark.name)"
          >
            <div class="w-10 h-10 rounded-full bg-charcoal-900 border-2 border-gold-500/40 text-gold-400 flex items-center justify-center group-hover:scale-110 group-hover:border-gold-400 group-hover:bg-gold-500/10 transition-all duration-300">
              <Icon :name="landmark.icon" class="w-5 h-5" />
            </div>
            <span class="text-3xs font-bold text-charcoal-400 group-hover:text-gold-400 transition-colors uppercase tracking-wider">
              {{ landmark.name }}
            </span>
          </div>
        </div>
      </div>

      <div class="pt-2">
        <button 
          @click="$emit('action', 'explore-roadmap')"
          class="px-8 py-3 bg-gradient-to-r from-earth-600 to-gold-500 hover:from-earth-500 hover:to-gold-400 text-charcoal-950 font-bold rounded-full text-xs uppercase tracking-wider shadow-lg shadow-gold/25 hover:shadow-gold/45 hover:scale-105 transition-all duration-300"
        >
          Khám phá lộ trình
        </button>
      </div>
    </div>

    <!-- ============================================ -->
    <!-- 5. TỪ ĐIỂN S'TIÊNG EMPTY STATE              -->
    <!-- ============================================ -->
    <div v-else-if="tab === 'glossary'" class="space-y-8 max-w-4xl mx-auto">
      <div class="text-center space-y-2">
        <h2 class="font-heading text-2xl font-bold text-ivory">Từ Điển Thuật Ngữ S'tiêng</h2>
        <p class="text-charcoal-400 text-xs">Học nhanh một số từ ngữ S'tiêng cơ bản để bảo tồn ngôn ngữ bản địa.</p>
      </div>

      <!-- Interactive Flip Cards Preview -->
      <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div 
          v-for="word in glossaryWords"
          :key="word.vi"
          class="p-5 bg-charcoal-950 border border-charcoal-850 hover:border-gold-500/30 rounded-2xl text-center space-y-2 flex flex-col items-center justify-between cursor-pointer group hover:-translate-y-1 transition-all duration-300"
          @click="$emit('action', 'pronounce-word', word.st)"
        >
          <span class="text-3xs uppercase tracking-wider font-bold text-charcoal-500">{{ word.vi }}</span>
          <div class="space-y-0.5">
            <span class="block text-base font-bold text-gold-400 font-heading group-hover:scale-105 transition-transform">{{ word.st }}</span>
            <span class="block text-3xs text-charcoal-400 italic font-body">{{ word.pr }}</span>
          </div>
          <div class="w-7 h-7 rounded-full bg-charcoal-900 group-hover:bg-gold-500 group-hover:text-charcoal-950 flex items-center justify-center text-gold-400 transition-colors">
            <Icon name="mdi:volume-high" class="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      <!-- Info Footer -->
      <div class="p-4 bg-gold-500/5 border border-gold-500/20 rounded-2xl text-center max-w-xl mx-auto shadow-inner">
        <p class="text-gold-400/90 text-xs">
          Từ điển đang được mở rộng và cập nhật liên tục nhằm bảo tồn ngôn ngữ S'tiêng bản địa Thành Phố Đồng Nai.
        </p>
      </div>
    </div>

    <!-- ============================================ -->
    <!-- 6. KHO ĐA PHƯƠNG TIỆN EMPTY STATE           -->
    <!-- ============================================ -->
    <div v-else-if="tab === 'media'" class="space-y-8">
      <div class="text-center space-y-2">
        <h2 class="font-heading text-2xl font-bold text-ivory">Kho Lưu Trữ Đa Phương Tiện</h2>
        <p class="text-charcoal-400 text-xs">Tổng hợp hình ảnh thực địa, video phóng sự và nhạc cụ di sản dạng số hóa.</p>
      </div>

      <!-- Skeleton media grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div 
          v-for="item in mediaPlaceholders"
          :key="item.name"
          class="relative h-48 bg-charcoal-950 border border-charcoal-850 rounded-2xl overflow-hidden flex flex-col justify-between p-5 hover:border-gold-500/30 hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
        >
          <!-- Shimmer Effect -->
          <div class="absolute inset-0 bg-gradient-to-r from-transparent via-charcoal-900/40 to-transparent -translate-x-full animate-shimmer pointer-events-none" />

          <div class="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center text-gold-400 group-hover:scale-110 transition-transform">
            <Icon :name="item.icon" class="w-5 h-5" />
          </div>

          <div class="text-left space-y-1">
            <span class="block text-sm font-bold text-ivory">{{ item.name }}</span>
            <span class="block text-3xs text-charcoal-450">{{ item.desc }}</span>
          </div>
        </div>
      </div>

      <div class="p-4 bg-gold-500/5 border border-gold-500/20 rounded-2xl text-center max-w-xl mx-auto shadow-inner">
        <p class="text-gold-400/90 text-xs">
          Nội dung đa phương tiện đang được bổ sung và kiểm duyệt bởi ban quản lý di sản.
        </p>
      </div>
    </div>

    <!-- ============================================ -->
    <!-- 7. HỒ SƠ & THÀNH TÍCH (NEW USER STATE)      -->
    <!-- ============================================ -->
    <div v-else-if="tab === 'achievements'" class="space-y-8 max-w-3xl mx-auto text-left">
      <div class="bg-charcoal-950 border border-charcoal-850 rounded-2xl p-6 md:p-8 space-y-5">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-400 shrink-0 animate-pulse">
            <Icon name="mdi:compass-rose" class="w-7 h-7" />
          </div>
          <div>
            <h2 class="font-heading text-lg font-bold text-ivory">Hành trình di sản của bạn vừa bắt đầu</h2>
            <p class="text-charcoal-400 text-xs">Trở thành Đại sứ di sản bằng cách đọc tài liệu, học bài học và tương tác AI.</p>
          </div>
        </div>

        <!-- Quick Stats tracker -->
        <div class="grid grid-cols-3 gap-4 pt-3 border-t border-charcoal-900">
          <div class="text-center p-3 bg-charcoal-900/60 rounded-xl">
            <span class="block text-xl font-bold text-gold-400">{{ userXP }}</span>
            <span class="text-4xs text-charcoal-500 uppercase font-bold tracking-wider">Tích lũy XP</span>
          </div>
          <div class="text-center p-3 bg-charcoal-900/60 rounded-xl">
            <span class="block text-xl font-bold text-gold-400">{{ streakDays }}</span>
            <span class="text-4xs text-charcoal-500 uppercase font-bold tracking-wider">Ngày liên tiếp</span>
          </div>
          <div class="text-center p-3 bg-charcoal-900/60 rounded-xl">
            <span class="block text-xl font-bold text-gold-400">0</span>
            <span class="text-4xs text-charcoal-500 uppercase font-bold tracking-wider">Huy hiệu</span>
          </div>
        </div>
      </div>

      <!-- Next milestones -->
      <div class="space-y-3">
        <span class="text-3xs uppercase tracking-wider font-bold text-charcoal-400 block">Các mốc cột mốc tiếp theo:</span>
        <div class="space-y-2">
          <div 
            v-for="mile in milestones" 
            :key="mile.name"
            class="p-4 bg-charcoal-950 border border-charcoal-850 rounded-xl flex items-center justify-between text-xs hover:border-gold-500/20 transition-all duration-300"
          >
            <div class="flex items-center gap-3.5">
              <Icon :name="mile.icon" class="w-5 h-5 text-charcoal-400" />
              <div>
                <span class="block font-bold text-ivory">{{ mile.name }}</span>
                <span class="text-charcoal-450 text-2xs">{{ mile.desc }}</span>
              </div>
            </div>
            <span class="text-3xs bg-gold-500/10 border border-gold-500/30 text-gold-400 font-bold px-2 py-0.5 rounded">
              +{{ mile.xp }} XP
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- ============================================ -->
    <!-- 8. GÓC GIÁO VIÊN EMPTY STATE                -->
    <!-- ============================================ -->
    <div v-else-if="tab === 'teacher'" class="space-y-8 max-w-4xl mx-auto">
      <div class="text-center space-y-2">
        <h2 class="font-heading text-2xl font-bold text-ivory">Góc Giáo Viên Địa Phương</h2>
        <p class="text-charcoal-400 text-xs">Cổng thông tin chuyên biệt dành cho giáo viên đóng góp bài giảng và quản lý tiến trình tự học học sinh.</p>
      </div>

      <!-- Suggested Activities Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5 text-left">
        <div 
          v-for="act in teacherActivities"
          :key="act.title"
          class="p-5 bg-charcoal-950 border border-charcoal-850 hover:border-gold-500/30 rounded-2xl flex items-start gap-4 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group cursor-pointer"
          @click="$emit('action', 'teacher-activity', act.title)"
        >
          <div class="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center text-gold-400 shrink-0 group-hover:scale-110 transition-all duration-300">
            <Icon :name="act.icon" class="w-5 h-5" />
          </div>
          <div class="space-y-1">
            <span class="block text-sm font-bold text-ivory group-hover:text-gold-400 transition-colors">{{ act.title }}</span>
            <span class="block text-xs text-charcoal-400 leading-relaxed">{{ act.desc }}</span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
defineProps<{
  tab: string
  userXP: number
  streakDays: number
}>()

defineEmits<{
  (e: 'action', type: string, payload?: any): void
}>()

// Starter Topics for Research Tab
const starterTopics = [
  { name: 'Sóc Bom Bo', icon: 'mdi:fire', query: 'Hãy kể về Sóc Bom Bo' },
  { name: 'Văn hóa S\'tiêng', icon: 'mdi:account-group', query: 'Người S\'tiêng có những lễ hội nào?' },
  { name: 'Cồng chiêng', icon: 'mdi:music-note', query: 'Cồng chiêng có ý nghĩa gì?' },
  { name: 'Thổ cẩm', icon: 'mdi:palette', query: 'Hãy giải thích hoa văn thổ cẩm S\'tiêng' },
  { name: 'Lịch sử Đồng Nai', icon: 'mdi:history', query: 'Lịch sử hình thành Thành Phố Đồng Nai' },
  { name: 'Địa danh tiêu biểu', icon: 'mdi:map-marker', query: 'Những di tích nổi bật ở Thành Phố Đồng Nai?' }
]

// Lesson Timeline flow preview Steps
const lessonSteps = [
  { title: 'Đồng Nai', desc: 'Lịch sử vùng đất cách mạng' },
  { title: 'Người S\'tiêng', desc: 'Đồng bào bản địa lâu đời' },
  { title: 'Di sản văn hóa', desc: 'Học thuyết minh di sản số' },
  { title: 'Nghệ thuật truyền thống', desc: 'Thổ cẩm và cồng chiêng' },
  { title: 'Bảo tồn và phát triển', desc: 'Giáo dục số hóa địa phương' }
]

// AI Suggested prompts examples
const aiPrompts = [
  'Hãy kể về Sóc Bom Bo',
  'Người S\'tiêng có những lễ hội nào?',
  'Cồng chiêng có ý nghĩa gì?',
  'Những di tích nổi bật ở Thành Phố Đồng Nai?'
]

// Map Roadmap Preview Markers
const mapRoadmap = [
  { name: 'Địa lý Đồng Nai', icon: 'mdi:nature' },
  { name: 'Lịch sử Cách mạng', icon: 'mdi:shield-outline' },
  { name: 'Văn hóa S\'tiêng', icon: 'mdi:account-multiple' },
  { name: 'Nghệ thuật Cồng chiêng', icon: 'mdi:music' },
  { name: 'Bảo tồn Di sản', icon: 'mdi:seedling' }
]

// Glossary S'tiêng mini vocabulary starter
const glossaryWords = [
  { vi: 'Xin chào', st: 'Ngăn klong', pr: '/Nhăn clông/' },
  { vi: 'Gia định', st: 'Năm', pr: '/Năm/' },
  { vi: 'Rừng', st: 'Bri', pr: '/Bri/' },
  { vi: 'Lễ hội', st: 'Yang', pr: '/Giàng/' },
  { vi: 'Âm nhạc', st: 'Ching', pr: '/Chinh/' }
]

// Media Placeholder Categories
const mediaPlaceholders = [
  { name: '📷 Hình ảnh di sản', icon: 'mdi:image-multiple-outline', desc: 'Ảnh tư liệu cổ truyền buôn sóc' },
  { name: '🎥 Video thực địa', icon: 'mdi:video-outline', desc: 'Flycam di tích cảnh quan Thành Phố Đồng Nai' },
  { name: '🎵 Âm thanh nhạc cụ', icon: 'mdi:volume-high', desc: 'Bản thu âm thanh cồng chiêng' },
  { name: '📄 Tư liệu số hóa', icon: 'mdi:file-document-outline', desc: 'Bản quét văn bản lưu trữ học đường' }
]

// New User Milestones
const milestones = [
  { name: 'Đại sứ sơ cấp', desc: 'Đạt mốc tích lũy 100 XP đầu tiên', icon: 'mdi:star-outline', xp: 50 },
  { name: 'Người tìm tin', desc: 'Đọc bài viết nghiên cứu đầu tiên trong thư viện số', icon: 'mdi:book-open-outline', xp: 30 },
  { name: 'Người đối thoại', desc: 'Hỏi AI câu hỏi khảo cứu di sản đầu tiên', icon: 'mdi:message-outline', xp: 20 }
]

// Teacher Suggested Activities
const teacherActivities = [
  { title: 'Tổ chức bài học', icon: 'mdi:calendar-multiselect', desc: 'Soạn thảo và điều phối mô-đun bài giảng lịch sử, địa lý địa phương' },
  { title: 'Tạo chủ đề thảo luận', icon: 'mdi:comment-multiple-outline', desc: 'Khởi xướng đề tài khảo sát điền dã thực tế cho học sinh tham luận' },
  { title: 'Chia sẻ tư liệu giáo án', icon: 'mdi:folder-upload-outline', desc: 'Tải lên bài viết khoa học, slide trình chiếu tự biên soạn cho trường lớp' },
  { title: 'Theo dõi tiến độ học sinh', icon: 'mdi:trending-up', desc: 'Xem bảng tổng hợp thống kê XP học tập, điểm làm kiểm tra trắc nghiệm' }
]
</script>

<style scoped>
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
.animate-shimmer {
  animation: shimmer 2s infinite linear;
}
.animate-fade-in {
  animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
