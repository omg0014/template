import { useLayoutEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'

const rng = (seed) => () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646
const R = 0.78 // ring radius
const r = 0.38 // tube radius

/** Procedural glazed donut: torus dough, drippy glaze shell, instanced sprinkles. */
export function Donut({ stage }) {
  const sprinkles = useRef()
  const geo = useMemo(() => {
    const dough = new THREE.TorusGeometry(R, r, 40, 96)
    const icing = new THREE.TorusGeometry(R, r * 1.05, 40, 96)
    // Pull the lower part of the glaze inside the dough with a wavy "drip" edge.
    const pos = icing.attributes.position
    const v = new THREE.Vector3()
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i)
      const u = Math.atan2(v.y, v.x)
      const cx = Math.cos(u) * R, cy = Math.sin(u) * R
      const threshold = -0.06 + Math.sin(u * 9) * 0.07 + Math.sin(u * 23) * 0.03
      if (v.z < threshold) {
        v.set(cx + (v.x - cx) * 0.9, cy + (v.y - cy) * 0.9, v.z * 0.9)
        pos.setXYZ(i, v.x, v.y, v.z)
      }
    }
    icing.computeVertexNormals()
    const sprinkle = new THREE.CapsuleGeometry(0.018, 0.075, 4, 8)
    return { dough, icing, sprinkle }
  }, [])

  useLayoutEffect(() => {
    const rand = rng(11)
    const m = new THREE.Object3D()
    const color = new THREE.Color()
    const up = new THREE.Vector3(0, 1, 0)
    const n = new THREE.Vector3()
    for (let i = 0; i < sprinkles.current.count; i++) {
      // Torus param: point = ((R + t·cos v)·cos u, (R + t·cos v)·sin u, t·sin v); local +z is "up" after the group rotation.
      const u = rand() * Math.PI * 2
      const vAng = Math.PI / 2 + (rand() - 0.5) * Math.PI * 0.8
      const tube = r * 1.07
      const cv = Math.cos(vAng)
      const sv = Math.sin(vAng)
      const px = (R + tube * cv) * Math.cos(u)
      const py = (R + tube * cv) * Math.sin(u)
      const pz = tube * sv
      n.set(cv * Math.cos(u), cv * Math.sin(u), sv).normalize()
      m.position.set(px, py, pz)
      m.quaternion.setFromUnitVectors(up, n)
      m.rotateY(rand() * Math.PI)
      m.rotateZ(Math.PI / 2)
      m.updateMatrix()
      sprinkles.current.setMatrixAt(i, m.matrix)
      sprinkles.current.setColorAt(i, color.set(stage.donut.sprinkles[i % stage.donut.sprinkles.length]))
    }
    sprinkles.current.instanceMatrix.needsUpdate = true
    if (sprinkles.current.instanceColor) sprinkles.current.instanceColor.needsUpdate = true
  }, [stage])

  return (
    <group position={[0, 0.4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <mesh geometry={geo.dough}>
        <meshPhysicalMaterial color="#d99650" roughness={0.75} sheen={0.4} sheenColor="#ffd9a0" />
      </mesh>
      <mesh geometry={geo.icing}>
        <meshPhysicalMaterial color={stage.donut.icing} roughness={0.22} clearcoat={1} clearcoatRoughness={0.08} />
      </mesh>
      <instancedMesh ref={sprinkles} args={[geo.sprinkle, undefined, 160]}>
        <meshStandardMaterial roughness={0.4} />
      </instancedMesh>
    </group>
  )
}
