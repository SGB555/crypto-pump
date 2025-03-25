"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ExternalLink, Copy, TrendingUp, ArrowUpRight, ArrowDownRight, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { HowItWorks } from "@/components/how-it-works"
import { TradingViewChart } from "@/components/TradingViewChart"
import { MockChart } from "@/components/MockChart"

// Define types for price history
interface PricePoint {
  date: string
  price: number
}

interface PriceHistoryByTimeframe {
  [timeframe: string]: PricePoint[]
}

// Generate mock price history for different timeframes
const generateMockPriceHistory = (): PriceHistoryByTimeframe => {
  // Base parameters
  const startPrice = 0.00200
  const endPrice = 0.00420

  // Helper to generate dates for a timeframe
  const generateDates = (days: number): string[] => {
    const dates: string[] = []
    const now = new Date("2025-03-25") // Fixed end date

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now)
      date.setDate(date.getDate() - i)
      dates.push(date.toISOString().split('T')[0])
    }

    return dates
  }

  // Generate prices with volatility for a timeframe
  const generatePrices = (days: number, startP: number, endP: number): number[] => {
    const prices: number[] = []
    const priceRange = endP - startP
    let currentPrice = startP

    // Generate price points with realistic volatility
    for (let i = 0; i < days; i++) {
      // Trend component - overall upward trend
      const trendFactor = i / (days - 1)
      const trendPrice = startP + priceRange * trendFactor

      // Random volatility - more pronounced in shorter timeframes
      const volatilityFactor = 0.1 * (1 - Math.min(0.9, days / 365))
      const randomFactor = (Math.random() - 0.45) * volatilityFactor

      currentPrice = trendPrice * (1 + randomFactor)
      // Ensure price doesn't go too low
      currentPrice = Math.max(startP * 0.7, currentPrice)

      prices.push(currentPrice)
    }

    // Ensure the last price matches exactly
    prices[prices.length - 1] = endP

    return prices
  }

  // Generate different timeframes
  const timeframes: Record<string, { dates: string[], prices: number[] }> = {
    "24h": {
      dates: generateDates(24),
      prices: generatePrices(24, 0.00375, 0.00420),
    },
    "7d": {
      dates: generateDates(7),
      prices: generatePrices(7, 0.00231, 0.00420),
    },
    "30d": {
      dates: generateDates(30),
      prices: generatePrices(30, 0.00190, 0.00420),
    },
    "90d": {
      dates: generateDates(90),
      prices: generatePrices(90, 0.00110, 0.00420),
    },
    "1y": {
      dates: generateDates(365),
      prices: generatePrices(365, 0.00050, 0.00420),
    },
  }

  // Convert to the correct format
  const result: PriceHistoryByTimeframe = {}

  for (const [period, data] of Object.entries(timeframes)) {
    result[period] = data.dates.map((date, i) => ({
      date,
      price: data.prices[i],
    }))
  }

  return result
}

// Define token data interface to include priceHistoryAll
interface TokenData {
  id: string
  name: string
  ticker: string
  image: string
  marketCap: string
  price: string
  priceChange: string
  holders: number
  transactions: number
  creator: string
  createdAt: string
  description: string
  contractAddress: string
  priceHistoryAll: PriceHistoryByTimeframe
}

// Mock data for the token
const tokenData: TokenData = {
  id: "C6UNUba4qdNmyM1jacY6WvbFGAVJpjsLvSDfsQEqpump",
  name: "Trump Money Glitch",
  ticker: "TMG",
  image: "/placeholder.svg?height=300&width=300",
  marketCap: "$4,200",
  price: "$0.0000000300",
  priceChange: "-0.13%",
  holders: 87,
  transactions: 311,
  creator: "ComD5h",
  createdAt: "03/25/25",
  description:
    "Trump Money Glitch (TMG) - The hottest meme coin on Pump.fun platform.",
  contractAddress: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t",
  // Add price history for all timeframes
  priceHistoryAll: generateMockPriceHistory(),
}

