import React from 'react'
import {Canvas} from '@react-three/fiber'
import {OrbitControls, Box, PerspectiveCamera} from '@react-three/drei'

/**
 * A reusable 3D bar chart built with Three.js and React Three Fiber.
 * Each bar is extruded into the third dimension and coloured via an HSL gradient.
 * Accepts an array of objects with `label` and `value` fields.
 */
export default function ThreeBarChart({data = []}) {
  return (
    <div style={{width: '100%', height: 360}}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[5, 7, 10]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} />
        {data.map((d, idx) => {
          const height = Math.max(0.1, Number.isFinite(d.value) ? d.value : 0)
          const xPos = idx * 1.5
          const colour = `hsl(${(idx * 50) % 360},70%,55%)`
          return (
            <Box key={d.label} args={[1, height, 1]} position={[xPos, height / 2, 0]}>
              <meshStandardMaterial attach="material" color={colour} />
            </Box>
          )
        })}
        <OrbitControls enableZoom enablePan enableRotate />
      </Canvas>
    </div>
  )
}
