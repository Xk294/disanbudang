<template>
  <div class="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-800">
      <div>
        <div class="flex items-center gap-3">
          <h1 class="text-xl sm:text-2xl font-bold text-stone-100 tracking-tight">Tổng Quan Hệ Thống</h1>
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            Realtime Analytics
          </span>
        </div>
        <p class="text-stone-400 text-xs mt-1">
          Chỉ số vận hành nền tảng số, phễu chuyển đổi du khách và tần suất tương tác tính năng.
        </p>
      </div>

      <!-- Controls & Filter Toolbar -->
      <div class="flex items-center gap-3 flex-wrap">
        <!-- Relative time toggle -->
        <div class="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-300">
          <span class="text-stone-400 text-[11px] font-medium">Relative time</span>
          <button
            type="button"
            class="relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
            :class="relativeTime ? 'bg-amber-500' : 'bg-stone-800'"
            @click="relativeTime = !relativeTime"
            aria-label="Toggle relative time"
          >
            <span
              class="pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out"
              :class="relativeTime ? 'translate-x-4' : 'translate-x-0'"
            />
          </button>
          <span class="text-[10px] font-bold font-mono" :class="relativeTime ? 'text-amber-400' : 'text-stone-500'">
            {{ relativeTime ? 'ON' : 'OFF' }}
          </span>
        </div>

        <!-- Range Selector -->
        <div class="flex items-center gap-1.5 px-2 py-1 rounded-xl bg-stone-900 border border-stone-800">
          <span class="text-[11px] text-stone-500 font-medium pl-1">Khoảng:</span>
          <select
            v-model="selectedRange"
            class="bg-transparent text-xs text-stone-200 font-semibold focus:outline-none cursor-pointer pr-1"
            @change="fetchOverview"
          >
            <option value="7" class="bg-stone-900 text-stone-200">7 ngày</option>
            <option value="14" class="bg-stone-900 text-stone-200">14 ngày</option>
            <option value="30" class="bg-stone-900 text-stone-200">30 ngày</option>
            <option value="all" class="bg-stone-900 text-stone-200">Tất cả</option>
          </select>
        </div>

        <!-- Refresh Button -->
        <button
          class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-800 hover:border-stone-700 hover:bg-stone-800 text-stone-300 text-xs font-medium transition-colors cursor-pointer"
          :disabled="loading"
          @click="fetchOverview"
        >
          <Icon :name="loading ? 'mdi:loading' : 'mdi:refresh'" :class="{ 'animate-spin': loading }" class="w-4 h-4 text-amber-500" />
          <span>Làm mới</span>
        </button>
      </div>
    </div>

    <!-- 1. Top KPI Cards (4 Cards) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- Card 1: Registered Users -->
      <div class="bg-stone-900/90 border border-stone-800 rounded-2xl p-5 relative overflow-hidden group hover:border-stone-700 transition-all">
        <div class="flex items-center justify-between">
          <div class="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Icon name="mdi:account-group" class="w-5 h-5" />
          </div>
          <span class="text-[10px] font-mono uppercase tracking-wider text-amber-400/80 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
            Google Auth
          </span>
        </div>
        <div class="mt-4">
          <p class="text-3xl font-extrabold text-stone-100 tabular-nums">
            {{ formatNumber(overviewData.kpis.registered_users) }}
          </p>
          <p class="text-xs text-stone-400 mt-1 font-medium">
            Registered users <span class="text-stone-500 text-[11px]">(Tài khoản đã tạo)</span>
          </p>
        </div>
      </div>

      <!-- Card 2: Runs total -->
      <div class="bg-stone-900/90 border border-stone-800 rounded-2xl p-5 relative overflow-hidden group hover:border-stone-700 transition-all">
        <div class="flex items-center justify-between">
          <div class="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Icon name="mdi:code-tags" class="w-5 h-5" />
          </div>
          <span class="text-[10px] font-mono uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
            Total usage
          </span>
        </div>
        <div class="mt-4">
          <p class="text-3xl font-extrabold text-stone-100 tabular-nums">
            {{ formatNumber(overviewData.kpis.runs_total) }}
          </p>
          <p class="text-xs text-stone-400 mt-1 font-medium">
            Runs (total) <span class="text-stone-500 text-[11px]">(Lượt tương tác tính năng)</span>
          </p>
        </div>
      </div>

      <!-- Card 3: No-account devices -->
      <div class="bg-stone-900/90 border border-stone-800 rounded-2xl p-5 relative overflow-hidden group hover:border-stone-700 transition-all">
        <div class="flex items-center justify-between">
          <div class="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
            <Icon name="mdi:cellphone" class="w-5 h-5" />
          </div>
          <span class="text-[10px] font-mono uppercase tracking-wider text-stone-400 bg-stone-950/60 px-2 py-0.5 rounded-md border border-stone-800">
            Visitors
          </span>
        </div>
        <div class="mt-4">
          <p class="text-3xl font-extrabold text-stone-100 tabular-nums">
            {{ formatNumber(overviewData.kpis.no_account_devices) }}
          </p>
          <p class="text-xs text-stone-400 mt-1 font-medium">
            No-account devices <span class="text-stone-500 text-[11px]">(Khách chưa đăng nhập)</span>
          </p>
        </div>
      </div>

      <!-- Card 4: Suspected farm devices -->
      <div class="bg-stone-900/90 border border-stone-800 rounded-2xl p-5 relative overflow-hidden group hover:border-stone-700 transition-all">
        <div class="flex items-center justify-between">
          <div class="w-10 h-10 rounded-xl bg-stone-800 border border-stone-700 flex items-center justify-center text-stone-300">
            <Icon name="mdi:shield-alert" class="w-5 h-5" />
          </div>
          <span class="text-[10px] font-mono uppercase tracking-wider text-stone-400 bg-stone-950/60 px-2 py-0.5 rounded-md border border-stone-800">
            Flagged
          </span>
        </div>
        <div class="mt-4">
          <p class="text-3xl font-extrabold text-stone-100 tabular-nums">
            {{ formatNumber(overviewData.kpis.suspected_farm_devices) }}
          </p>
          <p class="text-xs text-stone-400 mt-1 font-medium">
            Suspected farm devices <span class="text-stone-500 text-[11px]">(Thiết bị bất thường)</span>
          </p>
        </div>
      </div>
    </div>

    <!-- 2. Funnel Conversion Section (2 Cards) -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <!-- Funnel 1: Devices -->
      <div class="bg-stone-900/90 border border-stone-800 rounded-2xl p-5 space-y-4">
        <div class="flex items-center justify-between border-b border-stone-800/80 pb-3">
          <div class="flex items-center gap-2">
            <h2 class="text-xs font-bold uppercase tracking-wider text-stone-200">
              FUNNEL — DEVICES (CLIENT_ID)
            </h2>
            <span class="text-[11px] text-stone-500">· Khách tham quan</span>
          </div>
          <span class="text-[11px] font-mono text-stone-500">all-time</span>
        </div>

        <div class="space-y-3.5 pt-1">
          <!-- Step 1 -->
          <div>
            <div class="flex items-center justify-between text-xs mb-1.5">
              <span class="text-stone-300 font-medium">Visited (non-bot devices)</span>
              <span class="text-stone-100 font-mono font-bold">{{ formatNumber(overviewData.funnel_devices.visited) }}</span>
            </div>
            <div class="w-full bg-stone-950 h-3 rounded-md overflow-hidden p-0.5 border border-stone-800/60">
              <div class="bg-gradient-to-r from-amber-500 to-amber-400 h-full rounded-sm w-full transition-all duration-500" />
            </div>
          </div>

          <!-- Step 2 -->
          <div>
            <div class="flex items-center justify-between text-xs mb-1.5">
              <span class="text-stone-300 font-medium">Tried a tool / feature (360, Quiz, Audio, Map)</span>
              <div class="flex items-center gap-2">
                <span class="text-stone-100 font-mono font-bold">{{ formatNumber(overviewData.funnel_devices.explored_features) }}</span>
                <span class="text-amber-400 font-mono text-[11px] font-semibold">{{ overviewData.funnel_devices.explored_pct }}%</span>
              </div>
            </div>
            <div class="w-full bg-stone-950 h-3 rounded-md overflow-hidden p-0.5 border border-stone-800/60">
              <div
                class="bg-gradient-to-r from-amber-500 to-amber-400 h-full rounded-sm transition-all duration-500"
                :style="{ width: Math.max(8, Math.min(100, Math.round((overviewData.funnel_devices.explored_features / overviewData.funnel_devices.visited) * 100))) + '%' }"
              />
            </div>
          </div>

          <!-- Step 3 -->
          <div>
            <div class="flex items-center justify-between text-xs mb-1.5">
              <span class="text-stone-300 font-medium">Run succeeded / completed action</span>
              <div class="flex items-center gap-2">
                <span class="text-stone-100 font-mono font-bold">{{ formatNumber(overviewData.funnel_devices.completed_actions) }}</span>
                <span class="text-amber-400 font-mono text-[11px] font-semibold">{{ overviewData.funnel_devices.completed_pct }}%</span>
              </div>
            </div>
            <div class="w-full bg-stone-950 h-3 rounded-md overflow-hidden p-0.5 border border-stone-800/60">
              <div
                class="bg-gradient-to-r from-amber-500 to-amber-400 h-full rounded-sm transition-all duration-500"
                :style="{ width: Math.max(5, Math.min(100, Math.round((overviewData.funnel_devices.completed_actions / overviewData.funnel_devices.visited) * 100))) + '%' }"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Funnel 2: Accounts -->
      <div class="bg-stone-900/90 border border-stone-800 rounded-2xl p-5 space-y-4">
        <div class="flex items-center justify-between border-b border-stone-800/80 pb-3">
          <div class="flex items-center gap-2">
            <h2 class="text-xs font-bold uppercase tracking-wider text-stone-200">
              FUNNEL — ACCOUNTS (UID)
            </h2>
            <span class="text-[11px] text-stone-500">· Tương tác chuyên sâu</span>
          </div>
          <span class="text-[11px] font-mono text-stone-500">all-time</span>
        </div>

        <div class="space-y-3.5 pt-1">
          <!-- Step 1 -->
          <div>
            <div class="flex items-center justify-between text-xs mb-1.5">
              <span class="text-stone-300 font-medium">Account created (Google Auth)</span>
              <span class="text-stone-100 font-mono font-bold">{{ formatNumber(overviewData.funnel_accounts.accounts_created) }}</span>
            </div>
            <div class="w-full bg-stone-950 h-3 rounded-md overflow-hidden p-0.5 border border-stone-800/60">
              <div class="bg-gradient-to-r from-emerald-500 to-emerald-400 h-full rounded-sm w-full transition-all duration-500" />
            </div>
          </div>

          <!-- Step 2 -->
          <div>
            <div class="flex items-center justify-between text-xs mb-1.5">
              <span class="text-stone-300 font-medium">Deep engaged (Đánh giá sao, Nộp tư liệu)</span>
              <div class="flex items-center gap-2">
                <span class="text-stone-100 font-mono font-bold">{{ formatNumber(overviewData.funnel_accounts.deep_engaged) }}</span>
                <span class="text-emerald-400 font-mono text-[11px] font-semibold">{{ overviewData.funnel_accounts.engaged_pct }}%</span>
              </div>
            </div>
            <div class="w-full bg-stone-950 h-3 rounded-md overflow-hidden p-0.5 border border-stone-800/60">
              <div
                class="bg-gradient-to-r from-emerald-500 to-emerald-400 h-full rounded-sm transition-all duration-500"
                :style="{ width: Math.max(5, Math.min(100, Math.round((overviewData.funnel_accounts.deep_engaged / overviewData.funnel_accounts.accounts_created) * 100))) + '%' }"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 3. Main 2-Column Analytics Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
      <!-- LEFT COLUMN -->
      <div class="space-y-6">
        <!-- 3.1 TRAFFIC SOURCES -->
        <div class="bg-stone-900/90 border border-stone-800 rounded-2xl p-5 space-y-4">
          <div class="flex items-center justify-between border-b border-stone-800/80 pb-3">
            <h2 class="text-xs font-bold uppercase tracking-wider text-stone-200">
              TRAFFIC SOURCES
            </h2>
            <span class="text-[11px] font-mono text-stone-500">last 30d · non-bot</span>
          </div>

          <!-- Direct inflation alert banner -->
          <div class="p-3 rounded-xl bg-stone-950 border border-stone-800 text-[11px] text-stone-400 leading-relaxed flex items-start gap-2">
            <Icon name="mdi:information-outline" class="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              <strong class="text-stone-200 font-semibold">Direct</strong> bao gồm chia sẻ link Zalo, Messenger, in-app browsers và quét mã QR thực địa. Đọc số liệu nguồn giới thiệu kèm ngữ cảnh thực tế.
            </span>
          </div>

          <!-- Sources list -->
          <div class="space-y-2.5 pt-1">
            <div
              v-for="item in overviewData.traffic_sources"
              :key="item.source"
              class="flex items-center gap-3 text-xs"
            >
              <div class="w-44 truncate text-stone-300 font-medium" :title="item.source">
                {{ item.source }}
              </div>
              <div class="flex-1 bg-stone-950 h-2 rounded-full overflow-hidden border border-stone-800/50">
                <div
                  class="bg-amber-400 h-full rounded-full transition-all duration-500"
                  :style="{ width: item.percentage + '%' }"
                />
              </div>
              <div class="w-12 text-right font-mono font-bold text-stone-100 text-[11px]">
                {{ item.count }}
              </div>
              <div class="w-10 text-right font-mono text-stone-500 text-[11px]">
                {{ item.percentage }}%
              </div>
            </div>
          </div>
        </div>

        <!-- 3.2 TOP ROUTES (with Sparklines!) -->
        <div class="bg-stone-900/90 border border-stone-800 rounded-2xl p-5 space-y-4">
          <div class="flex items-center justify-between border-b border-stone-800/80 pb-3">
            <h2 class="text-xs font-bold uppercase tracking-wider text-stone-200">
              TOP ROUTES
            </h2>
            <span class="text-[11px] font-mono text-stone-500">last 14d · views, non-bot</span>
          </div>

          <div class="divide-y divide-stone-800/60">
            <div
              v-for="routeItem in overviewData.top_routes"
              :key="routeItem.path"
              class="py-2.5 flex items-center justify-between gap-3 text-xs hover:bg-stone-800/30 px-2 rounded-lg transition-colors group"
            >
              <!-- Path URL -->
              <div class="flex-1 min-w-0 pr-2">
                <p class="font-mono text-stone-300 truncate text-[11px] group-hover:text-amber-400 transition-colors" :title="routeItem.path">
                  {{ routeItem.path }}
                </p>
              </div>

              <!-- Sparkline Graph -->
              <div class="w-24 h-6 shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 100 24" class="w-full h-full overflow-visible">
                  <path
                    :d="renderSparkline(routeItem.sparkline)"
                    fill="none"
                    stroke="#f59e0b"
                    stroke-width="1.75"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>

              <!-- Views Count & Percentage -->
              <div class="w-14 text-right shrink-0">
                <span class="font-mono font-bold text-stone-100 text-xs tabular-nums">
                  {{ routeItem.views }}
                </span>
              </div>
              <div class="w-10 text-right shrink-0">
                <span class="font-mono text-stone-500 text-[11px] tabular-nums">
                  {{ routeItem.percentage }}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- RIGHT COLUMN -->
      <div class="space-y-6">
        <!-- 3.3 DEVICES BY CATEGORY -->
        <div class="bg-stone-900/90 border border-stone-800 rounded-2xl p-5 space-y-4">
          <div class="flex items-center justify-between border-b border-stone-800/80 pb-3">
            <h2 class="text-xs font-bold uppercase tracking-wider text-stone-200">
              DEVICES BY CATEGORY
            </h2>
            <span class="text-[11px] font-mono text-stone-500">
              {{ formatNumber(overviewData.devices_by_category.total) }} total
            </span>
          </div>

          <!-- Segmented Progress Bar -->
          <div class="w-full bg-stone-950 h-3.5 rounded-lg overflow-hidden flex p-0.5 border border-stone-800/60">
            <div
              class="bg-amber-400 h-full first:rounded-l-md transition-all duration-500"
              :style="{ width: overviewData.devices_by_category.desktop.percentage + '%' }"
              :title="'Desktop: ' + overviewData.devices_by_category.desktop.count + ' (' + overviewData.devices_by_category.desktop.percentage + '%)'"
            />
            <div
              class="bg-emerald-400 h-full transition-all duration-500"
              :style="{ width: overviewData.devices_by_category.mobile.percentage + '%' }"
              :title="'Mobile: ' + overviewData.devices_by_category.mobile.count + ' (' + overviewData.devices_by_category.mobile.percentage + '%)'"
            />
            <div
              class="bg-stone-600 h-full last:rounded-r-md transition-all duration-500"
              :style="{ width: overviewData.devices_by_category.bot.percentage + '%' }"
              :title="'Bot / crawler: ' + overviewData.devices_by_category.bot.count + ' (' + overviewData.devices_by_category.bot.percentage + '%)'"
            />
          </div>

          <!-- Legend -->
          <div class="flex items-center justify-between text-xs text-stone-400 pt-1 flex-wrap gap-2">
            <div class="flex items-center gap-1.5">
              <span class="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0" />
              <span>Desktop — {{ overviewData.devices_by_category.desktop.count }} ({{ overviewData.devices_by_category.desktop.percentage }}%)</span>
            </div>
            <div class="flex items-center gap-1.5">
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0" />
              <span>Mobile — {{ overviewData.devices_by_category.mobile.count }} ({{ overviewData.devices_by_category.mobile.percentage }}%)</span>
            </div>
            <div class="flex items-center gap-1.5">
              <span class="w-2.5 h-2.5 rounded-full bg-stone-600 shrink-0" />
              <span>Bot / crawler — {{ overviewData.devices_by_category.bot.count }} ({{ overviewData.devices_by_category.bot.percentage }}%)</span>
            </div>
          </div>
        </div>

        <!-- 3.4 ACTIONS BY HOUR (VN TIME) -->
        <div class="bg-stone-900/90 border border-stone-800 rounded-2xl p-5 space-y-4">
          <div class="flex items-center justify-between border-b border-stone-800/80 pb-3">
            <h2 class="text-xs font-bold uppercase tracking-wider text-stone-200">
              ACTIONS BY HOUR (VN) — LAST 7D
            </h2>
            <span class="text-[11px] font-mono text-amber-400 font-semibold">
              peak: {{ overviewData.peak_hour_info.hour }} ({{ overviewData.peak_hour_info.count }}) · {{ formatNumber(overviewData.peak_hour_info.total_actions) }} total
            </span>
          </div>

          <!-- 24-Hour Vertical Bar Chart -->
          <div class="pt-4 pb-1">
            <div class="h-36 flex items-end justify-between gap-1 sm:gap-1.5 px-1">
              <div
                v-for="item in overviewData.actions_by_hour"
                :key="item.hour"
                class="flex-1 flex flex-col items-center justify-end h-full group relative cursor-pointer"
              >
                <!-- Tooltip hover -->
                <div class="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity bg-stone-950 text-amber-300 text-[10px] font-mono px-1.5 py-0.5 rounded border border-stone-800 pointer-events-none whitespace-nowrap shadow-xl z-20">
                  {{ item.hour }}h: {{ item.count }}
                </div>

                <!-- Bar Column -->
                <div
                  class="w-full rounded-t transition-all duration-300"
                  :class="item.isPeak
                    ? 'bg-gradient-to-t from-amber-500 to-amber-300 group-hover:to-white'
                    : 'bg-amber-500/20 group-hover:bg-amber-500/40'"
                  :style="{ height: Math.max(4, Math.round((item.count / maxHourlyCount) * 100)) + '%' }"
                />
              </div>
            </div>

            <!-- X-axis hours ticks -->
            <div class="flex justify-between text-[10px] font-mono text-stone-500 pt-2 border-t border-stone-800/60 mt-1 px-1">
              <span>00</span>
              <span>03</span>
              <span>06</span>
              <span>09</span>
              <span>12</span>
              <span>15</span>
              <span>18</span>
              <span>21</span>
              <span>23</span>
            </div>
          </div>
        </div>

        <!-- 3.5 RUNS BY TOOL / FEATURE -->
        <div class="bg-stone-900/90 border border-stone-800 rounded-2xl p-5 space-y-4">
          <div class="flex items-center justify-between border-b border-stone-800/80 pb-3">
            <h2 class="text-xs font-bold uppercase tracking-wider text-stone-200">
              RUNS BY TOOL / FEATURE
            </h2>
            <span class="text-[11px] font-mono text-stone-500">last 7d · usage, not page views</span>
          </div>

          <div class="space-y-3 pt-1">
            <div
              v-for="tool in overviewData.runs_by_tool"
              :key="tool.tool"
              class="space-y-1.5 text-xs"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2 text-stone-300 font-medium">
                  <Icon :name="tool.icon" class="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{{ tool.name }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="font-mono font-bold text-stone-100 tabular-nums">{{ tool.count }}</span>
                  <span class="font-mono text-stone-500 text-[11px]">{{ tool.percentage }}%</span>
                </div>
              </div>

              <!-- Bar -->
              <div class="w-full bg-stone-950 h-2.5 rounded-md overflow-hidden p-0.5 border border-stone-800/50">
                <div
                  class="bg-gradient-to-r from-amber-500 to-amber-400 h-full rounded-sm transition-all duration-500"
                  :style="{ width: tool.percentage + '%' }"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin',
})

