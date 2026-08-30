<template>
  <div
    class="royal-scroll-wrapper relative w-full"
    :class="{ 'is-revealed': isCompleted }"
  >
    <!-- SVG Defs for High-End Imperial Gold & Bronze Shaders -->
    <svg class="sr-only" aria-hidden="true">
      <defs>
        <!-- Rich Imperial Roller Baton Metallic Shader -->
        <linearGradient id="royalRollerBaton" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#120A04" />
          <stop offset="12%" stop-color="#38220D" />
          <stop offset="28%" stop-color="#7A521E" />
          <stop offset="48%" stop-color="#D4AF37" />
          <stop offset="55%" stop-color="#FFF8E7" />
          <stop offset="68%" stop-color="#C79F42" />
          <stop offset="85%" stop-color="#5E3E15" />
          <stop offset="100%" stop-color="#1A0F05" />
        </linearGradient>

        <!-- Gold Inlay Rings & Finial Shader -->
        <linearGradient id="royalFinialGold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#FFFDF5" />
          <stop offset="20%" stop-color="#F3DC9B" />
          <stop offset="45%" stop-color="#D4AF37" />
          <stop offset="70%" stop-color="#8C6527" />
          <stop offset="90%" stop-color="#4E3410" />
          <stop offset="100%" stop-color="#241504" />
        </linearGradient>

        <!-- Finial Lotus Jewel Radial Gradient -->
        <radialGradient id="royalFinialJewel" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#FFF4D0" />
          <stop offset="40%" stop-color="#E5B94C" />
          <stop offset="75%" stop-color="#9E6E1D" />
          <stop offset="100%" stop-color="#3D2506" />
        </radialGradient>

        <!-- Imperial Silk Decree Top & Bottom Brocade Wave Gradient -->
        <linearGradient id="royalSilkWaveGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#5E3B0A" />
          <stop offset="10%" stop-color="#9C6B20" />
          <stop offset="25%" stop-color="#DCAE45" />
          <stop offset="50%" stop-color="#FFF0C2" />
          <stop offset="75%" stop-color="#DCAE45" />
          <stop offset="90%" stop-color="#9C6B20" />
          <stop offset="100%" stop-color="#5E3B0A" />
        </linearGradient>

        <!-- Specular Silk Surface Highlight -->
        <linearGradient id="royalSilkShading" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.32" />
          <stop offset="15%" stop-color="#D4AF37" stop-opacity="0.14" />
          <stop offset="50%" stop-color="#000000" stop-opacity="0" />
          <stop offset="85%" stop-color="#D4AF37" stop-opacity="0.14" />
          <stop offset="100%" stop-color="#000000" stop-opacity="0.5" />
        </linearGradient>

        <!-- Filigree Metallic Hairline Gradient -->
        <linearGradient id="royalFiligreeLine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#9E7836" stop-opacity="0.25" />
          <stop offset="20%" stop-color="#D4AF37" stop-opacity="0.9" />
          <stop offset="50%" stop-color="#FFFDF5" stop-opacity="1" />
          <stop offset="80%" stop-color="#D4AF37" stop-opacity="0.9" />
          <stop offset="100%" stop-color="#9E7836" stop-opacity="0.25" />
        </linearGradient>

        <!-- Dong Son Bronze Drum Halo & Shimmer Gradients -->
        <radialGradient id="trongDongHalo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#E5B94C" stop-opacity="0.18" />
          <stop offset="40%" stop-color="#D4AF37" stop-opacity="0.08" />
          <stop offset="75%" stop-color="#8C6527" stop-opacity="0.02" />
          <stop offset="100%" stop-color="#000000" stop-opacity="0" />
        </radialGradient>

        <linearGradient id="trongDongGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#FFFDF5" />
          <stop offset="25%" stop-color="#F5E4AF" />
          <stop offset="55%" stop-color="#D4AF37" />
          <stop offset="85%" stop-color="#A67C2E" />
          <stop offset="100%" stop-color="#5E3E15" />
        </linearGradient>

        <!-- Dong Son Authentic 14-Ray Star & Peacock Feather Triangle Module -->
        <g id="dongSonRayModule">
          <polygon points="0,-68 5,-20 -5,-20" fill="url(#trongDongGrad)" />
          <line x1="0" y1="-68" x2="0" y2="-20" stroke="#FFFDF5" stroke-width="0.6" stroke-opacity="0.75" />
          <!-- Interstice Peacock Feather Triangle -->
          <g transform="rotate(12.85714)">
            <path d="M -4,-22 L 0,-52 L 4,-22 Z" fill="none" stroke="url(#trongDongGrad)" stroke-width="0.75" />
            <path d="M -2,-22 L 0,-40 L 2,-22 Z" fill="url(#trongDongGrad)" fill-opacity="0.65" />
            <circle cx="0" cy="-56" r="1.3" fill="url(#trongDongGrad)" />
          </g>
        </g>

        <!-- Dong Son Tangent Circles Pair (Vòng tròn tiếp tuyến) -->
        <g id="dongSonTangent">
          <circle cx="0" cy="-96" r="3.2" stroke="url(#trongDongGrad)" stroke-width="0.75" fill="none" />
          <circle cx="0" cy="-96" r="1.2" fill="url(#trongDongGrad)" />
          <path d="M 3.2,-96 C 6.5,-92 9.5,-92 13,-96" stroke="url(#trongDongGrad)" stroke-width="0.6" fill="none" />
        </g>

        <!-- Authentic Sacred Flying Lac Bird (Chim Lạc sải cánh bay ngược chiều kim đồng hồ) -->
        <g id="dongSonLacBird">
          <!-- Head, Long Beak & Body -->
          <path
            d="M -32,-158 C -42,-158 -54,-156 -64,-153 C -52,-150 -44,-150 -36,-152 C -30,-153 -22,-154 -12,-154 C 2,-154 16,-150 32,-144 C 20,-148 8,-150 -4,-150 C -14,-150 -24,-152 -32,-158 Z"
            fill="url(#trongDongGrad)"
          />
          <!-- Long Slender Beak Fork -->
          <path
            d="M -46,-155 C -56,-154 -66,-151 -72,-147 C -64,-148 -54,-150 -44,-151"
            stroke="url(#trongDongGrad)"
            stroke-width="0.8"
            fill="none"
          />
          <!-- Sweeping Crown Crest (Mào chim Lạc vút cao) -->
          <path
            d="M -34,-159 C -30,-168 -22,-175 -12,-178 C -16,-172 -22,-167 -28,-160"
            fill="url(#trongDongGrad)"
          />
          <!-- Arched Upper Wing with Striated Feathers -->
          <path
            d="M -16,-156 C -6,-169 6,-180 24,-188 C 14,-180 4,-169 -4,-157 Z"
            fill="url(#trongDongGrad)"
          />
          <path
            d="M -10,-155 C -1,-166 10,-174 25,-180"
            stroke="url(#trongDongGrad)"
            stroke-width="0.75"
            fill="none"
          />
          <path
            d="M -4,-154 C 4,-162 14,-169 26,-173"
            stroke="url(#trongDongGrad)"
            stroke-width="0.6"
            fill="none"
          />
          <!-- Multi-pronged Trailing Tail Feathers (Đuôi chim Lạc xòe rộng) -->
          <path
            d="M 12,-148 C 26,-144 42,-138 58,-128 C 44,-134 30,-139 16,-143 Z"
            fill="url(#trongDongGrad)"
          />
          <path
            d="M 16,-147 C 32,-142 48,-134 62,-122 C 48,-129 34,-135 20,-140"
            stroke="url(#trongDongGrad)"
            stroke-width="0.8"
            fill="none"
          />
          <!-- Eye Dot -->
          <circle cx="-34" cy="-156" r="1.2" fill="#FFFDF5" />
        </g>

        <!-- Authentic Dong Son Walking Deer (Đàn Hươu Đông Sơn) -->
        <g id="dongSonDeer">
          <!-- Torso & Back -->
          <path
            d="M -22,-208 C -14,-212 0,-213 14,-211 C 22,-208 26,-204 22,-202 C 12,-204 0,-205 -14,-204 C -20,-204 -24,-206 -22,-208 Z"
            fill="url(#trongDongGrad)"
          />
          <!-- Slender Neck & Head -->
          <path
            d="M -18,-207 C -22,-214 -28,-221 -34,-228 C -30,-226 -24,-221 -18,-214 Z"
            fill="url(#trongDongGrad)"
          />
          <!-- Multi-branched Antlers (Gạc hươu nhiều nhánh) -->
          <path
            d="M -34,-228 C -30,-235 -22,-241 -12,-244 M -28,-232 C -22,-237 -15,-239 -7,-240 M -32,-230 C -36,-235 -42,-238 -48,-239"
            stroke="url(#trongDongGrad)"
            stroke-width="0.8"
            stroke-linecap="round"
            fill="none"
          />
          <!-- Slender Legs -->
          <path
            d="M -18,-205 L -23,-192 M -13,-205 L -16,-192 M 12,-204 L 9,-192 M 18,-203 L 21,-192"
            stroke="url(#trongDongGrad)"
            stroke-width="0.8"
            stroke-linecap="round"
          />
          <!-- Upright Tail -->
          <path
            d="M 21,-204 C 26,-209 30,-214 34,-219"
            stroke="url(#trongDongGrad)"
            stroke-width="0.9"
            stroke-linecap="round"
            fill="none"
          />
          <!-- Eye -->
          <circle cx="-32" cy="-227" r="1" fill="#FFFDF5" />
        </g>

        <!-- Imperial Silk Tassel Ribbon Gradient -->
        <linearGradient id="royalTasselRed" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#5C0D0D" />
          <stop offset="30%" stop-color="#B22222" />
          <stop offset="50%" stop-color="#E63946" />
          <stop offset="80%" stop-color="#991B1B" />
          <stop offset="100%" stop-color="#450A0A" />
        </linearGradient>
      </defs>
    </svg>

    <!-- ═══ REVEALED CONTENT CONTAINER (Unfurls symmetrically from center to edges) ═══ -->
    <div
      class="royal-scroll-content relative w-full h-full"
      :style="contentMaskStyle"
    >
      <!-- ═══ ROYAL IMPERIAL SILK DECREE ARCHITECTURAL BACKDROP ═══ -->
      <div class="absolute inset-0 pointer-events-none z-0 overflow-visible">
        <svg
          class="w-full h-full filter drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)] drop-shadow-[0_0_50px_rgba(212,175,55,0.35)]"
          preserveAspectRatio="none"
          viewBox="0 0 1000 660"
          fill="none"
        >
          <!-- Outer Silk Scroll Body with Royal Imperial Curved Arch -->
          <path
            d="M 0,20 Q 250,4 500,16 Q 750,4 1000,20 L 1000,640 Q 750,656 500,644 Q 250,656 0,640 Z"
            fill="url(#royalSilkWaveGrad)"
            stroke="url(#royalFiligreeLine)"
            stroke-width="2.2"
          />

          <!-- 3D Luminous Silk Shading -->
          <path
            d="M 0,20 Q 250,4 500,16 Q 750,4 1000,20 L 1000,640 Q 750,656 500,644 Q 250,656 0,640 Z"
            fill="url(#royalSilkShading)"
          />

          <!-- Inner Deep Obsidian & Imperial Lacquer Canvas -->
          <path
            d="M 16,36 Q 250,20 500,32 Q 750,20 984,36 L 984,624 Q 750,640 500,628 Q 250,640 16,624 Z"
            fill="#0D0F16"
            fill-opacity="0.97"
            stroke="url(#royalFiligreeLine)"
            stroke-width="1.5"
          />

          <!-- Inner Fine Gold Double Hairline Border -->
          <path
            d="M 24,44 Q 250,30 500,40 Q 750,30 976,44 L 976,616 Q 750,630 500,620 Q 250,630 24,616 Z"
            stroke="url(#royalFiligreeLine)"
            stroke-width="0.8"
            stroke-opacity="0.5"
          />

          <!-- ═══ AUTHENTIC TRỐNG ĐỒNG ĐÔNG SƠN (Dong Son Bronze Drum Museum Watermark) ═══ -->
          <g class="trong-dong-watermark select-none pointer-events-none" transform="translate(500, 330)">
            <!-- Central Golden Aura Halo -->
            <circle cx="0" cy="0" r="285" fill="url(#trongDongHalo)" />

            <!-- Concentric Friezes, Borders & Structural Rings -->
            <g stroke="url(#trongDongGrad)" fill="none" opacity="0.22">
              <!-- Outer Border Rings -->
              <circle cx="0" cy="0" r="282" stroke-width="1.5" />
              <circle cx="0" cy="0" r="274" stroke-width="1.8" stroke-dasharray="2 4.5" stroke-linecap="round" />
              <circle cx="0" cy="0" r="264" stroke-width="1.2" stroke-dasharray="4 3" />
              <circle cx="0" cy="0" r="256" stroke-width="0.8" />
              
              <!-- Outer Wave & S-Spiral Boundaries -->
              <circle cx="0" cy="0" r="236" stroke-width="1.4" />
              <circle cx="0" cy="0" r="230" stroke-width="0.8" />

              <!-- Deer Frieze Boundaries -->
              <circle cx="0" cy="0" r="192" stroke-width="0.8" />
              <circle cx="0" cy="0" r="186" stroke-width="1.4" />

              <!-- Lac Bird Frieze Boundaries -->
              <circle cx="0" cy="0" r="136" stroke-width="1.4" />
              <circle cx="0" cy="0" r="130" stroke-width="0.8" stroke-dasharray="3 3" />
              <circle cx="0" cy="0" r="124" stroke-width="0.8" />

              <!-- Tangent Ring Boundaries -->
              <circle cx="0" cy="0" r="106" stroke-width="1" />
              <circle cx="0" cy="0" r="86" stroke-width="1" />

              <!-- Inner Sawtooth & Star Boundaries -->
              <circle cx="0" cy="0" r="76" stroke-width="1.2" stroke-dasharray="3 3" />
              <circle cx="0" cy="0" r="70" stroke-width="1.4" />
              <circle cx="0" cy="0" r="20" stroke-width="1.2" />
              <circle cx="0" cy="0" r="14" stroke-width="0.8" fill="#FFF0C2" fill-opacity="0.35" />
              <circle cx="0" cy="0" r="6" fill="#FFFDF5" stroke="none" />
            </g>

            <!-- 18 Concentric Tangent Circles Frieze (Vòng tròn tiếp tuyến) -->
            <g opacity="0.22">
              <use href="#dongSonTangent" />
              <use href="#dongSonTangent" transform="rotate(20)" />
              <use href="#dongSonTangent" transform="rotate(40)" />
              <use href="#dongSonTangent" transform="rotate(60)" />
              <use href="#dongSonTangent" transform="rotate(80)" />
              <use href="#dongSonTangent" transform="rotate(100)" />
              <use href="#dongSonTangent" transform="rotate(120)" />
              <use href="#dongSonTangent" transform="rotate(140)" />
              <use href="#dongSonTangent" transform="rotate(160)" />
              <use href="#dongSonTangent" transform="rotate(180)" />
              <use href="#dongSonTangent" transform="rotate(200)" />
              <use href="#dongSonTangent" transform="rotate(220)" />
              <use href="#dongSonTangent" transform="rotate(240)" />
              <use href="#dongSonTangent" transform="rotate(260)" />
              <use href="#dongSonTangent" transform="rotate(280)" />
              <use href="#dongSonTangent" transform="rotate(300)" />
              <use href="#dongSonTangent" transform="rotate(320)" />
              <use href="#dongSonTangent" transform="rotate(340)" />
            </g>

            <!-- 10 Sacred Flying Lac Birds Frieze (Chim Lạc bay ngược chiều kim đồng hồ) -->
            <g opacity="0.25">
              <use href="#dongSonLacBird" />
              <use href="#dongSonLacBird" transform="rotate(36)" />
              <use href="#dongSonLacBird" transform="rotate(72)" />
              <use href="#dongSonLacBird" transform="rotate(108)" />
              <use href="#dongSonLacBird" transform="rotate(144)" />
              <use href="#dongSonLacBird" transform="rotate(180)" />
              <use href="#dongSonLacBird" transform="rotate(216)" />
              <use href="#dongSonLacBird" transform="rotate(252)" />
              <use href="#dongSonLacBird" transform="rotate(288)" />
              <use href="#dongSonLacBird" transform="rotate(324)" />
            </g>

            <!-- 8 Dong Son Walking Deer Frieze (Đàn Hươu Đông Sơn) -->
            <g opacity="0.22">
              <use href="#dongSonDeer" transform="rotate(22.5)" />
              <use href="#dongSonDeer" transform="rotate(67.5)" />
              <use href="#dongSonDeer" transform="rotate(112.5)" />
              <use href="#dongSonDeer" transform="rotate(157.5)" />
              <use href="#dongSonDeer" transform="rotate(202.5)" />
              <use href="#dongSonDeer" transform="rotate(247.5)" />
              <use href="#dongSonDeer" transform="rotate(292.5)" />
              <use href="#dongSonDeer" transform="rotate(337.5)" />
            </g>

            <!-- Central 14-Pointed Sun Star & Peacock Feather Inlays (Mặt Trời 14 Cánh) -->
            <g opacity="0.28">
              <use href="#dongSonRayModule" />
              <use href="#dongSonRayModule" transform="rotate(25.714)" />
              <use href="#dongSonRayModule" transform="rotate(51.429)" />
              <use href="#dongSonRayModule" transform="rotate(77.143)" />
              <use href="#dongSonRayModule" transform="rotate(102.857)" />
              <use href="#dongSonRayModule" transform="rotate(128.571)" />
              <use href="#dongSonRayModule" transform="rotate(154.286)" />
              <use href="#dongSonRayModule" transform="rotate(180)" />
              <use href="#dongSonRayModule" transform="rotate(205.714)" />
              <use href="#dongSonRayModule" transform="rotate(231.429)" />
              <use href="#dongSonRayModule" transform="rotate(257.143)" />
              <use href="#dongSonRayModule" transform="rotate(282.857)" />
              <use href="#dongSonRayModule" transform="rotate(308.571)" />
              <use href="#dongSonRayModule" transform="rotate(334.286)" />
            </g>
          </g>

          <!-- Top & Bottom Golden Silk Edge Ribbons with Ornate Borders -->
          <path
            d="M 0,20 Q 250,4 500,16 Q 750,4 1000,20"
            stroke="url(#royalFiligreeLine)"
            stroke-width="3.5"
            stroke-linecap="round"
          />
          <path
            d="M 0,640 Q 750,656 500,644 Q 250,656 0,640"
            stroke="url(#royalFiligreeLine)"
            stroke-width="3.5"
            stroke-linecap="round"
          />
        </svg>
      </div>

      <!-- Main Slotted Content inside the Sắc Phong -->
      <div class="relative z-10 w-full h-full">
        <slot />
      </div>
    </div>

    <!-- ═══ TOP & BOTTOM METALLIC FILIGREE BORDER ACCENTS ═══ -->
    <div
      class="parchment-frame absolute inset-y-0 pointer-events-none z-20 overflow-hidden"
      :style="parchmentFrameStyle"
      aria-hidden="true"
    >
      <!-- Top Scalloped Hairline Trim -->
      <div class="absolute top-0 inset-x-0 h-6 flex items-center justify-center pointer-events-none">
        <div class="absolute top-1 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#E5B94C]/90 to-transparent" />
      </div>

      <!-- Bottom Scalloped Hairline Trim -->
      <div class="absolute bottom-0 inset-x-0 h-6 flex items-center justify-center pointer-events-none">
        <div class="absolute bottom-1 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#E5B94C]/90 to-transparent" />
      </div>

      <!-- 4 Ornate Royal Lotus Corner Filigrees -->
      <svg class="corner-filigree corner-tl" viewBox="0 0 48 48" fill="none">
        <path d="M4 44V18C4 10.268 10.268 4 18 4H44" stroke="url(#royalFiligreeLine)" stroke-width="2" stroke-linecap="round" />
        <path d="M8 40V20C8 13.373 13.373 8 20 8H40" stroke="url(#royalFiligreeLine)" stroke-width="1.2" stroke-opacity="0.85" stroke-linecap="round" />
        <path d="M4 26C8 26 14 24 14 18C14 12 18 14 26 4" stroke="url(#royalFiligreeLine)" stroke-width="1.2" stroke-linecap="round" />
        <circle cx="10" cy="10" r="2.8" fill="#FFF0C2" />
        <circle cx="26" cy="10" r="1.8" fill="#D4AF37" />
        <circle cx="10" cy="26" r="1.8" fill="#D4AF37" />
      </svg>
      <svg class="corner-filigree corner-tr" viewBox="0 0 48 48" fill="none">
        <path d="M4 44V18C4 10.268 10.268 4 18 4H44" stroke="url(#royalFiligreeLine)" stroke-width="2" stroke-linecap="round" />
        <path d="M8 40V20C8 13.373 13.373 8 20 8H40" stroke="url(#royalFiligreeLine)" stroke-width="1.2" stroke-opacity="0.85" stroke-linecap="round" />
        <path d="M4 26C8 26 14 24 14 18C14 12 18 14 26 4" stroke="url(#royalFiligreeLine)" stroke-width="1.2" stroke-linecap="round" />
        <circle cx="10" cy="10" r="2.8" fill="#FFF0C2" />
        <circle cx="26" cy="10" r="1.8" fill="#D4AF37" />
        <circle cx="10" cy="26" r="1.8" fill="#D4AF37" />
      </svg>
      <svg class="corner-filigree corner-bl" viewBox="0 0 48 48" fill="none">
        <path d="M4 44V18C4 10.268 10.268 4 18 4H44" stroke="url(#royalFiligreeLine)" stroke-width="2" stroke-linecap="round" />
        <path d="M8 40V20C8 13.373 13.373 8 20 8H40" stroke="url(#royalFiligreeLine)" stroke-width="1.2" stroke-opacity="0.85" stroke-linecap="round" />
        <path d="M4 26C8 26 14 24 14 18C14 12 18 14 26 4" stroke="url(#royalFiligreeLine)" stroke-width="1.2" stroke-linecap="round" />
        <circle cx="10" cy="10" r="2.8" fill="#FFF0C2" />
        <circle cx="26" cy="10" r="1.8" fill="#D4AF37" />
        <circle cx="10" cy="26" r="1.8" fill="#D4AF37" />
      </svg>
      <svg class="corner-filigree corner-br" viewBox="0 0 48 48" fill="none">
        <path d="M4 44V18C4 10.268 10.268 4 18 4H44" stroke="url(#royalFiligreeLine)" stroke-width="2" stroke-linecap="round" />
        <path d="M8 40V20C8 13.373 13.373 8 20 8H40" stroke="url(#royalFiligreeLine)" stroke-width="1.2" stroke-opacity="0.85" stroke-linecap="round" />
        <path d="M4 26C8 26 14 24 14 18C14 12 18 14 26 4" stroke="url(#royalFiligreeLine)" stroke-width="1.2" stroke-linecap="round" />
        <circle cx="10" cy="10" r="2.8" fill="#FFF0C2" />
        <circle cx="26" cy="10" r="1.8" fill="#D4AF37" />
        <circle cx="10" cy="26" r="1.8" fill="#D4AF37" />
      </svg>
    </div>

    <!-- ═══ ROYAL CEREMONIAL SEAL / EMBLEM (Unlocks & Dissolves as Scroll Unfurls) ═══ -->
    <div
      v-if="sealOpacity > 0.01"
      class="ceremonial-seal absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none flex flex-col items-center justify-center text-center"
      :style="sealStyle"
      aria-hidden="true"
    >
      <div class="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-gradient-to-br from-[#FFF0C2] via-[#D4AF37] to-[#4E3410] shadow-[0_0_60px_rgba(212,175,55,0.75)] flex items-center justify-center">
        <div class="w-full h-full rounded-full bg-[#1A0B05]/95 border-2 border-[#D4AF37]/90 flex flex-col items-center justify-center p-2 text-center shadow-inner">
          <svg class="w-7 h-7 sm:w-8 sm:h-8 mb-1 text-[#E5B94C] animate-pulse" viewBox="0 0 100 100" fill="currentColor">
            <circle cx="50" cy="50" r="14" fill="#FFF0C2" />
            <polygon points="50,10 55,30 45,30" fill="#D4AF37" />
            <polygon points="50,90 55,70 45,70" fill="#D4AF37" />
            <polygon points="10,50 30,55 30,45" fill="#D4AF37" />
            <polygon points="90,50 70,55 70,45" fill="#D4AF37" />
            <polygon points="22,22 38,34 31,41" fill="#D4AF37" />
            <polygon points="78,78 62,66 69,59" fill="#D4AF37" />
            <polygon points="78,22 66,38 59,31" fill="#D4AF37" />
            <polygon points="22,78 34,62 41,69" fill="#D4AF37" />
          </svg>
          <span class="text-[8px] sm:text-[9px] font-heading font-extrabold uppercase tracking-[0.24em] text-[#FFF0C2] leading-tight">
            SẮC PHONG
          </span>
          <span class="text-[7px] sm:text-[8px] uppercase tracking-[0.18em] text-[#E5B94C] mt-0.5 font-bold">
            BÙ ĐĂNG
          </span>
        </div>
      </div>
    </div>

    <!-- ═══ LEFT IMPERIAL CYLINDRICAL ROLLER (Sleek, High-Luster Bronze-Gold Baton) ═══ -->
    <div
      class="imperial-roller imperial-roller-left absolute -top-6 -bottom-8 sm:-top-8 sm:-bottom-10 z-25 w-6 sm:w-8 flex items-center justify-center select-none pointer-events-none"
      :style="leftRollerStyle"
      aria-hidden="true"
    >
      <svg class="w-full h-full filter drop-shadow-[6px_0_18px_rgba(0,0,0,0.95)] drop-shadow-[0_0_12px_rgba(212,175,55,0.45)]" viewBox="0 0 32 640" preserveAspectRatio="none" fill="none">
        <!-- Main Metallic Cylinder Shaft -->
        <rect x="8" y="32" width="16" height="550" rx="2" fill="url(#royalRollerBaton)" stroke="#1A0F05" stroke-width="0.8" />
        <rect x="10" y="32" width="4" height="550" fill="#FFFDF5" fill-opacity="0.4" />
        <rect x="20" y="32" width="2" height="550" fill="#000000" fill-opacity="0.35" />
        
        <!-- Golden Inlay Rings on Shaft -->
        <rect x="7" y="120" width="18" height="4" rx="1" fill="url(#royalFinialGold)" stroke="#241504" stroke-width="0.5" />
        <rect x="7" y="240" width="18" height="4" rx="1" fill="url(#royalFinialGold)" stroke="#241504" stroke-width="0.5" />
        <rect x="7" y="360" width="18" height="4" rx="1" fill="url(#royalFinialGold)" stroke="#241504" stroke-width="0.5" />
        <rect x="7" y="480" width="18" height="4" rx="1" fill="url(#royalFinialGold)" stroke="#241504" stroke-width="0.5" />

        <!-- Top Lotus Finial Cap with Glowing Jewel Tip -->
        <g transform="translate(0, 0)">
          <path d="M7 32 C7 26, 25 26, 25 32 L27 30 C30 22, 25 14, 16 9 C7 14, 2 22, 5 30 Z" fill="url(#royalFinialGold)" stroke="#241504" stroke-width="0.8" />
          <ellipse cx="16" cy="6" rx="5" ry="6" fill="url(#royalFinialJewel)" stroke="#5E3E15" stroke-width="0.8" />
          <circle cx="16" cy="3" r="2" fill="#FFFDF5" />
        </g>

        <!-- Bottom Lotus Finial Cap with Hanging Silk Tassel -->
        <g transform="translate(0, 582)">
          <path d="M7 0 C7 6, 25 6, 25 0 L27 2 C30 10, 25 18, 16 23 C7 18, 2 10, 5 2 Z" fill="url(#royalFinialGold)" stroke="#241504" stroke-width="0.8" />
          <ellipse cx="16" cy="26" rx="5" ry="6" fill="url(#royalFinialJewel)" stroke="#5E3E15" stroke-width="0.8" />
          <circle cx="16" cy="29" r="2" fill="#FFFDF5" />

          <!-- Hanging Silk Tassel Ribbon -->
          <path d="M 14,32 L 18,32 L 20,54 L 12,54 Z" fill="url(#royalTasselRed)" />
          <circle cx="16" cy="34" r="2.5" fill="url(#royalFinialGold)" />
          <path d="M 12,54 Q 16,58 20,54" stroke="#D4AF37" stroke-width="1" />
        </g>
      </svg>
    </div>

    <!-- ═══ RIGHT IMPERIAL CYLINDRICAL ROLLER (Sleek, High-Luster Bronze-Gold Baton) ═══ -->
    <div
      class="imperial-roller imperial-roller-right absolute -top-6 -bottom-8 sm:-top-8 sm:-bottom-10 z-25 w-6 sm:w-8 flex items-center justify-center select-none pointer-events-none"
      :style="rightRollerStyle"
      aria-hidden="true"
    >
      <svg class="w-full h-full filter drop-shadow-[-6px_0_18px_rgba(0,0,0,0.95)] drop-shadow-[0_0_12px_rgba(212,175,55,0.45)]" viewBox="0 0 32 640" preserveAspectRatio="none" fill="none">
        <rect x="8" y="32" width="16" height="550" rx="2" fill="url(#royalRollerBaton)" stroke="#1A0F05" stroke-width="0.8" />
        <rect x="10" y="32" width="4" height="550" fill="#FFFDF5" fill-opacity="0.4" />
        <rect x="20" y="32" width="2" height="550" fill="#000000" fill-opacity="0.35" />
        
        <rect x="7" y="120" width="18" height="4" rx="1" fill="url(#royalFinialGold)" stroke="#241504" stroke-width="0.5" />
        <rect x="7" y="240" width="18" height="4" rx="1" fill="url(#royalFinialGold)" stroke="#241504" stroke-width="0.5" />
        <rect x="7" y="360" width="18" height="4" rx="1" fill="url(#royalFinialGold)" stroke="#241504" stroke-width="0.5" />
        <rect x="7" y="480" width="18" height="4" rx="1" fill="url(#royalFinialGold)" stroke="#241504" stroke-width="0.5" />

        <g transform="translate(0, 0)">
          <path d="M7 32 C7 26, 25 26, 25 32 L27 30 C30 22, 25 14, 16 9 C7 14, 2 22, 5 30 Z" fill="url(#royalFinialGold)" stroke="#241504" stroke-width="0.8" />
          <ellipse cx="16" cy="6" rx="5" ry="6" fill="url(#royalFinialJewel)" stroke="#5E3E15" stroke-width="0.8" />
          <circle cx="16" cy="3" r="2" fill="#FFFDF5" />
        </g>

        <g transform="translate(0, 582)">
          <path d="M7 0 C7 6, 25 6, 25 0 L27 2 C30 10, 25 18, 16 23 C7 18, 2 10, 5 2 Z" fill="url(#royalFinialGold)" stroke="#241504" stroke-width="0.8" />
          <ellipse cx="16" cy="26" rx="5" ry="6" fill="url(#royalFinialJewel)" stroke="#5E3E15" stroke-width="0.8" />
          <circle cx="16" cy="29" r="2" fill="#FFFDF5" />

          <!-- Hanging Silk Tassel Ribbon -->
          <path d="M 14,32 L 18,32 L 20,54 L 12,54 Z" fill="url(#royalTasselRed)" />
          <circle cx="16" cy="34" r="2.5" fill="url(#royalFinialGold)" />
          <path d="M 12,54 Q 16,58 20,54" stroke="#D4AF37" stroke-width="1" />
        </g>
      </svg>
    </div>

  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'complete'): void
}>()

