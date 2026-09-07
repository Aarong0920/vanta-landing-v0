'use client'

import { useRef, useState, useMemo } from 'react'
import { Canvas, useFrame, useThree, type ThreeElements } from '@react-three/fiber'
import {
  RoundedBox,
  MeshTransmissionMaterial,
  Environment,
  Lightformer,
  Float,
} from '@react-three/drei'
import * as THREE from 'three'

/**
 * Global multiplier on how far modules travel when the core opens/reconfigures.
 * Trims the maximum expansion radius (~17%) so the object stays elegant and
 * compact even at full open — independent of the overall object scale.
 */
const EXPAND = 0.83

/** Shared motion state driven once per frame and read by every module. */
type Motion = {
  open: number // 0 compact -> 1 fully expanded
  reconfig: number // 0 default arrangement -> 1 alternate arrangement
  hover: number // pointer-driven boost
}

type ModuleSpec = {
  size: [number, number, number]
  base: [number, number, number]
  /** direction the module travels when the core "opens" */
  explode: [number, number, number]
  /** extra positional delta applied during the RECONFIGURE state */
  shift?: [number, number, number]
  /** extra rotation applied during the RECONFIGURE state */
  spin?: [number, number, number]
  rotation?: [number, number, number]
}

/**
 * A denser, engineered lattice of interlocking glass modules. The silhouette
 * reads as ONE intelligent system at rest; the shared choreography expands it
 * to expose the internal architecture, reconfigures a few modules into a new
 * arrangement, then reforms. Layout is deliberately structured, never random.
 */
const MODULES: ModuleSpec[] = [
  // central shell
  { size: [1.55, 1.55, 1.55], base: [0, 0, 0], explode: [0, 0, 0], spin: [0, 0.5, 0] },

  // primary corner modules — mirrored pairs for balance
  { size: [1.02, 1.02, 1.02], base: [-1.08, 0.66, 0.34], explode: [-0.36, 0.22, 0.14], shift: [0.18, -0.1, 0.2], spin: [0.2, 0.3, 0] },
  { size: [1.02, 1.02, 1.02], base: [1.08, -0.66, -0.34], explode: [0.36, -0.22, -0.14], shift: [-0.18, 0.1, -0.2], spin: [-0.2, -0.3, 0] },
  { size: [0.9, 1.34, 0.9], base: [1.12, 0.5, 0.2], explode: [0.4, 0.18, 0.1], shift: [-0.06, 0.28, 0.14], spin: [0, 0.2, 0.2] },
  { size: [0.9, 1.34, 0.9], base: [-1.12, -0.5, -0.2], explode: [-0.4, -0.18, -0.1], shift: [0.06, -0.28, -0.14], spin: [0, -0.2, -0.2] },

  // stacked top/bottom panels
  { size: [1.3, 0.66, 0.95], base: [0.24, 1.18, -0.5], explode: [0.1, 0.46, -0.16], shift: [0.3, -0.06, 0.16], spin: [0.15, 0, 0.1] },
  { size: [1.15, 0.6, 0.85], base: [-0.24, -1.2, 0.5], explode: [-0.1, -0.48, 0.16], shift: [-0.3, 0.06, -0.16], spin: [-0.15, 0, -0.1] },

  // depth panels front/back
  { size: [0.72, 0.92, 1.28], base: [-0.58, 0.1, 1.02], explode: [-0.2, 0.05, 0.5], shift: [0.24, 0.12, -0.1], spin: [0.1, 0.15, 0] },
  { size: [0.72, 0.92, 1.28], base: [0.58, -0.1, -1.02], explode: [0.2, -0.05, -0.5], shift: [-0.24, -0.12, 0.1], spin: [-0.1, -0.15, 0] },

  // thin connector panels — add structural density
  { size: [1.7, 0.32, 0.32], base: [0.1, 0.05, 0.02], explode: [0.28, 0.02, 0.0], spin: [0, 0, 0.4] },
  { size: [0.32, 1.7, 0.32], base: [-0.05, 0.1, -0.04], explode: [0.0, 0.28, 0.0], spin: [0.4, 0, 0] },

  // added mid modules for richer density
  { size: [0.78, 0.78, 0.78], base: [0.72, 0.42, 0.92], explode: [0.34, 0.2, 0.44], shift: [-0.2, 0.24, -0.1], spin: [0.2, 0.2, 0.1] },
  { size: [0.7, 0.7, 0.7], base: [-0.7, -0.4, -0.92], explode: [-0.34, -0.2, -0.44], shift: [0.2, -0.24, 0.1], spin: [-0.2, -0.2, -0.1] },

  // small accent cubes — outer detail, travel farthest so the change reads
  { size: [0.56, 0.56, 0.56], base: [1.2, 1.02, 0.62], explode: [0.66, 0.56, 0.34], rotation: [0.4, 0.3, 0], shift: [-0.3, 0.2, 0.2], spin: [0.4, 0.4, 0.2] },
  { size: [0.5, 0.5, 0.5], base: [-1.18, 0.98, -0.6], explode: [-0.68, 0.58, -0.36], rotation: [0.2, 0.5, 0.1], shift: [0.3, -0.18, -0.24], spin: [0.3, 0.5, 0.2] },
  { size: [0.48, 0.48, 0.48], base: [-1.0, -1.02, 0.7], explode: [-0.6, -0.62, 0.42], rotation: [0.3, 0.2, 0.4], shift: [0.24, 0.28, -0.2], spin: [0.4, 0.3, 0.3] },
]