useHead({
  title: 'Tổng Quan Hệ Thống — Admin Di Sản Bù Đăng',
  meta: [{ name: 'robots', content: 'noindex,nofollow' }],
})

interface OverviewData {
  range: string
  kpis: {
    registered_users: number
    runs_total: number
    no_account_devices: number
    suspected_farm_devices: number
  }
  funnel_devices: {
    visited: number
    explored_features: number
    explored_pct: number
    completed_actions: number
    completed_pct: number
  }
  funnel_accounts: {
    accounts_created: number
    deep_engaged: number
    engaged_pct: number
  }
  traffic_sources: Array<{
    source: string
    count: number
    percentage: number
    badge?: string
  }>
  top_routes: Array<{
    path: string
    views: number
    percentage: number
    sparkline: number[]
  }>
  devices_by_category: {
    total: number
    desktop: { count: number; percentage: number }
    mobile: { count: number; percentage: number }
    bot: { count: number; percentage: number }
  }
  actions_by_hour: Array<{
    hour: string
    count: number
    isPeak?: boolean
  }>
  peak_hour_info: {
    hour: string
    count: number
    total_actions: number
  }
  runs_by_tool: Array<{
    tool: string
    name: string
    count: number
    percentage: number
    icon: string
  }>
}

const { getIdToken } = useAuth()
const toast = useToast()

