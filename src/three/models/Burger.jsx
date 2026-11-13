import { useLayoutEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'

/** Seeded PRNG so geometry is identical on every render. */
const rng = (seed) => () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646

function lathe(points, segments = 64) {
  return new THREE.LatheGeometry(points.map(([x, y]) => new THREE.Vector2(x, y)), segments)
}

/** Procedural burger: lathe buns, noisy patty, drooping cheese, wavy lettuce, tomato, instanced sesame seeds. */
export function Burger({ stage }) {
  const seeds = useRef()
  const geo = useMemo(() => {
    const rand = rng(7)
    const bottomBun = lathe([[0, 0], [0.86, 0], [0.98, 0.06], [1.03, 0.18], [1.0, 0.28], [0.9, 0.32], [0, 0.32]])
    const topBun = lathe([[0, 0], [0.98, 0], [1.05, 0.06], [1.06, 0.18], [1.0, 0.34], [0.86, 0.52], [0.62, 0.7], [0.34, 0.8], [0, 0.83]])

    const patty = new THREE.CylinderGeometry(1.06, 1.08, 0.28, 64, 4)
    const p = patty.attributes.position
    for (let i = 0; i < p.count; i++) {
      const n = (rand() - 0.5) * 0.035
      p.setXYZ(i, p.getX(i) * (1 + n), p.getY(i) + n, p.getZ(i) * (1 + n))
    }
    patty.computeVertexNormals()

    const cheese = new THREE.PlaneGeometry(2.0, 2.0, 24, 24)
    cheese.rotateX(-Math.PI / 2)
    cheese.rotateY(Math.PI / 4)
    const c = cheese.attributes.position
    for (let i = 0; i < c.count; i++) {
      const r = Math.hypot(c.getX(i), c.getZ(i))
      c.setY(i, -Math.pow(Math.max(0, r - 0.85), 2) * 1.1)
    }
    cheese.computeVertexNormals()

    const lettuce = new THREE.CircleGeometry(1.2, 96, 0, Math.PI * 2)
    lettuce.rotateX(-Math.PI / 2)
    const l = lettuce.attributes.position
    for (let i = 0; i < l.count; i++) {
      const x = l.getX(i), z = l.getZ(i)
      const r = Math.hypot(x, z)
      const a = Math.atan2(z, x)
      const edge = Math.max(0, r - 0.8)
      l.setY(i, Math.sin(a * 14) * 0.06 * (edge / 0.4) - edge * 0.25)
    }
    lettuce.computeVertexNormals()

    const tomato = new THREE.CylinderGeometry(0.52, 0.52, 0.1, 40)
    const seed = new THREE.SphereGeometry(1, 8, 6)
    return { bottomBun, topBun, patty, cheese, lettuce, tomato, seed }
  }, [])

  // Sesame seeds distributed on the top-bun dome, oriented along the surface normal.
  useLayoutEffect(() => {
    const rand = rng(42)
    const m = new THREE.Object3D()
    const up = new THREE.Vector3(0, 1, 0)
    for (let i = 0; i < seeds.current.count; i++) {
      const theta = rand() * Math.PI * 2
      const phi = Math.acos(1 - rand() * 0.72) // cap of the dome
      const x = Math.sin(phi) * Math.cos(theta) * 0.98
      const z = Math.sin(phi) * Math.sin(theta) * 0.98
      const y = Math.cos(phi) * 0.8
      const normal = new THREE.Vector3(x / 0.98, y / 0.8, z / 0.98).normalize()
      m.position.set(x, y + 0.012, z)
      m.quaternion.setFromUnitVectors(up, normal)
      m.rotateY(rand() * Math.PI)
      m.scale.set(0.032, 0.014, 0.056)
      m.updateMatrix()
      seeds.current.setMatrixAt(i, m.matrix)
    }
    seeds.current.instanceMatrix.needsUpdate = true
  }, [])

  return (
    <group position={[0, 0, 0]}>
      <mesh geometry={geo.bottomBun} castShadow>
        <meshPhysicalMaterial color={stage.bun} roughness={0.6} clearcoat={0.2} />
      </mesh>
      <mesh geometry={geo.patty} position={[0, 0.47, 0]}>
        <meshStandardMaterial color="#4a2a17" roughness={0.92} />
      </mesh>
      <mesh geometry={geo.cheese} position={[0, 0.63, 0]}>
        <meshPhysicalMaterial color="#f4b533" roughness={0.35} clearcoat={0.6} side={THREE.DoubleSide} />
      </mesh>
      <mesh geometry={geo.lettuce} position={[0, 0.7, 0]}>
        <meshStandardMaterial color="#66b33a" roughness={0.6} side={THREE.DoubleSide} />
      </mesh>
      <mesh geometry={geo.tomato} position={[0.32, 0.79, 0.18]}>
        <meshPhysicalMaterial color="#d23a2a" roughness={0.3} clearcoat={0.8} />
      </mesh>
      <mesh geometry={geo.tomato} position={[-0.38, 0.8, -0.2]}>
        <meshPhysicalMaterial color="#d23a2a" roughness={0.3} clearcoat={0.8} />
      </mesh>
      <group position={[0, 0.86, 0]}>
        <mesh geometry={geo.topBun}>
          <meshPhysicalMaterial color={stage.bun} roughness={0.5} clearcoat={0.45} clearcoatRoughness={0.4} sheen={0.3} sheenColor="#ffd9a0" />
        </mesh>
        <instancedMesh ref={seeds} args={[geo.seed, undefined, 70]}>
          <meshStandardMaterial color="#f6e7c4" roughness={0.6} />
        </instancedMesh>
      </group>
    </group>
  )
}
