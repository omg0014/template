import { useMemo } from 'react'
import * as THREE from 'three'

/** Paints a rosetta/heart latte-art texture on a canvas (no image download). */
function latteArtTexture() {
  const size = 512
  const cv = document.createElement('canvas')
  cv.width = cv.height = size
  const ctx = cv.getContext('2d')
  const g = ctx.createRadialGradient(size / 2, size / 2, 20, size / 2, size / 2, size / 2)
  g.addColorStop(0, '#c48a52')
  g.addColorStop(0.7, '#9a5f30')
  g.addColorStop(1, '#5e3418')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
  // Rosetta leaves
  ctx.fillStyle = '#f7ecdc'
  ctx.globalAlpha = 0.95
  for (let i = 0; i < 7; i++) {
    const y = 140 + i * 36
    const w = 150 - i * 15
    ctx.beginPath()
    ctx.ellipse(size / 2, y, w, 15, 0, Math.PI, 0)
    ctx.ellipse(size / 2, y + 6, w * 0.92, 10, 0, 0, Math.PI, true)
    ctx.fill()
  }
  // Heart on top
  ctx.beginPath()
  const hx = size / 2, hy = 120
  ctx.moveTo(hx, hy + 30)
  ctx.bezierCurveTo(hx - 60, hy - 10, hx - 30, hy - 55, hx, hy - 25)
  ctx.bezierCurveTo(hx + 30, hy - 55, hx + 60, hy - 10, hx, hy + 30)
  ctx.fill()
  // Pull-through line
  ctx.globalAlpha = 0.9
  ctx.fillRect(size / 2 - 3, 110, 6, 300)
  const tex = new THREE.CanvasTexture(cv)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 4
  return tex
}

/** Procedural latte: lathe cup + saucer, torus handle, painted foam, a few coffee beans. */
export function Latte({ stage }) {
  const geo = useMemo(() => {
    const v = (pts) => pts.map(([x, y]) => new THREE.Vector2(x, y))
    const saucer = new THREE.LatheGeometry(v([[0, 0], [1.1, 0], [1.32, 0.06], [1.42, 0.13], [1.38, 0.15], [1.2, 0.1], [0.55, 0.07], [0, 0.08]]), 72)
    const cup = new THREE.LatheGeometry(
      v([[0, 0.08], [0.42, 0.08], [0.5, 0.12], [0.62, 0.36], [0.74, 0.7], [0.8, 1.0], [0.82, 1.04], [0.77, 1.04], [0.74, 0.98], [0.68, 0.72], [0.56, 0.38], [0.44, 0.2], [0, 0.18]]),
      72,
    )
    const rim = new THREE.TorusGeometry(0.795, 0.022, 12, 96)
    rim.rotateX(Math.PI / 2)
    const handle = new THREE.TorusGeometry(0.24, 0.055, 16, 40, Math.PI * 1.25)
    const foam = new THREE.CircleGeometry(0.75, 64)
    foam.rotateX(-Math.PI / 2)
    const bean = new THREE.SphereGeometry(1, 16, 12)
    return { saucer, cup, rim, handle, foam, bean, art: latteArtTexture() }
  }, [])

  return (
    <group>
      <mesh geometry={geo.saucer}>
        <meshPhysicalMaterial color={stage.cup.body} roughness={stage.cup.roughness} clearcoat={1} clearcoatRoughness={0.15} />
      </mesh>
      <group position={[0, 0.07, 0]}>
        <mesh geometry={geo.cup}>
          <meshPhysicalMaterial color={stage.cup.body} roughness={stage.cup.roughness} clearcoat={1} clearcoatRoughness={0.1} side={THREE.DoubleSide} />
        </mesh>
        <mesh geometry={geo.rim} position={[0, 1.035, 0]}>
          <meshStandardMaterial color={stage.cup.rim} metalness={0.9} roughness={0.25} />
        </mesh>
        <mesh geometry={geo.handle} position={[0.82, 0.6, 0]} rotation={[0, 0, -Math.PI * 0.62]}>
          <meshPhysicalMaterial color={stage.cup.body} roughness={stage.cup.roughness} clearcoat={1} />
        </mesh>
        <mesh geometry={geo.foam} position={[0, 0.95, 0]} rotation={[0, Math.PI / 2, 0]}>
          <meshStandardMaterial map={geo.art} roughness={0.75} />
        </mesh>
      </group>
      {[
        [1.05, 0.16, 0.35, 0.4],
        [0.95, 0.16, 0.62, -0.6],
        [-0.9, 0.16, 0.7, 1.2],
      ].map(([x, y, z, r], i) => (
        <mesh key={i} geometry={geo.bean} position={[x, y, z]} rotation={[0, r, 0]} scale={[0.09, 0.05, 0.13]}>
          <meshStandardMaterial color="#3a1f10" roughness={0.45} />
        </mesh>
      ))}
    </group>
  )
}
