import Link from 'next/link';
import { Button } from "@/components/ui/button";
import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#040830] text-white overflow-x-hidden">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center gap-x-12">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative w-8 h-8">
                <Image src="/images/landing/logo-vector-1.svg" alt="Logo" fill />
              </div>
              <span className="font-bold text-xl">CryptoPump</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="#copy-trading" className="text-white hover:text-green-400 transition-colors">Copy Trading</Link>
            <Link href="#trending" className="text-white hover:text-green-400 transition-colors">Trending</Link>
            <Link href="#traderscan" className="text-white hover:text-green-400 transition-colors">TraderScan</Link>
            <Link href="#alert" className="text-white hover:text-green-400 transition-colors">Alert</Link>
            <Link href="#resources" className="text-white hover:text-green-400 transition-colors">Resources</Link>
            <Link href="#membership" className="text-white hover:text-green-400 transition-colors">Membership</Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:flex items-center bg-[#1E1E24] rounded-full px-4 py-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Wallet Address / Token"
              className="bg-transparent border-none outline-none text-sm text-gray-400 ml-2 w-48"
            />
          </div>
          <Button className="bg-green-600 hover:bg-green-700 rounded-full">Connect Wallet</Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full">
            {/* Blue gradient */}
            <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-80">
              <Image src="/images/landing/blue-gradient.png" alt="Blue gradient" fill />
            </div>

            {/* Green gradient */}
            <div className="absolute top-20 right-1/4 w-96 h-96 rounded-full opacity-80">
              <Image src="/images/landing/green-gradient.png" alt="Green gradient" fill />
            </div>

            {/* Background halo */}
            <div className="absolute top-0 left-0 w-full h-full opacity-70">
              <Image src="/images/landing/bg-halo.png" alt="Background halo" fill objectFit="cover" />
            </div>

            {/* Grid lines */}
            <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-10"></div>
          </div>
        </div>

        {/* Hero content */}
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Batch Copy Trade<br />Top Addresses in 1 Click
            </h1>
            <div className="flex flex-wrap justify-center gap-8 mb-8">
              <div className="flex items-center gap-2">
                <div className="bg-green-500 w-2 h-2 rounded-full"></div>
                <span className="text-xl font-bold">Permissionless</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-green-500 w-2 h-2 rounded-full"></div>
                <span className="text-xl font-bold">Automatic</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-green-500 w-2 h-2 rounded-full"></div>
                <span className="text-xl font-bold">Real-time</span>
              </div>
            </div>
          </div>

          {/* Chain selection */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.1)] rounded-full p-1 flex mb-6">
              <button className="flex items-center gap-2 bg-[rgba(255,255,255,0.08)] rounded-full px-4 py-2 text-white">
                <span className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-600 to-teal-400"></span>
                <span>Solana</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-white opacity-60">
                <span className="w-5 h-5 rounded-full bg-[#627EEA]"></span>
                <span>Ethereum</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-white opacity-60">
                <span className="w-5 h-5 rounded-full bg-[#0052FF]"></span>
                <span>Base</span>
              </button>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1 */}
              <div className="bg-gradient-to-br from-[#1E1B2B] to-[#20162A] border border-[rgba(255,255,255,0.16)] rounded-lg p-6 shadow-xl">
                <div className="mb-4">
                  <h3 className="font-bold text-lg">Let's Moon! 🚀 🌝</h3>
                  <p className="text-gray-400 text-sm">7 Addresses</p>
                </div>
                <hr className="border-[rgba(255,255,255,0.08)] my-4" />
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">1M ROI</span>
                    <span className="bg-[rgba(35,200,17,0.2)] text-green-400 px-2 py-0.5 rounded text-lg font-bold">12.1X</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">1M PnL</span>
                    <span className="text-green-400 text-lg font-bold">$827,430</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">1M Win Rate</span>
                    <span className="text-white text-lg font-bold">81.43%</span>
                  </div>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700 mt-6 rounded-full">Copy Trade</Button>
              </div>

              {/* Card 2 */}
              <div className="bg-gradient-to-br from-[#1E1B2B] to-[#20162A] border border-[rgba(255,255,255,0.16)] rounded-lg p-6 shadow-xl">
                <div className="mb-4">
                  <h3 className="font-bold text-lg">Bros Make Small Bet 🦐</h3>
                  <p className="text-gray-400 text-sm">10 Addresses</p>
                </div>
                <hr className="border-[rgba(255,255,255,0.08)] my-4" />
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">1M ROI</span>
                    <span className="bg-[rgba(35,200,17,0.2)] text-green-400 px-2 py-0.5 rounded text-lg font-bold">5.5X</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">1M PnL</span>
                    <span className="text-green-400 text-lg font-bold">$142,322</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">1M Win Rate</span>
                    <span className="text-white text-lg font-bold">78.57%</span>
                  </div>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700 mt-6 rounded-full">Copy Trade</Button>
              </div>

              {/* Card 3 */}
              <div className="bg-gradient-to-br from-[#1E1B2B] to-[#20162A] border border-[rgba(255,255,255,0.16)] rounded-lg p-6 shadow-xl">
                <div className="p-4 flex items-center justify-center bg-[rgba(14,14,14,0.2)] rounded-full w-12 h-12 mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="text-gray-400 text-sm">Copy Trade</p>
                  <h3 className="font-bold text-lg mt-1">Smart Money</h3>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700 mt-6 rounded-full">Copy Trade</Button>
              </div>
            </div>

            {/* Pagination dots */}
            <div className="flex justify-center mt-8 gap-2">
              <div className="w-2 h-2 rounded-full bg-gray-500"></div>
              <div className="w-2 h-2 rounded-full bg-gray-500 opacity-40"></div>
              <div className="w-2 h-2 rounded-full bg-gray-500 opacity-40"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="max-w-lg">
              <h2 className="text-4xl font-bold mb-8">Explore Top Addresses by Your Own Metrics</h2>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-opacity-10 border border-[rgba(255,255,255,0.1)] rounded-lg p-4 flex items-center gap-4">
                  <div className="p-2 bg-green-600 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Top ROI</h3>
                    <p className="text-gray-400 text-sm">Update Every 3 hours</p>
                  </div>
                </div>

                <div className="bg-opacity-10 border border-[rgba(255,255,255,0.1)] rounded-lg p-4 flex items-center gap-4">
                  <div className="p-2 bg-green-600 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Top Win Rate</h3>
                    <p className="text-gray-400 text-sm">Update Every 3 hours</p>
                  </div>
                </div>

                <div className="bg-opacity-10 border border-[rgba(255,255,255,0.1)] rounded-lg p-4 flex items-center gap-4">
                  <div className="p-2 bg-green-600 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Top Profit</h3>
                    <p className="text-gray-400 text-sm">Update Every 3 hours</p>
                  </div>
                </div>

                <div className="bg-opacity-10 border border-[rgba(255,255,255,0.1)] rounded-lg p-4 flex items-center gap-4">
                  <div className="p-2 bg-green-600 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-white">More</h3>
                    <p className="text-gray-400 text-sm">Custom Filters</p>
                  </div>
                </div>
              </div>

              <Button className="bg-green-600 hover:bg-green-700 px-6 py-6 text-lg font-bold rounded-full">
                Discover Top Traders
              </Button>
            </div>

            <div className="relative">
              <Image
                src="/images/landing/top-address.png"
                alt="Top Address Dashboard"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute bottom-4 left-4 flex items-center gap-2 text-sm text-gray-300">
                <span>Learn 20X Return Cases</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="order-2 md:order-1">
              <Image
                src="/images/landing/actionable-charts.png"
                alt="Actionable Charts"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
              />
            </div>

            <div className="order-1 md:order-2 max-w-lg">
              <h2 className="text-4xl font-bold mb-8">Monitor Your Position by 40+ Actionable Charts</h2>
              <Button className="bg-green-600 hover:bg-green-700 px-6 py-6 text-lg font-bold rounded-full">
                Get Live Signals
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <div className="bg-green-600 rounded-xl p-12 text-center relative overflow-hidden">
            {/* Background effect */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-yellow-400 blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>

            <h2 className="text-3xl font-bold mb-8 relative z-10">Opportunities Revealed</h2>
            <Button className="bg-[#0E002E] hover:bg-[#1a0046] px-8 py-6 text-lg font-bold rounded-full relative z-10">
              Start For Free
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0a1a] py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <Link href="/" className="flex items-center gap-2">
                <div className="relative w-8 h-8">
                  <Image src="/images/landing/logo-vector-1.svg" alt="Logo" fill />
                </div>
                <span className="font-bold text-xl">CryptoPump</span>
              </Link>
            </div>

            <div className="flex flex-wrap gap-8">
              <Link href="#copy-trading" className="text-gray-300 hover:text-white transition-colors">Copy Trading</Link>
              <Link href="#trending" className="text-gray-300 hover:text-white transition-colors">Trending</Link>
              <Link href="#traderscan" className="text-gray-300 hover:text-white transition-colors">TraderScan</Link>
              <Link href="#resources" className="text-gray-300 hover:text-white transition-colors">Resources</Link>
              <Link href="#membership" className="text-gray-300 hover:text-white transition-colors">Membership</Link>
            </div>

            <div className="mt-6 md:mt-0">
              <Button className="bg-green-600 hover:bg-green-700 rounded-full">Connect Wallet</Button>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} CryptoPump. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}