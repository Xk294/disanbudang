<template>
  <div class="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-stone-800">
      <div>
        <div class="flex items-center gap-2.5">
          <h1 class="text-xl sm:text-2xl font-bold text-stone-100">Duyệt Đóng Góp Cộng Đồng</h1>
          <span
            v-if="(counts.pending ?? 0) > 0"
            class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500 text-stone-950 animate-pulse"
          >
            {{ counts.pending }} bài mới
          </span>
        </div>
        <p class="text-stone-400 text-xs mt-1">
          Xem xét, kiểm duyệt và quản lý các nội dung, tư liệu, hình ảnh do cộng đồng đóng góp.
        </p>
      </div>

      <div class="flex items-center gap-2 flex-wrap">
        <button
          class="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-stone-900 border border-stone-800 hover:border-stone-700 hover:bg-stone-800 text-stone-300 text-xs font-medium transition-colors cursor-pointer"
          :disabled="loading"
          @click="fetchContributions"
        >
          <Icon :name="loading ? 'mdi:loading' : 'mdi:refresh'" :class="{ 'animate-spin': loading }" class="w-4 h-4 text-amber-500" />
          Làm mới
        </button>

        <button
          class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold transition-colors cursor-pointer"
          :disabled="loading || contributions.length === 0"
          @click="exportCsv"
        >
          <Icon name="mdi:download" class="w-4 h-4" />
          Xuất CSV
        </button>
      </div>
    </div>

    <!-- Controls: Tabs + Search + Type Filter + Page Size -->
    <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
      <!-- Status tabs -->
      <div class="flex flex-wrap gap-1 bg-stone-900/90 border border-stone-800 rounded-2xl p-1 w-full lg:w-fit">
        <button
          v-for="tab in tabs"
          :key="tab.value"
          class="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer"
          :class="activeStatus === tab.value
            ? 'bg-stone-800 text-amber-400 font-semibold shadow-sm'
            : 'text-stone-400 hover:text-stone-200'"
          @click="setStatus(tab.value)"
        >
          {{ tab.label }}
          <span
            class="text-[10px] px-1.5 py-0.2 rounded-full"
            :class="tab.value === 'pending' && (counts.pending ?? 0) > 0
              ? 'bg-amber-500 text-stone-950 font-bold'
              : 'bg-stone-800 text-stone-400'"
          >
            {{ counts[tab.value] ?? 0 }}
          </span>
        </button>
      </div>

      <!-- Search & Category Filters -->
      <div class="flex flex-wrap items-center gap-2">
        <!-- Search -->
        <div class="relative min-w-[220px] flex-1 sm:flex-initial">
          <Icon name="mdi:magnify" class="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Tìm tiêu đề, tác giả, IP..."
            class="w-full pl-9 pr-8 py-1.5 bg-stone-900 border border-stone-800 rounded-xl text-stone-200 text-xs placeholder-stone-500 focus:outline-none focus:border-amber-500/50"
            @keyup.enter="handleSearch"
          />
          <button
            v-if="searchQuery"
            class="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300"
            @click="searchQuery = ''; handleSearch()"
          >
            <Icon name="mdi:close-circle" class="w-3.5 h-3.5" />
          </button>
        </div>

        <!-- Type filter -->
        <select
          v-model="selectedType"
          class="px-3 py-1.5 bg-stone-900 border border-stone-800 rounded-xl text-stone-300 text-xs focus:outline-none focus:border-amber-500/50 cursor-pointer"
          @change="handleFilterChange"
        >
          <option value="all">Tất cả thể loại</option>
          <option value="story">📖 Câu chuyện</option>
          <option value="photo">📷 Hình ảnh</option>
          <option value="document">📜 Tư liệu</option>
          <option value="memory">💭 Ký ức</option>
          <option value="artwork">🎨 Tác phẩm</option>
          <option value="research">🔬 Nghiên cứu</option>
        </select>

        <!-- Page size selector -->
        <select
          v-model="pageSize"
          class="px-2.5 py-1.5 bg-stone-900 border border-stone-800 rounded-xl text-stone-400 text-xs focus:outline-none focus:border-amber-500/50 cursor-pointer"
          @change="handlePageSizeChange"
        >
          <option :value="20">20 / trang</option>
          <option :value="50">50 / trang</option>
          <option :value="100">100 / trang</option>
        </select>
      </div>
    </div>

    <!-- Bulk Select Toolbar if items exist -->
    <div v-if="contributions.length > 0" class="flex items-center justify-between text-xs text-stone-400 px-1">
      <label class="inline-flex items-center gap-2 cursor-pointer select-none">
        <input
          type="checkbox"
          class="rounded border-stone-700 bg-stone-900 text-amber-500 focus:ring-0 focus:ring-offset-0 w-4 h-4 accent-amber-500"
          :checked="isAllSelected"
          @change="toggleSelectAll"
        />
        <span>Chọn tất cả ({{ contributions.length }} bài trên trang này)</span>
      </label>

      <span v-if="filteredTotal > 0">
        Hiển thị {{ contributions.length }} / Tổng {{ filteredTotal }} bài
      </span>
    </div>

    <!-- Floating Bulk Actions Bar when items selected -->
    <Teleport to="body">
      <Transition name="slide-up">
        <div
          v-if="selectedIds.size > 0"
          class="fixed bottom-6 inset-x-4 sm:inset-x-auto sm:right-1/2 sm:translate-x-1/2 z-40 p-3 bg-stone-900/95 border border-amber-500/40 rounded-2xl shadow-2xl backdrop-blur-md flex items-center gap-3 max-w-xl w-full justify-between"
        >
          <div class="flex items-center gap-2 text-xs font-semibold text-stone-200 pl-2">
            <span class="w-6 h-6 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center font-bold text-xs">
              {{ selectedIds.size }}
            </span>
            <span>Đã chọn</span>
          </div>

          <div class="flex items-center gap-1.5 flex-wrap">
            <button
              class="px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold inline-flex items-center gap-1 cursor-pointer transition-colors"
              :disabled="bulkActing"
              @click="executeBulkAction('approved')"
            >
              <Icon name="mdi:check" class="w-3.5 h-3.5" />
              Duyệt
            </button>
            <button
              class="px-3 py-1.5 rounded-xl bg-rose-700 hover:bg-rose-600 text-white text-xs font-semibold inline-flex items-center gap-1 cursor-pointer transition-colors"
              :disabled="bulkActing"
              @click="executeBulkAction('rejected')"
            >
              <Icon name="mdi:close" class="w-3.5 h-3.5" />
              Từ chối
            </button>
            <button
              class="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium inline-flex items-center gap-1 cursor-pointer transition-colors"
              :disabled="bulkActing"
              @click="executeBulkAction('delete')"
            >
              <Icon name="mdi:trash-can-outline" class="w-3.5 h-3.5 text-red-400" />
              Xóa
            </button>
            <button
              class="px-2.5 py-1.5 text-stone-400 hover:text-stone-200 text-xs cursor-pointer"
              @click="selectedIds.clear()"
            >
              Bỏ chọn
            </button>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Loading -->
    <div v-if="loading && !contributions.length" class="flex flex-col items-center justify-center py-24">
      <Icon name="mdi:loading" class="w-8 h-8 text-amber-500 animate-spin mb-3" />
      <p class="text-stone-500 text-xs">Đang tải danh sách đóng góp...</p>
    </div>

    <!-- Empty state -->
    <div v-else-if="!contributions.length" class="text-center py-24 bg-stone-900/40 border border-stone-800/80 rounded-3xl">
      <Icon name="mdi:inbox-outline" class="w-12 h-12 text-stone-700 mx-auto mb-3" />
      <p class="text-stone-400 text-sm font-medium">Không tìm thấy dữ liệu đóng góp nào.</p>
      <p class="text-stone-500 text-xs mt-1">
        {{ searchQuery || selectedType !== 'all' ? 'Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm.' : 'Chưa có bài đóng góp nào trong mục này.' }}
      </p>
    </div>

    <!-- Contribution list -->
    <div v-else class="space-y-4">
      <div
        v-for="c in contributions"
        :key="c.id"
        class="bg-stone-900/90 border rounded-2xl p-4 sm:p-5 hover:border-stone-700 transition-all shadow-sm"
        :class="selectedIds.has(c.id) ? 'border-amber-500/50 bg-amber-950/10' : 'border-stone-800/90'"
      >
        <div class="flex items-start justify-between gap-4 flex-wrap">
          <!-- Main Content with Checkbox -->
          <div class="flex items-start gap-3 min-w-0 flex-1">
            <input
              type="checkbox"
              class="rounded border-stone-700 bg-stone-900 text-amber-500 focus:ring-0 focus:ring-offset-0 w-4 h-4 mt-1 accent-amber-500 cursor-pointer shrink-0"
              :checked="selectedIds.has(c.id)"
              @change="toggleSelect(c.id)"
            />

            <div class="min-w-0 flex-1">
              <!-- Badges header -->
              <div class="flex items-center gap-2 mb-2 flex-wrap">
                <!-- Type -->
                <span class="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <Icon :name="getTypeIcon(c.type)" class="w-3 h-3" />
                  {{ getTypeName(c.type) }}
                </span>

                <!-- Status -->
                <span
                  class="text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider"
                  :class="statusClass(c.status)"
                >
                  {{ statusLabel(c.status) }}
                </span>

                <!-- Heritage Link if any -->
                <span
                  v-if="getHeritageName(c.heritage_id)"
                  class="inline-flex items-center gap-1 text-[11px] text-stone-400 bg-stone-800 px-2 py-0.5 rounded-md"
                >
                  <Icon name="mdi:bank" class="w-3 h-3 text-stone-500" />
                  {{ getHeritageName(c.heritage_id) }}
                </span>

                <!-- Date -->
                <span class="text-[11px] text-stone-500 ml-auto flex items-center gap-1">
                  <Icon name="mdi:clock-outline" class="w-3 h-3" />
                  {{ formatDate(c.created_at) }}
                </span>
              </div>

              <!-- Title -->
              <h3 class="font-bold text-stone-100 text-base leading-snug mb-1.5">{{ c.title }}</h3>

              <!-- Author & Role & IP -->
              <div class="flex items-center gap-2 text-stone-400 text-xs mb-3 flex-wrap">
                <span class="font-semibold text-stone-300 flex items-center gap-1">
                  <Icon name="mdi:account-circle" class="w-3.5 h-3.5 text-stone-500" />
                  {{ c.author_name }}
                </span>
                <span v-if="c.author_role" class="text-stone-500">
                  · {{ getRoleName(c.author_role) }}
                </span>
                <span v-if="c.ip" class="text-stone-600 font-mono text-[11px]">
                  (IP: {{ c.ip }})
                </span>
              </div>

              <!-- Content preview / full -->
              <div class="text-stone-300 text-xs leading-relaxed whitespace-pre-line bg-stone-950/40 p-3.5 rounded-xl border border-stone-800/60 mb-3">
                <p :class="{ 'line-clamp-3': !isExpanded(c.id) }">
                  {{ c.content }}
                </p>
                <div class="flex items-center gap-3 mt-2">
                  <button
                    v-if="c.content.length > 200"
                    class="text-amber-400 hover:text-amber-300 text-[11px] font-semibold inline-flex items-center gap-1 cursor-pointer"
                    @click="toggleExpand(c.id)"
                  >
                    {{ isExpanded(c.id) ? 'Thu gọn' : 'Xem thêm' }}
                    <Icon :name="isExpanded(c.id) ? 'mdi:chevron-up' : 'mdi:chevron-down'" class="w-3.5 h-3.5" />
                  </button>

                  <button
                    class="text-stone-400 hover:text-stone-200 text-[11px] font-semibold inline-flex items-center gap-1 cursor-pointer ml-auto"
                    @click="openRichPreview(c)"
                  >
                    <Icon name="mdi:text-box-search-outline" class="w-3.5 h-3.5 text-amber-400" />
                    Xem bản đọc chi tiết
                  </button>
                </div>
              </div>

              <!-- Attached Files / Images -->
              <div v-if="parseFiles(c.files_data).length" class="mb-3">
                <p class="text-[11px] font-semibold text-stone-400 mb-2 flex items-center gap-1">
                  <Icon name="mdi:paperclip" class="w-3.5 h-3.5 text-amber-500" />
                  Tệp / Hình ảnh đính kèm ({{ parseFiles(c.files_data).length }}):
                </p>
                <div class="flex flex-wrap gap-2">
                  <div
                    v-for="(fileUrl, idx) in parseFiles(c.files_data)"
                    :key="idx"
                    class="relative group cursor-pointer"
                    @click="openLightbox(fileUrl)"
                  >
                    <img
                      :src="fileUrl"
                      alt="Đính kèm"
                      class="w-16 h-16 object-cover rounded-lg border border-stone-700 group-hover:border-amber-500 transition-colors"
                    />
                    <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-lg transition-opacity">
                      <Icon name="mdi:magnify-plus" class="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              <!-- Review note & info if any -->
              <div v-if="c.review_note || c.reviewed_by" class="mt-2 text-xs flex items-center gap-2 text-amber-400/90 bg-amber-950/20 border border-amber-900/30 px-3 py-2 rounded-lg">
                <Icon name="mdi:comment-quote" class="w-4 h-4 shrink-0 text-amber-500" />
                <div>
                  <span v-if="c.review_note">Ghi chú duyệt: <em>"{{ c.review_note }}"</em></span>
                  <span v-if="c.reviewed_by" class="text-stone-500 text-[10px] ml-2">
                    (Duyệt bởi: {{ c.reviewed_by }} lúc {{ formatDate(c.reviewed_at) }})
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Action buttons -->
          <div class="flex sm:flex-col gap-2 shrink-0 self-start sm:self-center">
            <!-- Approve -->
            <button
              v-if="c.status !== 'approved'"
              class="px-3.5 py-1.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700/60 text-emerald-300 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              :disabled="actionId === c.id"
              @click="openReview(c, 'approved')"
            >
              <Icon name="mdi:check" class="w-3.5 h-3.5 text-emerald-400" />
              Duyệt
            </button>

            <!-- Reject -->
            <button
              v-if="c.status !== 'rejected'"
              class="px-3.5 py-1.5 rounded-xl bg-rose-950/80 hover:bg-rose-900 border border-rose-700/60 text-rose-300 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              :disabled="actionId === c.id"
              @click="openReview(c, 'rejected')"
            >
              <Icon name="mdi:close" class="w-3.5 h-3.5 text-rose-400" />
              Từ chối
            </button>

            <!-- Reset to pending -->
            <button
              v-if="c.status !== 'pending'"
              class="px-3.5 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-300 text-xs font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              :disabled="actionId === c.id"
              @click="quickSetStatus(c, 'pending')"
            >
              <Icon name="mdi:restore" class="w-3.5 h-3.5 text-stone-400" />
              Trả về chờ
            </button>

            <!-- Delete -->
            <button
              class="px-3.5 py-1.5 rounded-xl bg-stone-900 hover:bg-red-950/60 border border-stone-800 hover:border-red-900/50 text-stone-400 hover:text-red-400 text-xs font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              :disabled="actionId === c.id"
              @click="openDeleteModal(c)"
            >
              <Icon name="mdi:trash-can-outline" class="w-3.5 h-3.5" />
              Xóa
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination Controls -->
    <div v-if="totalPages > 1" class="p-4 rounded-2xl bg-stone-900/90 border border-stone-800 flex items-center justify-between gap-4 flex-wrap">
      <span class="text-xs text-stone-400">
        Trang {{ currentPage }} / {{ totalPages }} (Tổng {{ filteredTotal }} bài đóng góp)
      </span>

      <div class="flex items-center gap-2">
        <button
          class="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
          :disabled="currentPage <= 1 || loading"
          @click="changePage(currentPage - 1)"
        >
          Trang trước
        </button>
        <span class="px-3 py-1 rounded-xl bg-stone-950 text-amber-400 font-bold text-xs border border-stone-800">
          {{ currentPage }}
        </span>
        <button
          class="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
          :disabled="currentPage >= totalPages || loading"
          @click="changePage(currentPage + 1)"
        >
          Trang sau
        </button>
      </div>
    </div>

    <!-- Rich Full Reader Preview Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="previewTarget"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          @click.self="previewTarget = null"
        >
          <div class="bg-stone-900 border border-stone-700 rounded-3xl p-6 sm:p-8 w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl">
            <!-- Modal Header -->
            <div class="flex items-start justify-between gap-4 pb-4 border-b border-stone-800">
              <div class="min-w-0 flex-1">
                <div class="flex items-center gap-2 mb-2 flex-wrap">
                  <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    {{ getTypeName(previewTarget.type) }}
                  </span>
                  <span class="text-xs font-bold px-2.5 py-0.5 rounded-full uppercase" :class="statusClass(previewTarget.status)">
                    {{ statusLabel(previewTarget.status) }}
                  </span>
                  <span class="text-xs text-stone-500 font-mono">
                    {{ formatDate(previewTarget.created_at) }}
                  </span>
                </div>
                <h2 class="text-lg sm:text-xl font-bold text-stone-100 leading-snug">{{ previewTarget.title }}</h2>
                <p class="text-xs text-stone-400 mt-1">
                  Tác giả: <strong class="text-stone-200">{{ previewTarget.author_name }}</strong>
                  <span v-if="previewTarget.author_role">({{ getRoleName(previewTarget.author_role) }})</span>
                  <span v-if="previewTarget.ip" class="text-stone-600 font-mono ml-2">IP: {{ previewTarget.ip }}</span>
                </p>
              </div>
              <button class="text-stone-400 hover:text-stone-200 p-1" @click="previewTarget = null">
                <Icon name="mdi:close" class="w-6 h-6" />
              </button>
            </div>

            <!-- Modal Body (Scrollable) -->
            <div class="flex-1 overflow-y-auto py-5 space-y-4 pr-1">
              <div class="bg-stone-950/60 p-4 rounded-2xl border border-stone-800 text-stone-200 text-sm leading-relaxed whitespace-pre-wrap">
                {{ previewTarget.content }}
              </div>

              <!-- Attached Images Preview inside Modal -->
              <div v-if="parseFiles(previewTarget.files_data).length" class="space-y-2">
                <p class="text-xs font-bold uppercase tracking-wider text-stone-400">Hình ảnh & tệp tư liệu:</p>
                <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div
                    v-for="(fileUrl, idx) in parseFiles(previewTarget.files_data)"
                    :key="idx"
                    class="relative group rounded-xl overflow-hidden border border-stone-700 cursor-pointer"
                    @click="openLightbox(fileUrl)"
                  >
                    <img :src="fileUrl" alt="Tệp đính kèm" class="w-full h-36 object-cover" />
                    <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <Icon name="mdi:magnify-plus" class="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Modal Footer with Quick Decision -->
            <div class="pt-4 border-t border-stone-800 flex items-center justify-between flex-wrap gap-3">
              <span class="text-xs text-stone-500">Mã bài viết: {{ previewTarget.id }}</span>
              <div class="flex items-center gap-2">
                <button
                  class="px-4 py-2 rounded-xl text-xs text-stone-400 hover:text-stone-200"
                  @click="previewTarget = null"
                >
                  Đóng
                </button>
                <button
                  v-if="previewTarget.status !== 'approved'"
                  class="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs inline-flex items-center gap-1.5"
                  @click="reviewFromPreview('approved')"
                >
                  <Icon name="mdi:check" class="w-4 h-4" />
                  Duyệt bài này
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Review Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="reviewTarget"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          @click.self="reviewTarget = null"
        >
          <div class="bg-stone-900 border border-stone-700 rounded-3xl p-6 w-full max-w-lg shadow-2xl">
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-bold text-stone-100 text-base flex items-center gap-2">
                <span v-if="reviewAction === 'approved'" class="text-emerald-400">✅ Duyệt Đóng Góp</span>
                <span v-else class="text-rose-400">❌ Từ Chối Đóng Góp</span>
              </h3>
              <button class="text-stone-500 hover:text-stone-300" @click="reviewTarget = null">
                <Icon name="mdi:close" class="w-5 h-5" />
              </button>
            </div>

            <div class="p-3 bg-stone-950/60 border border-stone-800 rounded-xl mb-4">
              <p class="text-xs text-stone-400 font-medium">Tiêu đề: <strong class="text-stone-200">{{ reviewTarget.title }}</strong></p>
              <p class="text-[11px] text-stone-500 mt-0.5">Tác giả: {{ reviewTarget.author_name }} ({{ getTypeName(reviewTarget.type) }})</p>
            </div>

            <!-- Quick Presets -->
            <label class="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">
              Gợi ý ghi chú nhanh:
            </label>
            <div class="flex flex-wrap gap-1.5 mb-3">
              <button
                v-for="preset in (reviewAction === 'approved' ? approvedPresets : rejectedPresets)"
                :key="preset"
                type="button"
                class="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-[11px] transition-colors cursor-pointer"
                @click="reviewNote = preset"
              >
                {{ preset }}
              </button>
            </div>

            <label class="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">
              Ghi chú duyệt (Tùy chọn):
            </label>
            <textarea
              v-model="reviewNote"
              rows="3"
              placeholder="Nhập ghi chú cho bản ghi này..."
              class="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-700 rounded-xl text-stone-200 text-xs placeholder-stone-600 focus:outline-none focus:border-amber-500 resize-none"
            />

            <div class="flex gap-3 mt-5 justify-end">
              <button
                class="px-4 py-2 rounded-xl text-xs font-medium text-stone-400 hover:text-stone-200 transition-colors cursor-pointer"
                @click="reviewTarget = null"
              >
                Hủy
              </button>
              <button
                class="px-5 py-2 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-1.5"
                :class="reviewAction === 'approved'
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  : 'bg-rose-700 hover:bg-rose-600 text-white'"
                :disabled="actionId !== null"
                @click="submitReview"
              >
                <Icon v-if="actionId" name="mdi:loading" class="w-4 h-4 animate-spin" />
                Xác nhận {{ reviewAction === 'approved' ? 'Duyệt bài' : 'Từ chối' }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Delete Confirmation Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="deleteTarget"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          @click.self="deleteTarget = null"
        >
          <div class="bg-stone-900 border border-red-900/50 rounded-3xl p-6 w-full max-w-md shadow-2xl">
            <div class="flex items-center gap-3 mb-3 text-rose-400">
              <Icon name="mdi:alert-octagon" class="w-6 h-6" />
              <h3 class="font-bold text-stone-100 text-base">Xóa Đóng Góp Vĩnh Viễn?</h3>
            </div>
            <p class="text-stone-300 text-xs leading-relaxed mb-4">
              Hành động này sẽ xóa hoàn toàn bài đóng góp <strong class="text-amber-300">"{{ deleteTarget.title }}"</strong> khỏi cơ sở dữ liệu và không thể hoàn tác.
            </p>
            <div class="flex gap-3 justify-end">
              <button
                class="px-4 py-2 rounded-xl text-xs text-stone-400 hover:text-stone-200 cursor-pointer"
                @click="deleteTarget = null"
              >
                Hủy bỏ
              </button>
              <button
                class="px-5 py-2 rounded-xl text-xs font-bold bg-rose-700 hover:bg-rose-600 text-white transition-all cursor-pointer flex items-center gap-1.5"
                :disabled="actionId !== null"
                @click="confirmDelete"
              >
                <Icon v-if="actionId" name="mdi:loading" class="w-4 h-4 animate-spin" />
                Xóa vĩnh viễn
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Lightbox Modal for Images -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="lightboxUrl"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          @click="lightboxUrl = null"
        >
          <div class="relative max-w-4xl max-h-[90vh]">
            <img :src="lightboxUrl" alt="Chi tiết hình ảnh" class="max-w-full max-h-[85vh] rounded-2xl object-contain border border-stone-800 shadow-2xl" />
            <button
              class="absolute -top-10 right-0 text-white/80 hover:text-white p-1 cursor-pointer"
              @click="lightboxUrl = null"
            >
              <Icon name="mdi:close-circle" class="w-7 h-7" />
            </button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { HERITAGES } from '~/data/heritages'

definePageMeta({
  layout: 'admin',
  middleware: 'admin',
})

useHead({
  title: 'Quản lý Đóng góp — Admin Di Sản Bù Đăng',
  meta: [{ name: 'robots', content: 'noindex,nofollow' }],
})

interface Contribution {
  id: string
  type: string
  author_name: string
  author_role: string
  title: string
  content: string
  heritage_id?: string
  files_data?: string
  status: 'pending' | 'approved' | 'rejected'
  review_note?: string
  reviewed_at?: string
  reviewed_by?: string
  created_at: string
  ip?: string
}

const { getIdToken } = useAuth()
const toast = useToast()
const pendingCount = useState<number>('admin.pending_count', () => 0)

const contributions = ref<Contribution[]>([])
const counts = ref<Record<string, number>>({ pending: 0, approved: 0, rejected: 0, all: 0 })
const activeStatus = ref<'pending' | 'approved' | 'rejected' | 'all'>('pending')
const searchQuery = ref('')
const selectedType = ref('all')
const loading = ref(false)
const actionId = ref<string | null>(null)
const bulkActing = ref(false)

// Pagination state
const currentPage = ref(1)
const pageSize = ref(20)
const filteredTotal = ref(0)
const totalPages = computed(() => Math.ceil(filteredTotal.value / pageSize.value) || 1)

// Bulk selection
const selectedIds = ref<Set<string>>(new Set())

// Expanded cards
const expandedCards = ref<Set<string>>(new Set())

// Review Modal
const reviewTarget = ref<Contribution | null>(null)
const reviewAction = ref<'approved' | 'rejected'>('approved')
const reviewNote = ref('')

// Delete Modal
const deleteTarget = ref<Contribution | null>(null)

// Rich Preview Modal
const previewTarget = ref<Contribution | null>(null)

// Lightbox
const lightboxUrl = ref<string | null>(null)

const tabs: Array<{ label: string; value: 'pending' | 'approved' | 'rejected' | 'all' }> = [
  { label: 'Chờ duyệt', value: 'pending' },
  { label: 'Đã duyệt', value: 'approved' },
  { label: 'Đã từ chối', value: 'rejected' },
  { label: 'Tất cả', value: 'all' },
]

const approvedPresets = [
  'Nội dung đầy đủ, tư liệu chính xác',
  'Hình ảnh và bài viết chất lượng',
  'Đã đối soát thông tin lịch sử',
]

const rejectedPresets = [
  'Nội dung chưa phù hợp quy chuẩn',
  'Hình ảnh không rõ nét / thiếu nguồn gốc',
  'Thông tin trùng lặp',
]

onMounted(() => {
  fetchContributions()
})

const isAllSelected = computed(() => {
  if (contributions.value.length === 0) return false
  return contributions.value.every(c => selectedIds.value.has(c.id))
})

function toggleSelectAll() {
  if (isAllSelected.value) {
    selectedIds.value.clear()
  } else {
    contributions.value.forEach(c => selectedIds.value.add(c.id))
  }
}

function toggleSelect(id: string) {
  if (selectedIds.value.has(id)) {
    selectedIds.value.delete(id)
  } else {
    selectedIds.value.add(id)
  }
}

async function fetchContributions() {
  loading.value = true
  const token = await getIdToken()
  if (!token) return

  const offset = (currentPage.value - 1) * pageSize.value
  try {
    const data = await $fetch<{
      contributions: Contribution[]
      counts: Record<string, number>
      total: number
      filteredTotal: number
    }>('/api/admin/contributions', {
      headers: { Authorization: `Bearer ${token}` },
      query: {
        status: activeStatus.value,
        type: selectedType.value !== 'all' ? selectedType.value : undefined,
        search: searchQuery.value.trim() || undefined,
        limit: pageSize.value,
        offset,
      },
    })
    contributions.value = data.contributions
    filteredTotal.value = data.filteredTotal ?? data.contributions.length
    counts.value = {
      ...data.counts,
      all: data.total ?? ((data.counts?.pending ?? 0) + (data.counts?.approved ?? 0) + (data.counts?.rejected ?? 0)),
    }
    pendingCount.value = data.counts?.pending ?? 0
  } catch (e) {
    console.error('[contributions] fetch error:', e)
    toast.error('Không thể tải danh sách đóng góp')
  } finally {
    loading.value = false
  }
}

function setStatus(s: typeof activeStatus.value) {
  activeStatus.value = s
  currentPage.value = 1
  selectedIds.value.clear()
  fetchContributions()
}

function handleSearch() {
  currentPage.value = 1
  selectedIds.value.clear()
  fetchContributions()
}

function handleFilterChange() {
  currentPage.value = 1
  selectedIds.value.clear()
  fetchContributions()
}

function handlePageSizeChange() {
  currentPage.value = 1
  fetchContributions()
}

function changePage(p: number) {
  if (p < 1 || p > totalPages.value) return
  currentPage.value = p
  fetchContributions()
}

function toggleExpand(id: string) {
  if (expandedCards.value.has(id)) {
    expandedCards.value.delete(id)
  } else {
    expandedCards.value.add(id)
  }
}

function isExpanded(id: string) {
  return expandedCards.value.has(id)
}

function openRichPreview(c: Contribution) {
  previewTarget.value = c
}

function openReview(c: Contribution, action: 'approved' | 'rejected') {
  reviewTarget.value = c
  reviewAction.value = action
  reviewNote.value = c.review_note || ''
}

function reviewFromPreview(action: 'approved' | 'rejected') {
  if (!previewTarget.value) return
  const target = previewTarget.value
  previewTarget.value = null
  openReview(target, action)
}

async function quickSetStatus(c: Contribution, status: 'pending' | 'approved' | 'rejected') {
  const token = await getIdToken()
  if (!token) return

  actionId.value = c.id
  try {
    await $fetch(`/api/admin/contributions/${c.id}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` },
      body: { status },
    })
    toast.success(`Đã chuyển bài "${c.title}" về trạng thái chờ`)
    await fetchContributions()
  } catch (e) {
    console.error('[contributions] quick set error:', e)
    toast.error('Không thể cập nhật trạng thái')
  } finally {
    actionId.value = null
  }
}