// Animation state
const progress = ref(0) // 0.0 to 1.0
const isCompleted = ref(false)
const sealOpacity = ref(1)

// Motion settings: Effortless royal scroll gliding
const INITIAL_PAUSE_MS = 300
const DURATION_MS = 2800

function easeImperial(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(1 - t, 3.2)
}

let animFrameId: number | null = null

function runScrollEntrance() {
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    progress.value = 1
    sealOpacity.value = 0
    isCompleted.value = true
    emit('complete')
    return
  }

  const startTime = performance.now() + INITIAL_PAUSE_MS

  function step(now: number) {
    if (now < startTime) {
      animFrameId = requestAnimationFrame(step)
      return
    }

    const elapsed = now - startTime
    const rawProgress = Math.min(elapsed / DURATION_MS, 1)
    const eased = easeImperial(rawProgress)

    progress.value = eased

    // Seal unlocks & fades out gently during initial 25% of movement
    if (rawProgress < 0.25) {
      sealOpacity.value = Math.max(0, 1 - (rawProgress / 0.25) * 1.15)
    } else {
      sealOpacity.value = 0
    }

    if (rawProgress < 1) {
      animFrameId = requestAnimationFrame(step)
    } else {
      progress.value = 1
      isCompleted.value = true
      emit('complete')
    }
  }

  animFrameId = requestAnimationFrame(step)
}

