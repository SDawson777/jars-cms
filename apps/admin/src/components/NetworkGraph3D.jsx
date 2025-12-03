import React, {useRef} from 'react'
import ForceGraph3D from 'react-force-graph-3d'

/**
 * A 3D force-directed network graph built with react-force-graph-3d.
 * Pass `graphData` with nodes and links. Nodes can have name/group attributes.
 */
export default function NetworkGraph3D({graphData}) {
  const fgRef = useRef(null)
  return (
    <div style={{width: '100%', height: 400}}>
      <ForceGraph3D
        ref={fgRef}
        graphData={graphData}
        nodeAutoColorBy="group"
        nodeLabel={(node) => node.name || `Node ${node.id}`}
        linkDirectionalParticles={2}
        linkDirectionalParticleSpeed={(d) => 0.002 + Math.random() * 0.004}
      />
    </div>
  )
}