/** Solid glossy steel accents — cheap, add contrast and engineered density. */
const DETAILS: ModuleSpec[] = [
  { size: [0.34, 0.34, 0.34], base: [1.42, -1.02, 0.3], explode: [0.7, -0.5, 0.16], rotation: [0.3, 0.4, 0.1], shift: [-0.24, 0.3, 0.2], spin: [0.5, 0.4, 0.2] },
  { size: [0.3, 0.3, 0.3], base: [-1.4, -0.35, 0.85], explode: [-0.7, -0.16, 0.42], rotation: [0.2, 0.3, 0.4], shift: [0.28, 0.2, -0.24], spin: [0.4, 0.5, 0.3] },
  { size: [0.28, 0.28, 0.28], base: [0.9, 1.35, 0.35], explode: [0.42, 0.66, 0.16], rotation: [0.5, 0.2, 0.2], shift: [-0.3, -0.1, 0.28], spin: [0.5, 0.3, 0.4] },
  { size: [0.26, 0.26, 0.62], base: [-0.85, 1.28, -0.45], explode: [-0.4, 0.62, -0.22], rotation: [0.1, 0.4, 0.3], shift: [0.3, -0.24, 0.2], spin: [0.3, 0.5, 0.2] },
  { size: [0.4, 0.24, 0.24], base: [1.32, 0.15, -0.85], explode: [0.62, 0.06, -0.42], rotation: [0.2, 0.2, 0.1], shift: [-0.2, 0.3, 0.24], spin: [0.4, 0.3, 0.3] },
  { size: [0.24, 0.24, 0.24], base: [-1.32, 0.7, 0.55], explode: [-0.6, 0.36, 0.3], rotation: [0.3, 0.3, 0.2], shift: [0.26, -0.2, -0.2], spin: [0.5, 0.4, 0.3] },
]

/** Interior node positions revealed when the core opens. */
const NODES: [number, number, number][] = [
  [0.55, 0.35, 0.3],
  [-0.55, -0.35, -0.3],
  [0.4, -0.5, -0.35],
  [-0.4, 0.5, 0.35],
  [0.0, 0.6, -0.2],
  [0.0, -0.6, 0.2],
]

