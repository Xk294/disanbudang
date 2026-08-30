<template>
  <div
    ref="containerRef"
    class="tour-viewer-360 relative w-full h-full min-h-[400px] overflow-hidden bg-night-900 select-none"
    :class="{
      'cursor-grab': !isDragging,
      'cursor-grabbing': isDragging,
      'is-fullscreen': isFullscreen,
    }"
    tabindex="0"
    role="region"
    aria-label="360° Virtual Tour Viewer"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
    @pointercancel="onPointerUp"
    @wheel.prevent="onWheel"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
  >
    <!-- WebGL Three.js Canvas Container -->
    <div ref="canvasContainerRef" class="absolute inset-0 w-full h-full" />

    <!-- HOTSPOTS OVERLAY LAYER -->
    <div
      v-if="areHotspotsVisible && !isLoading && !isTransitioning"
      class="absolute inset-0 pointer-events-none z-10"
    >
      <TourHotspotItem
        v-for="hs in projectedHotspots"
        :key="hs.id"
        :hotspot="hs"
        :is-active="activeHotspotId === hs.id"
        @click="handleHotspotClick(hs)"
      />
    </div>

    <!-- HUD CONTROLS OVERLAY -->
    <TourControlOverlay
      :tour-title="tour?.title"
      :scene-title="scene?.title"
      :back-url="backUrl"
      :yaw="currentYaw"
      :is-fullscreen="isFullscreen"
      :is-scene-drawer-open="isSceneDrawerOpen"
      :is-auto-rotate-active="isAutoRotate"
      :are-hotspots-visible="areHotspotsVisible"
      @toggle-fullscreen="toggleFullscreen"
      @toggle-scene-drawer="toggleSceneDrawer"
      @toggle-auto-rotate="toggleAutoRotate"
      @toggle-hotspots="toggleHotspots"
      @zoom-in="zoomIn"
      @zoom-out="zoomOut"
      @reset-view="resetView"
    />

    <!-- NAVIGATION DRAWER / CAROUSEL -->
    <TourNavigationDrawer
      v-if="tour"
      :scenes="tour.scenes"
      :active-scene-id="scene?.id || ''"
      :is-open="isSceneDrawerOpen"
      :tour-title="tour.title"
      :tour-subtitle="tour.subtitle"
      @select-scene="handleSceneSelect"
      @toggle="toggleSceneDrawer"
    />

    <!-- AUDIO PLAYER BAR (FLOATING) -->
    <TourAudioBar />

    <!-- INFORMATION MODAL / SLIDE PANEL -->
    <TourInfoPanel
      :hotspot="selectedInfoHotspot"
      :is-open="isInfoPanelOpen"
      @close="closeInfoPanel"
    />

    <!-- ARTIFACT 3D DIGITAL MUSEUM MODAL -->
    <TourArtifactModal
      :artifact="selectedArtifact"
      :is-open="isArtifactModalOpen"
      @close="closeArtifactModal"
    />

    <!-- SCENE TRANSITION OVERLAY -->
    <Transition name="fade-fast">
      <div
        v-if="isTransitioning"
        class="absolute inset-0 z-40 bg-charcoal-950/90 backdrop-blur-md flex flex-col items-center justify-center text-center p-6"
      >
        <div class="w-12 h-12 rounded-full border-2 border-gold-500/30 border-t-gold-400 animate-spin mb-3" />
        <p class="font-heading font-bold text-ivory text-lg">Đang chuyển không gian...</p>
        <p class="text-xs text-gold-400/80 mt-1">Khám phá góc nhìn mới</p>
      </div>
    </Transition>

    <!-- INITIAL LOADING STATE -->
    <Transition name="fade">
      <div
        v-if="isLoading"
        class="absolute inset-0 z-40 bg-night-950 flex flex-col items-center justify-center p-6 text-center"
      >
        <div class="relative w-16 h-16 mb-4 flex items-center justify-center">
          <div class="absolute inset-0 rounded-full border-2 border-gold-500/20 animate-ping" />
          <div class="w-12 h-12 rounded-full border-2 border-gold-500 border-t-transparent animate-spin" />
          <Icon name="mdi:panorama-sphere" class="w-6 h-6 text-gold-400 absolute" />
        </div>
        <h3 class="font-heading font-bold text-ivory text-xl">Đang Khởi Tạo Không Gian 360°</h3>
        <p class="text-xs text-charcoal-400 max-w-xs mt-1.5 leading-relaxed">
          Tối ưu hóa hình ảnh panorama độ phân giải cao và dựng tọa độ không gian...
        </p>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import type {
  VirtualHeritageTour,
  TourScene,
  Hotspot,
  ProjectedHotspot,
  Artifact,
} from '~/types/virtualTour'
import { createProceduralPanorama } from '~/utils/panoramaGenerator'
import TourHotspotItem from './TourHotspotItem.vue'
import TourControlOverlay from './TourControlOverlay.vue'
import TourNavigationDrawer from './TourNavigationDrawer.vue'
import TourInfoPanel from './TourInfoPanel.vue'
import TourArtifactModal from './TourArtifactModal.vue'
import TourAudioBar from './TourAudioBar.vue'
import { useVirtualTourStore } from '~/composables/useVirtualTour'

