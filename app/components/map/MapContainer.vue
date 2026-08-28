<template>
  <div class="relative w-full h-full">
    <div ref="mapEl" class="w-full h-full" />

    <!-- ON-SITE FIELD MODE ALERT CARD -->
    <Transition name="slide-up">
      <div
        v-if="nearbyHeritage"
        class="absolute top-6 left-1/2 -translate-x-1/2 z-[500] w-[92%] max-w-lg bg-charcoal-900/95 backdrop-blur-xl border-2 border-gold-500 rounded-2xl p-4 shadow-2xl shadow-charcoal-950/80 text-ivory flex items-center justify-between gap-4"
      >
        <div class="flex items-center gap-3">
          <div class="w-11 h-11 rounded-xl bg-gold-500/20 border border-gold-500/40 flex items-center justify-center shrink-0">
            <Icon name="mdi:map-marker-radius" class="w-6 h-6 text-gold-400" />
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="text-3xs uppercase font-bold tracking-wider text-gold-400">Chế độ Thực Địa GPS</span>
              <span class="text-3xs text-charcoal-400">• Cách ~{{ Math.round(nearbyDistance) }}m</span>
            </div>
            <p class="font-heading font-bold text-sm text-ivory line-clamp-1">{{ nearbyHeritage.title }}</p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <button
            v-if="nearbyHeritage.audio"
            class="btn-primary text-xs px-3 py-2 bg-gold-500 text-charcoal-950 flex items-center gap-1.5 shrink-0"
            @click="playNearbyAudio(nearbyHeritage)"
          >
            <Icon name="mdi:play" class="w-4 h-4" />
            <span class="hidden sm:inline">Audio</span>
          </button>
          <NuxtLink
            :to="`/heritage/${nearbyHeritage.slug}?src=field`"
            class="p-2 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 text-charcoal-300 hover:text-ivory transition-colors shrink-0"
            title="Xem chi tiết di tích"
          >
            <Icon name="mdi:arrow-right" class="w-4 h-4" />
          </NuxtLink>
        </div>
      </div>
    </Transition>

    <!-- Locate button — premium -->
    <button
      class="absolute bottom-6 right-6 z-[400] w-14 h-14 flex items-center justify-center rounded-2xl transition-all duration-300 group"
      :class="isLocating
        ? 'bg-gold-500 border-2 border-gold-300 shadow-gold/30 shadow-xl'
        : 'bg-charcoal-900/90 backdrop-blur-md border border-charcoal-700 hover:border-gold-500/70 hover:bg-charcoal-800 shadow-xl shadow-charcoal-950/60'"
      @click="locateMe"
      aria-label="Định vị vị trí của tôi"
      title="Định vị trí hiện tại"
    >
      <Icon
        :name="isLocating ? 'mdi:loading' : 'mdi:crosshairs-gps'"
        class="w-6 h-6 transition-all duration-300"
        :class="isLocating ? 'text-charcoal-950 animate-spin' : 'text-gold-400 group-hover:text-gold-300 group-hover:scale-110'"
      />
    </button>
    <!-- Zoom controls override label -->
    <div class="absolute bottom-6 left-6 z-[400] flex flex-col gap-1">
      <div class="bg-charcoal-900/80 backdrop-blur-sm border border-charcoal-750 rounded-xl overflow-hidden shadow-lg text-xs text-charcoal-500 px-2.5 py-1.5 flex items-center gap-1.5">
        <Icon name="mdi:gesture-pinch" class="w-3.5 h-3.5 text-charcoal-400" />
        <span class="font-medium">Kéo để khám phá</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Heritage } from '~/types'
import { CATEGORY_MAP } from '~/data/categories'
import { useHeritageStore } from '~/stores/heritage'
import 'leaflet/dist/leaflet.css'

const props = defineProps<{
  heritages: Heritage[]
  selectedId?: string | null
  selectedRoute?: any | null
}>()

const emit = defineEmits<{
  (e: 'select', heritage: Heritage): void
}>()

const mapEl = ref<HTMLElement | null>(null)
const audioStore = useAudioStore()
let map: any = null
let LInstance: any = null
const activeMarkers: any[] = []
let routePolyline: any = null
const isLocating = ref(false)
const nearbyHeritage = ref<Heritage | null>(null)
const nearbyDistance = ref(0)