function GlassModule({
  spec,
  motion,
  index,
}: {
  spec: ModuleSpec
  motion: React.RefObject<Motion>
  index: number
}) {
  const ref = useRef<THREE.Group>(null)
  const target = useMemo(() => new THREE.Vector3(), [])
  const phase = useMemo(() => index * 1.7, [index])
  const baseRot = useMemo(
    () => spec.rotation ?? ([0, 0, 0] as [number, number, number]),
    [spec.rotation],
  )
  const shift = spec.shift ?? [0, 0, 0]
  const spin = spec.spin ?? [0, 0, 0]

  useFrame((state, delta) => {
    if (!ref.current || !motion.current) return
    const t = state.clock.elapsedTime
    const open = Math.min(1.15, motion.current.open + motion.current.hover)
    const rc = motion.current.reconfig

    // very subtle continuous breathing so the system never feels frozen
    const breathe = Math.sin(t * 0.5 + phase) * 0.04

    target.set(
      spec.base[0] + spec.explode[0] * (open + breathe) * EXPAND + shift[0] * rc,
      spec.base[1] + spec.explode[1] * (open + breathe) * EXPAND + shift[1] * rc,
      spec.base[2] + spec.explode[2] * (open + breathe) * EXPAND + shift[2] * rc,
    )
    // frame-rate independent smoothing toward the choreographed target
    const k = 1 - Math.pow(0.0009, delta)
    ref.current.position.lerp(target, k)

    ref.current.rotation.x = baseRot[0] + spin[0] * rc + Math.sin(t * 0.3 + phase) * 0.03
    ref.current.rotation.y = baseRot[1] + spin[1] * rc + Math.cos(t * 0.26 + phase) * 0.03
    ref.current.rotation.z = baseRot[2] + spin[2] * rc
  })

  return (
    <group ref={ref} position={spec.base} rotation={baseRot}>
      <RoundedBox args={spec.size} radius={0.09} smoothness={5} bevelSegments={4}>
        <MeshTransmissionMaterial
          transmission={1}
          thickness={0.4}
          roughness={0.045}
          ior={1.42}
          chromaticAberration={0.07}
          anisotropy={0.2}
          distortion={0.12}
          distortionScale={0.32}
          temporalDistortion={0.04}
          samples={4}
          resolution={128}
          color={'#b9c8e2'}
          attenuationColor={'#6d88b6'}
          attenuationDistance={6}
          clearcoat={1}
          clearcoatRoughness={0.045}
        />
      </RoundedBox>
      {/* crisp edge lines to emphasise engineered bevels */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(...spec.size)]} />
        <lineBasicMaterial color={'#8ea3c4'} transparent opacity={0.22} />
      </lineSegments>
    </group>
  )
}

/**
 * Cheap glossy steel detail piece (no transmission buffer pass) — adds
 * density and material contrast to the cluster without extra GPU cost.
 */
function SteelDetail({
  spec,
  motion,
  index,
}: {
  spec: ModuleSpec
  motion: React.RefObject<Motion>
  index: number
}) {
  const ref = useRef<THREE.Group>(null)
  const target = useMemo(() => new THREE.Vector3(), [])
  const phase = useMemo(() => index * 2.3 + 0.6, [index])
  const baseRot = useMemo(
    () => spec.rotation ?? ([0, 0, 0] as [number, number, number]),
    [spec.rotation],
  )
  const shift = spec.shift ?? [0, 0, 0]
  const spin = spec.spin ?? [0, 0, 0]

  useFrame((state, delta) => {
    if (!ref.current || !motion.current) return
    const t = state.clock.elapsedTime
    const open = Math.min(1.2, motion.current.open + motion.current.hover)
    const rc = motion.current.reconfig
    const breathe = Math.sin(t * 0.55 + phase) * 0.05
    target.set(
      spec.base[0] + spec.explode[0] * (open + breathe) * EXPAND + shift[0] * rc,
      spec.base[1] + spec.explode[1] * (open + breathe) * EXPAND + shift[1] * rc,
      spec.base[2] + spec.explode[2] * (open + breathe) * EXPAND + shift[2] * rc,
    )
    const k = 1 - Math.pow(0.0009, delta)
    ref.current.position.lerp(target, k)
    ref.current.rotation.x = baseRot[0] + spin[0] * rc + Math.sin(t * 0.4 + phase) * 0.06
    ref.current.rotation.y = baseRot[1] + spin[1] * rc + Math.cos(t * 0.34 + phase) * 0.06
  })

  return (
    <group ref={ref} position={spec.base} rotation={baseRot}>
      <RoundedBox args={spec.size} radius={0.06} smoothness={4} bevelSegments={3}>
        <meshStandardMaterial
          color={'#8ba0c0'}
          metalness={0.92}
          roughness={0.28}
          envMapIntensity={1.3}
        />
      </RoundedBox>
    </group>
  )
}

