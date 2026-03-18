import { SimpleStorageEvent } from "@/utils/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Activity, User, Hash } from "lucide-react";

const Events = ({ events }: { events: SimpleStorageEvent[] }) => {
    return (
        <Card className="border-2 shadow-lg">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-blue-600" />
                    <CardTitle>Historique des événements</CardTitle>
                </div>
                <CardDescription>
                    {events.length > 0
                        ? `${events.length} modification${events.length > 1 ? 's' : ''} enregistrée${events.length > 1 ? 's' : ''}`
                        : "Aucun événement enregistré pour le moment"}
                </CardDescription>
            </CardHeader>
            <CardContent>
                {events.length > 0 ? (
                    <div className="space-y-2">
                        {events.slice().reverse().map((event, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                            >
                                <span className="text-xs text-muted-foreground font-mono w-6 shrink-0">
                                    #{events.length - index}
                                </span>
                                <div className="flex-1 min-w-0 flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground min-w-0">
                                        <User className="h-3 w-3 shrink-0" />
                                        <span className="font-mono truncate">{event.by}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 shrink-0">
                                        <Hash className="h-3.5 w-3.5 text-muted-foreground" />
                                        <span className="font-semibold">{event.number}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-10 text-center text-muted-foreground">
                        <Activity className="h-8 w-8 mb-3 opacity-40" />
                        <p className="text-sm">Aucun événement pour le moment</p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

export default Events