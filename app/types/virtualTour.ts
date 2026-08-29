// =========================================================
// TYPES — 360° VIRTUAL HERITAGE TOUR & DIGITAL MUSEUM
// =========================================================

import type { HeritageAudio } from './index'

export type HotspotType = 'navigation' | 'info' | 'audio' | 'artifact'

export interface HotspotInfoContent {
  title: string
  subtitle?: string
  content: string
  image?: string
  historicalContext?: string
  source?: string
}

export interface Hotspot {
  id: string
  type: HotspotType
  yaw: number // Horizontal angle in degrees (-180 to 180)
  pitch: number // Vertical angle in degrees (-90 to 90)
  title: string
  description?: string
  icon?: string
  // For 'navigation' type
  targetSceneId?: string
  // For 'artifact' type
  artifactId?: string
  // For 'audio' type
  audioId?: string
  audioTrack?: HeritageAudio
  // For 'info' type
  infoContent?: HotspotInfoContent
  // Extra arbitrary metadata
  metadata?: Record<string, any>
}

export interface SceneViewConfig {
  yaw: number // Initial horizontal look angle (degrees)
  pitch: number // Initial vertical look angle (degrees)
  fov?: number // Field of view in degrees (default ~75, range 30-100)
  minFov?: number
  maxFov?: number
}

export interface TourScene {
  id: string
  title: string
  subtitle?: string
  description?: string
  panoramaUrl: string
  thumbnailUrl?: string
  initialView: SceneViewConfig
  audioId?: string
  audioTrack?: HeritageAudio
  hotspots: Hotspot[]
}

export interface ArtifactSpec {
  label: string
  value: string
}

export interface Artifact {
  id: string
  name: string
  subtitle?: string
  category?: string
  description: string
  image: string
  gallery?: string[]
  period: string
  material: string
  dimensions: string
  usage: string
  origin?: string
  preservationPlace?: string
  historicalSignificance: string
  specifications?: ArtifactSpec[]
  model3dUrl?: string // Future ready for 3D GLTF/GLB models
}

export interface VirtualHeritageTour {
  id: string
  heritageId: string
  heritageSlug: string
  title: string
  subtitle: string
  description: string
  coverImage: string
  initialSceneId: string
  scenes: TourScene[]
  artifacts?: Artifact[]
  mapCoordinates?: {
    lat: number
    lng: number
  }
}

export interface ProjectedHotspot extends Hotspot {
  screenX: number
  screenY: number
  isVisible: boolean
  scale: number
  distance: number
}