/** Interior nodes + faint connective lines, revealed as the core opens. */
function ConnectionNodes({ motion }: { motion: React.RefObject<Motion> }) {
  const group = useRef<THREE.Group>(null)
  const lineMat = useRef<THREE.LineBasicMaterial>(null)
  const nodeRefs = useRef<THREE.Mesh[]>([])

  const lineGeom = useMemo(() => {
    const pts: number[] = []
    NODES.forEach((n) => {
      pts.push(0, 0, 0, n[0], n[1], n[2])
    })
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3))
    return g
  }, [])

  useFrame((state) => {
    if (!motion.current) return
    const open = motion.current.open + motion.current.hover
    const pulse = 0.5 + Math.sin(state.clock.elapsedTime * 1.6) * 0.2
    if (lineMat.current) lineMat.current.opacity = Math.min(1, open) * 0.5 * pulse
    nodeRefs.current.forEach((m, i) => {
      if (!m) return
      const s = Math.min(1, open) * (0.55 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.25)
      m.scale.setScalar(Math.max(0.001, s))
    })
    if (group.current) group.current.rotation.y += 0.002
  })

  return (
    <group ref={group}>
      <lineSegments geometry={lineGeom}>
        <lineBasicMaterial
          ref={lineMat}
          color={'#ffcf82'}
          transparent
          opacity={0}
          toneMapped={false}
        />
      </lineSegments>
      {NODES.map((n, i) => (
        <mesh
          key={i}
          position={n}
          ref={(el) => {
            if (el) nodeRefs.current[i] = el
          }}
          scale={0.001}
        >
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshBasicMaterial color={'#ffd84f'} toneMapped={false} />
        </mesh>
      ))}
    </group>
  )
}

function GoldCore({ motion }: { motion: React.RefObject<Motion> }) {
  const light = useRef<THREE.PointLight>(null)
  const mesh = useRef<THREE.Mesh>(null)
  const mat = useRef<THREE.MeshStandardMaterial>(null)

  useFrame((state) => {
    if (!motion.current) return
    const open = Math.min(1.2, motion.current.open + motion.current.hover)
    const pulse = 0.6 + Math.sin(state.clock.elapsedTime * 1.1) * 0.12
    if (light.current) light.current.intensity = (3 + open * 4) * pulse
    if (mat.current) mat.current.emissiveIntensity = 2 + open * 2.2
    if (mesh.current) {
      mesh.current.rotation.y += 0.004
      mesh.current.rotation.x += 0.0015
      const s = 0.78 + open * 0.22
      mesh.current.scale.setScalar(
        THREE.MathUtils.lerp(mesh.current.scale.x, s, 0.1),
      )
    }
  })

  return (
    <group>
      <mesh ref={mesh}>
        <octahedronGeometry args={[0.62, 0]} />
        <meshStandardMaterial
          ref={mat}
          color={'#3a2c12'}
          emissive={'#ffb347'}
          emissiveIntensity={2.2}
          roughness={0.25}
          metalness={0.6}
          toneMapped={false}
        />
      </mesh>
      <pointLight ref={light} color={'#ffbf5e'} intensity={3.4} distance={7} decay={2} />
    </group>
  )
}

