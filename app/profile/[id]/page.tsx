"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  ExternalLink,
  Copy,
  Twitter,
  Github,
  MessageCircle,
  Globe,
  MessageSquare,
  Share2,
  Check,
  CreditCard
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// User profile interface
interface UserProfile {
  id: string
  username: string
  avatar: string
  joinDate: string
  biography: string
  verified: boolean
  socialLinks: {
    twitter?: string
    telegram?: string
    website?: string
    github?: string
  }
  stats: {
    following: number
    followers: number
    coinsHeld: number
    coinsCreated: number
  }
}

// User coins interface
interface UserCoin {
  id: string
  name: string
  ticker: string
  image: string
  price: string
  priceChange: string
  marketCap: string
  description: string
  replies: number
}

// User activity interface
interface UserActivity {
  id: number
  type: "buy" | "sell" | "create" | "comment"
  coinName: string
  coinTicker: string
  time: string
  amount?: string
  value?: string
  comment?: string
}

// Mock profile data
const profileData: UserProfile = {
  id: "DfS9u2aa",
  username: "CryptoWhale",
  avatar: "/placeholder-user.jpg",
  joinDate: "March 2024",
  biography: "Crypto enthusiast and NFT collector. Always looking for the next big thing in the blockchain space!",
  verified: true,
  socialLinks: {
    twitter: "https://twitter.com/cryptowhale",
    telegram: "https://t.me/cryptowhale",
    website: "https://cryptowhale.io",
    github: "https://github.com/cryptowhale"
  },
  stats: {
    following: 128,
    followers: 245,
    coinsHeld: 32,
    coinsCreated: 5
  }
}

// Mock user coins data
const userCoinsData: UserCoin[] = [
  {
    id: "tmg",
    name: "Trump Money Glitch",
    ticker: "TMG",
    image: "/placeholder.svg",
    price: "$0.0000000300",
    priceChange: "+14.2%",
    marketCap: "$4,200",
    description: "Trump Money Glitch (TMG) - The hottest meme coin on Pump.fun platform.",
    replies: 42
  },
  {
    id: "doge",
    name: "Dogecoin",
    ticker: "DOGE",
    image: "/placeholder.svg",
    price: "$0.1324",
    priceChange: "-2.5%",
    marketCap: "$18.5M",
    description: "The original meme coin. Much wow.",
    replies: 128
  },
  {
    id: "pepe",
    name: "Pepe Coin",
    ticker: "PEPE",
    image: "/placeholder.svg",
    price: "$0.00000954",
    priceChange: "+5.8%",
    marketCap: "$3.8M",
    description: "The rarest Pepe of them all.",
    replies: 76
  }
]

// Mock user activity data
const userActivityData: UserActivity[] = [
  {
    id: 1,
    type: "buy",
    coinName: "Trump Money Glitch",
    coinTicker: "TMG",
    time: "2 hours ago",
    amount: "5,000 TMG",
    value: "$15.00"
  },
  {
    id: 2,
    type: "comment",
    coinName: "Pepe Coin",
    coinTicker: "PEPE",
    time: "1 day ago",
    comment: "This is going to the moon! 🚀"
  },
  {
    id: 3,
    type: "sell",
    coinName: "Dogecoin",
    coinTicker: "DOGE",
    time: "3 days ago",
    amount: "1,200 DOGE",
    value: "$158.88"
  },
  {
    id: 4,
    type: "create",
    coinName: "Moon Rocket",
    coinTicker: "MOON",
    time: "1 week ago"
  },
  {
    id: 5,
    type: "buy",
    coinName: "Solana",
    coinTicker: "SOL",
    time: "2 weeks ago",
    amount: "2.5 SOL",
    value: "$287.50"
  }
]

