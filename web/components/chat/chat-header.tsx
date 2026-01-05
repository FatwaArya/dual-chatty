import { MessageCircle, Wifi, WifiOff } from "lucide-react";

interface ChatHeaderProps {
  sender: string;
  isConnected: boolean;
}

export function ChatHeader({ sender, isConnected }: ChatHeaderProps) {
  return (
    <header className="border-b border-border/50 bg-background/80 px-6 py-4 backdrop-blur-xl">
      <div className="mx-auto flex max-w-2xl items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-xl bg-primary">
            <MessageCircle className="size-4 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-sm font-medium">Chatty</h1>
            {sender && (
              <p className="text-xs text-muted-foreground">{sender}</p>
            )}
          </div>
        </div>

        {isConnected ? (
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400">
            <Wifi className="size-3.5" />
            <span className="hidden sm:inline">Connected</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-xs text-rose-600 dark:text-rose-400">
            <WifiOff className="size-3.5" />
            <span className="hidden sm:inline">Disconnected</span>
          </div>
        )}
      </div>
    </header>
  );
}


