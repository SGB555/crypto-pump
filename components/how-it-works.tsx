import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HowItWorks() {
  return (
    <div className="text-center">
      <h2 className="text-xl font-bold mb-4">how it works</h2>

      <p className="mb-6">
        crypto.pump allows anyone to create coins. all coins created on Pump are fair-launch, meaning everyone has equal
        access to buy and sell when the coin is first created.
      </p>

      <div className="space-y-4 mb-6">
        <div>
          <p className="font-medium">step 1: pick a coin that you like</p>
        </div>
        <div>
          <p className="font-medium">step 2: buy the coin on the bonding curve</p>
        </div>
        <div>
          <p className="font-medium">step 3: sell at any time to lock in your profits or losses</p>
        </div>
      </div>

      <p className="text-sm mb-6">
        by clicking this button you agree to the terms and conditions and certify that you are over 18
      </p>

      <Button className="w-full bg-green-400 text-black hover:bg-green-500 mb-4">I'm ready to pump</Button>

      <div className="text-xs text-gray-400 flex justify-center space-x-4">
        <Link href="#" className="hover:text-green-400">
          privacy policy
        </Link>
        <span>|</span>
        <Link href="#" className="hover:text-green-400">
          terms of service
        </Link>
        <span>|</span>
        <Link href="#" className="hover:text-green-400">
          fees
        </Link>
      </div>
    </div>
  )
}