// Brighter, more vivid colors that pop on dark map tile
const categoryColors: Record<string, string> = {
  'lich-su': '#EF4444',
  'danh-thang': '#12B981',
  'van-hoa-phi-vat-the': '#C7A664',
  'doi-song-cong-dong': '#8C806E',
  'giao-duc-truyen-thong': '#C7A664',
}

// Global user marker
let userMarker: any = null

const locateMe = async () => {
  const swal = useSwal()
  if (!navigator.geolocation) {
    swal.fire({
      title: 'Không hỗ trợ',
      text: 'Trình duyệt của bạn không hỗ trợ định vị GPS.',
      icon: 'error',
      confirmButtonColor: '#C7A664'
    })
    return
  }

  // Ask before requesting the browser permission — required UX per PROJECT_MASTER 6.1
  const consent = await swal.fire({
    title: 'Định vị vị trí của bạn?',
    text: 'Bản đồ sẽ dùng GPS của thiết bị để hiển thị vị trí hiện tại của bạn so với các điểm di sản. Vị trí không được lưu lại hay gửi đi đâu.',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Đồng ý định vị',
    cancelButtonText: 'Để sau',
    confirmButtonColor: '#C7A664',
    background: '#221D17',
    color: '#F5F1EA',
  })
  if (!consent.isConfirmed) return

  isLocating.value = true
  navigator.geolocation.getCurrentPosition(
    (position) => {
      isLocating.value = false
      const lat = position.coords.latitude
      const lng = position.coords.longitude
      
      // Check nearest heritage for Field Mode
      let minDistance = Infinity
      let nearest: Heritage | null = null

      props.heritages.forEach((h) => {
        const dist = calculateDistanceMeters(lat, lng, h.coordinates.lat, h.coordinates.lng)
        if (dist < minDistance) {
          minDistance = dist
          nearest = h
        }
      })

      if (nearest && minDistance <= 5000) {
        nearbyHeritage.value = nearest
        nearbyDistance.value = minDistance
      }

      if (map) {
        map.flyTo([lat, lng], 14, { duration: 1.8, easeLinearity: 0.25 })
        
        if (LInstance) {
          if (userMarker) {
            userMarker.setLatLng([lat, lng])
          } else {
            const userIcon = LInstance.divIcon({
              html: `
                <div style="position:relative;display:flex;align-items:center;justify-content:center;width:28px;height:28px;">
                  <div style="position:absolute;inset:0;background:rgba(59,130,246,0.35);border-radius:50%;animation:ping 1.5s cubic-bezier(0,0,0.2,1) infinite;"></div>
                  <div style="position:relative;width:16px;height:16px;background:#C7A664;border:3px solid white;border-radius:50%;box-shadow:0 0 14px rgba(59,130,246,0.8);"></div>
                </div>`,
              className: '',
              iconSize: [28, 28],
              iconAnchor: [14, 14],
            })
            userMarker = LInstance.marker([lat, lng], { icon: userIcon }).addTo(map)
              .bindPopup('<div style="font-size:12px;font-weight:600;color:#221D17;">📍 Vị trí của bạn</div>')
          }
        }
      }
    },
    (_error) => {
      isLocating.value = false
      swal.fire({
        title: 'Lỗi định vị',
        text: 'Không thể lấy vị trí của bạn. Vui lòng cấp quyền truy cập vị trí.',
        icon: 'warning',
        confirmButtonColor: '#C7A664'
      })
    }
  )
}

function calculateDistanceMeters(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371e3 // meters
  const phi1 = (lat1 * Math.PI) / 180
  const phi2 = (lat2 * Math.PI) / 180
  const deltaPhi = ((lat2 - lat1) * Math.PI) / 180
  const deltaLambda = ((lon2 - lon1) * Math.PI) / 180

  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return R * c
}

function playNearbyAudio(h: Heritage) {
  if (h.audio) {
    audioStore.loadTrack(h.audio, h.id)
    audioStore.play()
  }
}

