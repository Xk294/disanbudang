<template>
  <section class="section bg-charcoal-950 border-t border-charcoal-800/60 relative overflow-hidden" aria-label="Ký ức cộng đồng">

    <!-- Ambient decor -->
    <div class="absolute top-0 right-0 w-[400px] h-[400px] bg-gold-500/4 rounded-full blur-[100px] pointer-events-none" />
    <div class="absolute bottom-0 left-0 w-[300px] h-[300px] bg-forest-500/4 rounded-full blur-[80px] pointer-events-none" />

    <div class="container-heritage relative z-10">

      <!-- ── HEADER ── -->
      <div class="flex items-end justify-between mb-12 lg:mb-16 reveal">
        <div>
          <div class="flex items-center gap-3 mb-3">
            <span class="w-8 h-px bg-gold-400" />
            <span class="text-gold-400 text-[10px] uppercase tracking-[0.3em] font-bold">Di Sản Trong Tôi</span>
          </div>
          <h2 class="font-heading font-bold text-ivory text-3xl lg:text-5xl leading-snug">
            Ký Ức Cộng Đồng
          </h2>
          <p class="text-charcoal-400 text-sm mt-2 max-w-md">
            Câu chuyện, tranh vẽ và ký ức của học sinh, người dân — kho lưu trữ sống động.
          </p>
        </div>
        <NuxtLink
          to="/explore"
          class="hidden lg:flex items-center gap-2 text-charcoal-400 text-sm hover:text-gold-400 transition-colors group flex-shrink-0"
        >
          Xem tất cả
          <Icon name="mdi:arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </NuxtLink>
      </div>

      <!-- ── MAGAZINE LAYOUT ── -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">

        <!-- MAIN STORY -->
        <div v-if="posts[0]" class="lg:col-span-7 reveal">
          <NuxtLink :to="'/explore/post/' + posts[0].id" class="group block h-full">
            <article class="relative overflow-hidden rounded-2xl lg:rounded-3xl h-[360px] lg:h-[460px] border border-charcoal-800/60 hover:border-gold-500/25 transition-all duration-500 hover:shadow-2xl hover:shadow-gold-500/10">
              <NuxtImg
                :src="posts[0].coverImage"
                :alt="posts[0].title"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                loading="lazy"
                format="webp"
                sizes="xs:100vw lg:60vw"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/40 to-transparent" />
              <div class="absolute inset-0 bg-gradient-to-r from-charcoal-950/50 via-transparent to-transparent" />

              <!-- Tag -->
              <div class="absolute top-5 left-5">
                <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gold-500/15 border border-gold-500/25 text-gold-400 text-[10px] font-bold uppercase tracking-widest">
                  <Icon :name="typeIcons[posts[0].type]" class="w-3 h-3" />
                  {{ typeLabels[posts[0].type] }}
                </span>
              </div>

              <div class="absolute bottom-0 left-0 right-0 p-7 lg:p-9">
                <p class="font-accent italic text-gold-400/80 text-sm mb-2">
                  {{ posts[0].author.name }} · {{ posts[0].author.role }}
                </p>
                <h3 class="font-heading font-bold text-ivory text-2xl lg:text-3xl leading-snug mb-3 text-shadow-hero line-clamp-2">
                  {{ posts[0].title }}
                </h3>
                <p class="text-ivory/55 text-sm leading-relaxed line-clamp-2 mb-5">{{ posts[0].excerpt }}</p>

                <div class="flex items-center gap-4">
                  <div class="flex items-center gap-1.5 text-gold-400/70 text-sm">
                    <Icon name="mdi:heart" class="w-4 h-4" />
                    <span>{{ posts[0].likes }}</span>
                  </div>
                  <div class="flex gap-1.5">
                    <span
                      v-for="tag in posts[0].tags.slice(0, 2)"
                      :key="tag"
                      class="text-[10px] text-ivory/40 bg-ivory/8 px-2.5 py-1 rounded-full border border-ivory/10"
                    >#{{ tag }}</span>
                  </div>
                </div>
              </div>
            </article>
          </NuxtLink>
        </div>

        <!-- SIDE STORIES -->
        <div class="lg:col-span-5 flex flex-col gap-3 lg:gap-4">
          <NuxtLink
            v-for="post in posts.slice(1, 4)"
            :key="post.id"
            :to="'/explore/post/' + post.id"
            class="group flex gap-4 p-4 lg:p-5 rounded-2xl border border-charcoal-800/60 hover:border-gold-500/20 hover:bg-charcoal-900/70 transition-all duration-300 reveal"
          >
            <!-- Bigger thumbnail -->
            <div class="w-24 h-20 rounded-xl overflow-hidden flex-shrink-0 ring-1 ring-charcoal-700/60 group-hover:ring-gold-500/20 transition-all duration-300">
              <NuxtImg
                :src="post.coverImage"
                :alt="post.title"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                width="96"
                height="80"
                loading="lazy"
                format="webp"
              />
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-1.5">
                <span class="inline-flex items-center gap-1 text-[9px] text-charcoal-500 uppercase tracking-wider">
                  <Icon :name="typeIcons[post.type]" class="w-3 h-3" />
                  {{ typeLabels[post.type] }}
                </span>
              </div>
              <h4 class="font-heading font-semibold text-charcoal-200 text-sm leading-snug line-clamp-2 group-hover:text-ivory transition-colors mb-1.5">
                {{ post.title }}
              </h4>
              <div class="flex items-center gap-2">
                <p class="text-charcoal-500 text-xs">{{ post.author.name }}</p>
                <span class="text-charcoal-400 text-xs">·</span>
                <span class="flex items-center gap-1 text-charcoal-400 text-[10px]">
                  <Icon name="mdi:heart-outline" class="w-3 h-3 group-hover:text-gold-400/60 transition-colors" />
                  {{ post.likes }}
                </span>
              </div>
            </div>
            <Icon name="mdi:arrow-right" class="w-4 h-4 text-charcoal-400 group-hover:text-gold-400 group-hover:translate-x-0.5 transition-all flex-shrink-0 self-center" />
          </NuxtLink>

          <!-- CTA to contribute -->
          <NuxtLink
            to="/contribute"
            class="group flex items-center gap-4 p-5 rounded-2xl border border-dashed border-charcoal-700/50 hover:border-gold-500/40 hover:bg-gold-500/5 transition-all duration-400 mt-auto"
          >
            <div class="w-11 h-11 rounded-xl bg-gold-500/10 border border-gold-500/25 flex items-center justify-center flex-shrink-0 group-hover:bg-gold-500/20 group-hover:border-gold-500/40 transition-all duration-300">
              <Icon name="mdi:plus" class="w-5 h-5 text-gold-400 group-hover:rotate-90 transition-transform duration-300" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-ivory text-sm font-semibold group-hover:text-gold-300 transition-colors leading-snug">Chia sẻ ký ức của bạn</p>
              <p class="text-charcoal-500 text-xs mt-0.5">Câu chuyện của bạn là một phần di sản cộng đồng</p>
            </div>
            <Icon name="mdi:arrow-right" class="w-4 h-4 text-charcoal-400 group-hover:text-gold-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
          </NuxtLink>
        </div>

      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { COMMUNITY_POSTS } from '~/data/posts'
import type { PostType } from '~/types'

const { observeAll } = useScrollReveal()
onMounted(() => nextTick(() => observeAll()))

const posts = COMMUNITY_POSTS.slice(0, 4)

const typeLabels: Record<PostType, string> = {
  story: 'Câu Chuyện',
  artwork: 'Tranh Vẽ',
  photo: 'Ảnh',
  memory: 'Ký Ức',
  research: 'Nghiên Cứu',
}

const typeIcons: Record<PostType, string> = {
  story: 'mdi:book-open-variant',
  artwork: 'mdi:palette',
  photo: 'mdi:camera',
  memory: 'mdi:heart',
  research: 'mdi:magnify',
}
</script>
