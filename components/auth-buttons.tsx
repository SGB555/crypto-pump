'use client'

import { usePrivy, useWallets } from '@privy-io/react-auth'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { LogOut, User, Wallet } from 'lucide-react'

export function AuthButtons() {
  const { login, logout, authenticated, user, connectWallet, ready } = usePrivy()
  const { wallets } = useWallets()

  // If Privy is not ready yet, show loading state
  if (!ready) {
    return (
      <div className="flex items-center space-x-4">
        <Button
          variant="outline"
          className="text-green-400 border-green-400 hover:bg-green-400/10"
          disabled
        >
          Loading...
        </Button>
      </div>
    )
  }

  // If user is authenticated, show user menu
  if (authenticated && user) {
    return (
      <div className="flex items-center space-x-4">
        {wallets.length === 0 && (
          <Button
            variant="outline"
            className="text-green-400 border-green-400 hover:bg-green-400/10"
            onClick={() => connectWallet()}
          >
            <Wallet className="h-4 w-4 mr-2" />
            Connect Wallet
          </Button>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.email?.address || ''} alt={user.email?.address || 'User'} />
                <AvatarFallback className="bg-green-400 text-black">
                  {user.email?.address?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => logout()}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
  }

  // If user is not authenticated, show login buttons
  return (
    <div className="flex items-center space-x-4">
      <Button
        variant="outline"
        className="text-green-400 border-green-400 hover:bg-green-400/10"
        onClick={() => login()}
      >
        <Wallet className="h-4 w-4 mr-2" />
        Connect Wallet
      </Button>
      <Button className="bg-green-400 text-black hover:bg-green-500" onClick={() => login()}>
        Log in
      </Button>
    </div>
  )
}
