"use client"

import { useEffect, useRef, useState } from "react"

interface TradingViewChartProps {
  symbol: string
  theme?: "light" | "dark"
  interval?: string
}

export function TradingViewChart({ symbol, theme = "dark", interval = "5" }: TradingViewChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  // Use a known working symbol as fallback
  const [useDefaultSymbol, setUseDefaultSymbol] = useState(false)
  const [widgetLoaded, setWidgetLoaded] = useState(false)

  // Function to handle TVWidget initialization
  const initializeTVWidget = () => {
    // Clean up previous widget
    if (containerRef.current) {
      containerRef.current.innerHTML = ""
    }

    // Create widget script
    const script = document.createElement("script")
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js"
    script.type = "text/javascript"
    script.async = true

    // Use a popular trading pair that definitely exists on TradingView as fallback
    const chartSymbol = useDefaultSymbol ? "BINANCE:BTCUSDT" : symbol

    // Create widget config
    const widgetConfig = {
      autosize: true,
      symbol: chartSymbol,
      interval: interval,
      timezone: "Etc/UTC",
      theme: theme,
      style: "1", // Candles style
      locale: "en",
      enable_publishing: false,
      allow_symbol_change: true,
      calendar: false,
      support_host: "https://www.tradingview.com",
      withdateranges: true,
      hide_side_toolbar: false,
      details: true,
      hotlist: true,
      studies: [
        "BB@tv-basicstudies",
        "MAExp@tv-basicstudies",
        "RSI@tv-basicstudies",
        "Volume@tv-basicstudies"
      ],
      container_id: "tradingview_chart",
      show_popup_button: true,
      popup_width: "1000",
      popup_height: "650",
      toolbar_bg: theme === "dark" ? "#1E1E2D" : "#f1f3f6",
      // 添加更多控制选项
      disabled_features: [
        "header_symbol_search"
      ],
      enabled_features: [
        "use_localstorage_for_settings",
        "save_chart_properties_to_local_storage",
        "chart_property_page_style",
        "chart_property_page_scales",
        "property_pages"
      ],
      charts_storage_url: "https://saveload.tradingview.com",
      client_id: "tradingview.com",
      loading_screen: {
        backgroundColor: theme === "dark" ? "#1E1E2D" : "#FFFFFF",
        foregroundColor: theme === "dark" ? "#434651" : "#F5F5F5"
      },
      overrides: {
        "mainSeriesProperties.candleStyle.upColor": "#22c55e",
        "mainSeriesProperties.candleStyle.downColor": "#ef4444",
        "mainSeriesProperties.candleStyle.wickUpColor": "#22c55e",
        "mainSeriesProperties.candleStyle.wickDownColor": "#ef4444"
      }
    }

    script.innerHTML = JSON.stringify(widgetConfig)

    // Add event listener for script loading
    script.onload = () => {
      setWidgetLoaded(true)
    }

    // Add the script to the container
    if (containerRef.current) {
      containerRef.current.appendChild(script)
    }
  }

  // Handle symbol fallback
  useEffect(() => {
    // Check for invalid symbol after some time
    let checkSymbolTimeout: NodeJS.Timeout

    if (!widgetLoaded) {
      initializeTVWidget()
    } else {
      checkSymbolTimeout = setTimeout(() => {
        // Look for error messages or invalid symbol indicators
        const errorElements = document.querySelectorAll('.tv-noconnectivity__text')
        const invalidSymbolElements = document.querySelectorAll('.loading-indicator__error')
        const ghostElements = document.querySelectorAll('.ghost-loading-placeholder')

        if (
          (errorElements && errorElements.length > 0) ||
          (invalidSymbolElements && invalidSymbolElements.length > 0) ||
          (ghostElements && ghostElements.length > 0)
        ) {
          if (!useDefaultSymbol) {
            console.log("Symbol not found, using default")
            setUseDefaultSymbol(true)
            setWidgetLoaded(false) // Reset to trigger re-initialization
          }
        }
      }, 5000)
    }

    return () => {
      if (checkSymbolTimeout) {
        clearTimeout(checkSymbolTimeout)
      }
    }
  }, [symbol, theme, interval, useDefaultSymbol, widgetLoaded])

  return (
    <div className="tradingview-chart-container" style={{ height: "500px", width: "100%" }}>
      <div id="tradingview_chart" ref={containerRef} style={{ height: "100%", width: "100%" }} />
    </div>
  )
}