onMounted(async () => {
  if (!mapEl.value) return

  // Dynamically import Leaflet with error guard
  let L: any
  try {
    L = await import('leaflet')
    LInstance = L
  } catch (err) {
    console.error('[MapContainer] Failed to load Leaflet:', err)
    return
  }

  // Init map centered on Thành Phố Đồng Nai
  map = L.map(mapEl.value, {
    center: [11.82, 107.15],
    zoom: 11,
    zoomControl: true,
    attributionControl: false,
  })

  // OpenStreetMap — dark cinematic tile theme via CSS filter (no API key required)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" style="color:#C7A664">OpenStreetMap</a> contributors',
    maxZoom: 19,
    className: 'map-tiles-dark',
  }).addTo(map)

  // Listen to zoom changes to update clusters dynamically
  map.on('zoomend', () => {
    if (LInstance && map) {
      addMarkers(LInstance)
    }
  })

  // Add heritage markers
  addMarkers(L)
})

const categoryIcons: Record<string, string> = {
  'lich-su': `<path d="M19,20H5V8H7V5H9V8H11V5H13V8H15V5H17V8H19V20M11,10H9V12H11V10M15,10H13V12H15V10M11,14H9V16H11V14M15,14H13V16H15V14Z" />`,
  'danh-thang': `<path d="M14,6L10.25,11L13.1,14.8L11.5,16C9.81,13.75 7,10 7,10L1,18H23L14,6Z" />`,
  'van-hoa-phi-vat-the': `<path d="M12,3V13.55C11.41,13.21 10.73,13 10,13C7.79,13 6,14.79 6,17C6,19.21 7.79,21 10,21C12.21,21 14,19.21 14,17V7H18V3H12Z" />`,
  'doi-song-cong-dong': `<path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" />`,
  'giao-duc-truyen-thong': `<path d="M12,11.55C9.64,9.35 6.48,8 3,8V19C6.48,19 9.64,20.35 12,22.55C14.36,20.35 17.52,19 21,19V8C17.52,8 14.36,9.35 12,11.55Z" />`,
}

interface HeritageCluster {
  heritages: Heritage[]
  lat: number
  lng: number
  id: string
}