const props = withDefaults(
  defineProps<{
    tour: VirtualHeritageTour | null
    scene: TourScene | null
    backUrl?: string
    autoRotateDefault?: boolean
  }>(),
  {
    tour: null,
    scene: null,
    backUrl: '/explore',
    autoRotateDefault: false,
  },
)

const emit = defineEmits<{
  (e: 'change-scene', sceneId: string): void
}>()

const tourStore = useVirtualTourStore()

// ─── DOM References ───
const containerRef = ref<HTMLElement | null>(null)
const canvasContainerRef = ref<HTMLElement | null>(null)

// ─── UI States ───
const isLoading = ref(true)
const isTransitioning = ref(false)
const isFullscreen = ref(false)
const isSceneDrawerOpen = ref(false)
const areHotspotsVisible = ref(true)
const isAutoRotate = ref(props.autoRotateDefault)

// Modals
const selectedInfoHotspot = ref<Hotspot | null>(null)
const isInfoPanelOpen = ref(false)
const selectedArtifact = ref<Artifact | null>(null)
const isArtifactModalOpen = ref(false)
const activeHotspotId = ref<string | null>(null)

// Projected hotspots
const projectedHotspots = ref<ProjectedHotspot[]>([])

// ─── Three.js Instances ───
let renderer: THREE.WebGLRenderer | null = null
let threeScene: THREE.Scene | null = null
let camera: THREE.PerspectiveCamera | null = null
let sphereMesh: THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial> | null = null
let animFrameId: number | null = null
let currentLoadingSceneId: string | null = null

// ─── Camera & Interaction Math ───
let lon = 0 // Yaw in degrees
let lat = 0 // Pitch in degrees
let targetLon = 0
let targetLat = 0
let targetFov = 75
const minFov = 30
const maxFov = 95

let isDragging = ref(false)
let onPointerDownPointerX = 0
let onPointerDownPointerY = 0
let onPointerDownLon = 0
let onPointerDownLat = 0

// Inertia velocity
let velocityLon = 0
let velocityLat = 0

// Pinch Zoom tracking
let touchStartDistance = 0
let touchStartFov = 75

const currentYaw = ref(0)

