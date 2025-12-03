import React from 'react'

/**
 * A generic time slider component.
 * Pass `min`, `max`, `value`, and `onChange` to control state externally.
 */
export default function TimeSlider({min = 0, max = 10, value = 0, onChange}) {
  return (
    <div style={{width: '100%', margin: '8px 0', display: 'flex', alignItems: 'center', gap: 8}}>
      <input
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(e) => onChange && onChange(Number(e.target.value))}
        style={{flexGrow: 1}}
      />
      <span style={{minWidth: 32}}>{value}</span>
    </div>
  )
}