function addMarkers(L: any) {
  // Clear old markers first
  activeMarkers.forEach((m) => m.remove())
  activeMarkers.length = 0

  const zoom = map.getZoom()
  const clusters: HeritageCluster[] = []

  // Basic distance threshold in degrees depending on zoom
  const threshold = zoom < 10 ? 0.08 : zoom === 10 ? 0.05 : zoom === 11 ? 0.025 : zoom === 12 ? 0.012 : 0.0

  if (threshold > 0) {
    props.heritages.forEach((h) => {
      let found = false
      for (const c of clusters) {
        const dist = Math.sqrt(Math.pow(c.lat - h.coordinates.lat, 2) + Math.pow(c.lng - h.coordinates.lng, 2))
        if (dist < threshold) {
          c.heritages.push(h)
          // Recalculate average center
          c.lat = c.heritages.reduce((sum, item) => sum + item.coordinates.lat, 0) / c.heritages.length
          c.lng = c.heritages.reduce((sum, item) => sum + item.coordinates.lng, 0) / c.heritages.length
          found = true
          break
        }
      }
      if (!found) {
        clusters.push({ heritages: [h], lat: h.coordinates.lat, lng: h.coordinates.lng, id: `cluster-${h.id}` })
      }
    })
  } else {
    props.heritages.forEach((h) => {
      clusters.push({ heritages: [h], lat: h.coordinates.lat, lng: h.coordinates.lng, id: h.id })
    })
  }

  // Draw clusters/markers
  clusters.forEach((c) => {
    const isSingle = c.heritages.length === 1

    if (isSingle) {
      const h = c.heritages[0]
      if (!h) return
      const color = categoryColors[h.category] ?? '#C7A664'
      const isSelected = props.selectedId === h.id
      const iconSvgPath = categoryIcons[h.category] ?? `<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>`
      const pinSize = isSelected ? 46 : 40
      const halfPin = pinSize / 2

      const icon = L.divIcon({
        html: `
          <div style="position:relative;display:flex;align-items:center;justify-content:center;" class="heritage-pin-wrapper" tabindex="0" aria-label="Di sản: ${h.title}">
            <!-- Outer ambient glow -->
            <div style="position:absolute;border-radius:50%;pointer-events:none;
              width:${pinSize + 20}px;height:${pinSize + 20}px;
              background:radial-gradient(circle, ${color}30 0%, transparent 70%);
              animation: ${isSelected ? 'none' : 'ambientGlow 3s ease-in-out infinite'};
            "></div>
            <!-- Pulse ring when selected -->
            ${isSelected ? `<div style="position:absolute;border-radius:50%;pointer-events:none;width:${pinSize + 8}px;height:${pinSize + 8}px;border:2px solid ${color};opacity:0.7;animation:selectedPulse 1.8s ease-out infinite;"></div>` : ''}
            <!-- Main marker circle -->
            <div style="
              width:${pinSize}px;height:${pinSize}px;border-radius:50%;
              background:linear-gradient(135deg, ${color}EE, ${color}99);
              border:${isSelected ? `3px solid ${color}` : '2px solid rgba(255,255,255,0.25)'};
              display:flex;align-items:center;justify-content:center;
              box-shadow:0 4px 20px ${color}60, 0 0 0 1px ${color}40, inset 0 1px 0 rgba(255,255,255,0.2);
              cursor:pointer;transition:transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
              transform:${isSelected ? 'scale(1.15)' : 'scale(1)'};
              position:relative;z-index:10;
            " class="heritage-circle">
              <svg width="${isSelected ? 22 : 18}" height="${isSelected ? 22 : 18}" viewBox="0 0 24 24" fill="white" style="filter:drop-shadow(0 1px 2px rgba(0,0,0,0.5));">
                ${iconSvgPath}
              </svg>
            </div>
            <!-- Tooltip -->
            <div style="
              position:absolute;bottom:${halfPin + 14}px;left:50%;transform:translateX(-50%) translateY(4px);
              background:rgba(15,13,11,0.97);backdrop-filter:blur(12px);
              color:#F5F1EA;font-size:11px;font-weight:600;letter-spacing:0.02em;
              padding:5px 10px;border-radius:8px;
              border:1px solid ${color}45;
              box-shadow:0 8px 24px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05);
              white-space:nowrap;pointer-events:none;
              opacity:0;transition:opacity 0.2s, transform 0.2s;
              z-index:9999;
            " class="pin-tooltip">
              <span style="color:${color};margin-right:4px;">●</span>${h.title}
            </div>
          </div>`,
        className: 'heritage-marker-host',
        iconSize: [pinSize, pinSize],
        iconAnchor: [halfPin, halfPin],
      })

      const marker = L.marker([h.coordinates.lat, h.coordinates.lng], { icon })
        .addTo(map)
        .on('click', () => emit('select', h))

      // Accessibility key press — Leaflet only forwards mouse events, so bind natively on the DOM element
      marker.getElement()?.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          emit('select', h)
        }
      })

      activeMarkers.push(marker)
    } else {
      // Cluster marker
      const count = c.heritages.length
      const containsSelected = c.heritages.some((h) => props.selectedId === h.id)
      const titlesList = c.heritages.slice(0, 4).map((h) => `<div style="display:flex;align-items:center;gap:5px;"><span style="color:#C7A664;font-size:8px;">●</span>${h.title}</div>`).join('') + (c.heritages.length > 4 ? `<div style="color:#8C806E;font-size:10px;margin-top:2px;">+${c.heritages.length - 4} địa điểm khác</div>` : '')
      const clusterSize = containsSelected ? 52 : 46
      const half = clusterSize / 2

      const icon = L.divIcon({
        html: `
          <div style="position:relative;display:flex;align-items:center;justify-content:center;" tabindex="0" aria-label="Nhóm ${count} di sản. Nhấp để phóng to." class="heritage-cluster-host">
            <!-- Ambient glow -->
            <div style="position:absolute;width:${clusterSize + 24}px;height:${clusterSize + 24}px;border-radius:50%;background:radial-gradient(circle, #C7A66430 0%, transparent 70%);pointer-events:none;"></div>
            <!-- Outer ring -->
            <div style="position:absolute;width:${clusterSize + 6}px;height:${clusterSize + 6}px;border-radius:50%;border:1.5px solid #C7A66440;pointer-events:none;animation:clusterRing 2.5s ease-in-out infinite;"></div>
            <!-- Main circle -->
            <div style="
              width:${clusterSize}px;height:${clusterSize}px;border-radius:50%;
              background:linear-gradient(135deg, #241C15, #221D17);
              border:2px solid ${containsSelected ? '#C7A664' : 'rgba(228,162,38,0.45)'};
              display:flex;flex-direction:column;align-items:center;justify-content:center;
              box-shadow:0 4px 20px rgba(0,0,0,0.7), 0 0 20px #C7A66425, inset 0 1px 0 rgba(255,255,255,0.08);
              cursor:pointer;position:relative;z-index:10;
            " class="heritage-cluster-circle">
              <span style="font-weight:800;font-size:${count > 9 ? 13 : 15}px;color:#C7A664;line-height:1;">${count}</span>
              <span style="font-size:8px;color:#8C806E;font-weight:600;letter-spacing:0.06em;margin-top:1px;">DI SẢN</span>
            </div>
            <!-- Tooltip -->
            <div style="
              position:absolute;bottom:${half + 12}px;left:50%;transform:translateX(-50%);
              background:rgba(12,10,8,0.97);backdrop-filter:blur(12px);
              color:#F5F1EA;font-size:11px;padding:8px 12px;border-radius:10px;
              border:1px solid #C7A66435;
              box-shadow:0 12px 30px rgba(0,0,0,0.7);
              white-space:nowrap;pointer-events:none;
              opacity:0;transition:opacity 0.2s;
              z-index:9999;text-align:left;min-width:140px;
            " class="cluster-tooltip">
              <div style="color:#C7A664;font-weight:700;font-size:11px;margin-bottom:6px;border-bottom:1px solid #241C15;padding-bottom:5px;">📍 ${count} Địa điểm</div>
              ${titlesList}
            </div>
          </div>`,
        className: 'heritage-cluster-host',
        iconSize: [clusterSize, clusterSize],
        iconAnchor: [half, half],
      })

      const marker = L.marker([c.lat, c.lng], { icon })
        .addTo(map)
        .on('click', () => {
          map.flyTo([c.lat, c.lng], zoom + 2, { duration: 0.8 })
        })

      marker.getElement()?.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          map.flyTo([c.lat, c.lng], zoom + 2, { duration: 0.8 })
        }
      })

      activeMarkers.push(marker)
    }
  })
}
// Watch selected heritage to pan map
watch(() => props.selectedId, (id) => {
  if (!map || !id) return
  const h = props.heritages.find((x) => x.id === id)
  if (h) {
    // Zoom in deeper (14) if selected, to auto-declustered view
    map.flyTo([h.coordinates.lat, h.coordinates.lng], 14, { duration: 1.2 })
  }
  if (map && LInstance) {
    addMarkers(LInstance)
  }
})

