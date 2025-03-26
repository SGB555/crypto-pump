import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Info, ArrowRight } from "lucide-react"
import { CoinCard } from "@/components/coin-card"
import { HowItWorks } from "@/components/how-it-works"
import { AuthButtons } from "@/components/auth-buttons"
import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-6">
            <h1 className="text-2xl font-bold text-green-400">crypto.pump</h1>
            <nav className="hidden md:flex items-center space-x-4 text-sm">
              <Link href="/landing" className="text-gray-400 hover:text-white transition-colors">
                Landing Page
              </Link>
            </nav>
          </div>
          <AuthButtons />
        </header>

        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <h2 className="text-4xl font-bold mb-6">[start a new coin]</h2>
          <div className="flex w-full max-w-md gap-2">
            <Input placeholder="search for token" className="bg-gray-800 border-gray-700 focus:border-green-400" />
            <Button className="bg-green-400 text-black hover:bg-green-500">search</Button>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="link" className="mt-4 text-green-400">
                <Info className="h-4 w-4 mr-2" />
                How it works
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-800 border-gray-700 text-white">
              <HowItWorks />
            </DialogContent>
          </Dialog>
        </div>

        {/* Trending Section */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-green-400" />
              now trending
            </h3>
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm" className="h-8 px-2">
                <ArrowRight className="h-4 w-4 rotate-180" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 px-2">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            <CoinCard
              name="Saratoga Spring Water"
              ticker="SARATOGA"
              marketCap="$2.0M"
              image="/placeholder.svg?height=150&width=150"
              replies={33}
            />
            <CoinCard
              name="Pyramids"
              ticker="GIZA"
              marketCap="$1.7M"
              image="/placeholder.svg?height=150&width=150"
              replies={117}
            />
            <CoinCard
              name="Italian Brain"
              ticker="ITALIANOT"
              marketCap="$1.5M"
              image="/placeholder.svg?height=150&width=150"
              replies={534}
            />
            <CoinCard
              name="Morning Routine"
              ticker="ROUTINE"
              marketCap="$1.2M"
              image="/placeholder.svg?height=150&width=150"
              replies={98}
            />
            <CoinCard
              name="Bitcoin"
              ticker="BITCOIN"
              marketCap="$1.0M"
              image="/placeholder.svg?height=150&width=150"
              replies={212}
            />
          </div>
        </div>

        {/* Filter Tags */}
        <div className="mt-12 flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-gray-800 hover:bg-gray-700 cursor-pointer">
            trending
          </Badge>
          <Badge variant="outline" className="bg-gray-800 hover:bg-gray-700 cursor-pointer">
            🔥 lebron
          </Badge>
          <Badge variant="outline" className="bg-gray-800 hover:bg-gray-700 cursor-pointer">
            routine
          </Badge>
          <Badge variant="outline" className="bg-gray-800 hover:bg-gray-700 cursor-pointer">
            season
          </Badge>
          <Badge variant="outline" className="bg-gray-800 hover:bg-gray-700 cursor-pointer">
            girl
          </Badge>
        </div>

        {/* Recent Coins */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">recently created</h3>
            <div className="flex items-center">
              <span className="text-sm text-gray-400 mr-2">sort: featured</span>
              <Button variant="ghost" size="sm" className="h-8 px-2">
                ▼
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CoinCard
              name="Jelly AI"
              ticker="JELLY AI"
              marketCap="$0.7M"
              image="/placeholder.svg?height=150&width=150"
              replies={4}
              description="JellyAI's mission is to provide you with a better future."
            />
            <CoinCard
              name="PEPE Visa"
              ticker="PEPEVISA"
              marketCap="$1.0M"
              image="/placeholder.svg?height=150&width=150"
              replies={68}
              description="Get ready to rip the script on traditional currency with PEPE Visa, the pioneering debit card powered by meme coins."
            />
            <CoinCard
              name="dump.rug"
              ticker="DUMP.RUG"
              marketCap="$0.8M"
              image="/placeholder.svg?height=150&width=150"
              replies={21}
              description="We had some fun, now everyone's dumping."
            />
          </div>
        </div>
      </div>
    </main>
  )
}
