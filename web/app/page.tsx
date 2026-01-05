import ChatWrapper from "@/components/chat";

export default function Page() {
  return (
    <div className="flex h-screen gap-4 p-4">
      <div className="flex-1">
        <ChatWrapper role="dual-left" />
      </div>
      <div className="flex-1">
        <ChatWrapper role="dual-right"/>
      </div>
    </div>
  );
}