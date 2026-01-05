import { MessageCircle } from "lucide-react";

export function ChatEmpty() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <div className="mb-3 flex size-12 items-center justify-center rounded-2xl bg-muted">
        <MessageCircle className="size-5 text-muted-foreground" />
      </div>
      <p className="text-sm font-medium text-foreground/80">No messages yet</p>
      <p className="mt-0.5 text-xs text-muted-foreground">
        Start the conversation below
      </p>
    </div>
  );
}


