/**
 * 3D food showcase canvas — ONLY ever loaded via dynamic import (separate chunk).
 * See PRD §11 / PLAN §8.
 */
import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ContactShadows, Environment, Float, Lightformer } from '@react-three/drei'
import * as THREE from 'three'
import { Burger } from './models/Burger.jsx'
import { Latte } from './models/Latte.jsx'
import { Donut } from './models/Donut.jsx'
import { LABEL_ANCHORS, STAGES } from './stages.js'

const MODELS = { burger: Burger, latte: Latte, donut: Donut }
const SPACING = 5
const { damp } = THREE.MathUtils

export default function ShowcaseCanvas({ stage: stageKey, items, active, showLabels, apiRef, visible, labelClassName, ariaLabel }) {
  const stage = STAGES[stageKey] ?? STAGES.luxury
  const wrapper = useRef(null)
  const reduced = useMemo(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches, [])
  const ctl = useRef({ target: 0, dragging: false, lastX: 0, scroll: 0, entered: false })
  const labelEls = useRef([])

  // Imperative API for the template's rotate buttons.
  useEffect(() => {
    if (!apiRef) return
    apiRef.current = { rotate: (dir) => (ctl.current.target += dir * (Math.PI / 4)) }
  }, [apiRef])

  // Scroll progress of the section through the viewport (drives a subtle tilt).
  useEffect(() => {
    const onScroll = () => {
      const el = wrapper.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const p = 1 - (rect.top + rect.height / 2) / (window.innerHeight + rect.height / 2)
      ctl.current.scroll = THREE.MathUtils.clamp(p, 0, 1)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Drag to rotate. touch-action: pan-y keeps vertical page scrolling native on touch devices.
  const onPointerDown = (e) => {
    ctl.current.dragging = true
    ctl.current.lastX = e.clientX
  }
  const onPointerMove = (e) => {
    if (!ctl.current.dragging) return
    const dx = e.clientX - ctl.current.lastX
    ctl.current.lastX = e.clientX
    ctl.current.target += dx * 0.012
  }
  const endDrag = () => (ctl.current.dragging = false)
  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      ctl.current.target -= Math.PI / 4
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      ctl.current.target += Math.PI / 4
    }
  }

  const mobile = typeof window !== 'undefined' && window.innerWidth < 768
  const narrow = typeof window !== 'undefined' && window.innerWidth < 640
  const activeItem = items[active]
  const anchors = (LABEL_ANCHORS[activeItem?.model] ?? []).filter((a) => activeItem?.labels?.[a.key])

  return (
    <div
      ref={wrapper}
      className="absolute inset-0 cursor-grab outline-none active:cursor-grabbing"
      style={{ touchAction: 'pan-y' }}
      role="img"
      aria-label={ariaLabel}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerLeave={endDrag}
    >
      <Canvas
        dpr={[1, mobile ? 1.5 : 2]}
        frameloop={visible ? 'always' : 'never'}
        camera={{ position: [0, 1.4, mobile ? 8.2 : 6.4], fov: 35 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping
          gl.toneMappingExposure = 1.05
        }}
      >
        <ambientLight intensity={stage.ambient} />
        <spotLight position={stage.key.position} intensity={stage.key.intensity} color={stage.key.color} angle={0.6} penumbra={1} decay={1.2} />
        <pointLight position={stage.rim.position} intensity={stage.rim.intensity} color={stage.rim.color} decay={1.4} />
        <pointLight position={stage.fill.position} intensity={stage.fill.intensity} color={stage.fill.color} decay={1.4} />
        <Environment resolution={128} frames={1}>
          {stage.env.map((l, i) => (
            <Lightformer key={i} form="rect" color={l.color} intensity={l.intensity} position={l.position} scale={l.scale} target={[0, 0, 0]} />
          ))}
        </Environment>

        <Rig active={active} />
        {items.map((item, i) => {
          const Model = MODELS[item.model]
          if (!Model) return null
          return (
            <group key={item.dishId + i} position={[i * SPACING, 0, 0]}>
              <Turntable isActive={i === active} ctl={ctl} reduced={reduced} visible={visible} autoRotate={stage.autoRotate}>
                <Float speed={reduced ? 0 : stage.float.speed} rotationIntensity={reduced ? 0 : stage.float.rotationIntensity} floatIntensity={reduced ? 0 : stage.float.floatIntensity} floatingRange={[0, 0.15]}>
                  <Model stage={stage} />
                </Float>
              </Turntable>
              <ContactShadows position={[0, -0.02, 0]} opacity={stage.shadow.opacity} scale={4.5} blur={stage.shadow.blur} far={2.2} color={stage.shadow.color} resolution={256} frames={1} />
            </group>
          )
        })}
        {!narrow && activeItem && <LabelProjector anchors={anchors} offsetX={active * SPACING} els={labelEls} mobile={mobile} />}
      </Canvas>
      {/* Ingredient labels: plain DOM owned by this React tree, positioned each frame by <LabelProjector>.
          (On phones the template shows them as chips under the canvas instead — they'd clip at the edges.) */}
      {!narrow && activeItem && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          {anchors.map((a, i) => (
            <span
              key={`${active}-${a.key}`}
              ref={(el) => (labelEls.current[i] = el)}
              className={labelClassName}
              data-side={a.side > 0 ? 'right' : 'left'}
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                whiteSpace: 'nowrap',
                opacity: showLabels ? 1 : 0,
                visibility: 'hidden',
                transition: `opacity .5s ${i * 0.07}s`,
              }}
            >
              {activeItem.labels[a.key]}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

/** Smoothly glides the camera to the active dish. */
function Rig({ active }) {
  const { camera, size } = useThree()
  const look = useRef(new THREE.Vector3())
  useFrame((_, dt) => {
    const x = active * SPACING
    camera.position.x = damp(camera.position.x, x, 3.2, dt)
    const z = size.width < 640 ? 8.4 : 6.4
    camera.position.z = damp(camera.position.z, z, 3, dt)
    look.current.set(damp(look.current.x, x, 3.2, dt), 0.65, 0)
    camera.lookAt(look.current)
  })
  return null
}

/** Applies drag/keyboard rotation, idle auto-rotate, the scroll tilt and the entrance animation. */
function Turntable({ isActive, ctl, reduced, visible, autoRotate, children }) {
  const ref = useRef()
  const enter = useRef(reduced ? 1 : 0)
  useEffect(() => {
    // When switching dishes, continue from the current angle.
    if (isActive && ref.current) ctl.current.target = ref.current.rotation.y
  }, [isActive, ctl])

  useFrame((_, dt) => {
    const g = ref.current
    if (!g) return
    if (visible) enter.current = damp(enter.current, 1, 1.6, dt)
    const e = enter.current
    if (isActive) {
      if (!ctl.current.dragging && !reduced) ctl.current.target += dt * autoRotate
      g.rotation.y = damp(g.rotation.y, ctl.current.target, 6, dt) + (1 - e) * -Math.PI * 0.9
    } else if (!reduced) {
      g.rotation.y += dt * autoRotate * 0.5
    }
    g.rotation.x = damp(g.rotation.x, (ctl.current.scroll - 0.5) * 0.35, 4, dt)
    g.position.y = (1 - e) * -1.2
    const s = 0.55 + 0.45 * e
    g.scale.setScalar(s)
  })
  return <group ref={ref}>{children}</group>
}

/**
 * Projects fixed label anchors (beside the active model, so they stay readable while it spins)
 * to screen space every frame and moves the DOM labels there. Avoids drei <Html> portals.
 */
function LabelProjector({ anchors, offsetX, els, mobile }) {
  const { camera, size } = useThree()
  const v = useMemo(() => new THREE.Vector3(), [])
  useFrame(() => {
    anchors.forEach((a, i) => {
      const el = els.current[i]
      if (!el) return
      v.set(offsetX + a.side * (mobile ? 1.12 : 1.22), a.y, 0).project(camera)
      const x = ((v.x + 1) / 2) * size.width
      const y = ((1 - v.y) / 2) * size.height
      el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) translate(${a.side > 0 ? '0' : '-100%'}, -50%)`
      el.style.visibility = 'visible'
    })
  })
  return null
}