const loading = ref(false)
const selectedRange = ref('7')
const relativeTime = ref(false)

const overviewData = ref<OverviewData>({
  range: '7',
  kpis: {
    registered_users: 146,
    runs_total: 775,
    no_account_devices: 1021,
    suspected_farm_devices: 2,
  },
  funnel_devices: {
    visited: 1170,
    explored_features: 412,
    explored_pct: 35,
    completed_actions: 284,
    completed_pct: 69,
  },
  funnel_accounts: {
    accounts_created: 146,
    deep_engaged: 38,
    engaged_pct: 26,
  },
  traffic_sources: [
    { source: 'Quét mã QR Di tích (Thực địa)', count: 320, percentage: 41, badge: 'QR' },
    { source: 'Direct / Chia sẻ Zalo & Tin nhắn', count: 184, percentage: 24, badge: 'Direct' },
    { source: 'Google Search (disanbudang.com)', count: 115, percentage: 15, badge: 'Search' },
    { source: 'Facebook & Mạng xã hội', count: 82, percentage: 10, badge: 'Social' },
    { source: 'Cổng thông tin GD Huyện Bù Đăng', count: 48, percentage: 6, badge: 'Edu' },
    { source: 'Cốc Cốc & Trình duyệt khác', count: 26, percentage: 4, badge: 'Browser' },
  ],
  top_routes: [
    { path: '/heritage/khu-bao-ton-soc-bom-bo', views: 245, percentage: 28, sparkline: [12, 15, 18, 14, 22, 28, 20, 25, 30, 22, 19, 27, 34, 38] },
    { path: '/tour360', views: 182, percentage: 21, sparkline: [8, 10, 14, 12, 18, 15, 20, 16, 24, 19, 22, 25, 28, 30] },
    { path: '/study/quiz', views: 134, percentage: 15, sparkline: [5, 8, 12, 9, 14, 18, 12, 15, 20, 16, 18, 22, 24, 26] },
    { path: '/heritage/thac-dung-bu-dang', views: 98, percentage: 11, sparkline: [4, 6, 8, 10, 12, 9, 14, 11, 15, 13, 16, 18, 20, 22] },
    { path: '/map', views: 76, percentage: 9, sparkline: [6, 7, 5, 8, 11, 9, 12, 10, 13, 11, 14, 12, 15, 17] },
    { path: '/heritage/trang-co-bu-lach', views: 54, percentage: 6, sparkline: [3, 4, 6, 5, 8, 7, 9, 8, 10, 9, 11, 12, 13, 15] },
  ],
  devices_by_category: {
    total: 1850,
    desktop: { count: 720, percentage: 38.9 },
    mobile: { count: 1040, percentage: 56.2 },
    bot: { count: 90, percentage: 4.9 },
  },
  actions_by_hour: [
    { hour: '00', count: 6 }, { hour: '01', count: 3 }, { hour: '02', count: 2 },
    { hour: '03', count: 1 }, { hour: '04', count: 4 }, { hour: '05', count: 9 },
    { hour: '06', count: 18 }, { hour: '07', count: 35 }, { hour: '08', count: 48 },
    { hour: '09', count: 62 }, { hour: '10', count: 54 }, { hour: '11', count: 38 },
    { hour: '12', count: 28 }, { hour: '13', count: 42 }, { hour: '14', count: 58 },
    { hour: '15', count: 52 }, { hour: '16', count: 46 }, { hour: '17', count: 39 },
    { hour: '18', count: 44 }, { hour: '19', count: 68 }, { hour: '20', count: 75, isPeak: true },
    { hour: '21', count: 64 }, { hour: '22', count: 36 }, { hour: '23', count: 16 },
  ],
  peak_hour_info: {
    hour: '20:00 - 21:00',
    count: 75,
    total_actions: 846,
  },
  runs_by_tool: [
    { tool: 'quiz', name: 'Trắc Nghiệm Di Sản (Quiz)', count: 298, percentage: 42, icon: 'mdi:school-outline' },
    { tool: 'tour360', name: 'Thực Tế Ảo 360° VR Tour', count: 215, percentage: 30, icon: 'mdi:rotate-3d-variant' },
    { tool: 'audio', name: 'Thuyết Minh Audio Guide', count: 112, percentage: 16, icon: 'mdi:headphones' },
    { tool: 'map', name: 'Bản Đồ Di Sản Tương Tác', count: 68, percentage: 9, icon: 'mdi:map-legend' },
    { tool: 'contribute', name: 'Đóng Góp Tư Liệu Di Sản', count: 24, percentage: 3, icon: 'mdi:hand-heart-outline' },
  ],
})