// Mock data for transactions
const transactionData = [
  {
    id: 1,
    type: "buy",
    user: "Anon7842",
    amount: "2,500 ALSS",
    value: "$10.50",
    time: "2 minutes ago",
  },
  {
    id: 2,
    type: "sell",
    user: "Whale5678",
    amount: "10,000 ALSS",
    value: "$42.00",
    time: "15 minutes ago",
  },
  {
    id: 3,
    type: "buy",
    user: "DeFiKing",
    amount: "5,000 ALSS",
    value: "$21.00",
    time: "32 minutes ago",
  },
  {
    id: 4,
    type: "buy",
    user: "MoonBoy",
    amount: "1,200 ALSS",
    value: "$5.04",
    time: "45 minutes ago",
  },
  {
    id: 5,
    type: "sell",
    user: "PaperHands",
    amount: "3,000 ALSS",
    value: "$12.60",
    time: "1 hour ago",
  },
  {
    id: 6,
    type: "buy",
    user: "DiamondHands",
    amount: "8,000 ALSS",
    value: "$33.60",
    time: "1.5 hours ago",
  },
  {
    id: 7,
    type: "buy",
    user: "CryptoNerd",
    amount: "4,500 ALSS",
    value: "$18.90",
    time: "2 hours ago",
  },
  {
    id: 8,
    type: "sell",
    user: "TradingPro",
    amount: "7,000 ALSS",
    value: "$29.40",
    time: "3 hours ago",
  },
  {
    id: 9,
    type: "buy",
    user: "SatoshiFan",
    amount: "6,000 ALSS",
    value: "$25.20",
    time: "4 hours ago",
  },
  {
    id: 10,
    type: "buy",
    user: "CoinCollector",
    amount: "3,500 ALSS",
    value: "$14.70",
    time: "5 hours ago",
  },
]