async function submitReview() {
  if (!reviewTarget.value) return
  const token = await getIdToken()
  if (!token) return

  actionId.value = reviewTarget.value.id
  try {
    await $fetch(`/api/admin/contributions/${reviewTarget.value.id}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` },
      body: { status: reviewAction.value, review_note: reviewNote.value || undefined },
    })
    toast.success(
      reviewAction.value === 'approved' ? 'Đã duyệt đóng góp thành công' : 'Đã từ chối bài đóng góp',
    )
    reviewTarget.value = null
    await fetchContributions()
  } catch (e) {
    console.error('[contributions] review error:', e)
    toast.error('Thao tác duyệt thất bại')
  } finally {
    actionId.value = null
  }
}

function openDeleteModal(c: Contribution) {
  deleteTarget.value = c
}

async function confirmDelete() {
  if (!deleteTarget.value) return
  const token = await getIdToken()
  if (!token) return

  actionId.value = deleteTarget.value.id
  try {
    await $fetch<{ ok: boolean }>(`/api/admin/contributions/${deleteTarget.value.id}`, {
      method: 'DELETE' as any,
      headers: { Authorization: `Bearer ${token}` },
    })
    toast.success('Đã xóa bài đóng góp vĩnh viễn')
    deleteTarget.value = null
    await fetchContributions()
  } catch (e) {
    console.error('[contributions] delete error:', e)
    toast.error('Xóa bài đóng góp thất bại')
  } finally {
    actionId.value = null
  }
}

