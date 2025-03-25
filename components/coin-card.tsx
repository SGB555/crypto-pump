import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { MessageSquare } from "lucide-react"

interface CoinCardProps {
  name: string
  ticker: string
  marketCap: string
  image: string
  replies: number
  description?: string
}

export function CoinCard({ name, ticker, marketCap, image, replies, description }: CoinCardProps) {
  return (
    <Link href={`/coin/${ticker.toLowerCase()}`}>
      <Card className="bg-gray-800 border-gray-700 overflow-hidden hover:border-green-400 transition-all cursor-pointer">
        <div className="relative">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            width={300}
            height={150}
            className="w-full h-[150px] object-cover"
          />
        </div>
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-bold text-lg">{name}</h4>
              <p className="text-gray-400 text-sm">({ticker})</p>
            </div>
            <div className="text-right">
              <p className="text-green-400 font-medium">{marketCap}</p>
              <div className="flex items-center text-gray-400 text-sm">
                <MessageSquare className="h-3 w-3 mr-1" />
                <span>replies: {replies}</span>
              </div>
            </div>
          </div>
          {description && <p className="mt-3 text-sm text-gray-300">{description}</p>}
        </CardContent>
      </Card>
    </Link>
  )
}
