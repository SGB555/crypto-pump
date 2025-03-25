"use client"

import { useEffect, useRef } from "react"

interface PricePoint {
  date: string
  price: number
}

interface MockChartProps {
  tokenName: string
  theme?: "light" | "dark"
  priceHistory?: PricePoint[]
}

export function MockChart({ tokenName, theme = "dark", priceHistory }: MockChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Generate random price data if no price history provided
    const dataPoints = 50
    let data: number[] = []

    if (priceHistory && priceHistory.length > 0) {
      // Use provided price history
      data = priceHistory.map(point => point.price)
    } else {
      // Generate random data with an increasing trend
      let price = 0.002 + Math.random() * 0.001

      for (let i = 0; i < dataPoints; i++) {
        // Add some randomness but keep an overall upward trend
        const change = (Math.random() - 0.3) * 0.0005
        price += change
        price = Math.max(0.0005, price) // Ensure price doesn't go too low
        data.push(price)
      }
    }

    // Draw chart
    const padding = 40
    const width = canvas.width - padding * 2
    const height = canvas.height - padding * 2

    // Find min/max for scaling
    const minPrice = Math.min(...data) * 0.9
    const maxPrice = Math.max(...data) * 1.1
    const priceRange = maxPrice - minPrice

    // Background
    ctx.fillStyle = theme === 'dark' ? '#1e1e2d' : '#f5f5f5'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Grid lines
    ctx.strokeStyle = theme === 'dark' ? '#2a2a3a' : '#e5e5e5'
    ctx.lineWidth = 1

    // Horizontal grid lines
    const gridLines = 5
    for (let i = 0; i <= gridLines; i++) {
      const y = padding + (height / gridLines) * i
      ctx.beginPath()
      ctx.moveTo(padding, y)
      ctx.lineTo(padding + width, y)
      ctx.stroke()

      // Price labels
      const price = maxPrice - (i / gridLines) * priceRange
      ctx.fillStyle = theme === 'dark' ? '#999' : '#666'
      ctx.font = '10px Arial'
      ctx.textAlign = 'right'
      ctx.fillText('$' + price.toFixed(6), padding - 5, y + 3)
    }

    // Vertical grid lines (time)
    const timePoints = priceHistory ? priceHistory.length - 1 : 5
    for (let i = 0; i <= timePoints; i++) {
      const x = padding + (width / timePoints) * i
      ctx.beginPath()
      ctx.moveTo(x, padding)
      ctx.lineTo(x, padding + height)
      ctx.stroke()

      // Time labels
      let timeLabel = ''
      if (priceHistory && priceHistory.length > 0) {
        // Show actual dates if we have price history
        if (i === 0 || i === timePoints || i % Math.ceil(timePoints / 3) === 0) {
          const date = new Date(priceHistory[i].date)
          timeLabel = `${date.getMonth() + 1}/${date.getDate()}`
        }
      } else {
        // Show relative time otherwise
        timeLabel = i === 0 ? '7d ago' : i === timePoints ? 'now' : ''
      }

      ctx.fillStyle = theme === 'dark' ? '#999' : '#666'
      ctx.font = '10px Arial'
      ctx.textAlign = 'center'
      ctx.fillText(timeLabel, x, padding + height + 15)
    }

    // Price line
    ctx.strokeStyle = '#22c55e' // Green color for price
    ctx.lineWidth = 2
    ctx.beginPath()

    // Area under the line
    const pointsForFill = []

    for (let i = 0; i < data.length; i++) {
      const x = padding + (width * i) / (data.length - 1)
      const y = padding + height - ((data[i] - minPrice) / priceRange) * height

      pointsForFill.push({ x, y })

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }

    ctx.stroke()

    // Fill area under the line with gradient
    if (pointsForFill.length > 0) {
      const gradient = ctx.createLinearGradient(0, padding, 0, padding + height)
      gradient.addColorStop(0, 'rgba(34, 197, 94, 0.2)')
      gradient.addColorStop(1, 'rgba(34, 197, 94, 0)')

      ctx.beginPath()
      ctx.moveTo(pointsForFill[0].x, padding + height)

      for (const point of pointsForFill) {
        ctx.lineTo(point.x, point.y)
      }

      ctx.lineTo(pointsForFill[pointsForFill.length - 1].x, padding + height)
      ctx.closePath()
      ctx.fillStyle = gradient
      ctx.fill()
    }

    // Add token name and current price to chart
    ctx.fillStyle = theme === 'dark' ? '#fff' : '#000'
    ctx.font = 'bold 14px Arial'
    ctx.textAlign = 'left'
    ctx.fillText(tokenName, padding, 25)

    const currentPrice = data[data.length - 1]
    ctx.fillStyle = '#22c55e'
    ctx.font = 'bold 14px Arial'
    ctx.textAlign = 'right'
    ctx.fillText('$' + currentPrice.toFixed(6), canvas.width - padding, 25)

    // Add percentage change
    const startPrice = data[0]
    const percentChange = ((currentPrice - startPrice) / startPrice) * 100
    ctx.fillStyle = '#22c55e'
    ctx.font = '12px Arial'
    ctx.textAlign = 'right'
    ctx.fillText(`+${percentChange.toFixed(2)}%`, canvas.width - padding, 45)

  }, [tokenName, theme, priceHistory])

  return (
    <div className="relative w-full" style={{ height: "400px" }}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: 'block' }}
      />
    </div>
  )
}