// ─── Initialize Three.js Engine ───
function initThree() {
  if (!canvasContainerRef.value || typeof window === 'undefined') return

  const width = canvasContainerRef.value.clientWidth || window.innerWidth
  const height = canvasContainerRef.value.clientHeight || window.innerHeight

  // 1. Scene
  threeScene = new THREE.Scene()

  // 2. Camera
  targetFov = props.scene?.initialView?.fov || 75
  camera = new THREE.PerspectiveCamera(targetFov, width / height, 0.1, 1100)
  camera.position.set(0, 0, 0)

  // Initial angles
  targetLon = props.scene?.initialView?.yaw || 0
  targetLat = props.scene?.initialView?.pitch || 0
  lon = targetLon
  lat = targetLat

  // 3. Sphere Geometry (Radius 500)
  const geometry = new THREE.SphereGeometry(500, 60, 40)
  geometry.scale(-1, 1, 1) // Invert so texture faces inward

  // 4. Initial Material with fallback procedural texture
  const initialDataUrl = createProceduralPanorama({
    title: props.scene?.title || 'Không Gian Di Sản 360°',
    subtitle: props.tour?.title || 'DiSanBudang.com',
    theme: props.scene?.id?.includes('trang-co') ? 'meadow-day' : 'golden-hour',
  })

  const loader = new THREE.TextureLoader()
  const fallbackTexture = loader.load(initialDataUrl)
  fallbackTexture.colorSpace = THREE.SRGBColorSpace

  const material = new THREE.MeshBasicMaterial({
    map: fallbackTexture,
  })

  sphereMesh = new THREE.Mesh(geometry, material)
  threeScene.add(sphereMesh)

  // 5. Renderer
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    powerPreference: 'high-performance',
    alpha: false,
  })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.outputColorSpace = THREE.SRGBColorSpace

  canvasContainerRef.value.appendChild(renderer.domElement)

  // Start Animation Loop
  animate()

  // Load Actual Panorama Texture
  if (props.scene) {
    loadSceneTexture(props.scene)
  }
}

// ─── Load Scene Panorama Texture ───
function loadSceneTexture(scene: TourScene) {
  if (!sphereMesh || !threeScene) return

  isLoading.value = true
  const requestedSceneId = scene.id
  currentLoadingSceneId = requestedSceneId

  const textureLoader = new THREE.TextureLoader()

  // Attempt loading real panorama URL
  textureLoader.load(
    scene.panoramaUrl,
    (loadedTexture) => {
      // Guard against race condition if user switched scenes while loading
      if (currentLoadingSceneId !== requestedSceneId) {
        loadedTexture.dispose()
        return
      }

      loadedTexture.colorSpace = THREE.SRGBColorSpace
      loadedTexture.minFilter = THREE.LinearFilter
      loadedTexture.magFilter = THREE.LinearFilter

      if (sphereMesh && sphereMesh.material) {
        if (sphereMesh.material.map) {
          sphereMesh.material.map.dispose()
        }
        sphereMesh.material.map = loadedTexture
        sphereMesh.material.needsUpdate = true
      }
      isLoading.value = false
    },
    undefined,
    () => {
      // Guard against race condition if user switched scenes while loading
      if (currentLoadingSceneId !== requestedSceneId) {
        return
      }

      // On error (e.g. mock / placeholder period), generate procedural texture!
      const procUrl = createProceduralPanorama({
        title: scene.title,
        subtitle: props.tour?.title || 'Bảo Tàng Số Di Sản Bù Đăng',
        theme: scene.id.includes('trang-co')
          ? 'meadow-day'
          : scene.id.includes('lua-trai')
            ? 'night-campfire'
            : 'golden-hour',
      })
      const procTexture = textureLoader.load(procUrl)
      procTexture.colorSpace = THREE.SRGBColorSpace

      if (sphereMesh && sphereMesh.material) {
        if (sphereMesh.material.map) {
          sphereMesh.material.map.dispose()
        }
        sphereMesh.material.map = procTexture
        sphereMesh.material.needsUpdate = true
      }
      isLoading.value = false
    },
  )
}

