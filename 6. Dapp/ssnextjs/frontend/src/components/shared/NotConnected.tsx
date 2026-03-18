import { Card, CardContent } from "@/components/ui/card"
import { Wallet } from "lucide-react"

const NotConnected = () => {
    return (
        <div className="container max-w-4xl mx-auto p-6">
            <Card className="border-2 shadow-lg">
                <CardContent className="flex flex-col items-center justify-center gap-4 py-20 text-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/20">
                        <Wallet className="h-10 w-10 text-blue-500" />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold">Connectez votre wallet</h2>
                        <p className="text-muted-foreground">
                            Utilisez le bouton en haut à droite pour vous connecter.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default NotConnected