'use client'

export default function TestPage() {
  return (
    <div className="h-screen w-screen">
      <iframe
        height="100%"
        width="100%"
        id="geckoterminal-embed"
        title="GeckoTerminal Embed"
        src="https://www.geckoterminal.com/zh/solana/pools/D6Rgz1JG2syjsTXGaSAZ39cLffWL4TfabEAAnJHGRrZC?embed=1&info=0&swaps=1&grayscale=0&light_chart=0&chart_type=price&resolution=15m"
        frameBorder="0"
        allow="clipboard-write"
        allowFullScreen
      ></iframe>
    </div>
  )
}