// ─── Animation & Render Loop ───
function animate() {
  animFrameId = requestAnimationFrame(animate)

  if (!camera || !renderer || !threeScene) return

  // Auto-rotate if idle
  if (isAutoRotate.value && !isDragging.value) {
    targetLon += 0.08
  }

  // Smooth Inertia Damping
  if (!isDragging.value) {
    targetLon += velocityLon
    targetLat += velocityLat
    velocityLon *= 0.92
    velocityLat *= 0.92
    if (Math.abs(velocityLon) < 0.001) velocityLon = 0
    if (Math.abs(velocityLat) < 0.001) velocityLat = 0
  }

  // Smooth Angle & FOV Lerp
  lat = THREE.MathUtils.lerp(lat, targetLat, 0.12)
  lon = THREE.MathUtils.lerp(lon, targetLon, 0.12)
  lat = Math.max(-85, Math.min(85, lat))

  if (Math.abs(camera.fov - targetFov) > 0.01) {
    camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov, 0.15)
    camera.updateProjectionMatrix()
  }

  // Spherical Coordinates -> Camera LookAt Target
  const phi = THREE.MathUtils.degToRad(90 - lat)
  const theta = THREE.MathUtils.degToRad(lon + 180)

  const lookTarget = new THREE.Vector3(
    500 * Math.sin(phi) * Math.cos(theta),
    500 * Math.cos(phi),
    500 * Math.sin(phi) * Math.sin(theta),
  )

  camera.lookAt(lookTarget)
  currentYaw.value = ((lon % 360) + 360) % 360

  // Render WebGL
  renderer.render(threeScene, camera)

  // Project Spatial Hotspots to 2D Screen
  updateProjectedHotspots()
}

// ─── Project Hotspot Coordinates (Spherical -> 3D -> 2D Screen) ───
function updateProjectedHotspots() {
  const activeCam = camera
  if (!props.scene?.hotspots || !activeCam || !canvasContainerRef.value) {
    projectedHotspots.value = []
    return
  }

  const width = canvasContainerRef.value.clientWidth
  const height = canvasContainerRef.value.clientHeight
  if (!width || !height) return

  const results: ProjectedHotspot[] = []

  props.scene.hotspots.forEach((hs) => {
    // Convert (yaw, pitch) to 3D Cartesian coordinates on sphere
    const hPhi = THREE.MathUtils.degToRad(90 - hs.pitch)
    const hTheta = THREE.MathUtils.degToRad(hs.yaw + 180)

    // Position on radius 500 sphere
    const hVector = new THREE.Vector3(
      -500 * Math.sin(hPhi) * Math.sin(hTheta),
      500 * Math.cos(hPhi),
      500 * Math.sin(hPhi) * Math.cos(hTheta),
    )

    // Project to normalized device coordinates (-1 to +1)
    const projected = hVector.clone().project(activeCam)

    // Check if in front of camera (z < 1)
    const isVisible = projected.z < 1

    // Map NDC to screen pixels
    const screenX = (projected.x * 0.5 + 0.5) * width
    const screenY = (-(projected.y * 0.5) + 0.5) * height

    // Perspective depth scaling (slightly smaller when zoomed out)
    const fovFactor = 75 / (activeCam.fov || 75)
    const scale = Math.max(0.75, Math.min(1.25, fovFactor * 0.95))

    results.push({
      ...hs,
      screenX,
      screenY,
      isVisible,
      scale,
      distance: 500,
    })
  })

  projectedHotspots.value = results
}

// ─── Interaction Handlers (Desktop & Mobile) ───
function onPointerDown(e: PointerEvent) {
  const target = e.target as HTMLElement | null
  if (target && (target.closest('button') || target.closest('a') || target.closest('input') || target.closest('.pointer-events-auto') || target.closest('.tour-control-overlay') || target.closest('.tour-navigation-drawer') || target.closest('.tour-audio-bar'))) {
    return
  }
  if (e.button !== 0 && e.pointerType === 'mouse') return
  isDragging.value = true
  onPointerDownPointerX = e.clientX
  onPointerDownPointerY = e.clientY
  onPointerDownLon = targetLon
  onPointerDownLat = targetLat
  velocityLon = 0
  velocityLat = 0
  try {
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }
  catch {}
}

