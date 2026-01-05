"use client";

import { useRef, FormEvent } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
}

export function ChatInput({ value, onChange, onSubmit, disabled }: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSubmit();
      textareaRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <footer className="border-t border-border/50 bg-background/80 px-4 py-3 backdrop-blur-xl">
      <form onSubmit={handleSubmit} className="mx-auto flex max-w-2xl items-end gap-2">
        <Textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message..."
          className="max-h-28 min-h-[42px] flex-1 resize-none py-2.5"
          disabled={disabled}
        />
        <Button
          type="submit"
          size="icon"
          disabled={!value.trim() || disabled}
          className="shrink-0"
        >
          <Send className="size-4" />
        </Button>
      </form>
      <p className="mx-auto mt-1.5 max-w-2xl text-center text-[10px] text-muted-foreground/50">
        <kbd className="rounded bg-muted px-1 py-0.5 font-mono">Enter</kbd> send · <kbd className="rounded bg-muted px-1 py-0.5 font-mono">Shift+Enter</kbd> newline
      </p>
    </footer>
  );
}