async function executeBulkAction(action: 'approved' | 'rejected' | 'delete') {
  if (selectedIds.value.size === 0) return
  const token = await getIdToken()
  if (!token) return

  const ids = Array.from(selectedIds.value)
  bulkActing.value = true

  try {
    const res = await $fetch<{ ok: boolean; affected: number }>('/api/admin/contributions/batch', {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` },
      body: { ids, action },
    })
    if (res?.ok) {
      toast.success(
        action === 'approved'
          ? `Đã duyệt hàng loạt ${res.affected} bài đóng góp`
          : action === 'rejected'
            ? `Đã từ chối hàng loạt ${res.affected} bài đóng góp`
            : `Đã xóa hàng loạt ${res.affected} bài đóng góp`,
      )
      selectedIds.value.clear()
      await fetchContributions()
    }
  } catch (e) {
    console.error('[bulkAction] error:', e)
    toast.error('Thao tác hàng loạt thất bại')
  } finally {
    bulkActing.value = false
  }
}

function exportCsv() {
  if (contributions.value.length === 0) return

  const headers = ['ID', 'The Loai', 'Tac Gia', 'Vai Tro', 'Tieu De', 'Noi Dung', 'Trang Thai', 'Ngay Tao', 'IP']
  const rows = contributions.value.map(c => [
    `"${c.id}"`,
    `"${getTypeName(c.type)}"`,
    `"${(c.author_name || '').replace(/"/g, '""')}"`,
    `"${(c.author_role || '').replace(/"/g, '""')}"`,
    `"${(c.title || '').replace(/"/g, '""')}"`,
    `"${(c.content || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`,
    `"${statusLabel(c.status)}"`,
    `"${c.created_at}"`,
    `"${c.ip || ''}"`,
  ])

  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `dong-gop-disanbudang-${activeStatus.value}-${new Date().toISOString().slice(0, 10)}.csv`
  a.click()
  URL.revokeObjectURL(url)
  toast.success('Đã xuất file CSV thành công')
}