onMounted(() => {
  nextTick(() => {
    runScrollEntrance()
  })
})

onUnmounted(() => {
  if (animFrameId !== null) {
    cancelAnimationFrame(animFrameId)
  }
})

// Content Mask: expands symmetrically from center (50%) to full width (0% to 100%)
const contentMaskStyle = computed(() => {
  if (isCompleted.value) {
    return {
      clipPath: 'none',
      WebkitClipPath: 'none',
    }
  }
  const sideInset = (1 - progress.value) * 50
  return {
    clipPath: `inset(0% ${sideInset}% 0% ${sideInset}%)`,
    WebkitClipPath: `inset(0% ${sideInset}% 0% ${sideInset}%)`,
    willChange: 'clip-path',
  }
})

// Left Roller Style: travels from center (50%) to left edge (0%)
const leftRollerStyle = computed(() => {
  const p = progress.value
  const leftPos = (1 - p) * 50
  const tx = -100 + p * 50
  return {
    left: `${leftPos}%`,
    transform: `translateX(${tx}%)`,
    willChange: 'left, transform',
  }
})

// Right Roller Style: travels from center (50%) to right edge (100%)
const rightRollerStyle = computed(() => {
  const p = progress.value
  const rightPos = 50 + p * 50
  const tx = -p * 50
  return {
    left: `${rightPos}%`,
    transform: `translateX(${tx}%)`,
    willChange: 'left, transform',
  }
})