// Update markers when filtered heritages change
watch(() => props.heritages, () => {
  if (map && LInstance) {
    addMarkers(LInstance)
    updateRouteLine()
  }
}, { deep: true })

const store = useHeritageStore()

watch(() => store.mapGesturesEnabled, (enabled) => {
  if (!map) return
  if (enabled) {
    map.dragging.enable()
    map.touchZoom.enable()
    map.doubleClickZoom.enable()
    map.scrollWheelZoom.enable()
    if (map.boxZoom) map.boxZoom.enable()
    if (map.keyboard) map.keyboard.enable()
  } else {
    map.dragging.disable()
    map.touchZoom.disable()
    map.doubleClickZoom.disable()
    map.scrollWheelZoom.disable()
    if (map.boxZoom) map.boxZoom.disable()
    if (map.keyboard) map.keyboard.disable()
  }
})

function updateRouteLine() {
  if (!map || !LInstance) return
  if (routePolyline) {
    routePolyline.remove()
    routePolyline = null
  }
  const route = props.selectedRoute
  if (!route || !route.stops) return

  const latlngs = route.stops.map((stop: any) => {
    const heritage = props.heritages.find((x) => x.id === stop.id)
    if (heritage && heritage.coordinates) {
      return [heritage.coordinates.lat, heritage.coordinates.lng]
    }
    return null
  }).filter((c: any) => c !== null)

  if (latlngs.length < 2) return

  // Main glowing route line
  routePolyline = LInstance.polyline(latlngs, {
    color: route.color || '#C7A664',
    weight: 3,
    opacity: 0.9,
    dashArray: '12, 14',
    className: 'route-line-animated',
    lineCap: 'round',
    lineJoin: 'round',
  }).addTo(map)
  // Glow effect layer
  LInstance.polyline(latlngs, {
    color: route.color || '#C7A664',
    weight: 10,
    opacity: 0.12,
    lineCap: 'round',
  }).addTo(map)

  // Zoom map to fit route bounds
  const bounds = LInstance.latLngBounds(latlngs)
  map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14, duration: 1.2 })
}