function openLightbox(url: string) {
  lightboxUrl.value = url
}

function parseFiles(filesData?: string): string[] {
  if (!filesData) return []
  try {
    const parsed = JSON.parse(filesData)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function getHeritageName(id?: string): string | null {
  if (!id) return null
  const h = HERITAGES.find(item => item.id === id)
  return h ? h.title : id
}

function getTypeName(type: string): string {
  const map: Record<string, string> = {
    story: 'Câu chuyện',
    photo: 'Hình ảnh',
    document: 'Tư liệu',
    memory: 'Ký ức',
    artwork: 'Tác phẩm',
    research: 'Nghiên cứu',
  }
  return map[type] || type
}

function getTypeIcon(type: string): string {
  const map: Record<string, string> = {
    story: 'mdi:book-open-page-variant',
    photo: 'mdi:camera',
    document: 'mdi:file-document-outline',
    memory: 'mdi:head-snowflake-outline',
    artwork: 'mdi:palette',
    research: 'mdi:microscope',
  }
  return map[type] || 'mdi:folder'
}

function getRoleName(role: string): string {
  const map: Record<string, string> = {
    resident: 'Người dân địa phương',
    student: 'Học sinh / Sinh viên',
    teacher: 'Giáo viên / Giảng viên',
    visitor: 'Du khách / Khách tham quan',
    other: 'Cộng đồng',
  }
  return map[role] || role
}

function statusClass(status: string) {
  if (status === 'approved') return 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/60'
  if (status === 'rejected') return 'bg-rose-950/80 text-rose-400 border border-rose-800/60'
  return 'bg-amber-950/80 text-amber-400 border border-amber-800/60'
}

function statusLabel(status: string) {
  if (status === 'approved') return 'Đã duyệt'
  if (status === 'rejected') return 'Từ chối'
  return 'Chờ duyệt'
}

function formatDate(iso?: string) {
  if (!iso) return '—'
  return new Date(iso).toLocaleString('vi-VN', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}
</script>

<style scoped>
.modal-enter-active, .modal-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; transform: scale(0.96); }
.line-clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
.slide-up-enter-active, .slide-up-leave-active { transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1); }
.slide-up-enter-from, .slide-up-leave-to { opacity: 0; transform: translateY(20px); }
</style>
