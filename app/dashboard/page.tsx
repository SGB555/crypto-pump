'use client'

import { usePrivy, useWallets } from '@privy-io/react-auth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Wallet, Plus, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function Dashboard() {
  const { ready, authenticated, user } = usePrivy()
  const { wallets } = useWallets()
  const router = useRouter()

  // Redirect to home if not authenticated
  useEffect(() => {
    if (ready && !authenticated) {
      router.push('/')
    }
  }, [ready, authenticated, router])

  if (!ready || !authenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center text-green-400 hover:text-green-500 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to home
        </Link>

        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Your account information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full bg-green-400 flex items-center justify-center text-black font-bold">
                  {user?.email?.address?.charAt(0) || 'U'}
                </div>
                <div>
                  <p className="font-medium">{user?.email?.address || 'Anonymous User'}</p>
                  <p className="text-sm text-gray-400">{user?.email?.address || 'No email'}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle>Wallets</CardTitle>
              <CardDescription>Your connected wallets</CardDescription>
            </CardHeader>
            <CardContent>
              {wallets.length > 0 ? (
                <div className="space-y-4">
                  {wallets.map((wallet) => (
                    <div key={wallet.address} className="p-3 bg-gray-700 rounded-lg">
                      <p className="font-medium">{wallet.walletClientType}</p>
                      <p className="text-sm text-gray-400 truncate">{wallet.address}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <Wallet className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-gray-400">No wallets connected</p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="w-full text-green-400 border-green-400 hover:bg-green-400/10"
                onClick={() => {}}
              >
                <Wallet className="h-4 w-4 mr-2" />
                {wallets.length > 0 ? 'Connect Another Wallet' : 'Connect Wallet'}
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle>My Coins</CardTitle>
              <CardDescription>Coins you've created or purchased</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Plus className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <p className="text-gray-400">No coins yet</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-green-400 text-black hover:bg-green-500">
                Create New Coin
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  )
}