function smoothstep(a: number, b: number, x: number) {
  const t = THREE.MathUtils.clamp((x - a) / (b - a), 0, 1)
  return t * t * (3 - 2 * t)
}

function CoreRig(props: ThreeElements['group']) {
  const group = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const motion = useRef<Motion>({ open: 0, reconfig: 0, hover: 0 })

  // Responsive base scale: ~20% smaller than before on desktop so the object
  // is the centerpiece without overwhelming the headline, and progressively
  // smaller on tablet/mobile so it never creates a dead zone or dominates.
  const width = useThree((s) => s.size.width)
  const scale = width < 480 ? 0.66 : width < 768 ? 0.74 : width < 1024 ? 0.82 : 0.9

  useFrame((state, delta) => {
    // --- shared choreography: COMPACT -> OPEN -> RECONFIGURE -> RETURN ---
    const cycle = 16
    const t = (state.clock.elapsedTime % cycle) / cycle // 0..1

    // OPEN ramps up, holds through reconfigure, then ramps back down on RETURN
    const open = smoothstep(0.1, 0.32, t) - smoothstep(0.66, 0.88, t)
    // RECONFIGURE happens while open: shift modules to an alternate layout
    const reconfig = smoothstep(0.4, 0.52, t) - smoothstep(0.58, 0.72, t)

    motion.current.open = open
    motion.current.reconfig = reconfig
    // smooth the hover boost
    motion.current.hover = THREE.MathUtils.damp(
      motion.current.hover,
      hovered ? 0.35 : 0,
      6,
      delta,
    )

    if (!group.current) return
    // structured auto-rotation
    group.current.rotation.y += delta * 0.2
    // pointer parallax — responsive but damped and calm
    const targetX = -0.18 + state.pointer.y * 0.32
    const targetZ = state.pointer.x * 0.26
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetX, 0.07)
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, targetZ, 0.07)
  })

  return (
    <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.6} floatingRange={[-0.09, 0.09]}>
      <group
        ref={group}
        {...props}
        scale={scale}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {MODULES.map((spec, i) => (
          <GlassModule key={i} spec={spec} motion={motion} index={i} />
        ))}
        {DETAILS.map((spec, i) => (
          <SteelDetail key={`d-${i}`} spec={spec} motion={motion} index={i} />
        ))}
        <ConnectionNodes motion={motion} />
        <GoldCore motion={motion} />
      </group>
    </Float>
  )
}

/** Self-contained studio environment (no external HDRI) for glass reflections. */
function StudioEnv() {
  return (
    <Environment resolution={512} frames={1}>
      <color attach="background" args={['#0a0f18']} />
      <Lightformer intensity={5} position={[0, 3, 2]} scale={[8, 4, 1]} color="#cdd9ef" />
      <Lightformer intensity={3} position={[-4, 1, 1]} scale={[3, 5, 1]} color="#7f9ac6" />
      <Lightformer intensity={2.2} position={[4, -1, 2]} scale={[3, 5, 1]} color="#465f86" />
      <Lightformer intensity={4.5} position={[0, -0.2, 1.4]} scale={[1.4, 1.4, 1]} color="#ffcf82" />
      <Lightformer
        form="ring"
        intensity={2}
        position={[0, 0, -3]}
        scale={[6, 6, 1]}
        color="#9fb4d6"
      />
    </Environment>
  )
}

export default function DataCoreScene({ reduced = false }: { reduced?: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.6], fov: 42 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      frameloop={reduced ? 'demand' : 'always'}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.25} />
      <directionalLight position={[5, 6, 4]} intensity={1.1} color="#cdd8ec" />
      <directionalLight position={[-5, -3, -2]} intensity={0.4} color="#33507d" />

      <CoreRig />

      <StudioEnv />
    </Canvas>
  )
}