export default function CoinDetailPage() {
  const params = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [token, setToken] = useState<TokenData>(tokenData)
  const [transactions, setTransactions] = useState(transactionData)
  const [chartTimeframe, setChartTimeframe] = useState("7d")
  const [chartInterval, setChartInterval] = useState("5")

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Copy to clipboard function
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // You could add a toast notification here
  }

  // Get the current price history based on the selected timeframe
  const getCurrentPriceHistory = (): PricePoint[] => {
    return token.priceHistoryAll?.[chartTimeframe] || []
  }

  // 帮助函数：获取适当的TradingView符号
  const getTradingViewSymbol = () => {
    // 符号格式化逻辑
    // 对于常规币种，尝试BINANCE:BTCUSDT格式
    // 对于较新的代币，尝试使用自定义格式如PUMP:TMG或直接使用代币名称
    if (token.ticker === "TMG") {
      return "PUMP:TMG" // 自定义格式
    }

    // 默认格式
    return `BINANCE:${token.ticker}USDT`
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-400 mx-auto mb-4"></div>
          <p>Loading token data...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header with back button */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-green-400 hover:text-green-500">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to home
          </Link>
        </div>

        {/* Token info section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Token image */}
          <div className="flex justify-center">
            <div className="relative w-48 h-48 md:w-64 md:h-64">
              <Image src={token.image || "/placeholder.svg"} alt={token.name} fill className="object-contain" />
            </div>
          </div>

          {/* Token details */}
          <div className="md:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold">{token.name}</h1>
                <p className="text-gray-400">({token.ticker})</p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="text-green-400 border-green-400 hover:bg-green-400/10">
                    How it works
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-800 border-gray-700 text-white">
                  <HowItWorks />
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-4">
                  <p className="text-sm text-gray-400">Market Cap</p>
                  <p className="text-xl font-bold">{token.marketCap}</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-4">
                  <p className="text-sm text-gray-400">Price</p>
                  <div className="flex items-center">
                    <p className="text-xl font-bold mr-2">{token.price}</p>
                    <Badge
                      className={
                        token.priceChange.startsWith("+")
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }
                    >
                      {token.priceChange}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-4">
                  <p className="text-sm text-gray-400">Holders</p>
                  <p className="text-xl font-bold">{token.holders}</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-4">
                  <p className="text-sm text-gray-400">Transactions</p>
                  <p className="text-xl font-bold">{token.transactions}</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-4">
                  <p className="text-sm text-gray-400">Created by</p>
                  <p className="text-xl font-bold">{token.creator}</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-4">
                  <p className="text-sm text-gray-400">Created on</p>
                  <p className="text-xl font-bold">{token.createdAt}</p>
                </CardContent>
              </Card>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-bold mb-2">Description</h2>
              <p className="text-gray-300">{token.description}</p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-2">Contract Address</h2>
              <div className="flex items-center bg-gray-800 p-3 rounded-md">
                <p className="text-gray-300 text-sm truncate flex-1">{token.contractAddress}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-2"
                  onClick={() => copyToClipboard(token.contractAddress)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="ml-2" asChild>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Trading View Chart */}
        <div className="mb-8">
          <Card className="bg-gray-800 border-gray-700 overflow-hidden">
            <div className="flex items-center justify-between p-3 border-b border-gray-700 bg-gray-800/80">
              <div className="flex items-center">
                <h3 className="text-lg font-semibold">{token.name} Chart</h3>
                <Badge className="ml-2 bg-gray-700 text-gray-300">{token.ticker}/USDT</Badge>
                <Badge className={`ml-2 ${token.priceChange.startsWith('-') ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                  {token.priceChange}
                </Badge>
              </div>
            </div>

            <CardContent className="p-0">
              {/* Chart controls container */}
              <div className="flex justify-between p-2 bg-gray-800/60 border-b border-gray-700">
                {/* Interval selector */}
                <div className="bg-gray-700/50 rounded-md p-1 inline-flex shadow-sm">
                  {[
                    {value: "1", label: "1m"},
                    {value: "5", label: "5m"},
                    {value: "15", label: "15m"},
                    {value: "30", label: "30m"},
                    {value: "60", label: "1h"},
                    {value: "D", label: "1d"},
                    {value: "W", label: "1w"}
                  ].map((item) => (
                    <button
                      key={item.value}
                      className={`px-3 py-1 text-xs rounded-md transition-colors ${
                        chartInterval === item.value
                          ? "bg-green-400 text-black font-medium shadow-inner"
                          : "text-gray-300 hover:bg-gray-600/50 hover:text-white"
                      }`}
                      onClick={() => setChartInterval(item.value)}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                {/* Timeframe selector */}
                <div className="bg-gray-700/50 rounded-md p-1 inline-flex shadow-sm">
                  {["24h", "7d", "30d", "90d", "1y"].map((period) => (
                    <button
                      key={period}
                      className={`px-3 py-1 text-xs rounded-md transition-colors ${
                        chartTimeframe === period
                          ? "bg-green-400 text-black font-medium shadow-inner"
                          : "text-gray-300 hover:bg-gray-600/50 hover:text-white"
                      }`}
                      onClick={() => setChartTimeframe(period)}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chart */}
              <TradingViewChart
                symbol={getTradingViewSymbol()}
                theme="dark"
                interval={chartInterval}
              />
            </CardContent>
          </Card>
        </div>

        {/* Buy/Sell buttons */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Button className="bg-green-400 text-black hover:bg-green-500 py-6 text-lg font-bold">Buy</Button>
          <Button variant="outline" className="border-red-400 text-red-400 hover:bg-red-400/10 py-6 text-lg font-bold">
            Sell
          </Button>
        </div>

        {/* Tabs for different views */}
        <Tabs defaultValue="trending" className="mb-8">
          <TabsList className="bg-gray-800 border-gray-700">
            <TabsTrigger value="trending" className="data-[state=active]:bg-gray-700">
              <TrendingUp className="h-4 w-4 mr-2" />
              Trending
            </TabsTrigger>
            <TabsTrigger value="chart" className="data-[state=active]:bg-gray-700">
              Chart
            </TabsTrigger>
            <TabsTrigger value="holders" className="data-[state=active]:bg-gray-700">
              Holders
            </TabsTrigger>
            <TabsTrigger value="about" className="data-[state=active]:bg-gray-700">
              About
            </TabsTrigger>
          </TabsList>

          <TabsContent value="trending" className="mt-4">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-gray-700/50 border-gray-700">
                      <TableHead className="text-gray-400">Type</TableHead>
                      <TableHead className="text-gray-400">User</TableHead>
                      <TableHead className="text-gray-400">Amount</TableHead>
                      <TableHead className="text-gray-400">Value</TableHead>
                      <TableHead className="text-gray-400">Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((tx) => (
                      <TableRow key={tx.id} className="hover:bg-gray-700/50 border-gray-700">
                        <TableCell>
                          <Badge
                            className={
                              tx.type === "buy" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                            }
                          >
                            {tx.type === "buy" ? (
                              <ArrowUpRight className="h-3 w-3 mr-1 inline" />
                            ) : (
                              <ArrowDownRight className="h-3 w-3 mr-1 inline" />
                            )}
                            {tx.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">{tx.user}</TableCell>
                        <TableCell>{tx.amount}</TableCell>
                        <TableCell>{tx.value}</TableCell>
                        <TableCell className="text-gray-400">
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {tx.time}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="chart" className="mt-4">
            <Card className="bg-gray-800 border-gray-700 overflow-hidden">
              <div className="flex items-center justify-between p-3 border-b border-gray-700 bg-gray-800/80">
                <div className="flex items-center">
                  <h3 className="text-lg font-semibold">{token.name} Chart</h3>
                  <Badge className="ml-2 bg-gray-700 text-gray-300">{token.ticker}/USDT</Badge>
                  <Badge className={`ml-2 ${token.priceChange.startsWith('-') ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                    {token.priceChange}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-0">
                {/* Chart controls container */}
                <div className="flex justify-between p-2 bg-gray-800/60 border-b border-gray-700">
                  {/* Interval selector */}
                  <div className="bg-gray-700/50 rounded-md p-1 inline-flex shadow-sm">
                    {[
                      {value: "1", label: "1m"},
                      {value: "5", label: "5m"},
                      {value: "15", label: "15m"},
                      {value: "30", label: "30m"},
                      {value: "60", label: "1h"},
                      {value: "D", label: "1d"},
                      {value: "W", label: "1w"}
                    ].map((item) => (
                      <button
                        key={item.value}
                        className={`px-3 py-1 text-xs rounded-md transition-colors ${
                          chartInterval === item.value
                            ? "bg-green-400 text-black font-medium shadow-inner"
                            : "text-gray-300 hover:bg-gray-600/50 hover:text-white"
                        }`}
                        onClick={() => setChartInterval(item.value)}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>

                  {/* Timeframe selector */}
                  <div className="bg-gray-700/50 rounded-md p-1 inline-flex shadow-sm">
                    {["24h", "7d", "30d", "90d", "1y"].map((period) => (
                      <button
                        key={period}
                        className={`px-3 py-1 text-xs rounded-md transition-colors ${
                          chartTimeframe === period
                            ? "bg-green-400 text-black font-medium shadow-inner"
                            : "text-gray-300 hover:bg-gray-600/50 hover:text-white"
                        }`}
                        onClick={() => setChartTimeframe(period)}
                      >
                        {period}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Chart */}
                <TradingViewChart
                  symbol={getTradingViewSymbol()}
                  theme="dark"
                  interval={chartInterval}
                />

                {/* Market stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="p-4 bg-gray-700/50 rounded-lg">
                    <p className="text-gray-400 text-sm mb-1">24h Volume</p>
                    <p className="text-xl font-bold">$3,254.21</p>
                  </div>
                  <div className="p-4 bg-gray-700/50 rounded-lg">
                    <p className="text-gray-400 text-sm mb-1">Market Rank</p>
                    <p className="text-xl font-bold">#42</p>
                  </div>
                  <div className="p-4 bg-gray-700/50 rounded-lg">
                    <p className="text-gray-400 text-sm mb-1">All-Time High</p>
                    <div>
                      <p className="text-xl font-bold">$0.0052</p>
                      <p className="text-red-400 text-sm">-19.2% <span className="text-gray-400">Mar 15, 2025</span></p>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-700/50 rounded-lg">
                    <p className="text-gray-400 text-sm mb-1">All-Time Low</p>
                    <div>
                      <p className="text-xl font-bold">$0.0005</p>
                      <p className="text-green-400 text-sm">+740% <span className="text-gray-400">Feb 1, 2025</span></p>
                    </div>
                  </div>
                </div>

                {/* Additional market info */}
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-3">Market Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm">
                    <div className="flex justify-between py-2 border-b border-gray-700">
                      <span className="text-gray-400">Circulating Supply</span>
                      <span>3,857,142 {token.ticker}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-700">
                      <span className="text-gray-400">Total Supply</span>
                      <span>10,000,000 {token.ticker}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-700">
                      <span className="text-gray-400">Max Supply</span>
                      <span>10,000,000 {token.ticker}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-700">
                      <span className="text-gray-400">Fully Diluted Valuation</span>
                      <span>$42,000</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-700">
                      <span className="text-gray-400">Token Type</span>
                      <span>Solana SPL</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-700">
                      <span className="text-gray-400">Launch Date</span>
                      <span>March 1, 2025</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="holders" className="mt-4">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <p className="text-center text-gray-400">Holder data will be displayed here</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="about" className="mt-4">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <p className="text-center text-gray-400">
                  Additional information about the token will be displayed here
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
