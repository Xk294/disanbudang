<template>
  <div>
    <!-- 1. Hero: Entry Experience — ngay lập tức nắm bắt bản sắc & 1 CTA chính -->
    <HeroSection />

    <!-- 2. Story Intro: Đặt bối cảnh cảm xúc, trả lời "DiSanBudang là gì?" -->
    <StorytellingIntro />

    <!-- 3. Di sản nổi bật: Showcase 2–3 di sản biên tập viên chọn (editorial) -->
    <FeaturedHeritage />

    <!-- 4. Khám phá qua công nghệ: Bản đồ, 360° Tour, Audio Guide, Học tập -->
    <ExperiencesSection />

    <!-- 5. Dòng chảy lịch sử: Timeline văn hóa — bối cảnh sâu hơn -->
    <CulturalTimelineSection />

    <!-- 6. Audio Guide: Nghe thuyết minh ngay tại trang chủ — trải nghiệm thực -->
    <AudioGuideSection />

    <!-- 7. Ký ức cộng đồng: Tiếng nói nhân dân — cảm xúc, gần gũi -->
    <CommunityStoriesSection />

    <!-- 8. Quiz: Học và kiểm tra kiến thức di sản -->
    <QuizSection />

    <!-- 9. Tin tức: Sự kiện và bài viết mới nhất -->
    <NewsSection />

    <!-- 10. Cơ hội đầu tư: Tiềm năng kinh tế & phát triển bền vững vùng cao nguyên Đồng Nai -->
    <HomeInvestmentSection />

    <!-- 11. FAQ: SEO + giải đáp thắc mắc -->
    <FAQSection />

    <!-- 12. Closing CTA: Mời tham gia đóng góp & khám phá tiếp -->
    <ClosingCTASection />
  </div>
</template>

<script setup lang="ts">
useMuseumSeo({
  description: 'Bảo tàng số di sản văn hóa, lịch sử và thiên nhiên Thành Phố Đồng Nai. Bản đồ tương tác, audio guide và góc học tập.',
  image: '/images/og-default.jpg',
})

definePageMeta({ layout: 'default' })
</script>