const maxHourlyCount = computed(() => {
  const counts = overviewData.value.actions_by_hour.map(i => i.count)
  return Math.max(...counts, 1)
})

function formatNumber(n: number | undefined | null) {
  if (n === undefined || n === null) return '0'
  return n.toLocaleString('vi-VN')
}

// Sparkline SVG Path generator
function renderSparkline(points: number[] | undefined) {
  if (!points || points.length <= 1) return ''
  const min = Math.min(...points)
  const max = Math.max(...points)
  const range = max - min || 1
  const width = 100
  const height = 20

  const coords: Array<{ x: number; y: number }> = points.map((val, idx) => {
    const x = (idx / (points.length - 1)) * width
    const y = height - ((val - min) / range) * 16 - 2
    return { x, y }
  })

  // Build SVG path
  return coords.reduce((acc, pt, idx) => {
    return idx === 0 ? `M ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}` : `${acc} L ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`
  }, '')
}

async function fetchOverview() {
  loading.value = true
  const token = await getIdToken()
  if (!token) {
    loading.value = false
    return
  }

  try {
    const res = await $fetch<OverviewData>(`/api/admin/overview?range=${selectedRange.value}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (res && res.kpis) {
      overviewData.value = res
    }
  } catch (err: any) {
    console.error('[AdminOverview] Fetch error:', err)
    toast.error('Không thể tải dữ liệu phân tích', err?.data?.statusMessage || 'Lỗi kết nối')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchOverview()
})
</script>