function onPointerMove(e: PointerEvent) {
  if (!isDragging.value) return

  const deltaX = e.clientX - onPointerDownPointerX
  const deltaY = e.clientY - onPointerDownPointerY

  const sensitivity = (targetFov / 75) * 0.16

  const nextLon = onPointerDownLon - deltaX * sensitivity
  const nextLat = onPointerDownLat + deltaY * sensitivity

  velocityLon = (nextLon - targetLon) * 0.6
  velocityLat = (nextLat - targetLat) * 0.6

  targetLon = nextLon
  targetLat = Math.max(-85, Math.min(85, nextLat))
}

function onPointerUp(e?: PointerEvent) {
  isDragging.value = false
  if (e && e.currentTarget) {
    try {
      if ((e.currentTarget as HTMLElement).hasPointerCapture(e.pointerId)) {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId)
      }
    }
    catch {}
  }
}

function onWheel(e: WheelEvent) {
  const zoomSpeed = 0.05
  targetFov = Math.max(minFov, Math.min(maxFov, targetFov + e.deltaY * zoomSpeed))
}

// Mobile Touch Events (Pinch Zoom)
function onTouchStart(e: TouchEvent) {
  const target = e.target as HTMLElement | null
  if (target && (target.closest('button') || target.closest('a') || target.closest('.pointer-events-auto'))) {
    return
  }
  if (e.touches.length === 2) {
    const t1 = e.touches[0]!
    const t2 = e.touches[1]!
    touchStartDistance = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY)
    touchStartFov = targetFov
  }
}

function onTouchMove(e: TouchEvent) {
  if (e.touches.length === 2) {
    const t1 = e.touches[0]!
    const t2 = e.touches[1]!
    const dist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY)
    const factor = touchStartDistance / dist
    targetFov = Math.max(minFov, Math.min(maxFov, touchStartFov * factor))
  }
}

function onTouchEnd() {
  touchStartDistance = 0
}

// ─── Actions & Controls ───
function zoomIn() {
  targetFov = Math.max(minFov, targetFov - 12)
}

function zoomOut() {
  targetFov = Math.min(maxFov, targetFov + 12)
}

function resetView() {
  if (!props.scene) return
  targetLon = props.scene.initialView?.yaw || 0
  targetLat = props.scene.initialView?.pitch || 0
  targetFov = props.scene.initialView?.fov || 75
  velocityLon = 0
  velocityLat = 0
}

function toggleAutoRotate() {
  isAutoRotate.value = !isAutoRotate.value
}

function toggleHotspots() {
  areHotspotsVisible.value = !areHotspotsVisible.value
}

function toggleSceneDrawer() {
  isSceneDrawerOpen.value = !isSceneDrawerOpen.value
}

function toggleFullscreen() {
  tourStore.toggleFullscreen(containerRef.value)
}

// Hotspot Interactions
function handleHotspotClick(hotspot: Hotspot) {
  activeHotspotId.value = hotspot.id

  if (hotspot.type === 'navigation' && hotspot.targetSceneId) {
    handleSceneSelect(hotspot.targetSceneId)
  }
  else if (hotspot.type === 'info') {
    selectedInfoHotspot.value = hotspot
    isInfoPanelOpen.value = true
  }
  else if (hotspot.type === 'artifact') {
    tourStore.handleHotspotClick(hotspot)
    if (tourStore.selectedArtifact) {
      selectedArtifact.value = tourStore.selectedArtifact
      isArtifactModalOpen.value = true
    }
  }
  else if (hotspot.type === 'audio') {
    tourStore.handleHotspotClick(hotspot)
  }
}

function closeInfoPanel() {
  isInfoPanelOpen.value = false
  selectedInfoHotspot.value = null
  activeHotspotId.value = null
}

function closeArtifactModal() {
  isArtifactModalOpen.value = false
  selectedArtifact.value = null
  activeHotspotId.value = null
}

