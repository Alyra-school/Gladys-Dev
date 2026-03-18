import ConnectButton from "./ConnectButton"
import { Database } from "lucide-react"

const Header = () => {
  return (
    <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
      <div className="container max-w-4xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <Database className="h-5 w-5 text-blue-500" />
          <span className="font-semibold text-lg">SimpleStorage</span>
        </div>
        <ConnectButton />
      </div>
    </header>
  )
}

export default Header