'use client'

import { PrivyProvider } from '@privy-io/react-auth'
import { useRouter } from 'next/navigation'
import { type PropsWithChildren, useEffect, useState } from 'react'

export default function PrivyAuthProvider({ children }: PropsWithChildren) {
  const router = useRouter()
  const [appId, setAppId] = useState<string | null>(null)

  useEffect(() => {
    // Get the app ID from environment variable
    const privyAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID

    if (!privyAppId) {
      console.error('NEXT_PUBLIC_PRIVY_APP_ID is not defined in environment variables')
    } else {
      setAppId(privyAppId)
    }
  }, [])

  // Show loading or error state if app ID is not available
  if (!appId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">Loading authentication...</h2>
          <p className="text-gray-400">
            {!process.env.NEXT_PUBLIC_PRIVY_APP_ID
              ? 'Missing Privy App ID. Please check your environment variables.'
              : 'Initializing authentication...'}
          </p>
        </div>
      </div>
    )
  }

  // Configure Privy with your app's settings
  return (
    <PrivyProvider
      appId={appId}
      config={{
        loginMethods: ['email', 'wallet'],
        appearance: {
          theme: 'dark',
          accentColor: '#4ade80',
          logo: 'https://your-logo-url.com/logo.png'
        },
        embeddedWallets: {
          createOnLogin: 'users-without-wallets'
        }
      }}
      //   onSuccess={() => router.push("/dashboard")}
    >
      {children}
    </PrivyProvider>
  )
}
