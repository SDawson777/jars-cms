import React, {useEffect, useState} from 'react'
import {apiJson} from '../lib/api'
import './welcome-bar.css'

export default function WelcomeBar() {
  const [data, setData] = useState(null)

  useEffect(() => {
    let mounted = true
    apiJson('/api/admin/banner')
      .then(({ok, data}) => {
        if (mounted && ok) setData(data)
      })
      .catch(() => {})
    return () => {
      mounted = false
    }
  }, [])

  const now = data?.serverTime ? new Date(data.serverTime) : new Date()
  const dateStr = now.toLocaleDateString()
  const timeStr = now.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})

  const weatherTemp = Math.round(data?.weather?.tempF ?? 72)
  const weatherDesc = data?.weather?.condition || 'Clear'
  const locationLabel = data?.city ? `${data.city}${data.region ? `, ${data.region}` : ''}` : null

  const change = data?.analytics?.change ?? null
  const changeLabel =
    typeof change === 'number'
      ? `${change >= 0 ? '▲' : '▼'} ${Math.abs(change).toFixed(1)}%`
      : null

  return (
    <div className="welcome-bar">
      <div className="wb-section left">
        <div className="wb-title">Welcome, Admin</div>
        <div className="wb-sub">
          {dateStr} • {timeStr}
          {locationLabel ? ` • ${locationLabel}` : ''}
        </div>
      </div>

      <div className="wb-section center">
        {data?.weather && (
          <div className="wb-weather fade-in">
            <span className="temp" aria-label="Current temperature">
              {weatherTemp}°F
            </span>
            <span className="desc">{weatherDesc}</span>
          </div>
        )}
      </div>

      <div className="wb-section right">
        {data?.analytics && (
          <div className="wb-metric slide-up">
            <span className="label">Active Users</span>
            <span className="value">{data.analytics.activeUsers ?? '--'}</span>
            {changeLabel && (
              <span className={`change ${change >= 0 ? 'up' : 'down'}`}>{changeLabel}</span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
