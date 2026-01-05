import type { Message } from "@/hooks/use-socket";
import { cn } from "@/lib/utils";
import { formatTime } from "@/lib/chat-utils";

interface ChatMessageProps {
  message: Message;
  isOwn: boolean;
}

export function ChatMessage({ message, isOwn }: ChatMessageProps) {
  return (
    <div className={cn("flex gap-2.5", isOwn ? "flex-row-reverse" : "flex-row")}>
      {/* Avatar */}
      <div
        className={cn(
          "flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-medium",
          isOwn
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground"
        )}
      >
        {message.sender.charAt(0).toUpperCase()}
      </div>

      {/* Bubble */}
      <div className={cn("group max-w-[70%]", isOwn ? "items-end" : "items-start")}>
        <div
          className={cn(
            "rounded-2xl px-3.5 py-2",
            isOwn
              ? "rounded-br-sm bg-primary text-primary-foreground"
              : "rounded-bl-sm bg-muted"
          )}
        >
          {!isOwn && (
            <p className="mb-0.5 text-xs font-medium text-primary">
              {message.sender}
            </p>
          )}
          <p className="whitespace-pre-wrap text-sm leading-relaxed">
            {message.text}
          </p>
        </div>
        <p
          className={cn(
            "mt-1 px-1 text-[10px] text-muted-foreground/60 opacity-0 transition-opacity group-hover:opacity-100",
            isOwn ? "text-right" : "text-left"
          )}
        >
          {formatTime(message.timestamp)}
        </p>
      </div>
    </div>
  );
}