// Parchment Frame Style: spans between left and right rollers
const parchmentFrameStyle = computed(() => {
  const p = progress.value
  const sideInset = (1 - p) * 50
  return {
    left: `${sideInset}%`,
    right: `${sideInset}%`,
    opacity: '1',
  }
})

// Ceremonial Seal Style
const sealStyle = computed(() => {
  const scale = 1 + (1 - sealOpacity.value) * 0.12
  return {
    opacity: sealOpacity.value,
    transform: `translate(-50%, -50%) scale(${scale})`,
    filter: `blur(${(1 - sealOpacity.value) * 4}px)`,
  }
})
</script>

<style scoped>
.royal-scroll-wrapper {
  transform: none;
}

/* ── Corner Filigrees ── */
.corner-filigree {
  position: absolute;
  width: 38px;
  height: 38px;
  pointer-events: none;
  z-index: 22;
  filter: drop-shadow(0 0 6px rgba(212, 175, 55, 0.5));
}
.corner-tl {
  top: 6px;
  left: 6px;
}
.corner-tr {
  top: 6px;
  right: 6px;
  transform: scaleX(-1);
}
.corner-bl {
  bottom: 6px;
  left: 6px;
  transform: scaleY(-1);
}
.corner-br {
  bottom: 6px;
  right: 6px;
  transform: scale(-1);
}
</style>