watch(() => props.selectedRoute, () => {
  updateRouteLine()
}, { deep: true })

onUnmounted(() => {
  if (routePolyline) {
    routePolyline.remove()
  }
  map?.remove()
})
</script>

<style scoped>
/* Marker host — no Leaflet default border */
:deep(.leaflet-div-icon),
:deep(.heritage-marker-host),
:deep(.heritage-cluster-host) {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
}

/* Hover reveal tooltip on marker hover */
:deep(.heritage-marker-host:hover .pin-tooltip),
:deep(.heritage-cluster-host:hover .cluster-tooltip) {
  opacity: 1 !important;
  transform: translateX(-50%) translateY(0) !important;
}

/* Ambient glow keyframe */
@keyframes ambientGlow {
  0%, 100% { transform: scale(1); opacity: 0.6; }
  50% { transform: scale(1.3); opacity: 0.3; }
}
@keyframes selectedPulse {
  0% { transform: scale(1); opacity: 0.8; }
  100% { transform: scale(1.8); opacity: 0; }
}
@keyframes clusterRing {
  0%, 100% { transform: scale(1); opacity: 0.6; }
  50% { transform: scale(1.15); opacity: 0.3; }
}

/* Animated dashed route line */
@keyframes dash {
  to { stroke-dashoffset: -52; }
}
:deep(.route-line-animated) {
  animation: dash 1.8s linear infinite;
}

/* Leaflet custom popup style */
:deep(.leaflet-popup-content-wrapper) {
  background: rgba(15, 13, 11, 0.95) !important;
  border: 1px solid rgba(228, 162, 38, 0.3) !important;
  border-radius: 12px !important;
  box-shadow: 0 12px 30px rgba(0,0,0,0.6) !important;
  color: #F5F1EA !important;
  backdrop-filter: blur(12px);
}
:deep(.leaflet-popup-tip) {
  background: rgba(15, 13, 11, 0.95) !important;
}
:deep(.leaflet-popup-close-button) {
  color: #8C806E !important;
}

/* Override leaflet attribution */
:deep(.leaflet-control-attribution) {
  background: rgba(12, 10, 8, 0.75) !important;
  color: #4F473C !important;
  border-radius: 8px 0 0 0 !important;
  font-size: 10px !important;
  padding: 3px 8px !important;
  backdrop-filter: blur(8px);
}
:deep(.leaflet-control-attribution a) {
  color: #C7A664 !important;
}

/* Zoom controls dark theme */
:deep(.leaflet-control-zoom) {
  border: 1px solid rgba(255,255,255,0.1) !important;
  border-radius: 12px !important;
  overflow: hidden !important;
  box-shadow: 0 4px 16px rgba(0,0,0,0.5) !important;
}
:deep(.leaflet-control-zoom a) {
  background: rgba(20, 18, 16, 0.95) !important;
  color: #C7A664 !important;
  border-bottom: 1px solid rgba(255,255,255,0.08) !important;
  font-size: 16px !important;
  font-weight: 300 !important;
  width: 34px !important;
  height: 34px !important;
  line-height: 34px !important;
}
:deep(.leaflet-control-zoom a:hover) {
  background: rgba(30, 28, 26, 0.95) !important;
  color: #C7A664 !important;
}

/* OpenStreetMap Dark Theme Tile Filter */
:deep(.map-tiles-dark) {
  filter: brightness(0.6) invert(1) contrast(3) hue-rotate(200deg) saturate(0.3) brightness(0.7);
}

:deep(.leaflet-container) {
  background: #0d0b09 !important;
}
</style>