async function handleSceneSelect(sceneId: string) {
  if (sceneId === props.scene?.id || isTransitioning.value) return

  isTransitioning.value = true
  closeInfoPanel()
  closeArtifactModal()
  isSceneDrawerOpen.value = false

  // Transition Delay
  await new Promise(r => setTimeout(r, 400))

  // Reset angles to target scene initial view before emitting
  const nextScene = props.tour?.scenes.find(s => s.id === sceneId)
  if (nextScene) {
    targetLon = nextScene.initialView?.yaw || 0
    targetLat = nextScene.initialView?.pitch || 0
    targetFov = nextScene.initialView?.fov || 75
  }

  // Parent update triggers props.scene watcher which calls loadSceneTexture
  emit('change-scene', sceneId)

  await new Promise(r => setTimeout(r, 300))
  isTransitioning.value = false
}

// ─── Window Resize Handler ───
function onWindowResize() {
  if (!canvasContainerRef.value || !camera || !renderer) return
  const width = canvasContainerRef.value.clientWidth
  const height = canvasContainerRef.value.clientHeight
  if (!width || !height) return

  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
}

// Fullscreen Change Listener
function onFullscreenChange() {
  isFullscreen.value = !!document.fullscreenElement
  setTimeout(onWindowResize, 100)
}

// Keyboard shortcuts
function onKeydown(e: KeyboardEvent) {
  if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return

  if (e.key === 'f' || e.key === 'F') toggleFullscreen()
  if (e.key === 'r' || e.key === 'R') resetView()
  if (e.key === '+' || e.key === '=') zoomIn()
  if (e.key === '-' || e.key === '_') zoomOut()
  if (e.key === 'h' || e.key === 'H') toggleHotspots()
  if (e.key === 'ArrowLeft') {
    targetLon.value += 15
    e.preventDefault()
  }
  if (e.key === 'ArrowRight') {
    targetLon.value -= 15
    e.preventDefault()
  }
  if (e.key === 'ArrowUp') {
    targetLat.value = Math.min(85, targetLat.value + 10)
    e.preventDefault()
  }
  if (e.key === 'ArrowDown') {
    targetLat.value = Math.max(-85, targetLat.value - 10)
    e.preventDefault()
  }
  if (e.key === ' ') {
    e.preventDefault()
    toggleAutoRotate()
  }
}

// ─── Lifecycle ───
onMounted(() => {
  nextTick(() => {
    initThree()
    window.addEventListener('resize', onWindowResize)
    document.addEventListener('fullscreenchange', onFullscreenChange)
    window.addEventListener('keydown', onKeydown)
  })
})

// Watch scene changes from parent prop
watch(
  () => props.scene,
  (newScene) => {
    if (newScene && sphereMesh) {
      loadSceneTexture(newScene)
    }
  },
)

onUnmounted(() => {
  if (animFrameId) {
    cancelAnimationFrame(animFrameId)
    animFrameId = null
  }

  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', onWindowResize)
    document.removeEventListener('fullscreenchange', onFullscreenChange)
    window.removeEventListener('keydown', onKeydown)
  }

  // Dispose Three.js WebGL Resources
  if (sphereMesh) {
    sphereMesh.geometry.dispose()
    if (sphereMesh.material.map) {
      sphereMesh.material.map.dispose()
    }
    sphereMesh.material.dispose()
    threeScene?.remove(sphereMesh)
    sphereMesh = null
  }

  if (renderer) {
    renderer.dispose()
    renderer.domElement.remove()
    renderer = null
  }

  threeScene = null
  camera = null
})
</script>

<style scoped>
.tour-viewer-360 {
  touch-action: none;
  font-family: 'Inter', sans-serif;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-fast-enter-active,
.fade-fast-leave-active {
  transition: opacity 0.25s ease;
}
.fade-fast-enter-from,
.fade-fast-leave-to {
  opacity: 0;
}
</style>
