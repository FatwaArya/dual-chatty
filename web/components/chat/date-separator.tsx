interface DateSeparatorProps {
  date: string;
}

export function DateSeparator({ date }: DateSeparatorProps) {
  return (
    <div className="flex items-center gap-4 py-2">
      <div className="h-px flex-1 bg-border/50" />
      <span className="text-[11px] font-medium text-muted-foreground/70">
        {date}
      </span>
      <div className="h-px flex-1 bg-border/50" />
    </div>
  );
}