export default function ProfilePage() {
  const params = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [profile, setProfile] = useState<UserProfile>(profileData)
  const [coins, setCoins] = useState<UserCoin[]>(userCoinsData)
  const [activities, setActivities] = useState<UserActivity[]>(userActivityData)
  const [activeTab, setActiveTab] = useState("holdings")

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // You could add a toast notification here
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back button */}
      <div className="mb-6">
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
        </div>
      ) : (
        <>
          {/* Profile header */}
          <div className="bg-gray-800 rounded-xl p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              <Avatar className="h-24 w-24 border-2 border-green-400">
                <AvatarImage src={profile.avatar} alt={profile.username} />
                <AvatarFallback>{profile.username.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-2xl font-bold">{profile.username}</h1>
                  {profile.verified && (
                    <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500">
                      <Check className="h-3 w-3 mr-1" /> Verified
                    </Badge>
                  )}
                </div>
                <div className="flex items-center text-gray-400 text-sm mb-3">
                  <span>ID: {profile.id}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-1 text-gray-400 hover:text-white"
                    onClick={() => copyToClipboard(profile.id)}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                  <span className="mx-2">•</span>
                  <span>Joined {profile.joinDate}</span>
                </div>
                <p className="text-gray-300 mb-4">{profile.biography}</p>

                <div className="flex flex-wrap gap-3">
                  {profile.socialLinks.twitter && (
                    <a href={profile.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm" className="gap-1 text-gray-400 hover:text-white">
                        <Twitter className="h-4 w-4" />
                        Twitter
                      </Button>
                    </a>
                  )}
                  {profile.socialLinks.telegram && (
                    <a href={profile.socialLinks.telegram} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm" className="gap-1 text-gray-400 hover:text-white">
                        <MessageCircle className="h-4 w-4" />
                        Telegram
                      </Button>
                    </a>
                  )}
                  {profile.socialLinks.website && (
                    <a href={profile.socialLinks.website} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm" className="gap-1 text-gray-400 hover:text-white">
                        <Globe className="h-4 w-4" />
                        Website
                      </Button>
                    </a>
                  )}
                  {profile.socialLinks.github && (
                    <a href={profile.socialLinks.github} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm" className="gap-1 text-gray-400 hover:text-white">
                        <Github className="h-4 w-4" />
                        Github
                      </Button>
                    </a>
                  )}
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-2 self-start">
                <Button className="bg-green-500 hover:bg-green-600">Follow</Button>
                <Button variant="outline" className="gap-1">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-700">
              <div className="text-center">
                <p className="text-xl font-bold">{profile.stats.following}</p>
                <p className="text-gray-400 text-sm">Following</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold">{profile.stats.followers}</p>
                <p className="text-gray-400 text-sm">Followers</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold">{profile.stats.coinsHeld}</p>
                <p className="text-gray-400 text-sm">Coins Held</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold">{profile.stats.coinsCreated}</p>
                <p className="text-gray-400 text-sm">Coins Created</p>
              </div>
            </div>
          </div>

          {/* Tabs section */}
          <Tabs defaultValue="holdings" onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="holdings">Holdings</TabsTrigger>
              <TabsTrigger value="created">Created</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="swap">Swap</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>

            {/* Holdings tab */}
            <TabsContent value="holdings" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {coins.map((coin) => (
                  <Card key={coin.id} className="bg-gray-800 border-gray-700 overflow-hidden hover:border-green-400 transition-all cursor-pointer">
                    <Link href={`/coin/${coin.ticker.toLowerCase()}`}>
                      <div className="relative">
                        <Image
                          src={coin.image}
                          alt={coin.name}
                          width={300}
                          height={150}
                          className="w-full h-[150px] object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold text-lg">{coin.name}</h4>
                            <p className="text-gray-400 text-sm">({coin.ticker})</p>
                          </div>
                          <div className="text-right">
                            <p className={`font-medium ${coin.priceChange.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                              {coin.price}
                            </p>
                            <p className={`text-sm ${coin.priceChange.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                              {coin.priceChange}
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-3">
                          <p className="text-sm text-gray-300">{coin.marketCap}</p>
                          <div className="flex items-center text-gray-400 text-sm">
                            <MessageSquare className="h-3 w-3 mr-1" />
                            <span>replies: {coin.replies}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Created tab - Similar to holdings but filtered for created coins */}
            <TabsContent value="created" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {coins.filter((_, index) => index < 1).map((coin) => (
                  <Card key={coin.id} className="bg-gray-800 border-gray-700 overflow-hidden hover:border-green-400 transition-all cursor-pointer">
                    <Link href={`/coin/${coin.ticker.toLowerCase()}`}>
                      <div className="relative">
                        <Image
                          src={coin.image}
                          alt={coin.name}
                          width={300}
                          height={150}
                          className="w-full h-[150px] object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold text-lg">{coin.name}</h4>
                            <p className="text-gray-400 text-sm">({coin.ticker})</p>
                          </div>
                          <div className="text-right">
                            <p className={`font-medium ${coin.priceChange.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                              {coin.price}
                            </p>
                            <p className={`text-sm ${coin.priceChange.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                              {coin.priceChange}
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-3">
                          <p className="text-sm text-gray-300">{coin.marketCap}</p>
                          <div className="flex items-center text-gray-400 text-sm">
                            <MessageSquare className="h-3 w-3 mr-1" />
                            <span>replies: {coin.replies}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Activity tab */}
            <TabsContent value="activity">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-700">
                        <TableHead>Action</TableHead>
                        <TableHead>Coin</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead className="text-right">Details</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {activities.map((activity) => (
                        <TableRow key={activity.id} className="border-gray-700">
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={`
                                ${activity.type === 'buy' ? 'bg-green-500/20 text-green-400 border-green-500' : ''}
                                ${activity.type === 'sell' ? 'bg-red-500/20 text-red-400 border-red-500' : ''}
                                ${activity.type === 'create' ? 'bg-blue-500/20 text-blue-400 border-blue-500' : ''}
                                ${activity.type === 'comment' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500' : ''}
                              `}
                            >
                              {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Link href={`/coin/${activity.coinTicker.toLowerCase()}`} className="hover:text-green-400">
                              {activity.coinName} ({activity.coinTicker})
                            </Link>
                          </TableCell>
                          <TableCell>{activity.time}</TableCell>
                          <TableCell className="text-right">
                            {activity.type === 'buy' || activity.type === 'sell' ? (
                              <div>
                                <p>{activity.amount}</p>
                                <p className="text-sm text-gray-400">{activity.value}</p>
                              </div>
                            ) : activity.type === 'comment' ? (
                              <p className="italic text-gray-300">"{activity.comment}"</p>
                            ) : (
                              <p className="text-gray-400">-</p>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Swap tab */}
            <TabsContent value="swap">
              <div className="bg-gray-800 rounded-xl p-6 text-center">
                <div className="max-w-md mx-auto">
                  <CreditCard className="h-12 w-12 mx-auto mb-4 text-green-400" />
                  <h3 className="text-xl font-bold mb-2">Swap Tokens</h3>
                  <p className="text-gray-400 mb-6">
                    Easily swap tokens on the Pump.fun platform. Access advanced trading features and market data.
                  </p>
                  <Button className="bg-green-500 hover:bg-green-600 w-full">
                    Go to Swap Interface
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Advanced tab */}
            <TabsContent value="advanced">
              <div className="bg-gray-800 rounded-xl p-6 text-center">
                <div className="max-w-md mx-auto">
                  <h3 className="text-xl font-bold mb-2">Advanced Features</h3>
                  <p className="text-gray-400 mb-6">
                    Access advanced trading features, developer tools, and API integrations for the Pump.fun platform.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Button variant="outline">
                      API Access
                    </Button>
                    <Button variant="outline">
                      Developer Tools
                    </Button>
                    <Button variant="outline">
                      Trading Bot
                    </Button>
                    <Button variant="outline">
                      Analytics Dashboard
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  )
}